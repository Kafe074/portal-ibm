"use client";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useContacto, abrirWhatsApp } from "@/hooks/useContacto";
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
  Sun,
  Star,
  Clock,
} from "lucide-react";

export default function ServirPage() {
  const [darkMode, setDarkMode] = useDarkMode();
  const contacto = useContacto("servir");

  return (
    <div
      className={`flex flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#121212]" : "bg-[#fcfaf7]"}`}
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

        {/* HERO - Cálido y Familiar */}
        <section className="relative py-12 flex flex-col items-center text-center">
          <div className="z-10 space-y-4">
            <h2
              className={`text-[9px] font-bold uppercase tracking-[0.4em] ${darkMode ? "text-amber-600/60" : "text-stone-400"}`}
            >
              Ministerio de Servir
            </h2>
            <h1
              className={`text-5xl lg:text-7xl font-serif italic leading-[1.1] tracking-tight ${
                darkMode ? "text-stone-100" : "text-stone-900"
              }`}
            >
              Bienvenido a <br />
              <span className={`transition-colors duration-700 ${darkMode ? "text-amber-400" : "text-amber-600"}`}>
                nuestra familia.
              </span>
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
          {/* Card: Acogida */}
          <div
            className={`p-6 md:p-10 rounded-[3rem] space-y-5 text-center transition-all duration-500 hover:scale-[1.02] ${
              darkMode
                ? "bg-stone-900/40 border border-stone-800"
                : "bg-white shadow-sm border border-stone-100"
            }`}
          >
            <DoorOpen size={32} className="mx-auto text-amber-500" />
            <h3
              className={`font-serif italic text-3xl ${darkMode ? "text-stone-100" : "text-stone-900"}`}
            >
              Acogida
            </h3>
            <p
              className={`text-[11px] uppercase tracking-wider font-semibold leading-relaxed ${
                darkMode ? "text-stone-400" : "text-stone-500"
              }`}
            >
              Una sonrisa y un abrazo al llegar pueden cambiar el día de
              cualquier persona.
            </p>
          </div>

          {/* Card: Celebración */}
          <div
            className={`p-6 md:p-10 rounded-[3rem] space-y-5 text-center transition-all duration-500 hover:scale-[1.02] ${
              darkMode
                ? "bg-stone-900/40 border border-stone-800"
                : "bg-white shadow-sm border border-stone-100"
            }`}
          >
            <Cake size={32} className="mx-auto text-rose-400" />
            <h3
              className={`font-serif italic text-3xl ${darkMode ? "text-stone-100" : "text-stone-900"}`}
            >
              Celebración
            </h3>
            <p
              className={`text-[11px] uppercase tracking-wider font-semibold leading-relaxed ${
                darkMode ? "text-stone-400" : "text-stone-500"
              }`}
            >
              Honramos la vida de cada hermano celebrando sus cumpleaños dentro
              de nuestra familia.
            </p>
          </div>

          {/* Card: Nuevos Amigos */}
          <div
            className={`p-6 md:p-10 rounded-[3rem] space-y-5 text-center transition-all duration-500 hover:scale-[1.02] ${
              darkMode
                ? "bg-stone-900/40 border border-stone-800"
                : "bg-white shadow-sm border border-stone-100"
            }`}
          >
            <UserPlus size={32} className="mx-auto text-emerald-500" />
            <h3
              className={`font-serif italic text-3xl ${darkMode ? "text-stone-100" : "text-stone-900"}`}
            >
              Nuevos Amigos
            </h3>
            <p
              className={`text-[11px] uppercase tracking-wider font-semibold leading-relaxed ${
                darkMode ? "text-stone-400" : "text-stone-500"
              }`}
            >
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
              {/* Grid de Detalles (Iconos actualizados) */}
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="flex items-start gap-4 group">
                  <Coffee
                    size={24}
                    className="text-amber-600 shrink-0 transition-transform group-hover:rotate-12"
                  />
                  <p
                    className={`text-[12px] font-medium italic leading-snug ${
                      darkMode ? "text-stone-300" : "text-stone-600"
                    }`}
                  >
                    Hospitalidad constante en cada reunión.
                  </p>
                </div>

                <div className="flex items-start gap-4 group">
                  <Gift
                    size={24}
                    className="text-amber-600 shrink-0 transition-transform group-hover:-rotate-12"
                  />
                  <p
                    className={`text-[12px] font-medium italic leading-snug ${
                      darkMode ? "text-stone-300" : "text-stone-600"
                    }`}
                  >
                    Atención especial en fechas importantes.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 rounded-[3.5rem] overflow-hidden aspect-square lg:aspect-video shadow-2xl shadow-stone-200 dark:shadow-none">
              <img
                src="https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto,w_800/iglesia-portal/ministerios/index/servir_1"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                alt="Hospitalidad"
              />
            </div>
          </div>
        </section>

        {/* CUÁNDO SERVIMOS */}
        <section className="max-w-4xl mx-auto">
          <div className={`p-6 md:p-10 rounded-[2.5rem] border ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-amber-50/40 border-amber-100"}`}>
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-6 ${darkMode ? "text-amber-400" : "text-amber-600"}`}>¿Cuándo servimos?</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { dia: "Domingos", detalle: "Antes y después del servicio general", Icono: Sun },
                { dia: "Eventos especiales", detalle: "Fechas festivas y actividades de la iglesia", Icono: Star },
                { dia: "Siempre", detalle: "Cualquier momento que se necesite hospitalidad", Icono: Heart },
              ].map((item, i) => (
                <div key={i} className={`p-5 rounded-2xl ${darkMode ? "bg-stone-800/60" : "bg-white shadow-sm border border-amber-100"}`}>
                  <item.Icono size={20} className={`${darkMode ? "text-amber-400" : "text-amber-500"} mb-3`} />
                  <p className={`text-sm font-bold ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{item.dia}</p>
                  <p className="text-[11px] font-light text-stone-500 mt-1">{item.detalle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ESTADÍSTICAS */}
        <section className="max-w-4xl mx-auto grid grid-cols-3 gap-4 md:gap-6">
          {[
            { valor: "Domingo", label: "Día de servicio" },
            { valor: "52", label: "Domingos al año" },
            { valor: "100%", label: "Corazón" },
          ].map((stat, i) => (
            <div key={i} className={`p-5 md:p-6 rounded-[2rem] text-center border ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-white border-stone-100 shadow-sm"}`}>
              <p className="text-2xl md:text-3xl font-serif italic text-amber-500">{stat.valor}</p>
              <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mt-1">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* CTA UNIRSE */}
        <section className={`max-w-4xl mx-auto p-8 md:p-12 rounded-[3rem] text-center space-y-6 border ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-white border-stone-100 shadow-xl"}`}>
          <Sparkles size={28} className="mx-auto text-amber-400" />
          <h3 className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>
            ¿Tienes un <span className="text-amber-500">corazón de siervo</span>?
          </h3>
          <p className={`text-sm font-light max-w-sm mx-auto ${darkMode ? "text-stone-400" : "text-stone-500"}`}>
            No se necesitan habilidades especiales, solo las ganas de hacer sentir bienvenida a cada persona que cruza la puerta.
          </p>
          <button
            onClick={() => abrirWhatsApp(contacto)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
          >
            Quiero servir
          </button>
        </section>

        {/* CITA FINAL */}
        <section className="text-center py-12 border-t border-stone-100 dark:border-stone-800/50 max-w-2xl mx-auto">
          <p className={`text-xl font-serif italic ${darkMode ? "text-stone-400" : "text-stone-500"}`}>
            "No os olvidéis de la hospitalidad, porque por ella algunos, sin saberlo, hospedaron ángeles."
          </p>
          <p className="text-[9px] uppercase tracking-widest text-stone-400 mt-4">Hebreos 13:2</p>
        </section>
      </main>
    </div>
  );
}
