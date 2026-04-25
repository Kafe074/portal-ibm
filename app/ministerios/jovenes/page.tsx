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
  MessageCircle,
} from "lucide-react";

export default function GeneracionEmergentePage() {
  const [darkMode, setDarkMode] = useState(false); // Default dark para este ministerio

  return (
    <div
      className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#0F0F0F]" : "bg-white"}`}
    >
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
            <div
              className={`inline-block px-3 py-1 rounded-full border text-[8px] font-bold uppercase tracking-[0.3em] ${darkMode ? "border-violet-500/30 text-violet-400" : "border-stone-200 text-stone-500"}`}
            >
              Comunidad Joven
            </div>
            <h1
              className={`text-6xl lg:text-7xl font-serif italic leading-none ${darkMode ? "text-white" : "text-stone-900"}`}
            >
              Generación <br />{" "}
              <span className="text-violet-500">Emergente.</span>
            </h1>
            <p
              className={`text-sm font-light max-w-sm mx-auto leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"}`}
            >
              No somos el futuro, somos el presente. Un espacio real para
              jóvenes.
            </p>
          </div>
        </section>

        {/* INFO CLAVE: HORARIO Y LUGAR - Estilo "Pass/Ticket" */}
        <section className="max-w-4xl mx-auto">
          <div
            className={`p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-around gap-8 border ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-stone-50 border-stone-100"}`}
          >
            <div className="flex items-center gap-4">
              <Calendar className="text-violet-500" size={24} />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">
                  Todos los
                </p>
                <p
                  className={`text-lg font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}
                >
                  Sábados
                </p>
              </div>
            </div>
            <div className="w-[1px] h-12 bg-stone-800 hidden md:block" />
            <div className="flex items-center gap-4">
              <Clock className="text-violet-500" size={24} />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">
                  Horario
                </p>
                <p
                  className={`text-lg font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}
                >
                  7:30 PM — 9:30 PM
                </p>
              </div>
            </div>
            <div className="w-[1px] h-12 bg-stone-800 hidden md:block" />
            <div className="flex items-center gap-4">
              <Users2 className="text-violet-500" size={24} />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">
                  Edad
                </p>
                <p
                  className={`text-lg font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}
                >
                  Jóvenes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LO QUE VIVIMOS - Grid de Experiencias */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tarjeta 1: Young Alabanza */}
          <div
            className={`p-8 rounded-[2rem] space-y-4 transition-all duration-500 hover:scale-[1.02] ${darkMode ? "bg-[#161616]" : "bg-white border border-stone-100 shadow-sm"}`}
          >
            <Music className="text-violet-400" size={24} />
            <h3
              className={`font-serif italic text-2xl ${darkMode ? "text-stone-100" : "text-stone-900"}`}
            >
              Young Alabanza
            </h3>
            <p
              className={`text-[11px] uppercase tracking-wider font-medium leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"}`}
            >
              Música que conecta con nuestra generación, vibrando en la misma
              frecuencia.
            </p>
          </div>

          {/* Tarjeta 2: Conexión */}
          <div
            className={`p-8 rounded-[2rem] space-y-4 transition-all duration-500 hover:scale-[1.02] ${darkMode ? "bg-[#161616]" : "bg-white border border-stone-100 shadow-sm"}`}
          >
            <Gamepad2 className="text-emerald-400" size={24} />
            <h3
              className={`font-serif italic text-2xl ${darkMode ? "text-stone-100" : "text-stone-900"}`}
            >
              Conexión
            </h3>
            <p
              className={`text-[11px] uppercase tracking-wider font-medium leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"}`}
            >
              Tiempos de juegos y compartir donde las amistades reales se
              forman.
            </p>
          </div>

          {/* Tarjeta 3: Temas Reales */}
          <div
            className={`p-8 rounded-[2rem] space-y-4 transition-all duration-500 hover:scale-[1.02] ${darkMode ? "bg-[#161616]" : "bg-white border border-stone-100 shadow-sm"}`}
          >
            <Compass className="text-amber-400" size={24} />
            <h3
              className={`font-serif italic text-2xl ${darkMode ? "text-stone-100" : "text-stone-900"}`}
            >
              Temas Reales
            </h3>
            <p
              className={`text-[11px] uppercase tracking-wider font-medium leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"}`}
            >
              Abordamos los desafíos del mundo actual desde una perspectiva
              bíblica y práctica.
            </p>
          </div>

          {/* Tarjeta 4: Charla Abierta */}
          <div
            className={`p-8 rounded-[2rem] space-y-4 transition-all duration-500 hover:scale-[1.02] ${darkMode ? "bg-[#161616]" : "bg-white border border-stone-100 shadow-sm"}`}
          >
            <MessageCircle className="text-blue-400" size={24} />
            <h3
              className={`font-serif italic text-2xl ${darkMode ? "text-stone-100" : "text-stone-900"}`}
            >
              Charla Abierta
            </h3>
            <p
              className={`text-[11px] uppercase tracking-wider font-medium leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"}`}
            >
              Un lugar seguro para preguntar, debatir y crecer sin etiquetas.
            </p>
          </div>
        </div>

        {/* SECCIÓN "EMERGENTE" - Visual Impact */}
        <section className="max-w-6xl mx-auto">
          <div className="relative rounded-[3.5rem] overflow-hidden group border border-stone-800 isolate">
            {" "}
            {/* Agregado isolate para manejar capas */}
            <div className="aspect-[21/9] relative">
              <img
                src="/ministerios/index/jovenes.jpg"
                alt="Jóvenes compartiendo"
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out
          /* Estado inicial: Oscuro y con ligero zoom out */
          opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
              />

              {/* Gradiente de fondo: Se desvanece en hover para revelar la foto completa */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent transition-opacity duration-1000 group-hover:opacity-0" />

              {/* Contenido de texto: Aseguramos contraste siempre */}
              <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-16 space-y-4 z-10">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-violet-500 fill-violet-500" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">
                    Impacto Real
                  </span>
                </div>
                <h3 className="text-white text-3xl lg:text-4xl font-serif italic max-w-xl transition-all duration-500 group-hover:drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  Encontrando respuestas eternas a preguntas actuales.
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* MENSAJE FINAL */}
        <section className="text-center py-10 max-w-xl mx-auto">
          <p
            className={`text-xl font-serif italic ${darkMode ? "text-stone-300" : "text-stone-600"}`}
          >
            "Que nadie te menosprecie por ser joven..."
          </p>
          <p className="text-[9px] uppercase tracking-widest text-stone-500 mt-4">
            1 Timoteo 4:12
          </p>
        </section>
      </main>
    </div>
  );
}
