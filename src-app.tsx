import { motion, useScroll, useTransform } from "motion/react";
import { 
  Coffee, 
  Cake, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Menu as MenuIcon, 
  X, 
  ChevronRight,
  Clock,
  Heart,
  Truck,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { IMAGES, MENU_DATA } from "./constants";
import { MyloChat } from "./components/MyloChat";
import { SaraVoiceAssistant } from "./components/SaraVoiceAssistant";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Menú", href: "#menu" },
    { name: "Experiencia", href: "#experiencia" },
    { name: "Galería", href: "#galeria" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-coffee-dark/95 backdrop-blur-md py-2 shadow-lg" : "bg-gradient-to-b from-coffee-dark/60 to-transparent py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <img src={IMAGES.logo} alt="Nomad Logo" className="h-12 w-12 rounded-full border-2 border-gold" referrerPolicy="no-referrer" />
            <span className={`font-display text-xl font-bold hidden sm:block`}>
              <span className={scrolled ? "text-gold" : "text-white"}>Nomad</span>
              <span className={`ml-2 font-normal text-sm uppercase tracking-widest ${scrolled ? "text-cream/70" : "text-white/70"}`}>Brew & Cake</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${scrolled ? "text-cream hover:text-gold" : "text-white hover:text-gold"}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${scrolled ? "text-cream" : "text-white"}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-coffee-dark border-t border-coffee-medium"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-cream hover:bg-coffee-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={IMAGES.hero} 
          alt="Nomad Food Truck" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/80 via-transparent to-coffee-dark/80"></div>
      </motion.div>
      
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <img src={IMAGES.logo} alt="Nomad Logo" className="h-32 w-32 md:h-48 md:w-48 rounded-full border-4 border-gold shadow-2xl" referrerPolicy="no-referrer" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-white mb-6 drop-shadow-lg flex flex-col items-center"
        >
          <span className="text-6xl md:text-8xl lg:text-9xl block">Nomad</span>
          <span className="text-xl md:text-3xl tracking-[0.4em] uppercase text-cream mt-2 font-light">Brew & Cake</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-cream italic mb-8 max-w-2xl mx-auto drop-shadow-md"
        >
          "Café de especialidad y repostería artesanal que viaja contigo"
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a 
            href="#menu" 
            className="bg-gold hover:bg-gold-light text-coffee-dark font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
          >
            <MenuIcon className="h-5 w-5" /> Ver Menú
          </a>
          <a 
            href="#contacto" 
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <MapPin className="h-5 w-5" /> Visítanos
          </a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="nosotros" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 bg-cream text-gold rounded-full text-sm font-bold tracking-widest uppercase mb-4">
              Nuestra Esencia
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-coffee-dark mb-8 leading-tight">
              Café que viaja, <br />
              <span className="text-gold italic">historias que se quedan.</span>
            </h2>
            
            <div className="space-y-10">
              <div className="relative pl-8 border-l-2 border-gold/30">
                <h3 className="text-xl font-display text-coffee-medium mb-3 flex items-center gap-2">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 bg-gold rounded-full shadow-lg shadow-gold/50"></span>
                  Nuestra Misión
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed italic">
                  "Transformar el trayecto cotidiano en un viaje sensorial, llevando la excelencia del café de especialidad colombiano y la repostería hecha a mano a cada rincón de la ciudad. Creemos que la calidad no debe ser estática, sino una experiencia vibrante que se mueve contigo."
                </p>
              </div>

              <div className="relative pl-8 border-l-2 border-gold/30">
                <h3 className="text-xl font-display text-coffee-medium mb-3 flex items-center gap-2">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 bg-coffee-dark rounded-full shadow-lg shadow-coffee-dark/50"></span>
                  Nuestra Visión
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed italic">
                  "Ser el referente de la excelencia gastronómica itinerante en Medellín, tejiendo una comunidad que encuentre en nuestro food truck un refugio de sabor y conexión humana en medio del ritmo urbano. Queremos que cada parada de <span className="text-gold font-bold">Nomad</span> sea un destino esperado."
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-gold shadow-inner">
                  <Coffee className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-coffee-dark mt-2">Origen Único</h4>
                <p className="text-sm text-gray-500">Granos seleccionados de fincas con alma.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-gold shadow-inner">
                  <Cake className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-coffee-dark mt-2">Alma Artesana</h4>
                <p className="text-sm text-gray-500">Repostería real, horneada con paciencia.</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-cream">
              <img 
                src={IMAGES.coffee_cookie} 
                alt="Nomad Experience" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-sm uppercase tracking-[0.2em] font-bold text-gold mb-2">Est. 2024</p>
                <p className="text-2xl font-display italic">"Donde el camino se detiene para disfrutar."</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-coffee-dark/5 rounded-full blur-3xl"></div>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl z-20 border border-cream"
            >
              <p className="text-4xl font-display font-bold text-gold leading-none">100%</p>
              <p className="text-xs uppercase tracking-widest text-coffee-medium font-bold mt-1">Hecho a Mano</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Menu = () => {
  return (
    <section id="menu" className="py-20 bg-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display text-coffee-dark mb-4"
          >
            Nuestro Menú
          </motion.h2>
          <p className="text-coffee-medium italic">Sabores que despiertan tus sentidos</p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {MENU_DATA.map((category, idx) => (
            <motion.div 
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="text-2xl font-display text-gold border-b border-gold/30 pb-2 mb-6 flex items-center gap-2">
                {category.category === "Espresso" && <Coffee className="h-6 w-6" />}
                {category.category === "Repostería" && <Cake className="h-6 w-6" />}
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.items.map((item) => (
                  <div key={item.name} className="group">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-lg font-bold text-coffee-dark group-hover:text-gold transition-colors">{item.name}</h4>
                      <span className="text-coffee-medium font-medium">${item.price} COP</span>
                    </div>
                    <p className="text-sm text-gray-600 italic">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">* Precios sujetos a cambios según temporada y ubicación.</p>
        </div>
      </div>
    </section>
  );
};

const CoffeeRitual = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display text-coffee-dark mb-4"
          >
            El Despertar del Café
          </motion.h2>
          <p className="text-coffee-medium italic max-w-2xl mx-auto">
            Descubre el viaje sensorial desde el grano hasta tu taza. Un ritual que celebra la herencia de nuestra tierra.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-coffee-dark group"
        >
          <video
            ref={videoRef}
            src={IMAGES.coffee_video}
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          
          {/* Custom Controls Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
            <button 
              onClick={togglePlay}
              className="w-20 h-20 bg-gold text-coffee-dark rounded-full flex items-center justify-center transform transition-transform hover:scale-110 shadow-xl"
            >
              {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current ml-1" />}
            </button>
          </div>

          <div className="absolute bottom-6 right-6 flex gap-4">
            <button 
              onClick={toggleMute}
              className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>

          <div className="absolute bottom-6 left-6">
            <span className="bg-gold/90 text-coffee-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              <span className="text-white">Nomad</span> Experience
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experiencia" className="py-20 bg-coffee-dark text-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src={IMAGES.v60} 
              alt="Método Origami" 
              className="rounded-2xl shadow-2xl w-full"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/80 to-transparent rounded-2xl"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display mb-6 text-gold">Cultura del Café</h2>
            <p className="text-lg mb-6 leading-relaxed text-cream/90">
              En <span className="text-gold font-bold">Nomad</span>, el café no es solo una bebida, es un ritual. Trabajamos exclusivamente con <span className="italic">Café de Especialidad</span>, lo que significa que cada grano ha sido evaluado y puntuado por expertos por su calidad excepcional.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Trazabilidad</h4>
                  <p className="text-cream/70">Sabemos exactamente de qué finca viene tu café y quién lo cultivó.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Tueste Fresco</h4>
                  <p className="text-cream/70">Tostamos en lotes pequeños para resaltar las notas frutales y dulces.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Experiencia Móvil</h4>
                  <p className="text-cream/70">Llevamos la barra de café de especialidad a donde tú estés.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-20">
          <img 
            src={IMAGES.infographic} 
            alt="Infografía NotebookLM" 
            className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl border-4 border-gold/20"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const galleryImages = [
    { src: IMAGES.milhojas, title: "Milhojas" },
    { src: IMAGES.pain_au_chocolat, title: "Pain au Chocolat de Arequipe" },
    { src: IMAGES.carrot_cake, title: "Carrot Cake" },
    { src: IMAGES.empanadas, title: "Empanada Hojaldrada de Pipián" },
    { src: IMAGES.pistachio_cake, title: "Tarta Frasier de Pistacho" },
    { src: IMAGES.lava_cake, title: "Volcán de Chocolate con Helado de Vainilla" },
    { src: IMAGES.pan_de_yuca, title: "Pan de Yuca Gourmet Doble Queso" },
    { src: IMAGES.fruit_tarts, title: "Tarta Hojaldrada de Manjar Blanco" },
  ];

  return (
    <section id="galeria" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display text-coffee-dark mb-4">Galería Visual</h2>
          <p className="text-coffee-medium italic">Un festín para tus ojos</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative aspect-square group overflow-hidden rounded-xl"
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-coffee-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-display text-lg">{img.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contacto" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
          <div className="p-10 md:p-16 flex flex-col justify-center">
            <h2 className="text-4xl font-display text-coffee-dark mb-6">¿Dónde encontrarnos?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Somos un food truck, ¡así que siempre estamos en movimiento! Síguenos en nuestras redes sociales para conocer nuestra ubicación exacta cada día.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center text-gold shrink-0 mt-1">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-3">
                  <span className="text-coffee-dark font-bold block mb-2">Nuestras Ubicaciones: Nos movemos de manera itinerante entre:</span>
                  <ul className="space-y-3">
                    {[
                      "Parques del Río",
                      "Ciudad del Río, frente al Edificio Bancolombia",
                      "Parque de la Presidenta, El Poblado",
                      "Segundo Parque de Laureles",
                      "Estación Industriales, frente al C.C. Punto Clave"
                    ].map((loc, i) => (
                      <li key={i} className="flex items-center gap-3 text-coffee-dark group">
                        <div className="transition-transform group-hover:rotate-12">
                          {i % 2 === 0 ? <Coffee className="h-4 w-4 text-gold" /> : <Cake className="h-4 w-4 text-gold" />}
                        </div>
                        <span className="text-sm md:text-base">{loc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center text-gold">
                  <Instagram className="h-5 w-5" />
                </div>
                <span className="text-coffee-dark font-medium">@nomadbrewandcake</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-coffee-dark text-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-coffee-dark transition-all">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-coffee-dark text-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-coffee-dark transition-all">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="w-12 h-12 bg-coffee-dark text-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-coffee-dark transition-all">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="relative h-96 md:h-auto">
            <img 
              src={IMAGES.hero} 
              alt="Ubicación Nomad" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gold/10 mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-coffee-dark text-cream py-12 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <img src={IMAGES.logo} alt="Nomad Logo" className="h-20 w-20 mx-auto mb-6 rounded-full border-2 border-gold" referrerPolicy="no-referrer" />
        <h3 className="text-3xl font-display mb-2">
          <span className="text-gold">Nomad</span>
          <span className="ml-3 text-lg font-light uppercase tracking-[0.2em] text-cream/80">Brew & Cake</span>
        </h3>
        <p className="italic text-cream/60 mb-8">"Llevando el corazón del café colombiano a tu camino"</p>
        
        <div className="flex justify-center gap-8 mb-8 text-sm uppercase tracking-widest font-medium">
          <a href="#inicio" className="hover:text-gold transition-colors">Inicio</a>
          <a href="#menu" className="hover:text-gold transition-colors">Menú</a>
          <a href="#contacto" className="hover:text-gold transition-colors">Contacto</a>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-cream/40">
            © {new Date().getFullYear()} <span className="text-gold/60">Nomad</span> Brew & Cake. Todos los derechos reservados.
          </p>
          <p className="text-sm text-cream/40 flex items-center gap-1">
            Hecho con <Heart className="h-3 w-3 text-gold fill-gold" /> en Colombia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <CoffeeRitual />
        <Experience />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <MyloChat />
      <SaraVoiceAssistant />
    </div>
  );
}