'use client'
import { useState } from 'react'
import Sidebar from '@/app/components/sidebar'
import {
  MapPin, Clock, Heart, ArrowDown,
  ChevronLeft, ChevronRight,
  CalendarDays, Users
} from 'lucide-react'

export default function InicioPublico() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Array con 5 fotos y 1 video (total 6 elementos)
  // Asegúrate de poner tus archivos en la carpeta /public/historia/ de tu proyecto
  const fotosHistoria = [
    { type: 'image', url: "/historia/historia_6.jpg" },
    { type: 'image', url: "/historia/historia_2.jpg" },
    { type: 'image', url: "/historia/historia_3.jpg" },
    { type: 'image', url: "/historia/historia_4.jpg" },
    { type: 'image', url: "/historia/historia_5.jpg" },
    { type: 'video', url: "/historia/historia.jpg" }
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % fotosHistoria.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + fotosHistoria.length) % fotosHistoria.length)

  return (
    <main className={`flex h-screen transition-colors duration-1000 overflow-hidden ${darkMode ? 'bg-[#0a0a0a] text-stone-400' : 'bg-[#fafaf9] text-stone-600'}`}>

      <div className="flex-1 flex flex-col overflow-y-auto font-light selection:bg-stone-200 custom-scrollbar">

        {/* Espaciador superior reducido */}
        <div className="h-8 md:h-12" />

        <div className="w-full max-w-4xl mx-auto p-6 md:p-12 space-y-24">

          {/* Hero Section - Escala reducida */}
          <section className="text-center space-y-6 py-6 relative">
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <img
                  src="/IBM.png"
                  alt="Logo"
                  className={`w-10 h-10 object-contain transition-opacity duration-700 ${darkMode ? 'opacity-30 grayscale invert' : 'opacity-20 grayscale'}`}
                />
              </div>
              <span className="text-[8px] uppercase tracking-[0.6em] text-stone-400 font-bold block">
                Brisas del Mantaro
              </span>
              <h1 className={`text-5xl md:text-7xl font-extralight tracking-tighter leading-[1.1] ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                Fe, Esperanza <br />
                <span className="italic font-serif opacity-40">y Renovación.</span>
              </h1>
            </div>
            <p className="max-w-xs mx-auto text-[13px] leading-relaxed tracking-wide opacity-70 italic font-serif">
              "Donde el corazón encuentra su hogar y la fe se fortalece."
            </p>
          </section>

          {/* Sección: Historia - Más compacta */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-left">
              <h2 className={`text-2xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Nuestra Historia</h2>
              <p className="text-xs leading-relaxed opacity-80">
                Nacimos como una pequeña iglesia, rodeado de muchos niños y jóvenes, con una sola visión ser la luz del mundo apoyando a las personas de nuestras comunidades. Desde entonces la visión de la iglesia estuvo en las misiones y en llegar a los perdidos aún.
              </p>
            </div>

            <div className="relative group">
              <div className={`aspect-[16/9] rounded-[2rem] overflow-hidden border ${darkMode ? 'border-stone-900' : 'border-stone-100 shadow-xl'}`}>
                {fotosHistoria[currentSlide].type === 'image' ? (
                  <img
                    key={currentSlide}
                    src={fotosHistoria[currentSlide].url}
                    className="w-full h-full object-cover transition-opacity duration-500"
                    alt="Historia"
                  />
                ) : (
                  <video
                    key={currentSlide}
                    src={fotosHistoria[currentSlide].url}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
              </div>
              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={prevSlide} className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-all"><ChevronLeft size={14} /></button>
                <button onClick={nextSlide} className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-all"><ChevronRight size={14} /></button>
              </div>

              {/* Indicadores de posición (puntitos) */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                {fotosHistoria.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-4 bg-stone-400' : 'w-1 bg-stone-200'}`} />
                ))}
              </div>
            </div>
          </section>

          {/* Agenda - Diseño de lista más fino */}
          <section className="space-y-10">
            <h3 className="text-[8px] font-black uppercase tracking-[0.4em] text-stone-400 text-center">Agenda Semanal</h3>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-b py-10 ${darkMode ? 'border-stone-900' : 'border-stone-100'}`}>
              {[
                { icon: <Clock size={16} />, day: "Martes", title: "Oración", time: "19:30 — 21:30" },
                { icon: <Users size={16} />, day: "Sábados", title: "Jóvenes", time: "19:30 — 21:30" },
                { icon: <Heart size={16} />, day: "Domingos", title: "Culto General", time: "10:00 — 12:00" }
              ].map((item, idx) => (
                <div key={idx} className="space-y-3 text-center md:text-left">
                  <div className="text-stone-400 flex justify-center md:justify-start">{item.icon}</div>
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">{item.day}</p>
                    <h4 className={`text-lg font-serif italic ${darkMode ? 'text-stone-200' : 'text-stone-800'}`}>{item.title}</h4>
                    <p className="text-[11px] font-medium opacity-60">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ubicación - Altura reducida */}
          <section className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
              <div className="text-center md:text-left space-y-2">
                <span className="text-[8px] font-black uppercase tracking-widest text-stone-400">Visítanos</span>
                <h2 className={`text-2xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Brisas del Mantaro</h2>
              </div>
              <p className="text-[9px] text-stone-500 uppercase tracking-widest font-bold text-center md:text-right opacity-60">
                Calle los Heraldos 105<br /> Justicia, Paz y Vida, Huancayo
              </p>
            </div>

            <div className={`w-full h-64 rounded-[2.5rem] overflow-hidden border ${darkMode ? 'border-stone-900 grayscale opacity-60' : 'border-stone-100 shadow-lg'}`}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29750.348501841796!2d-75.2222208!3d-12.0651776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e97906be66211%3A0x72ef7b6021e61c77!2sCiudad%20de%20Refugio%20Huancayo!5e1!3m2!1ses!2spe!4v1774741406946!5m2!1ses!2spe"
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          </section>

          <footer className="py-12 text-center">
            <p className="text-[8px] uppercase tracking-[0.8em] opacity-30 font-bold italic">
              Una sola fe - Una sola gracia - Un solo Señor
            </p>
          </footer>

        </div>
      </div>

      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
    </main>
  )
}