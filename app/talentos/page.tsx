'use client'
import { useState } from 'react'
import Sidebar from '@/app/components/sidebar'
import {
    Trophy,
    MessageCircle,
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
    Heart
} from 'lucide-react'

export default function Talentos() {
    const [darkMode, setDarkMode] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)

    const fotosCarrusel = [
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200",
        "https://images.unsplash.com/photo-1510566337590-2fc1f3c71131?q=80&w=1200",
    ];

    const valores = [
        {
            titulo: "Disciplina y Orden",
            subtitulo: "Proverbios 22:6",
            desc: "Instruimos al joven en la técnica y el respeto como reflejo de su fe.",
            icono: <ShieldCheck size={16} />,
            img: "/talentos/talentos.jpg"
        },
        {
            titulo: "Corazón de Siervo",
            subtitulo: "1 Corintios 10:31",
            desc: "Buscamos la excelencia para la gloria de Dios y el compañerismo real.",
            icono: <Heart size={16} />,
            img: "/talentos/talentos_1.jpg"
        }
    ];

    return (
        <main className={`flex h-screen transition-colors duration-1000 overflow-hidden ${darkMode ? 'bg-[#0a0a0a] text-stone-400' : 'bg-[#fafaf9] text-stone-600'}`}>

            <div className="flex-1 flex flex-col overflow-y-auto font-light selection:bg-stone-200 custom-scrollbar">

                <div className="h-8 md:h-12" />

                <div className="w-full max-w-4xl mx-auto p-6 md:p-12 space-y-20">

                    {/* --- HEADER COMPACTO --- */}
                    <header className="space-y-4 text-center md:text-left">
                        <span className="text-[8px] uppercase tracking-[0.6em] text-stone-400 font-bold block">
                            Ministerio de Deporte
                        </span>
                        <h2 className={`text-4xl md:text-6xl font-extralight tracking-tighter leading-tight ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                            Academia de <br />
                            <span className="italic font-serif opacity-40 text-3xl md:text-5xl">Talentos IBM</span>
                        </h2>
                    </header>

                    {/* --- CARRUSEL REDUCIDO --- */}
                    <div className="relative group">
                        <div className={`relative h-64 md:h-96 w-full rounded-[2.5rem] overflow-hidden border ${darkMode ? 'border-stone-900 bg-stone-900' : 'border-stone-100 bg-stone-50 shadow-lg'}`}>
                            <img
                                src={fotosCarrusel[currentSlide]}
                                className="w-full h-full object-cover grayscale opacity-80 transition-all duration-700"
                                alt="Academia"
                            />
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <button
                                    onClick={() => setCurrentSlide(currentSlide === 0 ? 1 : 0)}
                                    className={`p-2 rounded-full border backdrop-blur-md transition-all ${darkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}
                                >
                                    <ChevronLeft size={14} />
                                </button>
                                <button
                                    onClick={() => setCurrentSlide(currentSlide === 0 ? 1 : 0)}
                                    className={`p-2 rounded-full border backdrop-blur-md transition-all ${darkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}
                                >
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- VALORES REFINADOS --- */}
                    <div className="space-y-24">
                        {valores.map((valor, idx) => (
                            <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}>
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl ${darkMode ? 'bg-stone-900 text-stone-300' : 'bg-stone-100 text-stone-500'}`}>
                                            {valor.icono}
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 opacity-60">{valor.subtitulo}</span>
                                    </div>
                                    <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>{valor.titulo}</h3>
                                    <p className="text-xs leading-relaxed opacity-70">
                                        {valor.desc}
                                    </p>
                                </div>
                                <div className="flex-1 w-full">
                                    <div className={`aspect-video rounded-[2rem] overflow-hidden border ${darkMode ? 'border-stone-900' : 'border-stone-100 shadow-md'}`}>
                                        <img src={valor.img} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700" alt="Valor" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- CTA COMPACTO --- */}
                    <section className={`p-10 md:p-16 rounded-[3rem] text-center space-y-6 border ${darkMode ? 'bg-[#0f0f0f] border-stone-900' : 'bg-white border-stone-100 shadow-sm'}`}>
                        <div className="space-y-3">
                            <Trophy className="mx-auto text-stone-400 opacity-20" size={32} strokeWidth={1} />
                            <h2 className={`text-2xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Únete al equipo</h2>
                            <p className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-bold">Niños y jóvenes de 7 a 17 años</p>
                        </div>

                        <button
                            onClick={() => window.open('https://wa.me/tu_numero', '_blank')}
                            className={`group px-8 py-4 rounded-full inline-flex items-center gap-3 transition-all ${darkMode ? 'bg-stone-100 text-stone-900' : 'bg-stone-900 text-stone-100'}`}
                        >
                            <MessageCircle size={14} className="group-hover:rotate-12 transition-transform" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Contactar Entrenador</span>
                        </button>
                    </section>

                    <footer className="py-12 text-center">
                        <p className="text-[8px] uppercase tracking-[0.5em] opacity-30 font-bold italic">
                            Compañerismo, espiritu y excelencia
                        </p>
                    </footer>

                </div>
            </div>

            <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        </main>
    )
}