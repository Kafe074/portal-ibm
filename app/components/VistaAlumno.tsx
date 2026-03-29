'use client'
import { Plus, PlayCircle, FileText, ExternalLink } from 'lucide-react'

// --- INTERFACES ---
interface Material {
    id: string;
    titulo: string;
    tipo: 'video' | 'pdf' | 'link';
    url: string;
}

interface Modulo {
    id: string;
    titulo: string;
    orden: number;
    materiales: Material[];
}

interface Curso {
    id: string;
    nombre: string;
    descripcion: string;
    modulos: Modulo[];
}

interface VistaAlumnoProps {
    user: any;
    cursoDetalle: Curso | null;
    cargandoCurso: boolean;
    darkMode: boolean;
}

export default function VistaAlumno({ user, cursoDetalle, cargandoCurso, darkMode }: VistaAlumnoProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header>
                <h1 className="text-4xl font-serif italic mb-2">Mis Cursos</h1>
                <p className="text-stone-500 text-sm">
                    Bienvenido de vuelta, {user?.nombre?.split(' ')[0] || 'Usuario'}.
                </p>
            </header>

            {cargandoCurso ? (
                <div className="py-20 text-center animate-pulse text-xs uppercase tracking-widest opacity-50">
                    Cargando material...
                </div>
            ) : cursoDetalle ? (
                <div className="grid grid-cols-1 gap-6">
                    <div className={`p-8 rounded-[2.5rem] border ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100 shadow-sm'}`}>
                        <h3 className="text-2xl font-serif mb-6">{cursoDetalle.nombre}</h3>
                        <div className="space-y-4">
                            {cursoDetalle.modulos?.map((modulo) => (
                                <details key={modulo.id} className="group border-b border-stone-100 dark:border-stone-800 pb-4">
                                    <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                                        <span className="text-sm font-bold uppercase tracking-widest text-stone-500 group-open:text-amber-600 transition-colors">
                                            {modulo.titulo}
                                        </span>
                                        <Plus size={14} className="group-open:rotate-45 transition-transform" />
                                    </summary>
                                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {modulo.materiales?.map((mat) => (
                                            <a
                                                key={mat.id}
                                                href={mat.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${darkMode ? 'hover:bg-stone-800 border-stone-800' : 'hover:bg-stone-50 border-stone-50'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {mat.tipo === 'video' ? (
                                                        <PlayCircle size={18} className="text-amber-600" />
                                                    ) : (
                                                        <FileText size={18} className="text-stone-400" />
                                                    )}
                                                    <span className="text-xs font-medium">{mat.titulo}</span>
                                                </div>
                                                <ExternalLink size={14} className="opacity-40" />
                                            </a>
                                        ))}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 opacity-40 italic">
                    No tienes cursos asignados actualmente.
                </div>
            )}
        </div>
    )
}