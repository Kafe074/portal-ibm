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
    ChevronRight,
    Play,
    MessageCircle
} from 'lucide-react'

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
        <div className="relative w-full h-56 mb-8 rounded-[2rem] overflow-hidden group/item bg-stone-200/20 border border-stone-100 dark:border-stone-900">
            {isVideo(fotos[current]) ? (
                <video
                    key={fotos[current]}
                    src={fotos[current]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-all duration-700 grayscale group-hover/item:grayscale-0 group-hover/item:scale-105"
                />
            ) : (
                <img
                    src={fotos[current]}
                    className="w-full h-full object-cover transition-all duration-700 grayscale group-hover/item:grayscale-0 group-hover/item:scale-105"
                    alt="Actividad"
                />
            )}

            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover/item:opacity-100 transition-opacity z-10">
                <button onClick={prev} className={`p-2 rounded-full backdrop-blur-xl border ${darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-white/40 border-black/5 text-stone-800'}`}>
                    <ChevronLeft size={16} />
                </button>
                <button onClick={next} className={`p-2 rounded-full backdrop-blur-xl border ${darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-white/40 border-black/5 text-stone-800'}`}>
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {fotos.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all duration-500 ${current === i ? 'w-4 bg-white' : 'w-1 bg-white/30'}`} />
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
            desc: "Descubriendo las historias de la Biblia a través del asombro, el juego y la expresión creativa.",
            color: "text-amber-500",
            fotos: ["/escuela/estrellitas.jpg", "/escuela/estrellitas_1.jpg", "/escuela/estrellitas_2.mp4"]
        },
        {
            rango: "7 a 11 años",
            nombre: "Campeones",
            desc: "Fortaleciendo su identidad en Cristo y cultivando amistades que duran para siempre.",
            color: "text-blue-500",
            fotos: ["/escuela/campeones.jpg", "/escuela/campeones_1.jpg", "/escuela/campeones_2.mp4"]
        },
        {
            rango: "12 a 15 años",
            nombre: "Pre-Adolescentes",
            desc: "Cimentando la fe con respuestas reales a sus preguntas en un entorno de confianza.",
            color: "text-purple-500",
            fotos: ["/escuela/pre.jpg", "/escuela/pre_1.mp4"]
        },
        {
            rango: "16 a 18 años",
            nombre: "Adolescentes",
            desc: "Liderazgo, servicio y una fe inquebrantable para impactar su entorno actual.",
            color: "text-emerald-500",
            fotos: ["/escuela/teens.jpg", "/escuela/teens_1.mp4"]
        }
    ];

    return (
        <main className={`flex h-screen transition-colors duration-1000 overflow-hidden ${darkMode ? 'bg-[#0a0a0a] text-stone-400' : 'bg-[#fafaf9] text-stone-600'}`}>
            <div className="flex-1 flex flex-col overflow-y-auto font-light selection:bg-stone-200 custom-scrollbar">
                <div className="h-8 md:h-12" />

                <div className="w-full max-w-4xl mx-auto p-6 md:p-12 space-y-32">

                    {/* --- HERO CINEMÁTICO --- */}
                    <header className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Sparkles size={12} className="text-amber-500" />
                                    <span className="text-[9px] uppercase tracking-[0.6em] text-stone-400 font-bold block">Generación de Relevo</span>
                                </div>
                                <h1 className={`text-5xl md:text-7xl font-extralight tracking-tighter leading-none ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                                    Sembrando en <br />
                                    <span className="italic font-serif opacity-40">Tierra Fértil.</span>
                                </h1>
                                <p className="max-w-xs text-[13px] leading-relaxed opacity-60">
                                    Acompañamos a cada niño en el viaje de descubrir su propósito divino con amor y creatividad.
                                </p>
                            </div>

                            <a
                                href="https://wa.me/51989495033?text=Hola,%20deseo%20más%20información%20sobre%20la%20Escuela%20Dominical"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-4 text-[10px] uppercase tracking-widest font-black border-b border-current pb-2 hover:opacity-50 transition-all"
                            >
                                <MessageCircle size={14} />
                                Consultar para más información
                            </a>
                        </div>

                        <div className="relative group max-w-sm mx-auto md:ml-auto">
                            {/* Contenedor de la sombra (separado para evitar conflictos de recorte) */}
                            <div className={`relative aspect-square rounded-[3rem] ${darkMode ? 'shadow-none' : 'shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)]'} transition-all duration-700`}>

                                {/* Contenedor del video con recorte perfecto */}
                                <div className={`w-full h-full overflow-hidden rounded-[3rem] border isolate ${darkMode ? 'border-stone-800 bg-stone-900' : 'border-white bg-white'}`}>

                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                                    >
                                        <source src="/escuela/escuela_video.MOV" type="video/mp4" />
                                    </video>

                                    {/* Overlay sutil para dar profundidad pero manteniendo el color */}
                                    <div className={`absolute inset-0 pointer-events-none ${darkMode ? 'bg-black/20' : 'bg-stone-500/5'}`} />

                                </div>

                                {/* Elemento decorativo flotante (opcional, para romper la simetría) */}
                                <div className={`absolute -bottom-4 -left-4 w-20 h-20 border-l border-b rounded-bl-[2rem] opacity-20 ${darkMode ? 'border-stone-100' : 'border-stone-900'}`} />
                            </div>
                        </div>
                    </header>

                    {/* --- SALONES --- */}
                    <section className="space-y-16">
                        <div className="flex justify-between items-end border-b border-stone-200 dark:border-stone-900 pb-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">Grupos por Edades</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {salones.map((salon, idx) => (
                                <div key={idx} className={`p-8 rounded-[3.5rem] border transition-all duration-500 group ${darkMode ? 'bg-[#0f0f0f] border-stone-900 hover:border-stone-700' : 'bg-white border-stone-100 hover:shadow-2xl hover:-translate-y-1'}`}>
                                    <CarruselSalon fotos={salon.fotos} darkMode={darkMode} />
                                    <div className="flex justify-between items-center mb-6">
                                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${salon.color}`}>{salon.rango}</span>
                                        <div className={`p-2.5 rounded-2xl ${darkMode ? 'bg-stone-900' : 'bg-stone-50'}`}>
                                            <Baby size={16} strokeWidth={1.5} className="text-stone-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className={`text-3xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>{salon.nombre}</h4>
                                        <p className="text-[13px] opacity-60 leading-relaxed font-light">{salon.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* --- PILARES REFINADOS --- */}
                    <section className="py-20 border-y border-stone-200 dark:border-stone-900 grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: <ShieldCheck size={20} />, t: "Seguridad", d: "Protocolos estrictos en cada salón." },
                            { icon: <BookOpen size={20} />, t: "Creatividad", d: "La Biblia contada con asombro." },
                            { icon: <Heart size={20} />, t: "Comunidad", d: "Amistades con valores eternos." }
                        ].map((item, i) => (
                            <div key={i} className="text-center space-y-4">
                                <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-900 text-amber-500">
                                    {item.icon}
                                </div>
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-stone-400">{item.t}</h5>
                                <p className="text-xs opacity-60 leading-relaxed">{item.d}</p>
                            </div>
                        ))}
                    </section>

                    {/* --- INFO FINAL --- */}
                    <section className={`p-12 md:p-20 rounded-[4rem] text-center space-y-8 border ${darkMode ? 'bg-[#0f0f0f] border-stone-800' : 'bg-white border-stone-100 shadow-2xl'}`}>
                        <div className="space-y-4">
                            <Sun className="text-amber-500 mx-auto" size={32} strokeWidth={1} />
                            <h2 className={`text-4xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Visítanos este Domingo</h2>
                            <div className="flex flex-col md:flex-row justify-center gap-12 mt-8">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase text-amber-500 tracking-widest">Horario</p>
                                    <p className="text-sm font-medium">10:30 am — 12:30 pm</p>
                                </div>
                                <div className="hidden md:block w-px h-12 bg-stone-200 dark:bg-stone-800" />
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase text-amber-500 tracking-widest">Lugar</p>
                                    <p className="text-sm font-medium">Calle los Heraldos 105</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <footer className="py-12 text-center max-w-lg mx-auto">
                        <p className="text-[9px] uppercase tracking-[0.4em] opacity-40 font-medium leading-loose">
                            "Dejad que los niños vengan a mí, porque de ellos es el reino de los cielos." <br />
                            <span className="font-bold opacity-100 italic font-serif text-xs mt-2 block">— Mateo 19:14</span>
                        </p>
                    </footer>
                </div>
            </div>
            <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        </main>
    )
}