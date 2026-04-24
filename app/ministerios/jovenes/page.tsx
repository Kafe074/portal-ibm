"use client";
import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";
import { 
  ArrowLeft, 
  Music, 
  Gamepad2, 
  Users2, 
  Compass, 
  Clock, 
  Calendar,
  Zap,
  MessageCircle
} from "lucide-react";

export default function GeneracionEmergentePage() {
  const [darkMode, setDarkMode] = useState(false); // Default dark para este ministerio

  return (
    <div className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#0F0F0F]" : "bg-white"}`}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 p-6 lg:p-10 space-y-12 overflow-y-auto scrollbar-hide">
        
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] transition-all
            ${darkMode ? "text-stone-600 hover:text-stone-200" : "text-stone-400 hover:text-stone-900"}`}
        >
          <ArrowLeft size={12} />
          Volver al Inicio
        </Link>

        {/* HERO - Energía y Movimiento */}
        <section className="relative py-12 flex flex-col items-center text-center">
          <div className="z-10 space-y-4">
            <div className={`inline-block px-3 py-1 rounded-full border text-[8px] font-bold uppercase tracking-[0.3em] ${darkMode ? "border-violet-500/30 text-violet-400" : "border-stone-200 text-stone-500"}`}>
              Comunidad Joven
            </div>
            <h1 className={`text-6xl lg:text-7xl font-serif italic leading-none ${darkMode ? "text-white" : "text-stone-900"}`}>
              Generación <br /> <span className="text-violet-500">Emergente.</span>
            </h1>
            <p className={`text-sm font-light max-w-sm mx-auto leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"}`}>
              No somos el futuro, somos el presente. Un espacio real para adolescentes y jóvenes.
            </p>
          </div>
        </section>

        {/* INFO CLAVE: HORARIO Y LUGAR - Estilo "Pass/Ticket" */}
        <section className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-around gap-8 border ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-stone-50 border-stone-100"}`}>
            <div className="flex items-center gap-4">
              <Calendar className="text-violet-500" size={24} />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">Todos los</p>
                <p className={`text-lg font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}>Sábados</p>
              </div>
            </div>
            <div className="w-[1px] h-12 bg-stone-800 hidden md:block" />
            <div className="flex items-center gap-4">
              <Clock className="text-violet-500" size={24} />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">Horario</p>
                <p className={`text-lg font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}>7:30 PM — 9:30 PM</p>
              </div>
            </div>
            <div className="w-[1px] h-12 bg-stone-800 hidden md:block" />
            <div className="flex items-center gap-4">
              <Users2 className="text-violet-500" size={24} />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">Edad</p>
                <p className={`text-lg font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}>Adolescentes y Jóvenes</p>
              </div>
            </div>
          </div>
        </section>

        {/* LO QUE VIVIMOS - Grid de Experiencias */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`p-8 rounded-[2rem] space-y-4 ${darkMode ? "bg-[#161616]" : "bg-white border border-stone-100"}`}>
            <Music className="text-violet-400" />
            <h3 className="font-serif italic text-xl">Young Alabanza</h3>
            <p className="text-xs text-stone-500 leading-relaxed">Música que conecta con nuestra generación, vibrando en la misma frecuencia.</p>
          </div>
          <div className={`p-8 rounded-[2rem] space-y-4 ${darkMode ? "bg-[#161616]" : "bg-white border border-stone-100"}`}>
            <Gamepad2 className="text-emerald-400" />
            <h3 className="font-serif italic text-xl">Conexión</h3>
            <p className="text-xs text-stone-500 leading-relaxed">Tiempos de juegos y compartir donde las amistades reales se forman.</p>
          </div>
          <div className={`p-8 rounded-[2rem] space-y-4 ${darkMode ? "bg-[#161616]" : "bg-white border border-stone-100"}`}>
            <Compass className="text-amber-400" />
            <h3 className="font-serif italic text-xl">Temas Reales</h3>
            <p className="text-xs text-stone-500 leading-relaxed">Abordamos los desafíos del mundo actual desde una perspectiva bíblica y práctica.</p>
          </div>
          <div className={`p-8 rounded-[2rem] space-y-4 ${darkMode ? "bg-[#161616]" : "bg-white border border-stone-100"}`}>
            <MessageCircle className="text-blue-400" />
            <h3 className="font-serif italic text-xl">Charla Abierta</h3>
            <p className="text-xs text-stone-500 leading-relaxed">Un lugar seguro para preguntar, debatir y crecer sin etiquetas.</p>
          </div>
        </div>

        {/* SECCIÓN "EMERGENTE" - Visual Impact */}
        <section className="max-w-6xl mx-auto">
          <div className="relative rounded-[3.5rem] overflow-hidden group border border-stone-800">
            <div className="aspect-[21/9] relative">
              <img 
                src="/ministerios/index/jovenes.jpg" 
                className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105" 
                alt="Jóvenes compartiendo"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-16 space-y-4">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-violet-500 fill-violet-500" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Impacto Real</span>
                </div>
                <h3 className="text-white text-3xl lg:text-4xl font-serif italic max-w-xl">
                  Encontrando respuestas eternas a preguntas actuales.
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* MENSAJE FINAL */}
        <section className="text-center py-10 max-w-xl mx-auto">
          <p className={`text-xl font-serif italic ${darkMode ? "text-stone-300" : "text-stone-600"}`}>
            "Que nadie te menosprecie por ser joven..."
          </p>
          <p className="text-[9px] uppercase tracking-widest text-stone-500 mt-4">1 Timoteo 4:12</p>
        </section>

      </main>
    </div>
  );
}