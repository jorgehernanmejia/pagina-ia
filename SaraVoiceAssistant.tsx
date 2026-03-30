import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, PhoneOff, Mic, MicOff, Volume2, Loader2 } from "lucide-react";
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `Eres Sara, la asistente de voz de Nomad Brew & Cake. 
Tienes un tono de voz muy agradable, amigable y profesional. 
Hablas con un marcado acento colombiano (específicamente de Medellín/Antioquia, siendo muy cordial y usando expresiones como "con mucho gusto", "qué alegría saludarte").
Tu objetivo es ayudar a los clientes con información sobre el menú, la ubicación de nuestro food truck en Medellín y la cultura del café de especialidad.
Eres una experta en café y repostería. 
Si te preguntan por recomendaciones, sugiere el V60 o la Milhojas. 
Mantén tus respuestas concisas y naturales para una conversación fluida por voz.`;

export const SaraVoiceAssistant = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);
  const audioQueueRef = useRef<Int16Array[]>([]);
  const isPlayingRef = useRef(false);

  const initAudio = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    }
    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }
  };

  const playNextChunk = useCallback(() => {
    if (audioQueueRef.current.length === 0 || isPlayingRef.current || !audioContextRef.current) {
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    isPlayingRef.current = true;
    const chunk = audioQueueRef.current.shift()!;
    
    const audioBuffer = audioContextRef.current.createBuffer(1, chunk.length, 16000);
    const channelData = audioBuffer.getChannelData(0);
    for (let i = 0; i < chunk.length; i++) channelData[i] = chunk[i] / 32768;

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);
    source.onended = () => {
      isPlayingRef.current = false;
      playNextChunk();
    };
    source.start();
  }, []);

  const startCall = async () => {
    try {
      setIsConnecting(true);
      await initAudio();

      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } },
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        callbacks: {
          onopen: () => { setIsConnecting(false); setIsCalling(true); startMic(); },
          onmessage: (message) => {
            if (message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
              const base64Data = message.serverContent.modelTurn.parts[0].inlineData.data;
              const binaryString = atob(base64Data);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
              audioQueueRef.current.push(new Int16Array(bytes.buffer));
              playNextChunk();
            }
          },
          onclose: () => endCall(),
        },
      });
      sessionRef.current = session;
    } catch (error) {
      console.error(error);
      setIsConnecting(false);
    }
  };

  const startMic = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    const source = audioContextRef.current!.createMediaStreamSource(stream);
    const processor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
    processor.onaudioprocess = (e) => {
      if (isMuted || !sessionRef.current) return;
      const inputData = e.inputBuffer.getChannelData(0);
      const pcmData = new Int16Array(inputData.length);
      for (let i = 0; i < inputData.length; i++) pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 32767;
      const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
      sessionRef.current.sendRealtimeInput({ audio: { data: base64Data, mimeType: "audio/pcm;rate=16000" } });
    };
    source.connect(processor);
    processor.connect(audioContextRef.current!.destination);
    processorRef.current = processor;
  };

  const endCall = () => {
    setIsCalling(false);
    setIsConnecting(false);
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (sessionRef.current) sessionRef.current.close();
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      {isCalling && (
        <div className="bg-coffee-dark rounded-2xl p-6 mb-4 border border-gold/30 flex flex-col items-center gap-4 w-64">
          <div className={`w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center border-2 border-gold ${isSpeaking ? 'animate-pulse' : ''}`}>
            <Volume2 className="h-8 w-8 text-gold" />
          </div>
          <div className="text-center text-white">
            <h3 className="font-bold">Sara</h3>
            <p className="text-xs text-gold">{isSpeaking ? "Hablando..." : "Escuchando..."}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsMuted(!isMuted)} className="p-3 bg-white/10 rounded-full text-gold">
              {isMuted ? <MicOff /> : <Mic />}
            </button>
            <button onClick={endCall} className="p-3 bg-red-600 rounded-full text-white">
              <PhoneOff />
            </button>
          </div>
        </div>
      )}
      <button onClick={isCalling ? endCall : startCall} className="bg-gold p-4 rounded-full shadow-2xl flex items-center gap-2 text-coffee-dark font-bold">
        {isConnecting ? <Loader2 className="animate-spin" /> : <Phone />}
        <span className="hidden md:inline">Hablar con Sara</span>
      </button>
    </div>
  );
};