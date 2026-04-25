'use client'
import { useState } from 'react'
import Sidebar from '@/app/components/sidebar'
import {
    Trophy,
    MessageCircle,
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
    Heart,
    Timer,
    Users,
    CheckCircle2,
    Play
} from 'lucide-react'

export default function Talentos() {
    const [darkMode, setDarkMode] = useState(false)
    
    // Estados para los mini-carruseles de valores
    const [slideValor1, setSlideValor1] = useState(0)
    const [slideValor2, setSlideValor2] = useState(0)

    const stats = [
        { label: "Participantes", value: "25+", icon: <Users size={12} /> },
        { label: "Días de Entrenamiento", value: "Sábados", icon: <Timer size={12} /> },
        { label: "Categoría", value: "2 categorias", icon: <Trophy size={12} /> },
    ];

    const requisitos = [
        "Uniforme de la academia",
        "Canilleras (obligatorio)",
        "Hidratación personal",
        "Puntualidad y respeto"
    ];

    const valores = [
        {
            titulo: "Disciplina y Orden",
            subtitulo: "Proverbios 22:6",
            desc: "Instruimos al joven en disciplina y orden con el fin de formar su carácter .",
            icono: <ShieldCheck size={16} />,
            imgs: ["https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/talentos/talentos_1", "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/talentos/talentos_2", "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/talentos/talentos_5"],
            currentSlide: slideValor1,
            setSlide: setSlideValor1
        },
        {
            titulo: "Corazón de Siervo",
            subtitulo: "1 Corintios 10:31",
            desc: "Buscamos la excelencia para la gloria de Dios. El fútbol es el campo donde practicamos la humildad y el compañerismo real.",
            icono: <Heart size={16} />,
            imgs: ["https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/talentos/talentos", "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/talentos/talentos_3", "https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/talentos/talentos_4"],
            currentSlide: slideValor2,
            setSlide: setSlideValor2
        }
    ];

    return (
        <main className={`flex h-screen transition-colors duration-1000 overflow-hidden ${darkMode ? 'bg-[#0a0a0a] text-stone-400' : 'bg-[#fafaf9] text-stone-600'}`}>

            <div className="flex-1 flex flex-col overflow-y-auto font-light selection:bg-stone-200 custom-scrollbar">

                <div className="h-8 md:h-12" />

                <div className="w-full max-w-4xl mx-auto p-6 md:p-12 space-y-24">

                    {/* --- HEADER --- */}
                    <header className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="space-y-4 text-left">
                            <span className="text-[8px] uppercase tracking-[0.6em] text-stone-400 font-bold block">
                                Escuela de Fútbol
                            </span>
                            <h2 className={`text-4xl md:text-6xl font-extralight tracking-tighter leading-tight ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                                Academia de <br />
                                <span className="italic font-serif opacity-40 text-3xl md:text-5xl">Talentos IBM</span>
                            </h2>
                        </div>
                        
                        <div className="flex gap-8 border-l border-stone-200 dark:border-stone-800 pl-8 pb-2">
                            {stats.map((stat, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex items-center gap-2 text-stone-400">
                                        {stat.icon}
                                        <span className="text-[7px] uppercase tracking-widest font-bold">{stat.label}</span>
                                    </div>
                                    <p className={`text-xl font-serif italic ${darkMode ? 'text-stone-200' : 'text-stone-800'}`}>{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </header>

                    {/* --- VIDEO HERO (Primer Carrusel reemplazado) --- */}
                    <div className="relative group">
                        <div className={`relative h-72 md:h-[450px] w-full rounded-[3rem] overflow-hidden border ${darkMode ? 'border-stone-900 bg-stone-900' : 'border-stone-100 bg-stone-50 shadow-2xl'}`}>
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:scale-105"
                            >
                                <source src="/talentos/talentos_7.mp4" type="video/mp4" />
                                Tu navegador no soporta videos.
                            </video>
                            
                            {/* Overlay decorativo para el video */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent pointer-events-none" />
                            <div className="absolute bottom-8 left-8 flex items-center gap-3">
                                <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                    <Play size={12} className="text-white fill-white" />
                                </div>
                                <span className="text-[9px] uppercase tracking-[0.3em] text-white/70 font-bold font-sans">Sesión de Entrenamiento</span>
                            </div>
                        </div>
                    </div>

                    {/* --- REQUISITOS --- */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 border-y border-stone-200 dark:border-stone-900">
                        <div>
                            <h4 className={`text-2xl font-serif italic mb-4 ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Preparación para el juego</h4>
                            <p className="text-xs opacity-60 leading-relaxed">Fomentamos la responsabilidad desde el momento en que preparan su mochila para el entrenamiento.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {requisitos.map((req, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <CheckCircle2 size={12} className="text-stone-400 mt-1" />
                                    <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">{req}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* --- VALORES CON CARRUSEL --- */}
                    <div className="space-y-32">
                        {valores.map((valor, idx) => (
                            <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20 items-center`}>
                                <div className={`flex-1 space-y-6 ${idx % 2 !== 0 ? 'md:text-right' : 'text-left'}`}>
                                    <div className={`flex items-center gap-3 ${idx % 2 !== 0 ? 'md:justify-end' : 'justify-start'}`}>
                                        <div className={`p-3 rounded-2xl ${darkMode ? 'bg-stone-900 text-stone-300' : 'bg-stone-100 text-stone-500'}`}>
                                            {valor.icono}
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-stone-400">{valor.subtitulo}</span>
                                    </div>
                                    <h3 className={`text-3xl md:text-4xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>{valor.titulo}</h3>
                                    <p className="text-[13px] leading-relaxed opacity-70 font-light">
                                        {valor.desc}
                                    </p>
                                </div>
                                
                                {/* Mini Carrusel de Imágenes */}
                                <div className="flex-1 w-full group relative">
                                    <div className={`aspect-square md:aspect-[4/5] rounded-[3.5rem] overflow-hidden border transition-all duration-700 ${darkMode ? 'border-stone-900' : 'border-stone-100 shadow-xl group-hover:shadow-2xl'}`}>
                                        <img 
                                            src={valor.imgs[valor.currentSlide]} 
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000" 
                                            alt={valor.titulo} 
                                        />
                                        
                                        {/* Navegación del Mini Carrusel */}
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => valor.setSlide(prev => (prev === 0 ? valor.imgs.length - 1 : prev - 1))}
                                                className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white"
                                            >
                                                <ChevronLeft size={14} />
                                            </button>
                                            <button 
                                                onClick={() => valor.setSlide(prev => (prev === valor.imgs.length - 1 ? 0 : prev + 1))}
                                                className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white"
                                            >
                                                <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- CTA --- */}
                    <section className={`p-12 md:p-20 rounded-[4rem] text-center space-y-8 border ${darkMode ? 'bg-[#0f0f0f] border-stone-800' : 'bg-white border-stone-100 shadow-2xl'}`}>
                        <div className="space-y-4">
                            <h2 className={`text-3xl md:text-5xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Únete al equipo</h2>
                            <p className="max-w-xs mx-auto text-[10px] uppercase tracking-[0.3em] text-stone-500 leading-relaxed">
                                Sábados de 4:00 pm a 6:00 pm <br />
                                Niños y jóvenes de 7 a 17 años
                            </p>
                        </div>

                        <button
                            onClick={() => window.open('https://wa.me/51982794302', '_blank')}
                            className={`group px-10 py-5 rounded-full inline-flex items-center gap-4 transition-all hover:scale-105 active:scale-95 ${darkMode ? 'bg-stone-100 text-stone-900' : 'bg-stone-900 text-stone-100'}`}
                        >
                            <MessageCircle size={16} className="group-hover:rotate-12 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Inscribir a mi hijo</span>
                        </button>
                    </section>

                    <footer className="py-24 text-center border-t border-stone-100 dark:border-stone-900 mt-20">
            <div className="space-y-6">
              {/* Frase Principal con más presencia */}
              <p
                className={`text-xs md:text-sm uppercase tracking-[0.6em] font-black italic transition-colors duration-500 ${
                  darkMode ? "text-amber-500/80" : "text-stone-400"
                }`}
              >
                Compañerismo <span className="mx-2 opacity-30">•</span>
                Espirítu <span className="mx-2 opacity-30">•</span>
                Excelencia
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
    )
}