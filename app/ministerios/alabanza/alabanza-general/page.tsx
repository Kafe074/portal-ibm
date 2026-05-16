"use client";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { useDarkMode } from "@/hooks/useDarkMode";
import { ArrowLeft, Mic2, Guitar, Drum, Piano, Users, User } from "lucide-react";

const roles = [
  { rol: "Director / Voz principal", instrumento: "Voz", icon: Mic2 },
  { rol: "Voz 2", instrumento: "Voz", icon: Mic2 },
  { rol: "Guitarra principal", instrumento: "Guitarra", icon: Guitar },
  { rol: "Guitarra rítmica", instrumento: "Guitarra", icon: Guitar },
  { rol: "Teclado / Piano", instrumento: "Piano", icon: Piano },
  { rol: "Batería", instrumento: "Percusión", icon: Drum },
  { rol: "Bajo", instrumento: "Bajo", icon: Guitar },
];

export default function AlabanzaGeneralPage() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#121212]" : "bg-white"}`}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 p-6 lg:p-10 space-y-12 overflow-y-auto scrollbar-hide pt-20 lg:pt-10">
        <Link
          href="/ministerios/alabanza"
          className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] transition-all
            ${darkMode ? "text-stone-500 hover:text-stone-200" : "text-stone-400 hover:text-stone-900"}`}
        >
          <ArrowLeft size={14} />
          Alabanza
        </Link>

        {/* HERO + IMAGEN: dos columnas en desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className={`text-[10px] font-bold uppercase tracking-[0.5em] ${darkMode ? "text-emerald-400/80" : "text-emerald-600"}`}>
              Banda Principal · Domingo General
            </span>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-serif italic leading-tight ${darkMode ? "text-stone-100" : "text-stone-900"}`}>
              Alabanza <br />
              <span className={darkMode ? "text-emerald-400" : "text-emerald-600"}>General.</span>
            </h1>
            <p className={`text-base font-light leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"}`}>
              Nuestra banda principal dedicada a liderar la congregación en cada servicio dominical con alabanzas y adoraciones a Dios. Esencia y tradición al servicio de la iglesia.
            </p>

            {/* Cuadros de info — apilados verticalmente */}
            <div className="space-y-3">
              <div className={`p-5 rounded-2xl border flex flex-col gap-1 ${darkMode ? "bg-stone-900/30 border-stone-800" : "bg-emerald-50/40 border-emerald-100"}`}>
                <span className={`text-[9px] font-bold uppercase tracking-widest ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>Ensayo semanal</span>
                <p className={`text-base font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}>Viernes · 7:00 — 9:00 PM</p>
              </div>
              <div className={`p-5 rounded-2xl border flex flex-col gap-1 ${darkMode ? "bg-stone-900/30 border-stone-800" : "bg-emerald-50/40 border-emerald-100"}`}>
                <span className={`text-[9px] font-bold uppercase tracking-widest ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>Día de Presentación</span>
                <p className={`text-base font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}>Domingos</p>
                <p className={`text-[10px] font-light ${darkMode ? "text-stone-500" : "text-stone-400"}`}>Servicio General · 10:00 AM</p>
              </div>
            </div>
          </div>

          {/* Imagen con marco mejorado */}
          <div className="relative transition-transform duration-500 hover:-translate-y-2">
            {/* Bloque de color sólido detrás — efecto de profundidad */}
            <div className={`absolute inset-0 translate-x-5 translate-y-5 rounded-[3rem] ${darkMode ? "bg-emerald-500/20" : "bg-emerald-100"}`} />
            {/* Imagen encima */}
            <div className={`relative rounded-[3rem] overflow-hidden aspect-[4/3] group border ${darkMode ? "border-stone-700/80" : "border-stone-100 shadow-lg"}`}>
              <img
                src="https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto,w_800/iglesia-portal/ministerios/alabanza/alabanza-general"
                alt="Alabanza General"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* EQUIPO */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 border-b border-stone-100 dark:border-stone-800 pb-6">
            <Users size={20} className={darkMode ? "text-emerald-400" : "text-emerald-600"} />
            <h2 className={`text-3xl font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}>
              Nuestro Equipo
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {roles.map((miembro, i) => (
              <div
                key={i}
                className={`p-5 rounded-[2rem] border flex flex-col items-center text-center gap-3 transition-all duration-500 ${darkMode
                  ? "bg-stone-900/40 border-stone-800 hover:border-emerald-500/30"
                  : "bg-white border-stone-100 shadow-sm hover:shadow-md"
                  }`}
              >
                {/* Foto — tamaño visible */}
                <div className={`w-20 h-20 rounded-full overflow-hidden border-2 border-dashed flex items-center justify-center ${darkMode ? "border-stone-700 bg-stone-800" : "border-stone-200 bg-stone-100"}`}>
                  <User size={28} className="text-stone-400" />
                </div>
                <div>
                  <p className={`text-[9px] font-bold uppercase tracking-widest ${darkMode ? "text-emerald-400/70" : "text-emerald-600/80"}`}>{miembro.instrumento}</p>
                  <p className={`text-sm font-medium mt-0.5 ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{miembro.rol}</p>
                  <p className={`text-[10px] italic mt-1 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>Nombre por añadir</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
