"use client";
import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { useDarkMode } from "@/hooks/useDarkMode";
import {
  ArrowLeft,
  Coffee,
  BookOpen,
  Flower2,
  Sparkles,
  Quote,
  ChevronDown,
  Calendar,
  Users,
  Heart,
  MapPin,
} from "lucide-react";

const actividades = [
  {
    id: "reuniones",
    titulo: "Reuniones Mensuales",
    icono: Calendar,
    resumen: "El primer sábado de cada mes",
    detalle:
      "Nos reunimos el primer sábado de cada mes para compartir un tiempo especial de adoración, palabra y comunión. Es un espacio seguro donde cada mujer puede ser auténtica, crecer espiritualmente y fortalecer lazos de amistad genuinos. No se necesita experiencia previa; solo ganas de conectar.",
    dato: "1.er Sábado del mes",
    color: "text-rose-400",
  },
  {
    id: "discipulado",
    titulo: "Grupos de Discipulado",
    icono: Users,
    resumen: "Pequeños grupos semanales en hogares",
    detalle:
      "Funcionamos en grupos pequeños de 5 a 10 mujeres que se reúnen semanalmente en hogares. Estudiamos la Biblia juntas, oramos las unas por las otras y nos rendimos cuentas en el caminar con Dios. Las hermanas mayores en la fe guían y acompañan a quienes recién inician su camino.",
    dato: "Grupos semanales",
    color: "text-rose-400",
  },
  {
    id: "evangelismo",
    titulo: "Tiempos de Evangelismo",
    icono: Heart,
    resumen: "Salidas periódicas a la comunidad",
    detalle:
      "Creemos que la fe se vive hacia afuera. Organizamos tiempos de evangelismo en los que salimos a compartir el amor de Dios con nuestra comunidad cercana: visitas a familias, distribución de recursos y testimonios en espacios públicos. Cada mujer es bienvenida a participar según sus dones.",
    dato: "Salidas periódicas",
    color: "text-rose-400",
  },
];

export default function ConectadasPage() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div
      className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#121212]" : "bg-[#fdfbf9]"}`}
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

        {/* HERO */}
        <section className="relative py-12 flex flex-col items-center text-center">
          <div className="z-10 space-y-4">
            <h2 className={`text-[9px] font-bold uppercase tracking-[0.4em] ${darkMode ? "text-rose-400/60" : "text-stone-400"}`}>
              Ministerio de Mujeres
            </h2>
            <h1 className={`text-5xl lg:text-7xl font-serif italic leading-tight ${darkMode ? "text-stone-100" : "text-stone-900"}`}>
              Conectadas en <br />
              <span className={darkMode ? "text-rose-300" : "text-rose-500"}>Gracia y Propósito.</span>
            </h1>
            <p className={`text-sm font-light italic max-w-md mx-auto ${darkMode ? "text-stone-500" : "text-stone-500"}`}>
              Un espacio diseñado para florecer juntas, fortaleciendo nuestra identidad y fe.
            </p>
          </div>
        </section>

        {/* PILARES */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-3 p-6">
            <Coffee size={24} className="mx-auto text-rose-300" />
            <h3 className={`text-xs font-bold uppercase tracking-widest ${darkMode ? "text-stone-200" : "text-stone-800"}`}>Comunión</h3>
            <p className="text-[12px] font-light leading-relaxed text-stone-500">Espacios de comunión y charla donde compartimos la vida con sinceridad.</p>
          </div>
          <div className="text-center space-y-3 p-6 border-x border-stone-100 dark:border-stone-800">
            <BookOpen size={24} className="mx-auto text-rose-300" />
            <h3 className={`text-xs font-bold uppercase tracking-widest ${darkMode ? "text-stone-200" : "text-stone-800"}`}>Palabra</h3>
            <p className="text-[12px] font-light leading-relaxed text-stone-500">Estudios profundos que nos equipan para los retos de la mujer hoy.</p>
          </div>
          <div className="text-center space-y-3 p-6">
            <Flower2 size={24} className="mx-auto text-rose-300" />
            <h3 className={`text-xs font-bold uppercase tracking-widest ${darkMode ? "text-stone-200" : "text-stone-800"}`}>Crecimiento</h3>
            <p className="text-[12px] font-light leading-relaxed text-stone-500">Talleres y encuentros enfocados en nuestro desarrollo integral.</p>
          </div>
        </div>

        {/* FOTO + ACTIVIDADES EXPANDIBLES */}
        <section className="max-w-6xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* FOTO - arreglada */}
            <div className={`lg:col-span-7 rounded-[3rem] overflow-hidden aspect-[4/3] border shadow-sm relative ${darkMode ? "border-stone-800" : "border-stone-100"}`}>
              <img
                src="https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto,w_900/iglesia-portal/ministerios/conectadas/conectadas"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                alt="Encuentro de hermanas"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto,w_900/iglesia-portal/ministerios/index/conectadas";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">Conectadas · IBM</span>
              </div>
            </div>

            {/* ACTIVIDADES EXPANDIBLES */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Actividades</span>
                <h3 className={`text-3xl font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}>Lo que vivimos juntas</h3>
              </div>

              {actividades.map((item) => {
                const Icon = item.icono;
                const isOpen = openItem === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                      darkMode
                        ? isOpen ? "border-rose-500/40 bg-stone-900/60" : "border-stone-800 bg-stone-900/30"
                        : isOpen ? "border-rose-200 bg-rose-50/40" : "border-stone-100 bg-white"
                    }`}
                  >
                    <button
                      onClick={() => setOpenItem(isOpen ? null : item.id)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${darkMode ? "bg-stone-800" : "bg-rose-50"}`}>
                          <Icon size={14} className="text-rose-400" />
                        </div>
                        <div>
                          <p className={`text-[11px] font-bold uppercase tracking-wider ${darkMode ? "text-stone-200" : "text-stone-800"}`}>
                            {item.titulo}
                          </p>
                          {!isOpen && (
                            <p className="text-[10px] text-stone-400 font-light">{item.resumen}</p>
                          )}
                        </div>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-rose-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 space-y-3">
                        <p className={`text-[13px] font-light leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-600"}`}>
                          {item.detalle}
                        </p>
                        <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${darkMode ? "bg-rose-500/10 text-rose-400" : "bg-rose-100 text-rose-600"}`}>
                          {item.dato}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CORAZÓN DEL MINISTERIO */}
        <section className={`max-w-4xl mx-auto p-6 md:p-12 rounded-[3rem] text-center space-y-6 ${darkMode ? "bg-stone-900/50" : "bg-rose-50/50"}`}>
          <Sparkles size={20} className="mx-auto text-rose-300" />
          <h3 className={`text-2xl font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}>
            Acompañarnos es nuestra esencia.
          </h3>
          <p className={`text-sm font-light leading-relaxed max-w-xl mx-auto ${darkMode ? "text-stone-400" : "text-stone-500"}`}>
            Creemos que ninguna mujer debe caminar sola. Conectadas nace para ser ese refugio donde las hermanas mayores guían a las más jóvenes, y donde todas encontramos un lugar de pertenencia.
          </p>
          <div className="flex flex-wrap justify-center gap-8 pt-4">
            <div className="text-center">
              <p className="text-2xl font-serif italic text-rose-400">Sábados</p>
              <p className="text-[8px] uppercase tracking-widest text-stone-400 font-bold">Reuniones</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-serif italic text-rose-400">semanales</p>
              <p className="text-[8px] uppercase tracking-widest text-stone-400 font-bold">Encuentros Generales</p>
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="text-center py-16 max-w-2xl mx-auto">
          <Quote size={28} className="mx-auto text-rose-300/50 mb-8" />
          <div className="space-y-6">
            <p className={`text-xl md:text-2xl font-serif italic leading-relaxed ${darkMode ? "text-stone-300" : "text-stone-600"}`}>
              "Mujer virtuosa, ¿quién la hallará? Porque su estima sobrepasa largamente a la de las piedras preciosas."
            </p>
            <span className={`block font-serif italic text-lg ${darkMode ? "text-rose-400" : "text-rose-500"}`}>
              — Proverbios 31:10
            </span>
          </div>
          <div className="mt-10 flex justify-center opacity-20">
            <div className={`h-px w-20 ${darkMode ? "bg-stone-700" : "bg-stone-200"}`} />
          </div>
        </section>
      </main>
    </div>
  );
}
