"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { useDarkMode } from "@/hooks/useDarkMode";
import { supabase } from "@/lib/supabase";
import type { Integrante } from "@/types";
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
  Users,
  User,
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
  const [darkMode, setDarkMode] = useDarkMode();
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);

  useEffect(() => {
    supabase
      .from("ministerio_integrantes")
      .select("*")
      .eq("ministerio", "produccion")
      .eq("activo", true)
      .order("orden")
      .then(({ data }) => {
        if (data) setIntegrantes(data);
      });
  }, []);

  return (
    <div
      className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#0a0a0a]" : "bg-[#fcfcfc]"}`}
    >
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

        {/* SECCIÓN "EL EQUIPO" - GRID DOS COLUMNAS */}
        <section className="max-w-6xl mx-auto">
          <div className={`rounded-[3rem] overflow-hidden border grid grid-cols-1 lg:grid-cols-2 ${darkMode ? "border-stone-800" : "border-stone-100"}`}>
            {/* Imagen */}
            <div className="relative min-h-[280px] lg:min-h-0 group overflow-hidden">
              <img
                src="https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto,w_900/iglesia-portal/ministerios/produccion/produccion"
                className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                alt="Backstage"
              />
              <div className={`absolute inset-0 ${darkMode ? "bg-black/40" : "bg-stone-900/30"}`} />
            </div>

            {/* Texto */}
            <div className={`p-8 md:p-12 flex flex-col justify-center space-y-8 ${darkMode ? "bg-[#111]" : "bg-stone-50"}`}>
              <div className="space-y-3">
                <h3 className={`text-2xl md:text-3xl font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}>
                  El arte de servir <br /> en silencio.
                </h3>
                <p className={`text-sm font-light leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"}`}>
                  Nuestro trabajo es invisible cuando es perfecto. Nos esforzamos por eliminar distracciones para que el mensaje sea el único protagonista.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Excelencia", sub: "En cada detalle visual", color: darkMode ? "text-cyan-400" : "text-cyan-600" },
                  { label: "Corazón", sub: "Servicio voluntario", color: darkMode ? "text-purple-400" : "text-purple-600" },
                  { label: "Claridad", sub: "Mensaje sin barreras", color: darkMode ? "text-rose-400" : "text-rose-600" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-4 pb-4 ${i < 2 ? `border-b ${darkMode ? "border-stone-800" : "border-stone-200"}` : ""}`}>
                    <span className={`font-serif italic text-2xl shrink-0 ${item.color}`}>{item.label}</span>
                    <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${darkMode ? "text-stone-500" : "text-stone-400"}`}>{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NUESTRO EQUIPO */}
        <section className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-2 border-b border-stone-200 dark:border-stone-800 pb-6">
            <div className="flex items-center gap-4">
              <Users size={24} className={darkMode ? "text-cyan-400" : "text-cyan-600"} />
              <h3 className={`text-3xl font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}>
                El equipo detrás
              </h3>
            </div>
            <p className={`text-sm font-light ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
              Somos 4 y nos turnamos en cada área — audio, proyección, video y redes.
            </p>
          </div>

          {integrantes.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {integrantes.map((m) => (
                <div key={m.id} className={`p-6 rounded-[2rem] border flex flex-col items-center text-center gap-3 transition-all duration-500 ${darkMode ? "bg-[#1a1a1a] border-stone-800 hover:border-cyan-500/30" : "bg-white border-stone-100 shadow-sm hover:shadow-md"}`}>
                  {m.foto_url ? (
                    <img src={m.foto_url} alt={m.nombre} className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/20" />
                  ) : (
                    <div className={`w-20 h-20 rounded-full overflow-hidden border-2 border-dashed flex items-center justify-center ${darkMode ? "border-stone-700 bg-stone-800" : "border-stone-200 bg-stone-100"}`}>
                      <span className={`text-3xl font-serif italic ${darkMode ? "text-stone-500" : "text-stone-400"}`}>{m.nombre[0]}</span>
                    </div>
                  )}
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{m.nombre}</p>
                    <p className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${darkMode ? "text-cyan-400/70" : "text-cyan-600/80"}`}>{m.rol ?? "Producción IBM"}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`p-6 rounded-[2rem] border flex flex-col items-center text-center gap-3 ${darkMode ? "bg-[#1a1a1a] border-stone-800" : "bg-white border-stone-100 shadow-sm"}`}>
                  <div className={`w-20 h-20 rounded-full overflow-hidden border-2 border-dashed flex items-center justify-center ${darkMode ? "border-stone-700 bg-stone-800" : "border-stone-200 bg-stone-100"}`}>
                    <User size={28} className="text-stone-400" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? "text-stone-200" : "text-stone-800"}`}>Por definir</p>
                    <p className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${darkMode ? "text-cyan-400/70" : "text-cyan-600/80"}`}>Producción IBM</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className={`text-[9px] text-center uppercase tracking-widest ${darkMode ? "text-stone-600" : "text-stone-400"}`}>
            ¿Te interesa servir en producción? — <button onClick={() => window.open("https://wa.me/51956055194", "_blank")} className="underline hover:opacity-70 transition-opacity">Contáctanos</button>
          </p>
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
