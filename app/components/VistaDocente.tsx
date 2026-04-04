'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import {
    Plus, FilePlus, Video, Users, Settings,
    Trash2, Edit3, ExternalLink, LayoutDashboard,
    Loader2, CheckCircle2, X, AlertTriangle, Save,
    UserPlus, UserMinus
} from 'lucide-react'

interface VistaDocenteProps {
    user: any;
    cursos: any[];
    darkMode: boolean;
}

export default function VistaDocente({ user, cursos, darkMode }: VistaDocenteProps) {
    // --- ESTADOS PRINCIPALES ---
    const [cursoSeleccionado, setCursoSeleccionado] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [listaCursos, setListaCursos] = useState<any[]>(cursos);

    // --- ESTADOS PARA MODALES ---
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal Crear
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false); // Modal Configurar
    const [modalEliminar, setModalEliminar] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });

    // --- ESTADOS DE FORMULARIO ---
    const [nuevoCurso, setNuevoCurso] = useState({ nombre: '', descripcion: '' });
    const [cursoEditando, setCursoEditando] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        activo: true
    });

    // --- ESTADOS DE ASIGNACIÓN DE ALUMNOS ---
    const [todosLosAlumnos, setTodosLosAlumnos] = useState<any[]>([]);
    const [alumnosAsignados, setAlumnosAsignados] = useState<string[]>([]);

    // --- EFECTOS ---
    useEffect(() => {
        if (isConfigModalOpen && cursoSeleccionado) {
            fetchAlumnos();
            fetchAsignaciones();
        }
    }, [isConfigModalOpen]);

    // --- FUNCIONES DE CARGA (SUPABASE) ---
    const fetchAlumnos = async () => {
        // Traemos solo a los que tienen el pago en true
        const { data, error } = await supabase
            .from('usuarios')
            .select('id, nombre, email, pago_al_dia')
            .eq('pago_al_dia', true);

        if (error) {
            console.error("Error al traer alumnos:", error);
        }

        if (data) {
            setTodosLosAlumnos(data);
        }
    };

    const fetchAsignaciones = async () => {
        const { data, error } = await supabase
            .from('inscripciones') // Tabla correcta
            .select('usuarios_id')  // Atributo correcto
            .eq('curso_id', cursoSeleccionado.id);

        if (error) console.error("Error al cargar inscripciones:", error.message);
        if (data) setAlumnosAsignados(data.map(a => a.usuarios_id));
    };

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

    // --- MANEJADORES DE ACCIONES ---
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
                activo: true
            }]);

        if (!error) {
            await refrescarCursosGlobal();
            setIsModalOpen(false);
            setNuevoCurso({ nombre: '', descripcion: '' });
        }
        setLoading(false);
    };

    const handleActualizarCurso = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase
            .from('cursos')
            .update({
                nombre: cursoEditando.nombre,
                descripcion: cursoEditando.descripcion,
                activo: cursoEditando.activo
            })
            .eq('id', cursoEditando.id);

        if (!error) {
            await refrescarCursosGlobal();
            await refrescarDetalleCurso(cursoEditando.id);
            setIsConfigModalOpen(false);
        }
        setLoading(false);
    };

    const toggleAsignacionAlumno = async (alumnoId: string) => {
        const estaAsignado = alumnosAsignados.includes(alumnoId);
        setLoading(true);

        if (estaAsignado) {
            // ELIMINAR INSCRIPCIÓN
            const { error } = await supabase
                .from('inscripciones')
                .delete()
                .eq('curso_id', cursoSeleccionado.id)
                .eq('usuarios_id', alumnoId); // Usamos usuario_id

            if (!error) {
                setAlumnosAsignados(prev => prev.filter(id => id !== alumnoId));
            } else {
                console.error("Error al borrar:", error.message);
            }
        } else {
            // CREAR INSCRIPCIÓN
            const { error } = await supabase
                .from('inscripciones')
                .insert([
                    {
                        curso_id: cursoSeleccionado.id,
                        usuarios_id: alumnoId // Usamos usuario_id
                    }
                ]);

            if (!error) {
                setAlumnosAsignados(prev => [...prev, alumnoId]);
            } else {
                console.error("Error al insertar:", error.message);
                alert("Error de base de datos: " + error.message);
            }
        }
        setLoading(false);
    };

    const handleConfirmarEliminar = async () => {
        if (!modalEliminar.id) return;
        setLoading(true);
        const { error } = await supabase.from('cursos').delete().eq('id', modalEliminar.id);
        if (!error) {
            await refrescarCursosGlobal();
            setModalEliminar({ open: false, id: null });
            if (cursoSeleccionado?.id === modalEliminar.id) setCursoSeleccionado(null);
        }
        setLoading(false);
    };

    const abrirConfiguracion = () => {
        setCursoEditando({
            id: cursoSeleccionado.id,
            nombre: cursoSeleccionado.nombre,
            descripcion: cursoSeleccionado.descripcion,
            activo: cursoSeleccionado.activo ?? true
        });
        setIsConfigModalOpen(true);
    };

    const handleNuevoModulo = async () => {
        const titulo = window.prompt("Nombre del módulo:");
        if (!titulo || !cursoSeleccionado) return;
        setLoading(true);
        const { error } = await supabase.from('modulos').insert([{ curso_id: cursoSeleccionado.id, titulo }]);
        if (!error) await refrescarDetalleCurso(cursoSeleccionado.id);
        setLoading(false);
    };

    const handleNuevoMaterial = async (moduloId: string) => {
        const titulo = window.prompt("Nombre de la lección:");
        const contenido = window.prompt("Enlace del material:");
        if (!titulo || !contenido) return;
        setLoading(true);
        await supabase.from('materiales').insert([{
            modulo_id: moduloId,
            titulo,
            contenido,
            tipo: contenido.includes('youtube') || contenido.includes('vimeo') ? 'video' : 'pdf'
        }]);
        await refrescarDetalleCurso(cursoSeleccionado.id);
        setLoading(false);
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-12 transition-colors duration-500">

            {/* --- MODAL CREAR CURSO --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className={`relative w-full max-w-lg rounded-[3.5rem] p-10 shadow-2xl border animate-in fade-in zoom-in duration-300 ${darkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-100 text-stone-900'}`}>
                        <h2 className="text-3xl font-serif italic mb-6">Nuevo Curso</h2>
                        <form onSubmit={handleCrearCursoSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Título del Curso</label>
                                <input
                                    type="text"
                                    required
                                    value={nuevoCurso.nombre}
                                    onChange={(e) => setNuevoCurso({ ...nuevoCurso, nombre: e.target.value })}
                                    className={`w-full rounded-2xl p-4 text-sm outline-none ${darkMode ? 'bg-stone-800' : 'bg-stone-50'}`}
                                    placeholder="Ej. Diseño de Interfaces Avanzado"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Descripción Breve</label>
                                <textarea
                                    rows={3}
                                    value={nuevoCurso.descripcion}
                                    onChange={(e) => setNuevoCurso({ ...nuevoCurso, descripcion: e.target.value })}
                                    className={`w-full rounded-2xl p-4 text-sm outline-none resize-none ${darkMode ? 'bg-stone-800' : 'bg-stone-50'}`}
                                    placeholder="Describe los objetivos del curso..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${darkMode ? 'bg-stone-100 text-stone-900' : 'bg-stone-900 text-white'}`}
                            >
                                {loading ? <Loader2 className="animate-spin" size={14} /> : <CheckCircle2 size={14} />}
                                Crear Cátedra
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL CONFIGURACIÓN / ASIGNACIÓN --- */}
            {isConfigModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsConfigModalOpen(false)} />
                    <div className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[3.5rem] p-10 shadow-2xl border animate-in fade-in zoom-in duration-300 ${darkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-100 text-stone-900'}`}>

                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-serif italic">Configurar Curso</h2>
                            <button
                                onClick={() => setCursoEditando({ ...cursoEditando, activo: !cursoEditando.activo })}
                                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${cursoEditando.activo ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}
                            >
                                {cursoEditando.activo ? '● Curso Habilitado' : '○ Curso Deshabilitado'}
                            </button>
                        </div>

                        <form onSubmit={handleActualizarCurso} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Nombre</label>
                                        <input
                                            type="text"
                                            value={cursoEditando.nombre}
                                            onChange={(e) => setCursoEditando({ ...cursoEditando, nombre: e.target.value })}
                                            className={`w-full rounded-2xl p-4 text-sm outline-none ${darkMode ? 'bg-stone-800' : 'bg-stone-50'}`}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Descripción</label>
                                        <textarea
                                            rows={4}
                                            value={cursoEditando.descripcion}
                                            onChange={(e) => setCursoEditando({ ...cursoEditando, descripcion: e.target.value })}
                                            className={`w-full rounded-2xl p-4 text-sm outline-none resize-none ${darkMode ? 'bg-stone-800' : 'bg-stone-50'}`}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-500 flex items-center gap-2">
                                        <Users size={12} /> Alumnos disponibles
                                    </label>
                                    <div className={`rounded-3xl p-4 h-64 overflow-y-auto border ${darkMode ? 'bg-stone-950/50 border-stone-800' : 'bg-stone-50 border-stone-100'}`}>
                                        {todosLosAlumnos.length === 0 ? (
                                            <p className="text-xs text-stone-500 p-4 italic">No hay alumnos para mostrar.</p>
                                        ) : (
                                            todosLosAlumnos.map(al => (
                                                <div key={al.id} className={`flex items-center justify-between p-3 mb-2 rounded-xl border transition-all ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-50 shadow-sm'}`}>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold">{al.nombre}</span>
                                                        <span className="text-[10px] text-stone-500">{al.email}</span>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => toggleAsignacionAlumno(al.id)}
                                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${alumnosAsignados.includes(al.id)
                                                            ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                                            : 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
                                                            }`}
                                                    >
                                                        {alumnosAsignados.includes(al.id) ? (
                                                            <><UserMinus size={14} /> Quitar del Curso</>
                                                        ) : (
                                                            <><UserPlus size={14} /> Asignar Curso</>
                                                        )}
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${darkMode ? 'bg-stone-100 text-stone-900' : 'bg-stone-900 text-white'}`}
                            >
                                {loading ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL ELIMINAR --- */}
            {modalEliminar.open && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-md" onClick={() => setModalEliminar({ open: false, id: null })} />
                    <div className={`relative w-full max-w-md rounded-[3rem] p-10 shadow-2xl border ${darkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-100 text-stone-900'}`}>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-500">
                                <AlertTriangle size={40} />
                            </div>
                            <h2 className="text-3xl font-serif italic mb-4">¿Eliminar Curso?</h2>
                            <p className="text-sm text-stone-500 mb-8 px-4">Esta acción es irreversible y borrará todo el contenido asociado.</p>
                            <div className="flex flex-col w-full gap-3">
                                <button onClick={handleConfirmarEliminar} disabled={loading} className="w-full py-5 bg-red-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3">
                                    {loading ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
                                    Eliminar Definitivamente
                                </button>
                                <button onClick={() => setModalEliminar({ open: false, id: null })} className={`w-full py-5 rounded-full text-[10px] font-black uppercase tracking-widest border ${darkMode ? 'border-stone-800 text-stone-400' : 'border-stone-100 text-stone-500'}`}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- VISTA PRINCIPAL: LISTA DE CURSOS --- */}
            {!cursoSeleccionado ? (
                <section className="animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-500 mb-2 ml-1">Dashboard Docente</p>
                            <h1 className={`text-6xl font-serif italic ${darkMode ? 'text-stone-100' : 'text-stone-900'}`}>Mis Cursos</h1>
                        </div>
                        <button onClick={() => setIsModalOpen(true)} className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center gap-3 ${darkMode ? 'bg-stone-100 text-stone-900' : 'bg-stone-900 text-white'}`}>
                            <Plus size={16} /> Nuevo Curso
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {listaCursos.map(curso => (
                            <div key={curso.id} onClick={() => setCursoSeleccionado(curso)} className={`group relative border p-10 rounded-[3.5rem] cursor-pointer hover:shadow-2xl transition-all duration-500 ${darkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-100 text-stone-900'}`}>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setModalEliminar({ open: true, id: curso.id }); }}
                                    className="absolute top-8 right-8 p-3 opacity-0 group-hover:opacity-100 text-stone-400 hover:text-red-500 transition-all z-10"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <div className="absolute top-8 left-8">
                                    {!curso.activo && <span className="text-[8px] font-bold uppercase tracking-widest px-2 py-1 bg-red-500/10 text-red-500 rounded-full">Inactivo</span>}
                                </div>
                                <div className={`mb-8 w-14 h-14 rounded-3xl flex items-center justify-center ${darkMode ? 'bg-stone-800' : 'bg-stone-50'}`}>
                                    <LayoutDashboard className={darkMode ? 'text-stone-400' : 'text-stone-500'} size={24} />
                                </div>
                                <h3 className="text-3xl font-serif italic mb-3 pr-10">{curso.nombre}</h3>
                                <p className="text-sm line-clamp-2 text-stone-500">{curso.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                /* --- VISTA DETALLE: GESTIÓN DE MÓDULOS --- */
                <section className="animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex items-center justify-between mb-12">
                        <button onClick={() => setCursoSeleccionado(null)} className={`group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${darkMode ? 'text-stone-400 hover:text-stone-100' : 'text-stone-500 hover:text-stone-900'}`}>
                            <span className="w-8 h-8 rounded-full border flex items-center justify-center">←</span> Volver
                        </button>
                        <button onClick={handleNuevoModulo} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${darkMode ? 'bg-stone-800 text-stone-100' : 'bg-stone-100 text-stone-900'}`}>
                            <Plus size={14} /> Nuevo Módulo
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-4">
                            <div className={`sticky top-8 p-10 rounded-[3rem] shadow-2xl border ${darkMode ? 'bg-stone-900 text-stone-100 border-stone-800' : 'bg-stone-100 text-stone-900 border-transparent'}`}>
                                <h2 className="text-4xl font-serif italic mb-6 leading-tight">{cursoSeleccionado.nombre}</h2>
                                <button
                                    onClick={abrirConfiguracion}
                                    className={`w-full py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 ${darkMode ? 'border-stone-800 hover:bg-stone-800' : 'border-stone-200 hover:bg-white'}`}
                                >
                                    <Settings size={14} /> Configuración
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-8 space-y-8">
                            {cursoSeleccionado.modulos?.sort((a: any, b: any) => a.created_at.localeCompare(b.created_at)).map((modulo: any) => (
                                <div key={modulo.id} className={`p-8 rounded-[2.5rem] border ${darkMode ? 'bg-stone-900/50 border-stone-800' : 'bg-white border-stone-100'}`}>
                                    <h4 className="text-lg font-bold uppercase tracking-tight mb-6">{modulo.titulo}</h4>
                                    <div className="space-y-3 pl-6 border-l-2 border-stone-100 dark:border-stone-800">
                                        {modulo.materiales?.map((mat: any) => (
                                            <div key={mat.id} className={`flex items-center justify-between p-4 rounded-2xl ${darkMode ? 'bg-stone-950/30' : 'bg-stone-50/50'}`}>
                                                <div className="flex items-center gap-4">
                                                    {mat.tipo === 'video' ? <Video size={16} /> : <FilePlus size={16} />}
                                                    <span className="text-sm">{mat.titulo}</span>
                                                </div>
                                                <a href={mat.contenido} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900"><ExternalLink size={14} /></a>
                                            </div>
                                        ))}
                                        <button onClick={() => handleNuevoMaterial(modulo.id)} className="w-full mt-4 py-4 border-2 border-dashed rounded-2xl text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-600">
                                            + Añadir Contenido
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