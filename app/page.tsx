'use client'
import { useState } from 'react'
import Sidebar from '@/app/components/sidebar'
import {
  MapPin, Clock, Heart, ArrowRight,
  ChevronLeft, ChevronRight,
  CalendarDays, Users, Star
} from 'lucide-react'
import Link from 'next/link'

export default function InicioPublico() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const fotosHistoria = [
    { type: 'image', url: "/historia/historia_6.jpg" },
    { type: 'image', url: "/historia/historia_2.jpg" },
    { type: 'image', url: "/historia/historia_3.jpg" },
    { type: 'image', url: "/historia/historia_4.jpg" },
    { type: 'image', url: "/historia/historia_5.jpg" },
    { type: 'video', url: "/historia/historia.jpg" }
  ]

  const ministerios = ["Alabanza", "Escuela Dominical", "Misiones", "Intercesión", "Ujieres", "Media & Sonido", "Damas", "Varones"]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % fotosHistoria.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + fotosHistoria.length) % fotosHistoria.length)

  return (
    <main className={`flex h-screen transition-colors duration-1000 overflow-hidden ${darkMode ? 'bg-[#0a0a0a] text-stone-400' : 'bg-[#fafaf9] text-stone-600'}`}>

      <div className="flex-1 flex flex-col overflow-y-auto font-light selection:bg-stone-200 custom-scrollbar">
        <div className="h-8 md:h-12" />

        <div className="w-full max-w-5xl mx-auto p-6 md:p-12 space-y-32">

          {/* Hero Section */}
          <section className="text-center space-y-8 py-6 relative">
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <img src="/IBM.png" alt="Logo" className={`w-10 h-10 object-contain transition-all ${darkMode ? 'opacity-30 grayscale invert' : 'opacity-20 grayscale'}`} />
              </div>
              <span className="text-[8px] uppercase tracking-[0.6em] text-stone-400 font-bold block">Brisas del Mantaro</span>
              <h1 className={`text-5xl md:text-8xl font-extralight tracking-tighter leading-[1] ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                Fe, Esperanza <br />
                <span className="italic font-serif opacity-40">y Renovación.</span>
              </h1>
            </div>

            <div className="flex flex-col items-center gap-6">
              <p className="max-w-xs text-[13px] leading-relaxed tracking-wide opacity-70 italic font-serif">
                "Donde el corazón encuentra su hogar y la fe se fortalece."
              </p>
              {/* BOTÓN CALENDARIO */}
              <Link href="/calendario" className={`flex items-center gap-3 px-6 py-3 rounded-full border text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${darkMode ? 'border-stone-800 hover:bg-stone-900 text-stone-300' : 'border-stone-200 hover:bg-stone-50 text-stone-800 shadow-sm'}`}>
                Ver Calendario <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          {/* Sección: Historia */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-left">
              <h2 className={`text-3xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Nuestra Historia</h2>
              <p className="text-[13px] leading-relaxed opacity-80">
                Nacimos como una pequeña iglesia, rodeada de muchos niños y jóvenes, con una sola visión: ser la luz del mundo apoyando a las personas de nuestras comunidades. Desde entonces, la visión de la iglesia ha estado en las misiones y en alcanzar a los que aún no conocen el mensaje de esperanza.
              </p>
            </div>
            <div className="relative group">
              <div className={`aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden border ${darkMode ? 'border-stone-900' : 'border-stone-100 shadow-2xl'}`}>
                <img src="/historia/historia_6.jpg" className="w-full h-full object-cover" alt="Historia" />
              </div>
            </div>
          </section>

          {/* Sección: Visión (INVERTIDA) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative group order-2 md:order-1">
              <div className={`aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden border ${darkMode ? 'border-stone-900' : 'border-stone-100 shadow-2xl'}`}>
                <img src="/historia/historia_2.jpg" className="w-full h-full object-cover" alt="Visión" />
              </div>
            </div>
            <div className="space-y-6 text-left md:text-right order-1 md:order-2">
              <h2 className={`text-3xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Nuestra Visión</h2>
              <p className="text-[13px] leading-relaxed opacity-80">
                Ser una iglesia misionera llevando la palabra a las personas aun no alcanzadas.
              </p>
            </div>
          </section>

          {/* Slider de Ministerios (Marquee) */}
          <section className="py-10 overflow-hidden border-y border-stone-200/50 dark:border-stone-900/50">
            <div className="flex whitespace-nowrap animate-marquee">
              {[...ministerios, ...ministerios].map((min, i) => (
                <div key={i} className="flex items-center gap-8 mx-8">
                  <span className={`text-2xl md:text-4xl font-serif italic opacity-30 ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>{min}</span>
                  <Star size={12} className="text-stone-300" />
                </div>
              ))}
            </div>
          </section>

          {/* Agenda - 4 Columnas sin salto de linea */}
          <section className="space-y-12">
            <h3 className="text-[9px] font-black uppercase tracking-[0.5em] text-stone-400 text-center">Nuestras Reuniones</h3>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-t border-b py-16 ${darkMode ? 'border-stone-900' : 'border-stone-100'}`}>
              {[
                { icon: <Clock size={16} />, day: "Martes", title: "Oración", time: "19:30 — 21:30" },
                { icon: <Users size={16} />, day: "Sábados", title: "Jóvenes", time: "19:30 — 21:30" },
                { icon: <Users size={16} />, day: "Sábados", title: "Adolescentes", time: "19:30 — 21:30" },
                { icon: <Heart size={16} />, day: "Domingos", title: "Culto General", time: "10:00 — 12:00" }
              ].map((item, idx) => (
                <div key={idx} className="space-y-4 text-center">
                  <div className="text-stone-300 flex justify-center">{item.icon}</div>
                  <div className="space-y-2">
                    <p className="text-[8px] uppercase tracking-widest text-stone-400 font-black">{item.day}</p>
                    <h4 className={`text-xl font-serif italic ${darkMode ? 'text-stone-200' : 'text-stone-800'}`}>{item.title}</h4>
                    <p className="text-[10px] font-medium opacity-50">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ubicación */}
          <section className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
              <div className="text-center md:text-left space-y-3">
                <span className="text-[8px] font-black uppercase tracking-widest text-stone-400">¿Dónde encontrarnos?</span>
                <h2 className={`text-3xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Calle los Heraldos 105</h2>
              </div>
              <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em] font-bold text-center md:text-right opacity-60">
                Justicia, Paz y Vida <br /> El Tambo, Huancayo
              </p>
            </div>
            <div className={`w-full h-80 rounded-[3.5rem] overflow-hidden border transition-all duration-1000 ${darkMode ? 'border-stone-900 grayscale opacity-40' : 'border-stone-100 shadow-2xl'}`}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15602.83984534727!2d-75.210000!3d-12.060000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2spe!4v1711111111111" className="w-full h-full border-0" allowFullScreen={true} loading="lazy"></iframe>
            </div>
          </section>

          <footer className="py-12 text-center">
            <p className="text-[8px] uppercase tracking-[0.8em] opacity-30 font-bold italic">
              Una sola fe — Una sola gracia — Un solo Señor
            </p>
          </footer>
        </div>
      </div>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* ESTILOS PARA LA MARQUESINA */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </main>
  )
}