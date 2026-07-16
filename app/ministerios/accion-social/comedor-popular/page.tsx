"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useContacto, abrirWhatsApp } from "@/hooks/useContacto";
import { supabase } from "@/lib/supabase";
import type { ComedorConfig } from "@/types";
import { Utensils, ArrowLeft, Heart, Clock, MapPin, CalendarDays, DollarSign } from "lucide-react";

export default function ComedorPopularPage() {
  const [darkMode, setDarkMode] = useDarkMode();
  const contacto = useContacto("comedor");
  const [config, setConfig] = useState<ComedorConfig | null>(null);

  useEffect(() => {
    supabase.from("comedor_config").select("*").single()
      .then(({ data }) => { if (data) setConfig(data); });
  }, []);

  const estadisticas = [
    { label: "Raciones Diarias", valor: config?.raciones ?? "150+",   icon: Utensils },
    { label: "Costo",            valor: config?.costo    ?? "S/.3.50", icon: DollarSign },
    { label: "Días de Servicio", valor: config?.dias     ?? "Lun - Vie", icon: CalendarDays },
  ];

  const horario    = config ? `${config.horario_inicio} - ${config.horario_fin}` : "12:00 PM - 2:00 PM";
  const direccion  = config?.direccion ?? "Calle Los Heraldos 205 - Justicia, Paz y Vida";
  const fotoUrl    = config?.foto_url  ?? "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto,w_800/iglesia-portal/ministerios/accion-social/comedor";

  return (
    <div className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#121212]" : "bg-white"}`}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 p-6 lg:p-10 space-y-12 overflow-y-auto scrollbar-hide pt-20 lg:pt-10">
        <Link
          href="/ministerios/accion-social"
          className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${darkMode ? "text-stone-500 hover:text-stone-200" : "text-stone-400 hover:text-stone-900"}`}
        >
          <ArrowLeft size={14} />
          Volver a Acción Social
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 items-end">
          <div className="flex-1 space-y-4">
            <h2 className={`text-[10px] font-bold uppercase tracking-[0.4em] ${darkMode ? "text-blue-400/80" : "text-blue-600"}`}>
              Seguridad Alimentaria
            </h2>
            <h1 className={`text-4xl md:text-6xl font-serif italic leading-tight tracking-tight ${darkMode ? "text-stone-100" : "text-stone-900"}`}>
              Comedor Popular <br />
              <span className={darkMode ? "text-blue-400" : "text-blue-600"}>Misericordia.</span>
            </h1>
          </div>
          <div className={`flex-1 text-sm font-light leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"} max-w-md`}>
            {config?.descripcion ?? "Nuestra misión es asegurar que ninguna familia de nuestro entorno sufra de hambre. Proporcionamos almuerzos equilibrados y un espacio de comunidad y esperanza."}
          </div>
        </div>

        {/* Estadísticas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {estadisticas.map((stat, i) => (
            <div key={i} className={`p-8 rounded-[2.5rem] border transition-all ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-[#fafaf9] border-stone-200 shadow-sm"}`}>
              <stat.icon size={20} className={`${darkMode ? "text-blue-400" : "text-blue-600"} mb-4`} />
              <div className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>{stat.valor}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Imagen + detalles */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className={`lg:col-span-8 rounded-[3rem] overflow-hidden min-h-[400px] border relative ${darkMode ? "border-stone-800 grayscale-[0.3]" : "border-stone-100 shadow-2xl shadow-stone-200/50"}`}>
            <img
              src={fotoUrl}
              alt="Comedor Misericordia"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 lg:p-10">
              <span className={`${darkMode ? "text-blue-400" : "text-blue-500"} text-[10px] font-bold uppercase tracking-widest mb-2`}>Nuestro Comedor</span>
              <h3 className="text-white text-3xl font-serif italic">Comprometidos con el bienestar de los más vulnerables.</h3>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className={`p-8 rounded-[2.5rem] border ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-[#fafaf9] border-stone-200"}`}>
              <h4 className={`text-xs font-bold uppercase tracking-widest mb-6 ${darkMode ? "text-stone-200" : "text-stone-900"}`}>
                Información de Servicio
              </h4>
              <div className="space-y-6">
                <div className="flex gap-4 items-center">
                  <Clock size={18} className={darkMode ? "text-blue-400" : "text-blue-600"} />
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-tighter ${darkMode ? "text-stone-300" : "text-stone-800"}`}>Horario</p>
                    <p className="text-sm font-light text-stone-500">{horario}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <MapPin size={18} className={darkMode ? "text-blue-400" : "text-blue-600"} />
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-tighter ${darkMode ? "text-stone-300" : "text-stone-800"}`}>Ubicación</p>
                    <p className="text-sm font-light text-stone-500">{direccion}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-[2.5rem] border border-blue-500/20 ${darkMode ? "bg-blue-500/5" : "bg-blue-50/50"}`}>
              <Heart size={20} className={`${darkMode ? "text-blue-400" : "text-blue-600"} mb-4`} />
              <h4 className={`text-sm font-serif italic mb-2 ${darkMode ? "text-stone-200" : "text-stone-900"}`}>¿Cómo apoyar?</h4>
              <p className="text-xs leading-relaxed text-stone-500 font-light">
                Aceptamos donaciones de alimentos no perecederos y voluntarios para el servicio diario.
              </p>
            </div>
          </div>
        </section>

        <div className="py-12 flex justify-center">
          <button
            onClick={() => abrirWhatsApp(contacto, "Hola, deseo apoyar al Comedor Popular con donaciones/voluntariado.")}
            className={`px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${darkMode ? "bg-white text-black hover:bg-stone-200" : "bg-stone-900 text-white hover:bg-black shadow-xl shadow-stone-200"}`}
          >
            Donar o ser Voluntario
          </button>
        </div>
      </main>
    </div>
  );
}
