'use client'
import { useState } from 'react'
import Sidebar from '@/app/components/sidebar'
import {
    Baby,
    Sparkles,
    ShieldCheck,
    Sun,
    BookOpen,
    Heart,
    ChevronLeft,
    ChevronRight
} from 'lucide-react'

// Componente pequeño para el carrusel de cada tarjeta
// Componente pequeño para el carrusel de cada tarjeta con soporte para Video
function CarruselSalon({ fotos, darkMode }: { fotos: string[], darkMode: boolean }) {
    const [current, setCurrent] = useState(0);

    const next = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrent((prev) => (prev + 1) % fotos.length);
    };

    const prev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrent((prev) => (prev - 1 + fotos.length) % fotos.length);
    };

    const isVideo = (path: string) => path.toLowerCase().endsWith('.mp4');

    return (
        <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden group/item bg-stone-200/20">
            {isVideo(fotos[current]) ? (
                <video
                    key={fotos[current]}
                    src={fotos[current]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-all duration-700 grayscale hover:grayscale-0"
                />
            ) : (
                <img
                    src={fotos[current]}
                    className="w-full h-full object-cover transition-all duration-700 grayscale hover:grayscale-0"
                    alt="Actividad"
                />
            )}

            {/* Controles sutiles */}
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/item:opacity-100 transition-opacity z-10">
                <button onClick={prev} className={`p-1.5 rounded-full backdrop-blur-md ${darkMode ? 'bg-black/40 text-white' : 'bg-white/40 text-stone-800'}`}>
                    <ChevronLeft size={14} />
                </button>
                <button onClick={next} className={`p-1.5 rounded-full backdrop-blur-md ${darkMode ? 'bg-black/40 text-white' : 'bg-white/40 text-stone-800'}`}>
                    <ChevronRight size={14} />
                </button>
            </div>

            {/* Indicadores */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {fotos.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all ${current === i ? 'w-3 bg-white' : 'w-1 bg-white/40'}`} />
                ))}
            </div>
        </div>
    );
}

export default function EscuelaDominical() {
    const [darkMode, setDarkMode] = useState(false)

    const salones = [
        {
            rango: "3 a 6 años",
            nombre: "Estrellitas",
            desc: "Enseñanzas bíblicas y valores a través de juegos y creatividad.",
            color: "text-amber-500",
            // Agrega aquí las rutas de tus fotos locales
            fotos: [
                "/escuela/estrellitas.jpg",
                "/escuela/estrellitas_1.jpg",
                "/escuela/estrellitas_2.mp4"
            ]
        },
        {
            rango: "7 a 11 años",
            nombre: "Campeones",
            desc: "Creando su identidad en Cristo y fortaleciendo el compañerismo.",
            color: "text-blue-500",
            fotos: [
                "/escuela/campeones.jpg",
                "/escuela/campeones_1.jpg",
                "/escuela/campeones_2.mp4"
            ]
        },
        {
            rango: "12 a 15 años",
            nombre: "Pre-Adolescentes",
            desc: "Equipando a las nuevas generaciones con fundamentos sólidos de fe y carácter.",
            color: "text-purple-500",
            fotos: [
                "/escuela/pre.jpg",
                "/escuela/pre_1.mp4"
            ]
        },
        {
            rango: "16 a 18 años",
            nombre: "Adolescentes",
            desc: "Consolidando su fe y preparándolos para ser líderes y siervos en la iglesia y la sociedad.",
            color: "text-emerald-500",
            fotos: [
                "/escuela/teens.jpg",
                "/escuela/teens_1.mp4"
            ]
        }
    ];

    return (
        <main className={`flex h-screen transition-colors duration-1000 overflow-hidden ${darkMode ? 'bg-[#0a0a0a] text-stone-400' : 'bg-[#fafaf9] text-stone-600'}`}>

            <div className="flex-1 flex flex-col overflow-y-auto font-light selection:bg-stone-200 custom-scrollbar">

                <div className="h-8 md:h-12" />

                <div className="w-full max-w-4xl mx-auto p-6 md:p-12 space-y-24">

                    {/* --- HERO COMPACTO --- */}
                    <header className="space-y-6 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <Sparkles size={14} className="text-amber-500 opacity-50" />
                            <span className="text-[8px] uppercase tracking-[0.6em] text-stone-400 font-bold block">
                                Generación de Relevo
                            </span>
                        </div>
                        <h1 className={`text-4xl md:text-6xl font-extralight tracking-tighter leading-tight ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                            Sembrando en <br />
                            <span className="italic font-serif opacity-40 text-3xl md:text-5xl">Tierra Fértil.</span>
                        </h1>
                        <p className="max-w-md text-[13px] leading-relaxed opacity-70 mx-auto md:mx-0">
                            Guiamos a cada niño a descubrir su propósito divino en un ambiente de seguridad, amor y enseñanza creativa.
                        </p>
                    </header>

                    {/* --- GRID DE SALONES CON CARRUSEL INDIVIDUAL --- */}
                    <section className="space-y-10">
                        <h3 className="text-[8px] font-black uppercase tracking-[0.4em] text-stone-400 text-center md:text-left border-b pb-4 border-stone-100/10">Grupos por Edades</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {salones.map((salon, idx) => (
                                <div key={idx} className={`p-6 rounded-[2.5rem] border transition-all duration-500 group ${darkMode ? 'bg-[#0f0f0f] border-stone-900 hover:border-stone-700' : 'bg-white border-stone-100 hover:shadow-md'}`}>

                                    {/* Carrusel de fotos del salón */}
                                    <CarruselSalon fotos={salon.fotos} darkMode={darkMode} />

                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${salon.color}`}>{salon.rango}</span>
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${darkMode ? 'bg-stone-900' : 'bg-stone-50'}`}>
                                            <Baby size={14} strokeWidth={1} className="text-stone-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className={`text-xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>{salon.nombre}</h4>
                                        <p className="text-xs opacity-70 leading-relaxed">{salon.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* --- PILARES --- */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-10 order-2 md:order-1">
                            <div className="space-y-4">
                                <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Nuestros Pilares</h3>
                                <p className="text-xs leading-relaxed opacity-70">Formamos el corazón conjuntamente con la mente, logrando que cada niño se sienta amado por Dios y reconozca su valor.</p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { icon: <ShieldCheck size={16} />, t: "Entorno Seguro", d: "Protocolos de seguridad en cada salón." },
                                    { icon: <BookOpen size={16} />, t: "Biblia Creativa", d: "Lecciones adaptadas dinámicamente." },
                                    { icon: <Heart size={16} />, t: "Amor Práctico", d: "Fomentamos la empatía y el servicio." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className={`mt-1 p-2 rounded-lg ${darkMode ? 'bg-stone-900 text-amber-500' : 'bg-stone-100 text-amber-500'}`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h5 className="text-[9px] font-black uppercase tracking-widest text-stone-400">{item.t}</h5>
                                            <p className="text-[11px] opacity-60 leading-tight">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative order-1 md:order-2">
                            <div className={`aspect-[4/5] rounded-[2.5rem] overflow-hidden border ${darkMode ? 'border-stone-800 opacity-60' : 'border-stone-100 shadow-xl'}`}>
                                <img
                                    src="https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?q=80&w=800"
                                    className="w-full h-full object-cover grayscale"
                                    alt="Labor con niños"
                                />
                            </div>
                            <div className={`absolute -bottom-4 -right-4 p-6 rounded-[1.5rem] border backdrop-blur-md ${darkMode ? 'bg-stone-900/90 border-stone-800' : 'bg-white/90 border-stone-100 shadow-lg'}`}>
                                <Sun className="text-amber-500 mb-1" size={20} />
                                <p className="text-[8px] font-black uppercase tracking-widest leading-none">Inspirando<br />Mañanas</p>
                            </div>
                        </div>
                    </section>

                    {/* --- INFO FINAL --- */}
                    <section className={`p-10 md:p-14 rounded-[3rem] border ${darkMode ? 'border-stone-900 bg-[#0c0c0c]' : 'border-stone-50 bg-white shadow-sm'}`}>
                        <div className="max-w-lg mx-auto text-center space-y-8">
                            <h2 className={`text-2xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>¿Cómo funcionamos?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase text-amber-500 tracking-widest">Horario</p>
                                    <p className="text-[11px] opacity-70 leading-relaxed font-medium">Domingos: 10:00 a.m. - 12:00 p.m.</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase text-amber-500 tracking-widest">Ubicación</p>
                                    <p className="text-[11px] opacity-70 leading-relaxed font-medium">Brisas del Mantaro . Calle los Heraldos 105.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <footer className="py-12 text-center">
                        <p className="text-[8px] uppercase tracking-[0.5em] opacity-30 font-bold italic">
                            Dejad que los niños vengan a mí, porque de ellos es el reino de los cielos. - Mateo 19:14
                        </p>
                    </footer>

                </div>
            </div>

            <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        </main>
    )
}