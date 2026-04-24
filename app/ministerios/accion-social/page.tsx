"use client";
import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/sidebar";
import {
  HeartPulse,
  Utensils,
  Trophy,
  Scale,
  Brain,
  GraduationCap,
  Plus,
  ArrowUpRight,
  ArrowLeft,
} from "lucide-react";

const areasSociales = [
  {
    id: "campanas",
    titulo: "Campañas Médicas",
    descripcion:
      "Brindamos servicios de salud integral y asesoría legal a sectores vulnerables sin acceso a servicios básicos.",
    impacto: "Mensual",
    link: "https://ciudadrefugiohuancayo.org/", // Redirección solicitada
    servicios: [
      {
        nombre: "Salud Física",
        icon: HeartPulse,
        detalle: "Medicina general y preventiva.",
      },
      {
        nombre: "Salud Mental",
        icon: Brain,
        detalle: "Atención psicológica profesional.",
      },
      {
        nombre: "Educación",
        icon: GraduationCap,
        detalle: "Talleres formativos y apoyo escolar.",
      },
      {
        nombre: "Asesoría Legal",
        icon: Scale,
        detalle: "Orientación jurídica gratuita.",
      },
    ],
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "comedor",
    titulo: "Comedor Popular",
    descripcion:
      "Suministramos raciones de comida nutritiva diariamente a familias y ancianos de nuestra comunidad.",
    impacto: "150 raciones diarias",
    link: "/ministerios/accion-social/comedor-popular",
    icon: Utensils,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    id: "futbol",
    titulo: "Academia de Fútbol",
    descripcion:
      "Fomentamos el deporte y valores cristianos en niños y adolescentes como prevención social.",
    impacto: "25 alumnos",
    link: "/talentos", // Página existente
    icon: Trophy,
    color: "bg-emerald-500/10 text-emerald-600",
  },
];

export default function AccionSocialPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#121212]" : "bg-white"}`}
    >
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 p-10 space-y-12 overflow-y-auto scrollbar-hide">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] transition-all
            ${darkMode ? "text-stone-500 hover:text-stone-200" : "text-stone-400 hover:text-stone-900"}`}
        >
          <ArrowLeft size={14} />
          Volver al Inicio
        </Link>
        <div className="flex flex-col space-y-2">
          <h2
            className={`text-[10px] font-bold uppercase tracking-[0.4em] ${darkMode ? "text-stone-500" : "text-stone-400"}`}
          >
            Compromiso Social
          </h2>
          <h1
            className={`text-5xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}
          >
            Amor en Movimiento
          </h1>
        </div>

        {/* SECCIÓN DESTACADA: CAMPAÑAS MÉDICAS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div
            className={`lg:col-span-7 p-10 rounded-[3rem] border transition-all duration-700
            ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-[#fafaf9] border-stone-200 shadow-sm"}`}
          >
            <div className="flex justify-between items-start mb-8">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-600 bg-blue-500/10 px-3 py-1 rounded-full">
                Servicio Integral
              </span>
            </div>

            <div className="space-y-4 mb-10">
              <h3
                className={`text-4xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}
              >
                {areasSociales[0].titulo}
              </h3>
              <p
                className={`text-sm leading-relaxed font-light max-w-xl ${darkMode ? "text-stone-400" : "text-stone-600"}`}
              >
                {areasSociales[0].descripcion}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {areasSociales[0].servicios?.map((s, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div
                    className={`p-3 rounded-2xl ${darkMode ? "bg-stone-800 text-blue-400" : "bg-white border border-stone-100 text-blue-500 shadow-sm"}`}
                  >
                    <s.icon size={18} />
                  </div>
                  <div className="space-y-1">
                    <h4
                      className={`text-xs font-bold uppercase tracking-widest ${darkMode ? "text-stone-200" : "text-stone-800"}`}
                    >
                      {s.nombre}
                    </h4>
                    <p
                      className={`text-[13px] font-light leading-snug text-stone-500`}
                    >
                      {s.detalle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen / Ciudad de Refugio Link */}
          {/* Imagen / Ciudad de Refugio Link */}
          <Link
            href={areasSociales[0].link}
            className="lg:col-span-5 group"
            target="_blank"
          >
            <div
              className={`h-full min-h-[400px] rounded-[3rem] overflow-hidden border relative transition-all duration-700
    ${darkMode ? "border-stone-800 grayscale-[0.5] hover:grayscale-0" : "border-stone-100 shadow-2xl shadow-stone-200/50"}`}
            >
              {/* LA FOTO VA AQUÍ */}
              <img
                src="/ministerios/accion-social/ciudad-refugio.jpg"
                alt="Ciudad de Refugio"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Capa de degradado para que el texto sea legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 group-hover:from-blue-900/80 transition-all">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white text-lg font-serif italic leading-tight">
                      "Sanar el cuerpo para alcanzar el alma."
                    </p>
                    <span className="text-stone-400 text-[9px] uppercase tracking-widest mt-4 block group-hover:text-blue-200">
                      Ir a Ciudad de Refugio
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* SECCIÓN SECUNDARIA: GRID DE 3 COLUMNAS (Mismo estilo para todos) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {areasSociales.map((area) => (
            <Link href={area.link} key={area.id} className="group">
              <div
                className={`p-10 h-full rounded-[3rem] border transition-all duration-700 flex flex-col justify-between
                ${darkMode ? "bg-stone-900/40 border-stone-800 hover:bg-stone-900/60" : "bg-[#fafaf9] border-stone-200 shadow-sm hover:shadow-xl hover:shadow-stone-200/50"}`}
              >
                <div className="space-y-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${area.color}`}
                  >
                    {area.icon ? (
                      <area.icon size={20} />
                    ) : (
                      <HeartPulse size={20} />
                    )}
                  </div>

                  <div className="space-y-3">
                    <h3
                      className={`text-2xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}
                    >
                      {area.titulo}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed font-light ${darkMode ? "text-stone-400" : "text-stone-600"}`}
                    >
                      {area.descripcion}
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-stone-200/60 dark:border-stone-800 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-stone-400">
                      Alcance
                    </span>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-widest ${darkMode ? "text-amber-500/80" : "text-amber-600"}`}
                    >
                      {area.impacto}
                    </span>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all 
                    ${darkMode ? "bg-stone-800 text-stone-400 group-hover:text-white" : "bg-white border border-stone-100 text-stone-400 group-hover:text-stone-900 shadow-sm"}`}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* CTA FINAL */}
        <div
          className={`p-16 rounded-[4rem] text-center space-y-8 transition-colors
          ${darkMode ? "bg-stone-900/20" : "bg-stone-50"}`}
        >
          <div className="space-y-2">
            <h2
              className={`text-3xl font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}
            >
              Involúcrate en la Causa
            </h2>
            <p className={`text-sm font-light max-w-md mx-auto text-stone-500`}>
              Buscamos profesionales de la salud, abogados y voluntarios
              apasionados para expandir nuestro alcance social.
            </p>
          </div>
          <Link
            href="https://wa.me/51964373959?text=Hola,%20me%20gustaría%20obtener%20más%20información%20para%20unirme%20como%20voluntario%20en%20el%20área%20de%20Acción%20Social."
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className={`px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all
    ${darkMode ? "bg-white text-black hover:bg-stone-200" : "bg-stone-900 text-white hover:bg-black shadow-xl shadow-stone-200"}`}
            >
              Quiero ser Voluntario
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
