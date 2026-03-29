'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Lock, CheckCircle2, AlertCircle } from 'lucide-react'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const router = useRouter()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: '', type: '' })

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      setMessage({ text: error.message, type: 'error' })
    } else {
      setMessage({ text: 'Contraseña actualizada. Redirigiendo...', type: 'success' })
      setTimeout(() => router.push('/cursos'), 2000)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-10 rounded-[3rem] border border-stone-100 shadow-2xl text-center">
        <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock size={28} className="text-stone-400" />
        </div>
        
        <h2 className="text-2xl font-serif italic mb-2">Nueva Contraseña</h2>
        <p className="text-xs text-stone-500 mb-8">Escribe tu nueva clave de acceso</p>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
            <input 
              type="password" 
              placeholder="Mínimo 6 caracteres" 
              className="w-full pl-14 pr-6 py-5 rounded-2xl text-xs border border-stone-100 bg-stone-50 outline-none focus:border-stone-300 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {message.text && (
            <div className={`flex items-center gap-2 justify-center py-4 rounded-2xl text-[10px] font-bold uppercase border ${
              message.type === 'error' ? 'bg-red-50 border-red-100 text-red-500' : 'bg-green-50 border-green-100 text-green-500'
            }`}>
              {message.type === 'error' ? <AlertCircle size={14}/> : <CheckCircle2 size={14}/>}
              {message.text}
            </div>
          )}

          <button 
            disabled={loading}
            className="w-full bg-stone-900 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
          </button>
        </form>
      </div>
    </div>
  )
}