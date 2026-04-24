"use client";
import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";
import {
  Music,
  ArrowLeft,
  Sparkles,
  Mic2,
  Disc,
  Zap,
  Heart,
  Star,
  ShieldCheck,
  Clock, // Añadido para los horarios
} from "lucide-react";

export default function AlabanzaPage() {
  const [darkMode, setDarkMode] = useState(false);

  const bandas = [
    {
      id: "general",
      titulo: "Alabanza General",
      subtitulo: "Esencia y Tradición",
      descripcion:
        "Nuestra banda principal dedicada a liderar la congregación en cada servicio dominical con alabanzas y adoraciones a Dios.",
      color: "from-blue-600/20 to-emerald-600/20",
      acento: "text-emerald-500",
      icon: Music,
      imagen: "/ministerios/alabanza/alabanza-general.jpg",
    },
    {
      id: "young",
      titulo: "Alabanza Young",
      subtitulo: "Energía y Pasión",
      descripcion:
        "El sonido de las nuevas generaciones. Un equipo dinámico enfocado en conectar con los jóvenes a través de ritmos modernos y una atmósfera vibrante.",
      color: "from-purple-600/20 to-pink-600/20",
      acento: "text-purple-500",
      icon: Zap,
      imagen: "/ministerios/alabanza-young.jpg",
    },
  ];

  const valoresExclencia = [
    {
      titulo: "Preparación Técnica",
      desc: "Ensayos rigurosos y formación musical continua.",
      icon: Star,
    },
    {
      titulo: "Vida Espiritual",
      desc: "La adoración nace de una relación diaria con Dios.",
      icon: Heart,
    },
    {
      titulo: "Compromiso",
      desc: "Excelencia y puntualidad en cada tiempo de adoración.",
      icon: ShieldCheck,
    },
  ];

  // Nueva data para los horarios
  const horarios = [
    {
      banda: "Alabanza General",
      dia: "Viernes",
      hora: "7:00 PM - 9:00 PM",
      color: "text-emerald-500",
    },
    {
      banda: "Alabanza Young",
      dia: "Viernes",
      hora: "6:30 PM - 8:30 PM",
      color: "text-purple-500",
    },
  ];

  return (
    <div
      className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#121212]" : "bg-white"}`}
    >
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 p-10 space-y-20 overflow-y-auto scrollbar-hide">
        {/* NAVEGACIÓN */}
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] transition-all
            ${darkMode ? "text-stone-500 hover:text-stone-200" : "text-stone-400 hover:text-stone-900"}`}
        >
          <ArrowLeft size={14} />
          Volver al Inicio
        </Link>

        {/* ENCABEZADO TIPO REPORTAJE */}
        <div className="flex flex-col lg:flex-row gap-12 items-end">
          <div className="flex-1 space-y-4">
            <h2
              className={`text-[10px] font-bold uppercase tracking-[0.4em] ${darkMode ? "text-emerald-500/80" : "text-emerald-600"}`}
            >
              Ministerio de Alabanza
            </h2>
            <h1
              className={`text-7xl font-serif italic leading-tight ${darkMode ? "text-stone-100" : "text-stone-900"}`}
            >
              Adoración en <br /> Espíritu y Verdad
            </h1>
          </div>
          <div
            className={`flex-1 text-sm font-light leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"} max-w-md`}
          >
            Contamos con dos equipos dedicados a elevar nuestra adoración, cada
            uno con una identidad propia pero unidos bajo el mismo propósito:
            exaltar a Dios con excelencia.
          </div>
        </div>

        {/* SECCIÓN DE LAS DOS BANDAS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {bandas.map((banda) => (
            <div key={banda.id} className="group relative">
              <div
                className={`h-[600px] rounded-[3.5rem] overflow-hidden border relative transition-all duration-700
                ${darkMode ? "border-stone-800 grayscale-[0.2] hover:grayscale-0" : "border-stone-100 shadow-2xl shadow-stone-200/50"}`}
              >
                <img
                  src={banda.imagen}
                  alt={banda.titulo}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-b ${banda.color} opacity-40 group-hover:opacity-60 transition-opacity`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-12 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 mb-2">
                    <banda.icon size={22} />
                  </div>

                  <div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-[0.3em] ${banda.acento}`}
                    >
                      {banda.subtitulo}
                    </span>
                    <h3 className="text-white text-5xl font-serif italic mt-1">
                      {banda.titulo}
                    </h3>
                  </div>

                  <p className="text-stone-300 text-sm font-light leading-relaxed max-w-sm opacity-80 italic">
                    "{banda.descripcion}"
                  </p>

                  <div className="pt-6 flex gap-6 border-t border-white/10 mt-4">
                    <div className="flex items-center gap-2">
                      <Disc size={14} className="text-stone-400" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-stone-300">
                        Servicio Dominical
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mic2 size={14} className="text-stone-400" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-stone-300">
                        
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* NUEVA SECCIÓN: HORARIOS DE ENSAYO */}
        <section
          className={`p-12 rounded-[3.5rem] border transition-all ${darkMode ? "bg-stone-900/20 border-stone-800/50" : "bg-[#fafaf9] border-stone-100"}`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-2">
              <h3
                className={`text-2xl font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}
              >
                Cronograma de Ensayos
              </h3>
              <p className="text-xs font-light text-stone-500 uppercase tracking-widest">
                Preparación técnica y espiritual
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full md:w-auto">
              {horarios.map((h, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center ${darkMode ? "bg-stone-800" : "bg-white shadow-sm"}`}
                  >
                    <Clock size={18} className={h.color} />
                  </div>
                  <div>
                    <p
                      className={`text-[10px] font-bold uppercase tracking-tighter ${darkMode ? "text-stone-300" : "text-stone-800"}`}
                    >
                      {h.banda}
                    </p>
                    <p className="text-sm font-light text-stone-500">
                      {h.dia} • {h.hora}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MANIFIESTO DE EXCELENCIA MEJORADO */}
        <section className="space-y-10 py-10">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-stone-200 dark:border-stone-800">
              <Sparkles size={12} className="text-emerald-500" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-500">
                Nuestro Estándar
              </span>
            </div>
            <h2
              className={`text-4xl font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}
            >
              Excelencia en cada nota
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valoresExclencia.map((valor, i) => (
              <div
                key={i}
                className={`p-10 rounded-[3rem] border text-center space-y-4 transition-all
                ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-[#fafaf9] border-stone-200 shadow-sm"}`}
              >
                <div
                  className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? "bg-stone-800" : "bg-white shadow-sm"}`}
                >
                  <valor.icon size={20} className="text-emerald-500" />
                </div>
                <h4
                  className={`text-xs font-bold uppercase tracking-widest ${darkMode ? "text-stone-200" : "text-stone-900"}`}
                >
                  {valor.titulo}
                </h4>
                <p className="text-[13px] font-light leading-relaxed text-stone-500">
                  {valor.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
