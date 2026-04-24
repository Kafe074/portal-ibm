"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";
import {
  ArrowLeft,
  Quote,
  Sparkles,
  Heart,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Componente Carrusel optimizado
const Carousel = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="relative group w-full h-full">
      <div className="w-full h-full overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            alt={`Galería ${index}`}
          />
        ))}
      </div>

      {/* Controles del Carrusel */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all ${index === current ? "w-4 bg-white" : "w-1 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function ExperienciaClasesPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Data de imágenes (puedes añadir más a cada array)
  const fotosEstrellitas = [
    "/ministerios/escuela-dominical/estrellitas.jpg",
    "/ministerios/escuela-dominical/estrellitas_1.jpg",
    "/ministerios/escuela-dominical/estrellitas_2.jpg",
  ];
  const fotosCampeones = [
    "/ministerios/escuela-dominical/campeones.jpg",
    "/ministerios/escuela-dominical/campeones_2.jpg",
    "/ministerios/escuela-dominical/campeones_1.jpg",
  ];
  const fotosPreAdos = [
    "/ministerios/escuela-dominical/pre.jpg",
    "/ministerios/escuela-dominical/pre_1.jpg",
    "/ministerios/escuela-dominical/pre_2.jpg",
  ];

  return (
    <div
      className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#121212]" : "bg-white"}`}
    >
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto scrollbar-hide">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] transition-all
            ${darkMode ? "text-stone-600 hover:text-stone-200" : "text-stone-400 hover:text-stone-900"}`}
        >
          <ArrowLeft size={12} />
          Volver al Inicio
        </Link>

        {/* HERO COMPACTO */}
        <section className="relative py-6 flex flex-col items-center text-center">
          <div className="space-y-1 z-10">
            <h2
              className={`text-[8px] font-bold uppercase tracking-[0.4em] ${darkMode ? "text-amber-500/60" : "text-stone-400"}`}
            >
              Propósito Infantil
            </h2>
            <h1
              className={`text-4xl lg:text-5xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}
            >
              Pequeños pasos, gran fe.
            </h1>
          </div>
        </section>

        <div className="max-w-5xl mx-auto space-y-16">
          {/* NIVEL 1: ESTRELLITAS */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="aspect-video lg:aspect-[4/3] rounded-[2rem] overflow-hidden border border-stone-100 dark:border-stone-800 shadow-sm">
              <Carousel images={fotosEstrellitas} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-[1px] bg-amber-500" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500">
                  3 - 6 Años
                </span>
              </div>
              <h3
                className={`text-3xl font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}
              >
                Estrellitas
              </h3>
              <p
                className={`text-sm font-light leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"}`}
              >
                Un entorno cálido donde las historias bíblicas cobran vida
                mediante el juego y el asombro.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Heart size={12} className="text-amber-500" />
                <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400">
                  Ternura & Descubrimiento
                </span>
              </div>
            </div>
          </section>

          {/* NIVEL 2: CAMPEONES */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 space-y-3 lg:text-right">
              <div className="flex items-center gap-3 lg:justify-end">
                <span className="text-[9px] font-bold uppercase tracking-widest text-blue-500">
                  7 - 11 Años
                </span>
                <span className="w-6 h-[1px] bg-blue-500" />
              </div>
              <h3
                className={`text-3xl font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}
              >
                Campeones
              </h3>
              <p
                className={`text-sm font-light leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"}`}
              >
                Formamos el carácter enseñando que cada niño tiene una armadura
                espiritual y un propósito único.
              </p>
              <div className="flex items-center gap-2 lg:justify-end pt-1">
                <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400">
                  Carácter & Valentía
                </span>
                <Sparkles size={12} className="text-blue-500" />
              </div>
            </div>
            <div className="order-1 lg:order-2 aspect-video lg:aspect-[4/3] rounded-[2rem] overflow-hidden border border-stone-100 dark:border-stone-800 shadow-sm">
              <Carousel images={fotosCampeones} />
            </div>
          </section>

          {/* NIVEL 3: PRE-ADOLESCENTES */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="aspect-video lg:aspect-[4/3] rounded-[2rem] overflow-hidden border border-stone-100 dark:border-stone-800 shadow-sm">
              <Carousel images={fotosPreAdos} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-[1px] bg-emerald-500" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500">
                  12 - 15 Años
                </span>
              </div>
              <h3
                className={`text-3xl font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}
              >
                Pre-Adolescentes
              </h3>
              <p
                className={`text-sm font-light leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"}`}
              >
                Un círculo de confianza para fortalecer amistades y recordar que
                su identidad en Cristo es inquebrantable.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Zap size={12} className="text-emerald-500" />
                <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400">
                  Identidad & Conexión
                </span>
              </div>
            </div>
          </section>
        </div>

        <section className="text-center py-8 border-t border-stone-100 dark:border-stone-800/50 max-w-lg mx-auto">
          <p
            className={`text-base font-serif italic ${darkMode ? "text-stone-400" : "text-stone-500"}`}
          >
            "Sembrando hoy la sombra del mañana."
          </p>
        </section>
      </main>
    </div>
  );
}
