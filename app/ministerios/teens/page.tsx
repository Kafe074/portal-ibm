"use client";
import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";
import { 
  ArrowLeft, 
  Rocket, 
  BrainCircuit, 
  Flame, 
  Smile, 
  Users,
  Target,
  Zap
} from "lucide-react";

export default function AdolescentesPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#0a0a0a]" : "bg-[#fafafa]"}`}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 p-6 lg:p-10 space-y-10 overflow-y-auto scrollbar-hide">
        
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] transition-all
            ${darkMode ? "text-stone-600 hover:text-stone-200" : "text-stone-400 hover:text-stone-900"}`}
        >
          <ArrowLeft size={12} />
          Volver al Inicio
        </Link>

        {/* HERO - Estilo "Poster" */}
        <section className="relative py-12 flex flex-col items-center text-center">
          <div className="z-10 space-y-2">
            <h2 className={`text-[10px] font-black uppercase tracking-[0.5em] px-4 py-1 rounded-lg ${darkMode ? "bg-lime-500 text-black" : "bg-stone-900 text-white"}`}>
              Explosión Juvenil
            </h2>
            <h1 className={`text-6xl lg:text-8xl font-serif italic leading-none ${darkMode ? "text-stone-100" : "text-stone-900"}`}>
              Sin Límites.
            </h1>
            <p className={`text-sm font-light tracking-wide max-w-xs mx-auto ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
              Donde tus preguntas encuentran respuestas y tu energía encuentra un propósito.
            </p>
          </div>
        </section>

        {/* GRID DE ENFOQUE - Más visual y con "Cards" dinámicas */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Identidad */}
          <div className={`group p-10 rounded-[3rem] border-2 transition-all duration-500 ${darkMode ? "border-stone-800 hover:border-lime-500 bg-[#121212]" : "border-stone-100 hover:border-stone-900 bg-white"}`}>
            <BrainCircuit size={32} className={`${darkMode ? "text-lime-500" : "text-stone-900"} mb-6 group-hover:scale-110 transition-transform`} />
            <h3 className="text-3xl font-serif italic mb-4">¿Quién soy?</h3>
            <p className="text-sm font-light text-stone-500 leading-relaxed">
              No dejes que el mundo te defina. Descubrimos juntos nuestra identidad real basada en lo que Dios dice de nosotros, no en los likes.
            </p>
          </div>

          {/* Card 2: Acción */}
          <div className={`group p-10 rounded-[3rem] border-2 transition-all duration-500 ${darkMode ? "border-stone-800 hover:border-orange-500 bg-[#121212]" : "border-stone-100 hover:border-stone-900 bg-white"}`}>
            <Rocket size={32} className={`${darkMode ? "text-orange-500" : "text-stone-900"} mb-6 group-hover:scale-110 transition-transform`} />
            <h3 className="text-3xl font-serif italic mb-4">Despegue</h3>
            <p className="text-sm font-light text-stone-500 leading-relaxed">
              Tiempos de juegos extremos, salidas y dinámicas que te sacarán de la rutina. Aquí la fe se vive con adrenalina.
            </p>
          </div>
        </div>

        {/* BANNER CENTRAL - "THE VIBE" */}
        <section className="max-w-6xl mx-auto relative h-[300px] rounded-[3.5rem] overflow-hidden group">
          <img 
            src="/ministerios/index/teens.jpg" 
            className="w-full h-full object-cover grayscale brightness-50 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
            alt="Adolescentes comunidad"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <Flame size={40} className="text-orange-500 mb-4 animate-pulse" />
            <h4 className="text-white text-4xl lg:text-5xl font-serif italic">Tu lugar, tus reglas, Tu Dios.</h4>
          </div>
        </section>

        {/* METODOLOGÍA - Íconos y texto corto */}
        <section className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          <div className="text-center space-y-2">
            <Smile className="mx-auto text-stone-400" size={20} />
            <span className="block text-[9px] font-bold uppercase tracking-widest text-stone-500">Amistad Real</span>
          </div>
          <div className="text-center space-y-2">
            <Target className="mx-auto text-stone-400" size={20} />
            <span className="block text-[9px] font-bold uppercase tracking-widest text-stone-500">Metas Claras</span>
          </div>
          <div className="text-center space-y-2">
            <Users className="mx-auto text-stone-400" size={20} />
            <span className="block text-[9px] font-bold uppercase tracking-widest text-stone-500">Cero Juicios</span>
          </div>
          <div className="text-center space-y-2">
            <Zap className="mx-auto text-stone-400" size={20} />
            <span className="block text-[9px] font-bold uppercase tracking-widest text-stone-500">Pura Energía</span>
          </div>
        </section>

        {/* FOOTER FINAL */}
        <section className="text-center pb-12 border-t border-stone-100 dark:border-stone-900 pt-10">
          <p className={`text-2xl font-serif italic ${darkMode ? "text-stone-400" : "text-stone-500"}`}>
            "Crear. Creer. Crecer."
          </p>
        </section>

      </main>
    </div>
  );
}