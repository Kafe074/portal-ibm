"use client";
import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";
import {
  ArrowLeft,
  Heart,
  Cake,
  DoorOpen,
  Coffee,
  Gift,
  UserPlus,
  Quote,
  Sparkles,
} from "lucide-react";

export default function ServirPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#121212]" : "bg-[#fcfaf7]"}`}
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

        {/* HERO - Cálido y Familiar */}
        <section className="relative py-12 flex flex-col items-center text-center">
          <div className="z-10 space-y-4">
            <h2
              className={`text-[9px] font-bold uppercase tracking-[0.4em] ${darkMode ? "text-amber-600/60" : "text-stone-400"}`}
            >
              Ministerio de Servir
            </h2>
            <h1
              className={`text-5xl lg:text-6xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}
            >
              Bienvenido a <br /> nuestra familia.
            </h1>
            <p
              className={`text-sm font-light max-w-sm mx-auto leading-relaxed ${darkMode ? "text-stone-500" : "text-stone-400"}`}
            >
              Nuestra misión es simple: que nadie se sienta extraño y que todos
              se sientan en casa.
            </p>
          </div>
        </section>

        {/* PILARES DE SERVICIO - Diseño Suave */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className={`p-8 rounded-[3rem] space-y-4 text-center transition-all ${darkMode ? "bg-stone-900/40" : "bg-white shadow-sm"}`}
          >
            <DoorOpen size={28} className="mx-auto text-amber-500" />
            <h3 className="font-serif italic text-2xl">Acogida</h3>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Una sonrisa y un abrazo al llegar pueden cambiar el día de
              cualquier persona.
            </p>
          </div>
          <div
            className={`p-8 rounded-[3rem] space-y-4 text-center transition-all ${darkMode ? "bg-stone-900/40" : "bg-white shadow-sm"}`}
          >
            <Cake size={28} className="mx-auto text-rose-400" />
            <h3 className="font-serif italic text-2xl">Celebración</h3>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Honramos la vida de cada hermano celebrando sus cumpleaños dentro
              de nuestra familia.
            </p>
          </div>
          <div
            className={`p-8 rounded-[3rem] space-y-4 text-center transition-all ${darkMode ? "bg-stone-900/40" : "bg-white shadow-sm"}`}
          >
            <UserPlus size={28} className="mx-auto text-emerald-500" />
            <h3 className="font-serif italic text-2xl">Nuevos Amigos</h3>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Acompañamos a quienes nos visitan por primera vez para que se
              sientan parte desde el minuto uno.
            </p>
          </div>
        </div>

        {/* SECCIÓN "ESTÁS EN CASA" - Imagen con mensaje */}
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-amber-600">
                <Heart size={14} className="fill-amber-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Servicio con amor
                </span>
              </div>
              <h3
                className={`text-4xl font-serif italic leading-tight ${darkMode ? "text-stone-200" : "text-stone-800"}`}
              >
                Más que un equipo, <br /> somos anfitriones.
              </h3>
              <p
                className={`text-sm font-light leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"}`}
              >
                En el ministerio de servir, entendemos que los detalles
                importan. Desde un café caliente hasta recordar un nombre, cada
                gesto está diseñado para reflejar el amor de Dios.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-3">
                  <Coffee size={18} className="text-stone-400 shrink-0" />
                  <p className="text-[11px] text-stone-500 italic">
                    Hospitalidad constante en cada reunión.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Gift size={18} className="text-stone-400 shrink-0" />
                  <p className="text-[11px] text-stone-500 italic">
                    Atención especial en fechas importantes.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 rounded-[3.5rem] overflow-hidden aspect-square lg:aspect-video shadow-2xl shadow-stone-200 dark:shadow-none">
              <img
                src="/ministerios/servir-bienvenida.jpg"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                alt="Hospitalidad"
              />
            </div>
          </div>
        </section>

        {/* CITA FINAL */}
        <section className="text-center py-12 border-t border-stone-100 dark:border-stone-800/50 max-w-2xl mx-auto">
          <Sparkles size={20} className="mx-auto text-amber-400 mb-6" />
          <p
            className={`text-xl font-serif italic ${darkMode ? "text-stone-400" : "text-stone-500"}`}
          >
            "No os olvidéis de la hospitalidad, porque por ella algunos, sin
            saberlo, hospedaron ángeles."
          </p>
          <p className="text-[9px] uppercase tracking-widest text-stone-400 mt-4">
            Hebreos 13:2
          </p>
        </section>
      </main>
    </div>
  );
}
