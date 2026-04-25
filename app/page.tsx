"use client";
import { useState, useEffect } from "react"; // Añadimos useEffect
import Sidebar from "@/app/components/sidebar";
import {
  MapPin,
  Clock,
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Users,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function InicioPublico() {
  const [darkMode, setDarkMode] = useState(false);

  // Estados independientes para cada carrusel
  const [indexHistoria, setIndexHistoria] = useState(0);
  const [indexVision, setIndexVision] = useState(0);
  const [indexMision, setIndexMision] = useState(0);

  // Lógica de Movimiento Automático para Ministerios
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const slider = document.getElementById("ministerios-slider");
    if (!slider || isPaused) return; // Si está pausado, no ejecutamos el intervalo

    const interval = setInterval(() => {
      if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 10) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: 400, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]); // El efecto se reinicia/limpia cuando cambia isPaused

  const fotosHistoria = [
    { type: "image", url: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/historia/lywjqyhpmgcsfo8dymvn" },
    { type: "image", url: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/historia/2" },
    { type: "image", url: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/historia/paseo" },
  ];

  const fotosVision = [
    { type: "image", url: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/historia/1" },
    { type: "image", url: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/historia/historia_3" },
    { type: "image", url: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/historia/mision" },
  ];

  const fotosMision = [
    { type: "image", url: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/historia/4" },
    { type: "image", url: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/historia/historia_6" },
    { type: "image", url: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/historia/final" },
  ];

  const ministerios = [
    {
      nombre: "Misiones",
      img: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/index/misiones_1",
      link: "/ministerios/misiones",
    },
    {
      nombre: "Acción Social",
      img: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/index/accion-social",
      link: "/ministerios/accion-social",
    },
    {
      nombre: "Alabanza",
      img: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/index/alabanza",
      link: "/ministerios/alabanza",
    },
    {
      nombre: "Escuela Dominical",
      img: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/index/ninos",
      link: "/ministerios/escuela-dominical",
    },
    {
      nombre: "Producción",
      img: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/index/media",
      link: "/ministerios/produccion",
    },
    {
      nombre: "Conectadas",
      img: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/index/mujeres",
      link: "/ministerios/conectadas",
    },
    {
      nombre: "Generación Emergente",
      img: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/index/jovenes",
      link: "/ministerios/jovenes",
    },
    {
      nombre: "Adolescentes",
      img: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/index/teens",
      link: "/ministerios/teens",
    },
    {
      nombre: "Servir",
      img: "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/index/servir",
      link: "/ministerios/servir",
    },
  ];

  const nextSlide = (setFn: any, length: number) =>
    setFn((prev: number) => (prev + 1) % length);
  const prevSlide = (setFn: any, length: number) =>
    setFn((prev: number) => (prev - 1 + length) % length);

  return (
    <main
      className={`flex h-screen transition-colors duration-1000 overflow-hidden ${darkMode ? "bg-[#0a0a0a] text-stone-400" : "bg-[#fafaf9] text-stone-600"}`}
    >
      <div className="flex-1 flex flex-col overflow-y-auto font-light selection:bg-stone-200 custom-scrollbar">
        <div className="h-8 md:h-12" />

        <div className="w-full max-w-5xl mx-auto p-6 md:p-12 space-y-32">
          {/* Hero Section */}
          <section className="text-center space-y-8 py-6 relative">
            <div className="space-y-4">
              <div className="flex justify-center mb-8">
                <img
                  src="/IBM.png"
                  alt="Logo"
                  className={`w-20 h-20 md:w-24 md:h-24 object-contain transition-all duration-1000 ${
                    darkMode
                      ? "opacity-40 grayscale invert" // Tema Oscuro: Mismo efecto actual
                      : "opacity-100 grayscale brightness-0" // Tema Claro: 100% Negro
                  }`}
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.6em] text-stone-400 font-bold block">
                Iglesia Brisas del Mantaro
              </span>
              <h1
                className={`text-5xl md:text-8xl font-extralight tracking-tighter leading-[1] ${darkMode ? "text-stone-100" : "text-stone-900"}`}
              >
                Una iglesia <br />
                <span className="italic font-serif opacity-40">
                  Generacional.
                </span>
              </h1>
            </div>

            <div className="flex flex-col items-center gap-6">
              <p className="max-w-xs text-[13px] leading-relaxed tracking-wide opacity-70 italic font-serif">
                "Con una sola misión . Jerusalén, Judea, Samaria y hasta lo
                ultimo de la tierra ."
              </p>
              <Link
                href="/calendario"
                className={`flex items-center gap-3 px-8 py-4 rounded-full border text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${darkMode ? "border-stone-800 hover:bg-stone-900 text-stone-300" : "border-stone-200 hover:bg-stone-50 text-stone-800 shadow-sm"}`}
              >
                Ver Calendario <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          {/* Sección: Historia */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-left">
              {" "}
              {/* Aumenté un poco el espacio entre elementos */}
              <h2
                className={`text-4xl lg:text-5xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}
              >
                Nuestra Historia
              </h2>
              <p className="text-base lg:text-lg leading-relaxed opacity-80 font-light">
                Nacimos como una iglesia de niños, con una sola visión: amar a
                Dios y al prójimo en nuestra comunidad.
              </p>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() =>
                    prevSlide(setIndexHistoria, fotosHistoria.length)
                  }
                  className="p-3 border rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 dark:border-stone-800 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() =>
                    nextSlide(setIndexHistoria, fotosHistoria.length)
                  }
                  className="p-3 border rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 dark:border-stone-800 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[3rem] aspect-[4/5] md:aspect-square border dark:border-stone-900 shadow-2xl isolate">
              <img
                src={fotosHistoria[indexHistoria].url}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out hover:scale-105"
                alt="Historia"
              />
              {darkMode && (
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              )}
            </div>
          </section>

          {/* SECCIÓN: VISIÓN */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1 overflow-hidden rounded-[3rem] aspect-[4/5] md:aspect-square border dark:border-stone-900 shadow-2xl isolate">
              <img
                src={fotosVision[indexVision].url}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out hover:scale-105"
                alt="Visión"
              />
              {darkMode && (
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              )}
            </div>

            <div className="space-y-8 text-left md:text-right order-1 md:order-2">
              <h2
                className={`text-4xl lg:text-5xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}
              >
                Nuestra Visión
              </h2>
              <p className="text-base lg:text-lg leading-relaxed opacity-80 font-light">
                Ser una iglesia generacional, apasionada por Dios y por el
                prójimo donde podamos ver vidas cambiadas por Jesús y así
                impactar su esfera de influencia para la gloria de Dios.
              </p>
              <div className="flex gap-4 pt-4 justify-start md:justify-end">
                <button
                  onClick={() => prevSlide(setIndexVision, fotosVision.length)}
                  className="p-3 border rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 dark:border-stone-800 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => nextSlide(setIndexVision, fotosVision.length)}
                  className="p-3 border rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 dark:border-stone-800 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </section>

          {/* SECCIÓN: MISIÓN */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-left">
              <h2
                className={`text-4xl lg:text-5xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}
              >
                Nuestra Misión
              </h2>
              <p className="text-base lg:text-lg leading-relaxed opacity-80 font-light">
                Estamos levantando una nueva generación que se apasione por Dios
                y por el prójimo, creando espacios y ambientes que inviten a
                relacionarse con el creador mediante su palabra.
              </p>
              <div className="flex gap-4 pt-4 justify-start">
                <button
                  onClick={() => prevSlide(setIndexMision, fotosMision.length)}
                  className="p-3 border rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 dark:border-stone-800 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => nextSlide(setIndexMision, fotosMision.length)}
                  className="p-3 border rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 dark:border-stone-800 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[3rem] aspect-[4/5] md:aspect-square border dark:border-stone-900 shadow-2xl isolate">
              <img
                src={fotosMision[indexMision].url}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out hover:scale-105"
                alt="Misión"
              />
              {darkMode && (
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              )}
            </div>
          </section>

          {/* --- SECCIÓN: MINISTERIOS (Slider Infinito y Suave) --- */}
          <section className="space-y-12">
            <div className="flex justify-between items-end px-2">
              <div className="space-y-2">
                <h3 className="text-[9px] font-black uppercase tracking-[0.5em] text-stone-400">
                  Nuestros Ministerios
                </h3>
                <h2
                  className={`text-4xl lg:text-5xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}
                >
                  Vida en Comunidad
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const slider =
                      document.getElementById("ministerios-slider");
                    if (slider)
                      slider.scrollBy({ left: -400, behavior: "smooth" });
                  }}
                  className={`p-3 rounded-full border transition-colors ${darkMode ? "border-stone-800 text-stone-100 hover:bg-stone-900" : "border-stone-100 text-stone-900 hover:bg-stone-50"}`}
                >
                  <ChevronLeft size={30} />
                </button>
                <button
                  onClick={() => {
                    const slider =
                      document.getElementById("ministerios-slider");
                    if (slider)
                      slider.scrollBy({ left: 400, behavior: "smooth" });
                  }}
                  className={`p-3 rounded-full border transition-colors ${darkMode ? "border-stone-800 text-stone-100 hover:bg-stone-900" : "border-stone-100 text-stone-900 hover:bg-stone-50"}`}
                >
                  <ChevronRight size={30} />
                </button>
              </div>
            </div>

            <div
              className="relative group overflow-hidden"
              onMouseEnter={() => setIsPaused(true)} // Cuando el mouse entra, isPaused = true
              onMouseLeave={() => setIsPaused(false)} // Cuando el mouse sale, isPaused = false
            >
              <div
                id="ministerios-slider"
                className="flex gap-6 overflow-x-auto pb-10 pt-4 snap-x snap-mandatory scrollbar-hide items-center h-[600px]"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                onScroll={(e) => {
                  const el = e.currentTarget;
                  // Efecto Infinito Simple: Si llega al final, vuelve al inicio sin que se note
                  if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 10) {
                    el.scrollTo({ left: 1 });
                  } else if (el.scrollLeft <= 0) {
                    el.scrollTo({ left: el.scrollWidth - el.offsetWidth - 11 });
                  }
                }}
              >
                {/* Duplicamos el array para el efecto infinito */}
                {[...ministerios, ...ministerios].map((min, i) => (
                  <Link
                    key={i}
                    href={min.link}
                    className="relative min-w-[280px] md:min-w-[350px] h-[480px] rounded-[3.5rem] overflow-hidden group border dark:border-stone-900 snap-center transition-all duration-1000 ease-in-out hover:min-w-[500px] shadow-lg hover:shadow-2xl"
                  >
                    <img
                      src={min.img}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                      alt={min.nombre}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                    <div className="absolute inset-0 p-12 flex flex-col justify-end">
                      <div className="space-y-4">
                        <p className="text-amber-400 text-[10px] uppercase tracking-[0.5em] font-black opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                          Ministerio
                        </p>
                        <h4 className="text-white text-4xl md:text-5xl font-serif italic transform transition-transform duration-700 group-hover:-translate-y-2">
                          {min.nombre}
                        </h4>
                        <div className="pt-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-200 translate-y-4 group-hover:translate-y-0">
                          <span className="text-[11px] uppercase tracking-[0.2em] text-white border-b border-white/40 pb-1 font-light">
                            Conocer más
                          </span>
                          <ArrowRight size={18} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Agenda */}
          <section className="space-y-12">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-400 text-center">
              Nuestras Reuniones
            </h3>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-t border-b py-16 ${
                darkMode ? "border-stone-900" : "border-stone-100"
              }`}
            >
              {[
                {
                  icon: <Clock size={20} />, // Aumentado ligeramente el tamaño
                  day: "Martes",
                  title: "Oración",
                  time: "19:30 — 21:30",
                  color: "text-amber-500", // Color específico
                },
                {
                  icon: <Users size={20} />,
                  day: "Sábados",
                  title: "Jóvenes",
                  time: "19:30 — 21:30",
                  color: "text-orange-400",
                },
                {
                  icon: <Users size={20} />,
                  day: "Sábados",
                  title: "Adolescentes",
                  time: "19:30 — 21:30",
                  color: "text-orange-400",
                },
                {
                  icon: <Heart size={20} />,
                  day: "Domingos",
                  title: "Reunión General",
                  time: "10:00 — 12:00",
                  color: "text-rose-400",
                },
              ].map((item, idx) => (
                <div key={idx} className="space-y-6 text-center group">
                  {" "}
                  {/* Agregado group para hover effects */}
                  <div
                    className={`flex justify-center transition-transform duration-500 group-hover:scale-110 ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <div className="space-y-3">
                    <p className="text-[9px] uppercase tracking-widest text-stone-400 font-black">
                      {item.day}
                    </p>
                    <h4
                      className={`text-2xl font-serif italic ${
                        darkMode ? "text-stone-200" : "text-stone-800"
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs font-medium opacity-50">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ubicación */}
          <section className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
              <div className="text-center md:text-left space-y-3">
                <span className="text-[8px] font-black uppercase tracking-widest text-stone-400">
                  ¿Dónde encontrarnos?
                </span>
                <h2
                  className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}
                >
                  Calle los Heraldos 105
                </h2>
              </div>
              <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em] font-bold text-center md:text-right opacity-60">
                Justicia, Paz y Vida <br /> El Tambo, Huancayo
              </p>
            </div>
            <div
              className={`w-full h-80 rounded-[3.5rem] overflow-hidden border transition-all duration-1000 ${darkMode ? "border-stone-900 grayscale opacity-40" : "border-stone-100 shadow-2xl"}`}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3718.8953119717407!2d-75.23562292724115!3d-12.057841179133254!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e97906be66211%3A0x72ef7b6021e61c77!2sCiudad%20de%20Refugio%20Huancayo!5e1!3m2!1ses-419!2sus!4v1776532414486!5m2!1ses-419!2sus"
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          </section>

          <footer className="py-24 text-center border-t border-stone-100 dark:border-stone-900 mt-20">
            <div className="space-y-6">
              {/* Frase Principal con más presencia */}
              <p
                className={`text-xs md:text-sm uppercase tracking-[0.6em] font-black italic transition-colors duration-500 ${
                  darkMode ? "text-amber-500/80" : "text-stone-400"
                }`}
              >
                Una sola fe <span className="mx-2 opacity-30">•</span>
                Una sola gracia <span className="mx-2 opacity-30">•</span>
                Un solo Señor
              </p>

              {/* Separador Minimalista */}
              <div className="flex justify-center items-center gap-4 opacity-20">
                <div
                  className={`h-px w-12 ${darkMode ? "bg-stone-100" : "bg-stone-900"}`}
                />
                <div
                  className={`w-1 h-1 rounded-full ${darkMode ? "bg-stone-100" : "bg-stone-900"}`}
                />
                <div
                  className={`h-px w-12 ${darkMode ? "bg-stone-100" : "bg-stone-900"}`}
                />
              </div>

              {/* Créditos opcionales o copyright */}
              <p className="text-[9px] uppercase tracking-widest opacity-40 font-medium">
                &copy; {new Date().getFullYear()} Iglesia Brisas del Mantaro —
                Huancayo
              </p>
            </div>
          </footer>
        </div>
      </div>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
    </main>
  );
}
