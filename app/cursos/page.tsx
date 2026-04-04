'use client'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/app/components/sidebar'
import AuthForm from '@/app/components/AuthForm'
import VistaAlumno from '@/app/components/VistaAlumno'
import VistaDocente from '@/app/components/VistaDocente'
import { LogOut } from 'lucide-react'

export default function CursosPage() {
    const [darkMode, setDarkMode] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    // Estados compartidos
    const [cursosAlumno, setCursosAlumno] = useState<any[]>([]) // Ahora es un array
    const [cargandoContenido, setCargandoContenido] = useState(false)
    const [cursosDocente, setCursosDocente] = useState<any[]>([])

    // NUEVA FUNCIÓN: Carga todos los cursos donde el alumno está inscrito
    const cargarCursosAlumno = useCallback(async (alumnoId: string) => {
        setCargandoContenido(true);
        try {
            console.log("Cargando cursos para alumno ID:", alumnoId);

            const { data, error } = await supabase
                .from('inscripciones')
                .select(`
                usuarios_id,
                cursos:curso_id (
                    id,
                    nombre,
                    descripcion,
                    modulos (
                        id,
                        titulo,
                        orden,
                        materiales (
                            id,
                            titulo,
                            tipo,
                            url
                        )
                    )
                )
            `)
                .eq('usuarios_id', alumnoId);

            if (error) {
                console.error("Error de Supabase en inscripciones:", error.message);
                throw error;
            }

            console.log("Data bruta de inscripciones:", data);

            // Extraemos el objeto 'cursos' de cada inscripción
            const listaCursos = data
                ?.map((ins: any) => ins.cursos)
                .filter((c: any) => c !== null) || [];

            console.log("Lista final de cursos procesada:", listaCursos);
            setCursosAlumno(listaCursos);

        } catch (err) {
            console.error("Error crítico en cargarCursosAlumno:", err);
        } finally {
            setCargandoContenido(false);
        }
    }, []);

    const cargarCursosDocente = useCallback(async (docenteId: string) => {
        const { data } = await supabase
            .from('cursos')
            .select('*, modulos(*, materiales(*))')
            .eq('profesor_id', docenteId);
        if (data) setCursosDocente(data);
    }, []);

    const checkUser = useCallback(async () => {
        try {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                setUser(null);
                return;
            }

            const userEmail = session.user.email;

            // 1. Buscar en PROFESORES
            const { data: docente } = await supabase
                .from('profesores')
                .select('*')
                .eq('email', userEmail)
                .maybeSingle();

            if (docente) {
                setUser({ ...docente, tipo_usuario: 'docente' });
                await cargarCursosDocente(docente.id);
            } else {
                // 2. Buscar en USUARIOS (Alumnos)
                const { data: alumno } = await supabase
                    .from('usuarios')
                    .select('*')
                    .eq('email', userEmail)
                    .maybeSingle();

                if (alumno) {
                    setUser({ ...alumno, tipo_usuario: 'alumno' });
                    // IMPORTANTE: Cargamos los cursos desde la tabla inscripciones
                    await cargarCursosAlumno(alumno.id);
                }
            }
        } catch (err) {
            console.error("Error crítico en checkUser:", err);
        } finally {
            setLoading(false);
        }
    }, [cargarCursosDocente, cargarCursosAlumno]);

    useEffect(() => {
        checkUser();
    }, [checkUser]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setCursosAlumno([]);
        setCursosDocente([]);
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-stone-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin"></div>
                    <p className="font-serif italic text-stone-400">Verificando acceso...</p>
                </div>
            </div>
        )
    }

    return (
        <main className={`flex h-screen transition-colors duration-700 overflow-hidden ${darkMode ? 'bg-[#0a0a0a] text-stone-300' : 'bg-[#fafaf9] text-stone-800'}`}>
            <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className={`px-8 py-6 flex justify-between items-center border-b ${darkMode ? 'border-stone-900' : 'border-stone-200'}`}>
                    <div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">
                            {user?.tipo_usuario === 'docente' ? 'Panel de Instructor' : 'Portal Académico'}
                        </h2>
                    </div>
                    {user && (
                        <div className="flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] font-bold uppercase tracking-widest">{user.nombre}</p>
                                <p className="text-[9px] text-stone-400">{user.email}</p>
                            </div>
                            <button onClick={handleLogout} className="p-2 text-stone-400 hover:text-red-500 transition-colors">
                                <LogOut size={18} />
                            </button>
                        </div>
                    )}
                </nav>

                <div className="p-8 max-w-7xl mx-auto w-full">
                    {!user ? (
                        <AuthForm darkMode={darkMode} onAuthSuccess={checkUser} />
                    ) : user.tipo_usuario === 'docente' ? (
                        <VistaDocente user={user} cursos={cursosDocente} darkMode={darkMode} />
                    ) : (
                        /* Pasamos el array de cursos y el estado de carga correcto */
                        <VistaAlumno
                            user={user}
                            cursos={cursosAlumno}
                            cargando={cargandoContenido}
                            darkMode={darkMode}
                        />
                    )}
                </div>
            </div>
            <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        </main>
    )
}