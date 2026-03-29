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
    const [cursoDetalle, setCursoDetalle] = useState<any>(null)
    const [cargandoCurso, setCargandoCurso] = useState(false)
    const [cursosDocente, setCursosDocente] = useState<any[]>([])

    const cargarContenidoCurso = useCallback(async (cursoId: string) => {
        setCargandoCurso(true);
        const { data } = await supabase
            .from('cursos')
            .select(`*, modulos (*, materiales (*))`)
            .eq('id', cursoId)
            .single();
        if (data) setCursoDetalle(data);
        setCargandoCurso(false);
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
            console.log("--- Verificando sesión activa ---");
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                console.log("No hay sesión de Supabase Auth.");
                setUser(null);
                setLoading(false);
                return;
            }

            const userEmail = session.user.email;
            console.log("Sesión iniciada con email:", userEmail);
            console.log("ID de Auth:", session.user.id);

            // 1. Intentar buscar en la tabla de PROFESORES usando el EMAIL
            console.log("Buscando en tabla 'profesores'...");
            const { data: docente, error: errDoc } = await supabase
                .from('profesores')
                .select('*')
                .eq('email', userEmail)
                .maybeSingle();

            if (docente) {
                console.log("¡ÉXITO! Encontrado en tabla PROFESORES:", docente);
                setUser({ ...docente, tipo_usuario: 'docente' });
                // Usamos el ID que tenga en su tabla (sea UUID o serial)
                await cargarCursosDocente(docente.id);
            } else {
                console.log("No se encontró en 'profesores'. Buscando en 'usuarios'...");

                // 2. Si no es profesor, buscar en USUARIOS usando el EMAIL
                const { data: alumno, error: errAlu } = await supabase
                    .from('usuarios')
                    .select('*')
                    .eq('email', userEmail)
                    .maybeSingle();

                if (alumno) {
                    console.log("¡ÉXITO! Encontrado en tabla USUARIOS:", alumno);
                    setUser({ ...alumno, tipo_usuario: 'alumno' });
                    if (alumno.curso_id) await cargarContenidoCurso(alumno.curso_id);
                } else {
                    console.warn("El correo no existe en ninguna de las dos tablas.");
                }
            }
        } catch (err) {
            console.error("Error crítico en checkUser:", err);
        } finally {
            setLoading(false);
        }
    }, [cargarCursosDocente, cargarContenidoCurso]);

    useEffect(() => {
        checkUser();
    }, [checkUser]);

    const handleLogout = async () => {
        console.log("Cerrando sesión...");
        await supabase.auth.signOut();
        setUser(null);
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
                {/* NAV BAR */}
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
                        <VistaAlumno
                            user={user}
                            cursoDetalle={cursoDetalle}
                            cargandoCurso={cargandoCurso}
                            darkMode={darkMode}
                        />
                    )}
                </div>
            </div>
            <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        </main>
    )
}