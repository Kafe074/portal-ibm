"use client";
import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useContacto, abrirWhatsApp } from "@/hooks/useContacto";
import {
  ArrowLeft,
  Rocket,
  BrainCircuit,
  Flame,
  Smile,
  Users,
  Target,
  Zap,
  Calendar,
  Clock,
  MessageCircle,
  Camera,
} from "lucide-react";

const galeria = [
  "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto,w_600/iglesia-portal/ministerios/index/teens",
  "https://res.cloudinary.com/dv5j3lyph/image/upload/v1784226710/WhatsApp_Image_2026-07-16_at_1.29.51_PM_nlfs2l.jpg",
  "https://res.cloudinary.com/dv5j3lyph/image/upload/v1784226712/WhatsApp_Image_2026-07-16_at_1.27.20_PM_rgc7sp.jpg",
];

export default function AdolescentesPage() {
  const [darkMode, setDarkMode] = useDarkMode();
  const contacto = useContacto("teens");
  const [fotoRevelada, setFotoRevelada] = useState(false);

  return (
    <div className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#0a0a0a]" : "bg-[#fafafa]"}`}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 p-6 lg:p-10 space-y-12 overflow-y-auto scrollbar-hide pt-20 lg:pt-10">
        <Link
          href="/#ministerios"
          className={`inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] transition-all
            ${darkMode ? "text-stone-600 hover:text-stone-200" : "text-stone-400 hover:text-stone-900"}`}
        >
          <ArrowLeft size={12} />
          Volver al Inicio
        </Link>

        {/* HERO */}
        <section className="relative py-12 flex flex-col items-center text-center">
          <div className="z-10 space-y-4">
            <h2 className={`text-[10px] font-black uppercase tracking-[0.5em] px-4 py-1.5 rounded-full inline-block ${darkMode ? "bg-lime-500 text-black" : "bg-lime-500 text-black"}`}>
              Explosión Juvenil
            </h2>
            <h1 className={`text-6xl lg:text-8xl font-serif italic leading-none tracking-tighter ${darkMode ? "text-stone-100" : "text-stone-900"}`}>
              Sin <br />
              <span className="text-lime-500">Límites.</span>
            </h1>
            <p className={`text-sm font-light tracking-wide max-w-xs mx-auto ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
              Donde tus preguntas encuentran respuestas y tu energía encuentra un propósito.
            </p>
          </div>
        </section>

        {/* TARJETA DE HORARIO */}
        <section className="max-w-4xl mx-auto">
          <div className={`p-6 md:p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-around gap-8 border ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-stone-50 border-stone-100"}`}>
            <div className="flex items-center gap-4">
              <Calendar className="text-lime-500" size={24} />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">Todos los</p>
                <p className={`text-lg font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}>Sábados</p>
              </div>
            </div>
            <div className="w-full md:w-[1px] h-[1px] md:h-12 bg-stone-200 dark:bg-stone-800" />
            <div className="flex items-center gap-4">
              <Clock className="text-lime-500" size={24} />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">Horario</p>
                <p className={`text-lg font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}>7:00 PM — 9:00 PM</p>
              </div>
            </div>
            <div className="w-full md:w-[1px] h-[1px] md:h-12 bg-stone-200 dark:bg-stone-800" />
            <div className="flex items-center gap-4">
              <Users className="text-lime-500" size={24} />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">Edad</p>
                <p className={`text-lg font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}>12 — 15 Años</p>
              </div>
            </div>
          </div>
        </section>

        {/* TARJETAS DE ENFOQUE */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`group p-6 md:p-10 rounded-[3rem] border-2 transition-all duration-500 ${darkMode ? "border-stone-800 hover:border-lime-500 bg-[#121212]" : "border-stone-100 hover:border-lime-400 bg-white shadow-sm"}`}>
            <BrainCircuit size={32} className={`${darkMode ? "text-lime-500" : "text-lime-600"} mb-6 group-hover:scale-110 transition-transform`} />
            <h3 className={`text-3xl font-serif italic mb-4 ${darkMode ? "text-stone-100" : "text-stone-900"}`}>¿Quién soy?</h3>
            <p className="text-sm font-light text-stone-500 leading-relaxed">
              No dejes que el mundo te defina. Descubrimos juntos nuestra identidad real basada en lo que Dios dice de nosotros, no en los likes.
            </p>
          </div>
          <div className={`group p-6 md:p-10 rounded-[3rem] border-2 transition-all duration-500 ${darkMode ? "border-stone-800 hover:border-orange-500 bg-[#121212]" : "border-stone-100 hover:border-orange-400 bg-white shadow-sm"}`}>
            <Rocket size={32} className={`${darkMode ? "text-orange-500" : "text-orange-500"} mb-6 group-hover:scale-110 transition-transform`} />
            <h3 className={`text-3xl font-serif italic mb-4 ${darkMode ? "text-stone-100" : "text-stone-900"}`}>Despegue</h3>
            <p className="text-sm font-light text-stone-500 leading-relaxed">
              Tiempos de juegos extremos, salidas y dinámicas que te sacarán de la rutina. Aquí la fe se vive con adrenalina.
            </p>
          </div>
        </div>

        {/* BANNER - toca para revelar foto */}
        <section
          onClick={() => setFotoRevelada(!fotoRevelada)}
          className="max-w-6xl mx-auto relative h-[280px] md:h-[360px] rounded-[3.5rem] overflow-hidden cursor-pointer select-none"
        >
          <img
            src="https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto,w_1000/iglesia-portal/ministerios/index/teens"
            className={`w-full h-full object-cover transition-all duration-700 ${fotoRevelada ? "grayscale-0 brightness-100 scale-105" : "grayscale brightness-50"}`}
            alt="Adolescentes comunidad"
          />
          <div className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-opacity duration-500 ${fotoRevelada ? "opacity-0" : "opacity-100"}`}>
            <Flame size={40} className="text-lime-400 mb-4 animate-pulse" />
            <h4 className="text-white text-3xl md:text-5xl font-serif italic">Tu lugar, tus reglas, Tu Dios.</h4>
          </div>
          <div className={`absolute bottom-4 right-6 transition-opacity duration-500 ${fotoRevelada ? "opacity-100" : "opacity-0"}`}>
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">Toca para volver</span>
          </div>
          {!fotoRevelada && (
            <div className="absolute bottom-4 left-6">
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Toca para ver la foto</span>
            </div>
          )}
        </section>

        {/* METODOLOGÍA */}
        <section className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          {[
            { icon: Smile, label: "Amistad Real" },
            { icon: Target, label: "Metas Claras" },
            { icon: Users, label: "Cero Juicios" },
            { icon: Zap, label: "Pura Energía" },
          ].map((item, i) => (
            <div key={i} className="text-center space-y-2">
              <item.icon className="mx-auto text-stone-400" size={20} />
              <span className="block text-[9px] font-bold uppercase tracking-widest text-stone-500">{item.label}</span>
            </div>
          ))}
        </section>

        {/* GALERÍA */}
        <section className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <Camera size={16} className="text-lime-500" />
            <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-stone-400" : "text-stone-500"}`}>Nuestros momentos</span>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {galeria.map((img, i) => (
              <div key={i} className={`rounded-[1.5rem] md:rounded-[2rem] overflow-hidden aspect-square ${i === 0 ? "row-span-2 aspect-auto" : ""}`}>
                <img src={img} alt={`Foto ${i + 1}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className={`max-w-4xl mx-auto p-8 md:p-12 rounded-[3rem] text-center space-y-6 border ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-white border-stone-100 shadow-xl"}`}>
          <h3 className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>
            ¿Listo para ser <span className="text-lime-500">parte</span>?
          </h3>
          <p className={`text-sm font-light max-w-sm mx-auto ${darkMode ? "text-stone-400" : "text-stone-500"}`}>
            Escríbenos y te contamos todo sobre los Sábados de Adolescentes.
          </p>
          <button
            onClick={() => abrirWhatsApp(contacto)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-lime-500 text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-lime-400 transition-all shadow-lg shadow-lime-500/20"
          >
            <MessageCircle size={16} />
            Quiero venir este Sábado
          </button>
        </section>

        {/* FOOTER QUOTE */}
        <section className="text-center pb-12 border-t border-stone-100 dark:border-stone-900 pt-10">
          <p className={`text-2xl font-serif italic ${darkMode ? "text-stone-400" : "text-stone-500"}`}>
            "Crear. Creer. Crecer."
          </p>
        </section>
      </main>
    </div>
  );
}
