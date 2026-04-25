"use client";
import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";
import {
  Utensils,
  ArrowLeft,
  Heart,
  Clock,
  MapPin,
  CalendarDays,
  Users,
  DollarSign,
} from "lucide-react";

export default function ComedorPopularPage() {
  const [darkMode, setDarkMode] = useState(false);

  const estadisticas = [
    { label: "Raciones Diarias", valor: "150+", icon: Utensils },
    { label: "Costo", valor: "S/.4", icon: DollarSign },
    { label: "Días de Servicio", valor: "Lun - Vie", icon: CalendarDays },
  ];

  return (
    <div
      className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#121212]" : "bg-white"}`}
    >
      {/* 1. SIDEBAR GLOBAL */}
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-10 space-y-12 overflow-y-auto scrollbar-hide">
        {/* BOTÓN VOLVER A ACCIÓN SOCIAL */}
        <Link
          href="/ministerios/accion-social"
          className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] transition-all
            ${darkMode ? "text-stone-500 hover:text-stone-200" : "text-stone-400 hover:text-stone-900"}`}
        >
          <ArrowLeft size={14} />
          Volver a Acción Social
        </Link>

        {/* ENCABEZADO TIPO REPORTAJE */}
        <div className="flex flex-col lg:flex-row gap-12 items-end">
          <div className="flex-1 space-y-4">
            <h2
              className={`text-[10px] font-bold uppercase tracking-[0.4em] ${darkMode ? "text-amber-500/80" : "text-amber-600"}`}
            >
              Seguridad Alimentaria
            </h2>
            <h1
              className={`text-6xl font-serif italic leading-tight ${darkMode ? "text-stone-100" : "text-stone-900"}`}
            >
              Comedor Popular <br /> Misericordia
            </h1>
          </div>
          <div
            className={`flex-1 text-sm font-light leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"} max-w-md`}
          >
            Nuestra misión es asegurar que ninguna familia de nuestro entorno
            sufra de hambre. Proporcionamos almuerzos equilibrados y un espacio
            de comunidad y esperanza.
          </div>
        </div>

        {/* GRID DE ESTADÍSTICAS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {estadisticas.map((stat, i) => (
            <div
              key={i}
              className={`p-8 rounded-[2.5rem] border transition-all 
              ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-[#fafaf9] border-stone-200 shadow-sm"}`}
            >
              <stat.icon size={20} className="text-amber-600 mb-4" />
              <div
                className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}
              >
                {stat.valor}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* SECCIÓN IMAGEN Y DETALLES */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div
            className={`lg:col-span-8 rounded-[3rem] overflow-hidden min-h-[400px] border relative
            ${darkMode ? "border-stone-800 grayscale-[0.3]" : "border-stone-100 shadow-2xl shadow-stone-200/50"}`}
          >
            <img
              src="https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto,w_800/iglesia-portal/ministerios/accion-social/comedor"
              alt="Voluntarios sirviendo comida en el Comedor Misericordia"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
              <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-2">
                Nuestro Comedor
              </span>
              <h3 className="text-white text-3xl font-serif italic">
                Comprometidos con el bienestar de los más vulnerables.
              </h3>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div
              className={`p-8 rounded-[2.5rem] border ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-[#fafaf9] border-stone-200"}`}
            >
              <h4
                className={`text-xs font-bold uppercase tracking-widest mb-6 ${darkMode ? "text-stone-200" : "text-stone-900"}`}
              >
                Información de Servicio
              </h4>
              <div className="space-y-6">
                <div className="flex gap-4 items-center">
                  <Clock size={18} className="text-amber-600" />
                  <div>
                    <p
                      className={`text-xs font-bold uppercase tracking-tighter ${darkMode ? "text-stone-300" : "text-stone-800"}`}
                    >
                      Horario
                    </p>
                    <p className="text-sm font-light text-stone-500">
                      12:00 PM - 2:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <MapPin size={18} className="text-amber-600" />
                  <div>
                    <p
                      className={`text-xs font-bold uppercase tracking-tighter ${darkMode ? "text-stone-300" : "text-stone-800"}`}
                    >
                      Ubicación
                    </p>
                    <p className="text-sm font-light text-stone-500">
                      Calle Los Heraldos 205 - Justicia, Paz y Vida
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`p-8 rounded-[2.5rem] border border-amber-500/20 ${darkMode ? "bg-amber-500/5" : "bg-amber-50/50"}`}
            >
              <Heart size={20} className="text-amber-600 mb-4" />
              <h4
                className={`text-sm font-serif italic mb-2 ${darkMode ? "text-stone-200" : "text-stone-900"}`}
              >
                ¿Cómo apoyar?
              </h4>
              <p className="text-xs leading-relaxed text-stone-500 font-light">
                Aceptamos donaciones de alimentos no perecederos y voluntarios
                para el servicio diario.
              </p>
            </div>
          </div>
        </section>

        {/* BOTÓN DE ACCIÓN FINAL */}
        <div className="py-12 flex justify-center">
          <Link
            href="https://wa.me/51964373959?text=Hola,%20deseo%20apoyar%20al%20Comedor%20Popular%20con%20donaciones/voluntariado."
            target="_blank"
          >
            <button
              className={`px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all
              ${darkMode ? "bg-white text-black hover:bg-stone-200" : "bg-stone-900 text-white hover:bg-black shadow-xl shadow-stone-200"}`}
            >
              Donar o ser Voluntario
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
