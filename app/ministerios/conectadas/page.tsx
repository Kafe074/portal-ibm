"use client";
import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";
import {
  ArrowLeft,
  Coffee,
  Users,
  BookOpen,
  Flower2,
  Sparkles,
  Quote,
  ChevronRight,
} from "lucide-react";

export default function ConectadasPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#121212]" : "bg-[#fdfbf9]"}`}
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

        {/* HERO - Elegante y Minimalista */}
        <section className="relative py-12 flex flex-col items-center text-center">
          <div className="z-10 space-y-4">
            <h2
              className={`text-[9px] font-bold uppercase tracking-[0.4em] ${darkMode ? "text-rose-400/60" : "text-stone-400"}`}
            >
              Ministerio de Mujeres
            </h2>
            <h1
              className={`text-5xl lg:text-6xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}
            >
              Conectadas en <br /> Gracia y Propósito.
            </h1>
            <p
              className={`text-sm font-light italic max-w-md mx-auto ${darkMode ? "text-stone-500" : "text-stone-500"}`}
            >
              Un espacio diseñado para florecer juntas, fortaleciendo nuestra
              identidad y fe.
            </p>
          </div>
        </section>

        {/* VALORES / PILARES - Estilo Limpio */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-3 p-6">
            <Coffee size={24} className="mx-auto text-rose-300" />
            <h3
              className={`text-xs font-bold uppercase tracking-widest ${darkMode ? "text-stone-200" : "text-stone-800"}`}
            >
              Comunión
            </h3>
            <p className="text-[12px] font-light leading-relaxed text-stone-500">
              Espacios de comunión y charla donde compartimos la vida con
              sinceridad.
            </p>
          </div>
          <div className="text-center space-y-3 p-6 border-x border-stone-100 dark:border-stone-800">
            <BookOpen size={24} className="mx-auto text-rose-300" />
            <h3
              className={`text-xs font-bold uppercase tracking-widest ${darkMode ? "text-stone-200" : "text-stone-800"}`}
            >
              Palabra
            </h3>
            <p className="text-[12px] font-light leading-relaxed text-stone-500">
              Estudios profundos que nos equipan para los retos de la mujer hoy.
            </p>
          </div>
          <div className="text-center space-y-3 p-6">
            <Flower2 size={24} className="mx-auto text-rose-300" />
            <h3
              className={`text-xs font-bold uppercase tracking-widest ${darkMode ? "text-stone-200" : "text-stone-800"}`}
            >
              Crecimiento
            </h3>
            <p className="text-[12px] font-light leading-relaxed text-stone-500">
              Talleres y encuentros enfocados en nuestro desarrollo integral.
            </p>
          </div>
        </div>

        {/* SECCIÓN DE ACTIVIDADES - Diseño de "Revista" */}
        <section className="max-w-6xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 rounded-[3rem] overflow-hidden aspect-[16/9] shadow-sm">
              <img
                src="/ministerios/index/conectadas.jpg"
                className="w-full h-full object-cover"
                alt="Encuentro de hermanas"
              />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">
                   Actividades
                </span>
                <h3
                  className={`text-3xl font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}
                >
                  Reuniones semanales
                </h3>
                <p className="text-sm font-light text-stone-500 leading-relaxed italic">
                  "No es solo una reunión, es un momento para detenernos,
                  escucharnos y orar unas por otras en un ambiente de paz."
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-[11px] text-stone-400 uppercase tracking-widest border-b border-stone-100 dark:border-stone-800 pb-2">
                  <ChevronRight size={14} /> Reuniones Mensuales
                </li>
                <li className="flex items-center gap-3 text-[11px] text-stone-400 uppercase tracking-widest border-b border-stone-100 dark:border-stone-800 pb-2">
                  <ChevronRight size={14} /> Grupos de Discipulado
                </li>
                <li className="flex items-center gap-3 text-[11px] text-stone-400 uppercase tracking-widest pb-2">
                  <ChevronRight size={14} /> Tiempos de Evangelismo
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* MENTORÍA / CORAZÓN DEL MINISTERIO */}
        <section
          className={`max-w-4xl mx-auto p-12 rounded-[3rem] text-center space-y-6 ${darkMode ? "bg-stone-900/50" : "bg-rose-50/50"}`}
        >
          <Sparkles size={20} className="mx-auto text-rose-300" />
          <h3
            className={`text-2xl font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}
          >
            Acompañarnos es nuestra esencia.
          </h3>
          <p
            className={`text-sm font-light leading-relaxed max-w-xl mx-auto ${darkMode ? "text-stone-400" : "text-stone-500"}`}
          >
            Creemos que ninguna mujer debe caminar sola. Conectadas nace para
            ser ese refugio donde las hermanas mayores guían a las más jóvenes,
            y donde todas encontramos un lugar de pertenencia.
          </p>
          <div className="flex justify-center gap-10 pt-4">
            <div className="text-center">
              <p className="text-2xl font-serif italic text-rose-400">Sabados</p>
              <p className="text-[8px] uppercase tracking-widest text-stone-400 font-bold">
                Reuniones
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-serif italic text-rose-400">
                semanales
              </p>
              <p className="text-[8px] uppercase tracking-widest text-stone-400 font-bold">
                Encuentros Generales
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER QUOTE */}
        <section className="text-center py-10 max-w-xl mx-auto">
          <Quote size={20} className="mx-auto text-rose-200 mb-6" />
          <p
            className={`text-lg font-serif italic ${darkMode ? "text-stone-400" : "text-stone-500"}`}
          >
            "Mujer virtuosa, ¿quién la hallará? Porque su estima sobrepasa
            largamente a la de las piedras preciosas."
          </p>
        </section>
      </main>
    </div>
  );
}
