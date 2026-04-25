"use client";
import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";
import {
  ArrowLeft,
  Mic2,
  Video,
  Camera,
  Share2,
  MonitorPlay,
  Layers,
  Settings,
  Cpu,
} from "lucide-react";

// Componente para las tarjetas de especialidad (más técnicas)
const TechCard = ({ icon: Icon, title, desc, color, darkMode }: any) => (
  <div
    className={`p-6 rounded-3xl border transition-all duration-500 group ${
      darkMode
        ? "bg-[#1a1a1a] border-stone-800 hover:border-cyan-500/50 shadow-xl shadow-black/40"
        : "bg-white border-stone-100 hover:border-cyan-200 shadow-sm shadow-stone-200"
    }`}
  >
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 ${color} text-white group-hover:scale-110 group-hover:rotate-3`}
    >
      <Icon size={20} />
    </div>
    <h3
      className={`text-sm font-bold uppercase tracking-widest mb-2 ${darkMode ? "text-stone-200" : "text-stone-800"}`}
    >
      {title}
    </h3>
    <p
      className={`text-[12px] font-light leading-relaxed ${darkMode ? "text-stone-500" : "text-stone-400"}`}
    >
      {desc}
    </p>
  </div>
);

export default function ProduccionPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#0a0a0a]" : "bg-[#fcfcfc]"}`}
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

        {/* HERO: ESTILO "CONTROL ROOM" */}
        <section className="relative flex flex-col items-center text-center py-10">
          <div className="z-10 space-y-3">
            <div
              className={`flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.5em] mb-2 ${darkMode ? "text-cyan-500" : "text-cyan-600"}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              En Vivo
            </div>
            <h1
              className={`text-5xl lg:text-6xl font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}
            >
              Excelencia <br /> tras bambalinas.
            </h1>
            <p
              className={`text-xs uppercase tracking-[0.3em] font-light pt-4 ${darkMode ? "text-stone-500" : "text-stone-400"}`}
            >
              Audio • Proyección • Media • Redes
            </p>
          </div>
        </section>

        {/* ÁREAS DE PRODUCCIÓN: GRID COMPACTO */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TechCard
            icon={Mic2}
            title="Audio"
            desc="Captura y mezcla de sonido profesional para una experiencia auditiva impecable en cada servicio."
            color="bg-blue-600"
            darkMode={darkMode}
          />
          <TechCard
            icon={MonitorPlay}
            title="Proyección"
            desc="Gestión de visuales, letras y contenido multimedia que guía a la congregación en la adoración."
            color="bg-purple-600"
            darkMode={darkMode}
          />
          <TechCard
            icon={Camera}
            title="Fotografía"
            desc="Inmortalizando los momentos más significativos de nuestra comunidad y eventos especiales."
            color="bg-rose-600"
            darkMode={darkMode}
          />
          <a
            href="https://www.facebook.com/iddphyo"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform hover:scale-[1.02]"
          >
            <TechCard
              icon={Share2}
              title="Social Media"
              desc="Conectando con el mundo a través de Facebook y redes sociales, llevando el mensaje más allá."
              color="bg-cyan-600"
              darkMode={darkMode}
            />
          </a>
        </div>

        {/* SECCIÓN "EL EQUIPO" - ESTILO DARK/CINEMÁTICO */}
        <section className="max-w-6xl mx-auto">
          <div
            className={`relative rounded-[3rem] overflow-hidden group border ${darkMode ? "border-stone-800" : "border-stone-100"}`}
          >
            <div className="aspect-[21/9] relative">
              <img
                src="/ministerios/produccion/produccion.jpg"
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                alt="Backstage"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${darkMode ? "from-black via-black/40" : "from-stone-900/90 via-transparent"} to-transparent`}
              />

              <div className="absolute inset-0 flex flex-col justify-center p-12 lg:p-20 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-white text-3xl lg:text-4xl font-serif italic">
                    El arte de servir <br /> en silencio.
                  </h3>
                  <p className="text-stone-300 text-sm font-light max-w-md leading-relaxed">
                    Nuestro trabajo es invisible cuando es perfecto. Nos
                    esforzamos por eliminar distracciones para que el mensaje
                    sea el único protagonista.
                  </p>
                </div>

                <div className="flex gap-8 items-center pt-8">
                  {/* Excelencia en el detalle */}
                  <div className="flex flex-col group">
                    <span
                      className={`font-serif italic text-3xl transition-colors duration-500 ${
                        darkMode ? "text-cyan-400" : "text-cyan-600"
                      }`}
                    >
                      Excelencia
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-[0.2em] font-semibold mt-1 ${
                        darkMode ? "text-stone-400" : "text-stone-500"
                      }`}
                    >
                      En cada detalle visual
                    </span>
                  </div>

                  <div
                    className={`w-[1px] h-12 ${darkMode ? "bg-stone-700" : "bg-stone-200"}`}
                  />

                  {/* Compromiso constante */}
                  <div className="flex flex-col group">
                    <span
                      className={`font-serif italic text-3xl transition-colors duration-500 ${
                        darkMode ? "text-purple-400" : "text-purple-600"
                      }`}
                    >
                      Corazón
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-[0.2em] font-semibold mt-1 ${
                        darkMode ? "text-stone-400" : "text-stone-500"
                      }`}
                    >
                      Servicio voluntario
                    </span>
                  </div>

                  <div
                    className={`w-[1px] h-12 ${darkMode ? "bg-stone-700" : "bg-stone-200"}`}
                  />

                  {/* Enfoque sin distracciones */}
                  <div className="flex flex-col group">
                    <span
                      className={`font-serif italic text-3xl transition-colors duration-500 ${
                        darkMode ? "text-rose-400" : "text-rose-600"
                      }`}
                    >
                      Claridad
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-[0.2em] font-semibold mt-1 ${
                        darkMode ? "text-stone-400" : "text-stone-500"
                      }`}
                    >
                      Mensaje sin barreras
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESO CREATIVO - COMPACTO */}
        <section className="max-w-4xl mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-3">
              <Cpu size={20} className="mx-auto text-stone-400" />
              <h4
                className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-stone-200" : "text-stone-800"}`}
              >
                Hardware
              </h4>
              <p className="text-[11px] text-stone-500 font-light">
                Mantenimiento y setup de equipos de última generación.
              </p>
            </div>
            <div className="text-center space-y-3">
              <Layers size={20} className="mx-auto text-stone-400" />
              <h4
                className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-stone-200" : "text-stone-800"}`}
              >
                Post-Producción
              </h4>
              <p className="text-[11px] text-stone-500 font-light">
                Edición de video y diseño gráfico para redes sociales.
              </p>
            </div>
            <div className="text-center space-y-3">
              <Settings size={20} className="mx-auto text-stone-400" />
              <h4
                className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-stone-200" : "text-stone-800"}`}
              >
                Estrategia Digital
              </h4>
              <p className="text-[11px] text-stone-500 font-light">
                Planificación y despliegue de contenido optimizado para
                plataformas sociales.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
