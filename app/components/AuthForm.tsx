'use client'
import { useState } from 'react'
import { Mail, Lock, GraduationCap, UserPlus, KeyRound, User, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface AuthFormProps {
    darkMode: boolean;
    onAuthSuccess: () => void;
}

export default function AuthForm({ darkMode, onAuthSuccess }: AuthFormProps) {
    const [view, setView] = useState<'login' | 'register' | 'forgot'>('login')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: '', nombre: '' })
    const [message, setMessage] = useState({ text: '', type: '' })

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage({ text: '', type: '' })
        setLoading(true)

        try {
            if (view === 'register') {
                const { error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: { data: { nombre: formData.nombre } }
                })
                if (error) throw error
                setMessage({ text: 'Registro exitoso. Revisa tu email.', type: 'success' })
                setView('login')
            } else if (view === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                })
                if (error) throw new Error('Credenciales inválidas.')
                onAuthSuccess()
            } else if (view === 'forgot') {
                const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
                    redirectTo: `${window.location.origin}/cursos/update-password`,
                })
                if (error) throw error
                setMessage({ text: 'Enlace enviado a tu email.', type: 'success' })
            }
        } catch (error: any) {
            setMessage({ text: error.message, type: 'error' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[75vh]">
            <div className={`w-full max-w-md p-10 rounded-[3rem] border shadow-2xl transition-all ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
                <div className="text-center mb-10 space-y-3">
                    <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        {view === 'login' && <GraduationCap size={28} className="text-stone-500" />}
                        {view === 'register' && <UserPlus size={28} className="text-stone-500" />}
                        {view === 'forgot' && <KeyRound size={28} className="text-stone-500" />}
                    </div>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-400">
                        {view === 'login' ? 'Discipulados' : view === 'register' ? 'Crear Cuenta' : 'Seguridad'}
                    </h2>
                    <p className="text-2xl font-serif italic">
                        {view === 'login' ? 'Iniciar Sesión' : view === 'register' ? 'Únete a nosotros' : 'Recuperar Acceso'}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                    {view === 'register' && (
                        <div className="relative">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
                            <input
                                type="text" placeholder="Nombre Completo"
                                className={`w-full pl-14 pr-6 py-5 rounded-2xl text-xs border outline-none transition-all ${darkMode ? 'bg-stone-950 border-stone-800 text-stone-200 focus:border-stone-500' : 'bg-stone-50 border-stone-100 focus:border-stone-300'}`}
                                value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} required
                            />
                        </div>
                    )}
                    <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
                        <input
                            type="email" placeholder="Email"
                            className={`w-full pl-14 pr-6 py-5 rounded-2xl text-xs border outline-none transition-all ${darkMode ? 'bg-stone-950 border-stone-800 text-stone-200 focus:border-stone-500' : 'bg-stone-50 border-stone-100 focus:border-stone-300'}`}
                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required
                        />
                    </div>
                    {view !== 'forgot' && (
                        <div className="relative">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
                            <input
                                type="password" placeholder="Contraseña"
                                className={`w-full pl-14 pr-6 py-5 rounded-2xl text-xs border outline-none transition-all ${darkMode ? 'bg-stone-950 border-stone-800 text-stone-200 focus:border-stone-500' : 'bg-stone-50 border-stone-100 focus:border-stone-300'}`}
                                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required
                            />
                        </div>
                    )}
                    {message.text && (
                        <p className={`text-[10px] font-bold uppercase text-center py-4 rounded-2xl border ${message.type === 'error' ? 'text-red-500 bg-red-500/5 border-red-500/20' : 'text-green-500 bg-green-500/5 border-green-500/20'}`}>
                            {message.text}
                        </p>
                    )}
                    <button type="submit" disabled={loading} className="w-full bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl mt-4 hover:scale-[1.01] transition-all disabled:opacity-50">
                        {loading ? 'Procesando...' : view === 'login' ? 'Acceder' : view === 'register' ? 'Registrarme' : 'Enviar Enlace'}
                    </button>
                </form>

                <div className="mt-8 flex flex-col gap-4 text-center">
                    {view === 'login' ? (
                        <>
                            <button onClick={() => setView('register')} className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-600">¿No tienes cuenta? Regístrate</button>
                            <button onClick={() => setView('forgot')} className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-600">Olvidé mi contraseña</button>
                        </>
                    ) : (
                        <button onClick={() => setView('login')} className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-600">
                            <ArrowLeft size={12} /> Volver al inicio
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}