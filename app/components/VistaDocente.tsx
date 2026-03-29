'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
    Plus, FilePlus, Video, Users, Settings,
    Trash2, Edit3, ExternalLink, LayoutDashboard,
    Loader2, CheckCircle2, X, AlertTriangle
} from 'lucide-react'

interface VistaDocenteProps {
    user: any;
    cursos: any[];
    darkMode: boolean;
}

export default function VistaDocente({ user, cursos, darkMode }: VistaDocenteProps) {
    const [cursoSeleccionado, setCursoSeleccionado] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [listaCursos, setListaCursos] = useState<any[]>(cursos);

    // --- ESTADOS PARA MODALES ---
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal Crear Curso
    const [modalEliminar, setModalEliminar] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
    const [nuevoCurso, setNuevoCurso] = useState({ nombre: '', descripcion: '' });

    // --- LÓGICA DE SINCRONIZACIÓN ---
    const refrescarCursosGlobal = async () => {
        const { data } = await supabase
            .from('cursos')
            .select('*, modulos(*, materiales(*))')
            .eq('profesor_id', user.id);
        if (data) setListaCursos(data);
    };

    const refrescarDetalleCurso = async (id: string) => {
        const { data } = await supabase
            .from('cursos')
            .select('*, modulos(*, materiales(*))')
            .eq('id', id)
            .single();
        if (data) setCursoSeleccionado(data);
    };

    // --- ACCIONES DEL DOCENTE ---
    const handleCrearCursoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nuevoCurso.nombre) return;

        setLoading(true);
        const { error } = await supabase
            .from('cursos')
            .insert([{
                nombre: nuevoCurso.nombre,
                descripcion: nuevoCurso.descripcion || "Nueva cátedra en preparación...",
                profesor_id: user.id,
            }]);

        if (!error) {
            await refrescarCursosGlobal();
            setIsModalOpen(false);
            setNuevoCurso({ nombre: '', descripcion: '' });
        }
        setLoading(false);
    };

    const handleConfirmarEliminar = async () => {
        if (!modalEliminar.id) return;

        setLoading(true);
        const { error } = await supabase
            .from('cursos')
            .delete()
            .eq('id', modalEliminar.id);

        if (!error) {
            await refrescarCursosGlobal();
            setModalEliminar({ open: false, id: null });
        }
        setLoading(false);
    };

    const handleNuevoModulo = async () => {
        const titulo = window.prompt("Nombre del módulo (ej: Módulo 1: Fundamentos):");
        if (!titulo || !cursoSeleccionado) return;

        setLoading(true);
        const { error } = await supabase
            .from('modulos')
            .insert([{ curso_id: cursoSeleccionado.id, titulo }]);

        if (!error) await refrescarDetalleCurso(cursoSeleccionado.id);
        setLoading(false);
    };

    const handleNuevoMaterial = async (moduloId: string) => {
        const titulo = window.prompt("Nombre de la lección:");
        const contenido = window.prompt("Enlace del video o material:");
        if (!titulo || !contenido) return;

        setLoading(true);
        const { error } = await supabase
            .from('materiales')
            .insert([{
                modulo_id: moduloId,
                titulo,
                contenido,
                tipo: contenido.includes('youtube') || contenido.includes('vimeo') ? 'video' : 'pdf'
            }]);

        if (!error) await refrescarDetalleCurso(cursoSeleccionado.id);
        setLoading(false);
    };

    return (
        <div className={`w-full max-w-6xl mx-auto px-4 transition-colors duration-500`}>

            {/* --- MODAL DE ELIMINACIÓN PERSONALIZADO --- */}
            {modalEliminar.open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setModalEliminar({ open: false, id: null })}
                    />
                    <div className={`relative w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300 border ${darkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-100 text-stone-900'
                        }`}>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-500">
                                <AlertTriangle size={40} />
                            </div>
                            <h2 className="text-3xl font-serif italic mb-4">¿Eliminar Curso?</h2>
                            <p className="text-sm text-stone-500 mb-8 leading-relaxed px-4">
                                Esta acción es irreversible. Se eliminarán todos los módulos y materiales asociados a esta cátedra.
                            </p>

                            <div className="flex flex-col w-full gap-3">
                                <button
                                    onClick={handleConfirmarEliminar}
                                    disabled={loading}
                                    className="w-full py-5 bg-red-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
                                    Eliminar Definitivamente
                                </button>
                                <button
                                    onClick={() => setModalEliminar({ open: false, id: null })}
                                    className={`w-full py-5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${darkMode ? 'border-stone-800 text-stone-400 hover:bg-stone-800' : 'border-stone-100 text-stone-500 hover:bg-stone-50'
                                        }`}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODAL PARA NUEVO CURSO --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className={`relative w-full max-w-lg rounded-[3.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300 border ${darkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-100 text-stone-900'
                        }`}>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-10 right-10 text-stone-400 hover:text-red-500 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-10">
                            <h2 className="text-4xl font-serif italic mb-2">Crear Curso</h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Nueva cátedra académica</p>
                        </div>

                        <form onSubmit={handleCrearCursoSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-stone-500">Nombre del Curso</label>
                                <input
                                    autoFocus
                                    type="text"
                                    required
                                    value={nuevoCurso.nombre}
                                    onChange={(e) => setNuevoCurso({ ...nuevoCurso, nombre: e.target.value })}
                                    className={`w-full border-none rounded-2xl p-4 text-sm outline-none transition-all ${darkMode ? 'bg-stone-800 text-white focus:ring-1 focus:ring-stone-700' : 'bg-stone-50 text-stone-900 focus:ring-1 focus:ring-stone-200'
                                        }`}
                                    placeholder="Ej: Discipulado 1..."
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-stone-500">Descripción Breve</label>
                                <textarea
                                    rows={3}
                                    value={nuevoCurso.descripcion}
                                    onChange={(e) => setNuevoCurso({ ...nuevoCurso, descripcion: e.target.value })}
                                    className={`w-full border-none rounded-2xl p-4 text-sm outline-none transition-all resize-none ${darkMode ? 'bg-stone-800 text-white focus:ring-1 focus:ring-stone-700' : 'bg-stone-50 text-stone-900 focus:ring-1 focus:ring-stone-200'
                                        }`}
                                    placeholder="Describe los objetivos del curso..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 ${darkMode ? 'bg-stone-100 text-stone-900' : 'bg-stone-900 text-white'
                                    }`}
                            >
                                {loading ? <Loader2 className="animate-spin" size={14} /> : <Plus size={14} />}
                                Confirmar y Publicar
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {!cursoSeleccionado ? (
                <section className="animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-500 mb-2 ml-1">Vista General</p>
                            <h1 className={`text-6xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Cursos</h1>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-3 ${darkMode ? 'bg-stone-100 text-stone-900 hover:bg-white' : 'bg-stone-900 text-white hover:bg-black'
                                }`}
                        >
                            <Plus size={16} /> Crear Curso
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {listaCursos.map(curso => (
                            <div
                                key={curso.id}
                                onClick={() => setCursoSeleccionado(curso)}
                                className={`group relative border p-10 rounded-[3.5rem] cursor-pointer hover:shadow-2xl transition-all duration-500 overflow-hidden ${darkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-100 text-stone-900'
                                    }`}
                            >
                                {/* BOTÓN ELIMINAR CON ESTADO DE MODAL */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setModalEliminar({ open: true, id: curso.id });
                                    }}
                                    className="absolute top-8 right-8 p-3 opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-500 transition-all z-10 bg-transparent rounded-full hover:bg-red-500/10"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <div className={`mb-8 w-14 h-14 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${darkMode ? 'bg-stone-800' : 'bg-stone-50'
                                    }`}>
                                    <LayoutDashboard className={darkMode ? 'text-stone-400' : 'text-stone-500'} size={24} />
                                </div>

                                <h3 className="text-3xl font-serif italic mb-3 pr-10">{curso.nombre}</h3>
                                <p className={`text-sm line-clamp-2 mb-8 leading-relaxed font-light ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                                    {curso.descripcion}
                                </p>

                                <div className={`flex items-center gap-6 pt-8 border-t ${darkMode ? 'border-stone-800/50' : 'border-stone-50'}`}>
                                    <div className="flex items-center gap-2">
                                        <Users size={14} className="text-stone-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">0 Alumnos</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-green-500/50" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Publicado</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                <section className="animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex items-center justify-between mb-12">
                        <button
                            onClick={() => setCursoSeleccionado(null)}
                            className={`group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${darkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-500 hover:text-stone-900'
                                }`}
                        >
                            <span className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${darkMode ? 'border-stone-800 group-hover:bg-stone-800' : 'border-stone-200 group-hover:bg-stone-100'
                                }`}>←</span>
                            Panel Central
                        </button>

                        <button
                            onClick={handleNuevoModulo}
                            className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${darkMode ? 'bg-stone-800 text-stone-100 hover:bg-stone-100 hover:text-stone-900' : 'bg-stone-100 text-stone-900 hover:bg-stone-900 hover:text-white'
                                }`}
                        >
                            <Plus size={14} /> Añadir Módulo
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-4">
                            <div className={`sticky top-8 p-10 rounded-[3rem] shadow-2xl transition-all duration-500 ${darkMode ? 'bg-stone-900 text-stone-100 border border-stone-800' : 'bg-stone-100 text-stone-900 border border-transparent'
                                }`}>
                                <h2 className="text-4xl font-serif italic mb-6 leading-tight">{cursoSeleccionado.nombre}</h2>
                                <p className={`text-xs font-light leading-relaxed mb-10 ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
                                    Estás en modo edición. Los cambios se reflejan instantáneamente en el portal de alumnos.
                                </p>
                                <button className={`w-full py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 ${darkMode ? 'border-stone-800 hover:bg-stone-800' : 'border-stone-200 hover:bg-white'
                                    }`}>
                                    <Settings size={14} /> Ajustes Avanzados
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-8 space-y-8">
                            {cursoSeleccionado.modulos?.sort((a: any, b: any) => a.created_at.localeCompare(b.created_at)).map((modulo: any) => (
                                <div key={modulo.id} className={`p-8 rounded-[2.5rem] shadow-sm border transition-all ${darkMode ? 'bg-stone-900/50 border-stone-800' : 'bg-white border-stone-100'
                                    }`}>
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-8 rounded-full ${darkMode ? 'bg-stone-100' : 'bg-stone-900'}`} />
                                            <h4 className={`text-lg font-bold tracking-tight uppercase ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>
                                                {modulo.titulo}
                                            </h4>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"><Edit3 size={16} /></button>
                                            <button className="p-2 text-stone-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </div>

                                    <div className={`space-y-3 pl-6 border-l-2 ${darkMode ? 'border-stone-800' : 'border-stone-50'}`}>
                                        {modulo.materiales?.map((mat: any) => (
                                            <div key={mat.id} className={`group flex items-center justify-between p-4 rounded-2xl border border-transparent transition-all ${darkMode ? 'bg-stone-950/30 hover:border-stone-800' : 'bg-stone-50/50 hover:border-stone-200'
                                                }`}>
                                                <div className="flex items-center gap-4">
                                                    {mat.tipo === 'video' ? <Video size={16} className="text-stone-400" /> : <FilePlus size={16} className="text-stone-400" />}
                                                    <span className={`text-sm font-medium ${darkMode ? 'text-stone-400' : 'text-stone-600'}`}>{mat.titulo}</span>
                                                </div>
                                                <a href={mat.contenido} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 p-2 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-all">
                                                    <ExternalLink size={14} />
                                                </a>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => handleNuevoMaterial(modulo.id)}
                                            className={`w-full mt-4 py-4 border-2 border-dashed rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${darkMode ? 'border-stone-800 text-stone-500 hover:bg-stone-800/50 hover:text-stone-300' : 'border-stone-100 text-stone-400 hover:bg-stone-50 hover:text-stone-600'
                                                }`}
                                        >
                                            <Plus size={14} /> Subir Material
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}