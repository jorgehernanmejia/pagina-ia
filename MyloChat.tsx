import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Coffee, Sparkles } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: "user" | "model";
  text: string;
}

const SYSTEM_INSTRUCTION = `Eres Mylo, el asistente virtual de Nomad Brew & Cake. 
Tu objetivo es ayudar a los clientes con información sobre el menú, la ubicación (somos un food truck en Medellín), nuestra historia y la cultura del café de especialidad. 
Eres amable, apasionado por el café y la repostería, y siempre estás listo para dar recomendaciones. 
Responde en español de forma cercana y profesional. 
Si te preguntan por el menú, menciona opciones como Espresso, V60, Milhojas, Torta de Zanahoria o Pan de Yuca Gourmet. 
Si te preguntan por la ubicación, recuerda que somos un food truck en Medellín y que deben seguirnos en @nomadbrewandcake para la ubicación diaria.`;

export const MyloChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "¡Hola! Soy Mylo, tu asistente de Nomad Brew & Cake. ¿En qué puedo ayudarte hoy?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const response = await chat.sendMessage({ message: userMessage });
      const modelResponse = response.text;

      setMessages(prev => [...prev, { role: "model", text: modelResponse }]);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages(prev => [...prev, { role: "model", text: "Lo siento, he tenido un pequeño problema técnico. ¿Podrías repetirlo?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-[350px] md:w-[400px] h-[500px] flex flex-col overflow-hidden border border-gold/20 mb-4"
          >
            <div className="bg-coffee-dark p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-gold p-2 rounded-full">
                  <Coffee className="h-5 w-5 text-coffee-dark" />
                </div>
                <div>
                  <h3 className="text-white font-display font-bold">Mylo</h3>
                  <p className="text-gold text-xs flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> En línea
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream/30">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-gold text-coffee-dark rounded-tr-none" : "bg-white text-coffee-dark shadow-sm border border-gold/10 rounded-tl-none"}`}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-xs text-gold animate-pulse">Mylo está pensando...</div>}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gold/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Pregúntale a Mylo..."
                className="flex-1 bg-cream/50 border border-gold/20 rounded-full px-4 py-2 text-sm focus:outline-none"
              />
              <button onClick={handleSend} disabled={isLoading} className="bg-coffee-dark text-gold p-2 rounded-full">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-coffee-dark text-gold p-4 rounded-full shadow-2xl border-2 border-gold/50"
      >
        {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
      </motion.button>
    </div>
  );
};