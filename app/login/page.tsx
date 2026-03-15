'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: dbError } = await supabase
        .from('usuarios_admin')
        .select('*')
        .eq('username', username.trim())
        .eq('password', password) 
        .maybeSingle()

      if (dbError || !data) {
        setError('Usuario o contraseña incorrectos.')
        setLoading(false)
        return
      }

      localStorage.setItem('user_session', JSON.stringify({
        id: data.id,
        nombre: data.nombre,
        rol: data.rol,
        ministerio: data.ministerio,
        isLoggedIn: true
      }))

      window.location.href = '/' 

    } catch (err) {
      setError('Error de conexión con la base de datos.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-sans antialiased relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md relative">
        {/* Ajuste responsivo: p-6 en móvil, p-10/14 en escritorio. rounded ajustado */}
        <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl p-7 md:p-14">
          
          <header className="text-center mb-8 md:mb-10">
            {/* Logo responsivo: w-16 en móvil, w-20 en escritorio */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/20 rotate-3 hover:rotate-0 transition-all duration-300 overflow-hidden p-3">
               <img 
                src="/IBM.png" 
                alt="Logo IBM" 
                className="w-full h-full object-contain" 
                onError={(e)=>{e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling?.classList.remove('hidden')}}
               />
               <span className="hidden text-slate-900 font-black text-xl md:text-2xl tracking-tighter">IB</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Bienvenido</h2>
            <p className="text-slate-400 text-[9px] md:text-[10px] mt-3 font-bold uppercase tracking-[0.2em]">Acceso Administrativo Directo</p>
          </header>

          <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
            {error && (
              <div className="p-4 bg-red-500/10 text-red-400 text-[10px] rounded-2xl text-center font-bold border border-red-500/20 animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">
                Nombre de Usuario
              </label>
              <input 
                type="text" 
                required
                className="w-full p-4 bg-slate-900/50 border border-slate-800 rounded-2xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder:text-slate-700 text-sm md:text-base"
                placeholder="ej: leonardo"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">
                Contraseña
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  className="w-full p-4 bg-slate-900/50 border border-slate-800 rounded-2xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-white placeholder:text-slate-700 text-sm md:text-base"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-50 mt-4 active:scale-[0.98] flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verificando...</span>
                </>
              ) : 'Entrar'}
            </button>
          </form>

          <footer className="mt-8 md:mt-12 text-center">
            <Link href="/" className="text-[10px] font-bold text-slate-500 hover:text-indigo-400 uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Calendario
            </Link>
          </footer>
        </div>
      </div>
    </div>
  )
}