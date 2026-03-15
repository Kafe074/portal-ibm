'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  const [form, setForm] = useState({ titulo: '', fecha: '', ministerio: 'General' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) router.push('/login')
      else setLoading(false)
    }
    checkUser()
  }, [router])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase
      .from('actividades')
      .insert([{ titulo: form.titulo, fecha_inicio: form.fecha, ministerio_cargo: form.ministerio }])

    if (error) alert("Error al procesar la solicitud.")
    else {
      setForm({ titulo: '', fecha: '', ministerio: 'General' })
      router.push('/')
    }
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-sm p-10">
        <header className="mb-8 text-left">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Gestión de Eventos</h2>
          <p className="text-slate-500 text-sm mt-1">Ingrese los detalles de la nueva actividad institucional.</p>
        </header>
        
        <form onSubmit={submit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Nombre del Evento</label>
            <input 
              type="text" required className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800"
              value={form.titulo} onChange={(e) => setForm({...form, titulo: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Fecha y Hora</label>
              <input 
                type="datetime-local" required className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800"
                value={form.fecha} onChange={(e) => setForm({...form, fecha: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Ministerio</label>
              <select 
                className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-slate-800 appearance-none"
                value={form.ministerio} onChange={(e) => setForm({...form, ministerio: e.target.value})}
              >
                <option value="General">General</option>
                <option value="Jóvenes">Jóvenes</option>
                <option value="Damas">Damas</option>
                <option value="Niños">Niños</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white p-3.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-100 mt-4">
            Publicar Actividad
          </button>
        </form>
        
        <button 
          onClick={() => router.push('/')} 
          className="w-full mt-4 text-sm text-slate-400 hover:text-slate-600 transition-colors"
        >
          Cancelar y Volver
        </button>
      </div>
    </div>
  )
}