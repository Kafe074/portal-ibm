'use client'
import { useState } from 'react'
import Sidebar from '@/app/components/sidebar'
import {
  MapPin, Clock, Heart, ArrowRight,
  ChevronLeft, ChevronRight,
  CalendarDays, Users, Star
} from 'lucide-react'
import Link from 'next/link'

export default function InicioPublico() {
  const [darkMode, setDarkMode] = useState(false)

  // Estados independientes para cada carrusel
  const [indexHistoria, setIndexHistoria] = useState(0)
  const [indexVision, setIndexVision] = useState(0)
  const [indexMision, setIndexMision] = useState(0)

  const fotosHistoria = [
    { type: 'image', url: "/historia/iglesia_niños.jpeg" },
    { type: 'image', url: "/historia/historia_6.jpg" },
    { type: 'image', url: "/historia/paseo.jpeg" }
  ]

  const fotosVision = [
    { type: 'image', url: "/historia/historia_3.jpg" },
    { type: 'image', url: "/historia/historia_5.jpg" },
    { type: 'image', url: "/historia/historia_1.jpg" } // Asegúrate que exista historia_1 o cambia el nombre
  ]

  const fotosMision = [
    { type: 'image', url: "/historia/historia_4.jpg" },
    { type: 'image', url: "/historia/historia_3.jpg" },
    { type: 'image', url: "/historia/historia_6.jpg" }
  ]

  // Datos de ministerios con imágenes y links
  const ministerios = [
    { nombre: "Misiones", img: "/ministerios/misiones.jpg", link: "/ministerios/misiones" },
    { nombre: "Acción Social", img: "/ministerios/accion-social.jpg", link: "/ministerios/accion-social" },
    { nombre: "Alabanza", img: "/ministerios/alabanza.jpg", link: "/ministerios/alabanza" },
    { nombre: "Escuela Dominical", img: "/ministerios/ninos.jpg", link: "/ministerios/escuela-dominical" },
    { nombre: "Producción", img: "/ministerios/media.jpg", link: "/ministerios/produccion" },
    { nombre: "Conectadas", img: "/ministerios/mujeres.jpg", link: "/ministerios/conectadas" },
    { nombre: "Generación Emergente", img: "/ministerios/jovenes.jpg", link: "/ministerios/jovenes" },
    { nombre: "Servir", img: "/ministerios/servir.jpg", link: "/ministerios/servir" },
    { nombre: "Adolescentes", img: "/ministerios/teens.jpg", link: "/ministerios/teens" },
    { nombre: "Pre-adolescentes", img: "/ministerios/pre-teens.jpg", link: "/ministerios/pre-teens" }
  ]

  const nextSlide = (setFn: any, length: number) => setFn((prev: number) => (prev + 1) % length)
  const prevSlide = (setFn: any, length: number) => setFn((prev: number) => (prev - 1 + length) % length)

  return (
    <main className={`flex h-screen transition-colors duration-1000 overflow-hidden ${darkMode ? 'bg-[#0a0a0a] text-stone-400' : 'bg-[#fafaf9] text-stone-600'}`}>

      <div className="flex-1 flex flex-col overflow-y-auto font-light selection:bg-stone-200 custom-scrollbar">
        <div className="h-8 md:h-12" />

        <div className="w-full max-w-5xl mx-auto p-6 md:p-12 space-y-32">

          {/* Hero Section - LOGO MÁS GRANDE */}
          <section className="text-center space-y-8 py-6 relative">
            <div className="space-y-4">
              <div className="flex justify-center mb-8">
                <img
                  src="/IBM.png"
                  alt="Logo"
                  className={`w-20 h-20 md:w-24 md:h-24 object-contain transition-all duration-1000 ${darkMode ? 'opacity-40 grayscale invert' : 'opacity-30 grayscale'}`}
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.6em] text-stone-400 font-bold block">Iglesia Brisas del Mantaro</span>
              <h1 className={`text-5xl md:text-8xl font-extralight tracking-tighter leading-[1] ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                Una iglesia <br />
                <span className="italic font-serif opacity-40">Generacional.</span>
              </h1>
            </div>

            <div className="flex flex-col items-center gap-6">
              <p className="max-w-xs text-[13px] leading-relaxed tracking-wide opacity-70 italic font-serif">
                "Con una sola misión . Jerusalén, Judea, Samaria y hasta lo ultimo de la tierra ."
              </p>
              <Link href="/calendario" className={`flex items-center gap-3 px-8 py-4 rounded-full border text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${darkMode ? 'border-stone-800 hover:bg-stone-900 text-stone-300' : 'border-stone-200 hover:bg-stone-50 text-stone-800 shadow-sm'}`}>
                Ver Calendario <ArrowRight size={14} />
              </Link>
            </div>
          </section>

          {/* Sección: Historia - CARRUSEL FUNCIONAL */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-left">
              <h2 className={`text-3xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Nuestra Historia</h2>
              <p className="text-[13px] leading-relaxed opacity-80">
                Nacimos como una  iglesia de niños, con una sola visión amar a Dios y al prójimo en nuestra comunidad.
              </p>
              <div className="flex gap-4 pt-4">
                <button onClick={() => prevSlide(setIndexHistoria, fotosHistoria.length)} className="p-2 border rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"><ChevronLeft size={16} /></button>
                <button onClick={() => nextSlide(setIndexHistoria, fotosHistoria.length)} className="p-2 border rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[3rem] aspect-[4/5] md:aspect-square border dark:border-stone-900 shadow-2xl">
              <img
                src={fotosHistoria[indexHistoria].url}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                alt="Historia"
              />
            </div>
          </section>

         {/* --- SECCIÓN: VISIÓN (Imagen Izquierda, Texto Derecha) --- */}
<section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
    <div className="relative order-2 md:order-1 overflow-hidden rounded-[3rem] aspect-[4/5] md:aspect-square border dark:border-stone-900 shadow-2xl isolate">
        <img
            src={fotosVision[indexVision].url}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out hover:scale-105"
            alt="Visión"
        />
        {/* Overlay sutil para el modo oscuro */}
        {darkMode && <div className="absolute inset-0 bg-black/20 pointer-events-none" />}
    </div>
    
    <div className="space-y-6 text-left md:text-right order-1 md:order-2">
        <h2 className={`text-4xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Nuestra Visión</h2>
        <p className="text-[13px] leading-relaxed opacity-70 font-light">
            Ser una iglesia generacional, apasionada por Dios y por el prójimo donde podamos ver vidas cambiadas por Jesús y así impactar su esfera de influencia para la gloria de Dios.
        </p>
        <div className="flex gap-4 pt-4 justify-start md:justify-end">
            <button onClick={() => prevSlide(setIndexVision, fotosVision.length)} className="p-3 border rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 dark:border-stone-800 transition-colors">
                <ChevronLeft size={16} />
            </button>
            <button onClick={() => nextSlide(setIndexVision, fotosVision.length)} className="p-3 border rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 dark:border-stone-800 transition-colors">
                <ChevronRight size={16} />
            </button>
        </div>
    </div>
</section>

{/* --- SECCIÓN: MISIÓN (Texto Izquierda, Imagen Derecha) --- */}
<section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
    <div className="space-y-6 text-left">
        <h2 className={`text-4xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Nuestra Misión</h2>
        <p className="text-[13px] leading-relaxed opacity-70 font-light">
            Estamos levantando una nueva generación que se apasione por Dios y por el prójimo, creando espacios y ambientes que inviten a relacionarse con el creador mediante su palabra.
        </p>
        <div className="flex gap-4 pt-4 justify-start">
            {/* Si tienes un carrusel para misión, usa un estado diferente como indexMision */}
            <button onClick={() => prevSlide(setIndexMision, fotosMision.length)} className="p-3 border rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 dark:border-stone-800 transition-colors">
                <ChevronLeft size={16} />
            </button>
            <button onClick={() => nextSlide(setIndexMision, fotosMision.length)} className="p-3 border rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 dark:border-stone-800 transition-colors">
                <ChevronRight size={16} />
            </button>
        </div>
    </div>

    <div className="relative overflow-hidden rounded-[3rem] aspect-[4/5] md:aspect-square border dark:border-stone-900 shadow-2xl isolate">
        <img
            src={fotosMision[indexMision].url}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out hover:scale-105"
            alt="Misión"
        />
        {darkMode && <div className="absolute inset-0 bg-black/20 pointer-events-none" />}
    </div>
</section>

          {/* Galería de Ministerios Dinámica (Accordion-style hover) */}
          <section className="space-y-12">
            <h3 className="text-[9px] font-black uppercase tracking-[0.5em] text-stone-400 text-center">Nuestros Ministerios</h3>
            <div className="flex flex-col md:flex-row gap-4 h-[500px] md:h-[400px]">
              {ministerios.map((min, i) => (
                <Link
                  key={i}
                  href={min.link}
                  className="relative flex-1 hover:flex-[3] transition-all duration-700 ease-in-out overflow-hidden rounded-[2rem] group border dark:border-stone-900"
                >
                  <img src={min.img} className="absolute inset-0 w-full h-full object-cover" alt={min.nombre} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white text-[10px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">Explorar</p>
                    <h4 className="text-white text-xl md:text-2xl font-serif italic whitespace-nowrap">{min.nombre}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Agenda */}
          <section className="space-y-12">
            <h3 className="text-[9px] font-black uppercase tracking-[0.5em] text-stone-400 text-center">Nuestras Reuniones</h3>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-t border-b py-16 ${darkMode ? 'border-stone-900' : 'border-stone-100'}`}>
              {[
                { icon: <Clock size={16} />, day: "Martes", title: "Oración", time: "19:30 — 21:30" },
                { icon: <Users size={16} />, day: "Sábados", title: "Jóvenes", time: "19:30 — 21:30" },
                { icon: <Users size={16} />, day: "Sábados", title: "Adolescentes", time: "19:30 — 21:30" },
                { icon: <Heart size={16} />, day: "Domingos", title: "Reunión General", time: "10:00 — 12:00" }
              ].map((item, idx) => (
                <div key={idx} className="space-y-4 text-center">
                  <div className="text-stone-300 flex justify-center">{item.icon}</div>
                  <div className="space-y-2">
                    <p className="text-[8px] uppercase tracking-widest text-stone-400 font-black">{item.day}</p>
                    <h4 className={`text-xl font-serif italic ${darkMode ? 'text-stone-200' : 'text-stone-800'}`}>{item.title}</h4>
                    <p className="text-[10px] font-medium opacity-50">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ubicación */}
          <section className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
              <div className="text-center md:text-left space-y-3">
                <span className="text-[8px] font-black uppercase tracking-widest text-stone-400">¿Dónde encontrarnos?</span>
                <h2 className={`text-3xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Calle los Heraldos 105</h2>
              </div>
              <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em] font-bold text-center md:text-right opacity-60">
                Justicia, Paz y Vida <br /> El Tambo, Huancayo
              </p>
            </div>
            <div className={`w-full h-80 rounded-[3.5rem] overflow-hidden border transition-all duration-1000 ${darkMode ? 'border-stone-900 grayscale opacity-40' : 'border-stone-100 shadow-2xl'}`}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14875.844776964977!2d-75.23131990621366!3d-12.053088526400664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e97906be66211%3A0x72ef7b6021e61c77!2sCiudad%20de%20Refugio%20Huancayo!5e1!3m2!1ses!2spe!4v1775870732946!5m2!1ses!2spe" className="w-full h-full border-0" allowFullScreen={true} loading="lazy"></iframe>
            </div>
          </section>

          <footer className="py-12 text-center">
            <p className="text-[8px] uppercase tracking-[0.8em] opacity-30 font-bold italic">
              Una sola fe — Una sola gracia — Un solo Señor
            </p>
          </footer>
        </div>
      </div>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
    </main>
  )
}