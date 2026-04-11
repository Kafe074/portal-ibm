'use client'
import { useState } from 'react'
import Sidebar from '@/app/components/sidebar'
import { BookOpen, Clock, Star, ArrowRight, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function CursosPublico() {
    const [darkMode, setDarkMode] = useState(false)

    const cursos = [
        {
            titulo: "Los dos reinos",
            descripcion: "Un recorrido para aprender sobre el reino de los cielos y el reino de las tinieblas, y cómo vivir en la luz.",
            duracion: "8 Sesiones",
            categoria: "Discipulado",
            imagen: "/cursos/cursos_1.jpg"
        },
        {
            titulo: "Libertad Financiera",
            descripcion: "Aprende a gestionar tus finanzas a la manera del reino de Dios.",
            duracion: "8 Sesiones",
            categoria: "Ministerial",
            imagen: "/cursos/cursos_2.jpeg"
        },
        {
            titulo: "Doctrina Basica 1",
            descripcion: "Principios bíblicos para el crecimiento espiritual y la vida cristiana.",
            duracion: "8 Sesiones",
            categoria: "Discipulado",
            imagen: "/cursos/cursos_3.jpg"
        },
    ]

    return (
        <main className={`flex h-screen transition-colors duration-1000 overflow-hidden ${darkMode ? 'bg-[#0a0a0a] text-stone-400' : 'bg-[#fafaf9] text-stone-600'}`}>

            <div className="flex-1 flex flex-col overflow-y-auto font-light custom-scrollbar">
                <div className="h-12 md:h-20" />

                <div className="w-full max-w-5xl mx-auto p-6 md:p-12 space-y-20">

                    {/* Header de la Sección */}
                    <header className="space-y-6 text-center">
                        <div className="flex justify-center">
                            <div className={`p-4 rounded-full border ${darkMode ? 'border-stone-800' : 'border-stone-100 shadow-sm'}`}>
                                <GraduationCap size={32} className="opacity-40" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold block">Cursos IBM</span>
                            <h1 className={`text-4xl md:text-6xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                                Crecimiento Espiritual
                            </h1>
                        </div>
                        <p className="max-w-xl mx-auto text-sm leading-relaxed opacity-70">
                            Nuestros cursos están diseñados para equiparte en tu caminar con Cristo.
                            Infórmate sobre nuestras próximas aperturas y modalidades.
                        </p>
                    </header>

                    {/* Grid de Cursos */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-20">
                        {cursos.map((curso, idx) => (
                            <div
                                key={idx}
                                className={`group relative overflow-hidden rounded-[2.5rem] border transition-all duration-500 ${darkMode ? 'border-stone-900 bg-stone-950/50' : 'border-stone-100 bg-white shadow-sm hover:shadow-xl'
                                    }`}
                            >
                                {/* Imagen del Curso */}
                                <div className="aspect-[16/9] overflow-hidden">
                                    <img
                                        src={curso.imagen}
                                        alt={curso.titulo}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                                    />
                                </div>

                                {/* Contenido */}
                                <div className="p-8 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[9px] uppercase tracking-widest font-bold text-stone-400">
                                            {curso.categoria}
                                        </span>
                                        <div className="flex items-center gap-2 text-[10px] opacity-60">
                                            <Clock size={12} /> {curso.duracion}
                                        </div>
                                    </div>

                                    <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                                        {curso.titulo}
                                    </h3>

                                    <p className="text-xs leading-relaxed opacity-70 line-clamp-2">
                                        {curso.descripcion}
                                    </p>

                                    <div className="pt-4 flex items-center justify-between">
                                    
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Footer Informativo */}
                    <section className={`rounded-[3rem] p-12 text-center space-y-6 ${darkMode ? 'bg-stone-900/30' : 'bg-stone-100/50'}`}>
                        <h4 className="font-serif italic text-xl">¿Deseas inscribirte o tienes dudas?</h4>
                        <p className="text-xs opacity-70 max-w-md mx-auto">
                            Las inscripciones se realizan de manera presencial al finalizar los cultos dominicales o a través de nuestro canal de WhatsApp.
                        </p>
                        <div className="pt-4">
                            <a
                                href="https://wa.me/51960843024?text=Hola,%20deseo%20más%20información%20sobre%20los%20cursos%20de%20la%20Academia%20IBM"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] uppercase tracking-widest font-black border-b border-current pb-1 hover:opacity-60 transition-opacity"
                            >
                                Contactar para más información
                            </a>
                        </div>
                    </section>

                </div>

                <footer className="py-12 text-center">
                    <p className="text-[8px] uppercase tracking-[0.8em] opacity-30 font-bold italic">
                        Equipando a los cristianos para la obra del ministerio
                    </p>
                </footer>
            </div>

            <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        </main>
    )
}