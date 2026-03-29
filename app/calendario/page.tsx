'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/app/components/sidebar'
import { LogOut, ShieldCheck, X, User, Lock, Trash2, Clock, Calendar, AlertTriangle } from 'lucide-react'

const FullCalendar = dynamic(() => import('@fullcalendar/react'), { ssr: false })
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'

// Paleta de colores por ministerio
const coloresMinisterios: { [key: string]: { bg: string, text: string, border: string } } = {
  'General': { bg: '#e7e5e4', text: '#44403c', border: '#d6d3d1' },
  'Producción': { bg: '#fce7f3', text: '#9d174d', border: '#fbcfe8' },
  'Alabanza': { bg: '#fef9c3', text: '#854d0e', border: '#fef08a' },
  'Servir': { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' },
  'Conectadas': { bg: '#fae8ff', text: '#86198f', border: '#f5d0fe' },
  'Niños': { bg: '#ffedd5', text: '#9a3412', border: '#fed7aa' },
  'Misiones': { bg: '#dbeafe', text: '#1e40af', border: '#bfdbfe' },
  'Default': { bg: '#f5f5f4', text: '#57534e', border: '#e7e5e4' }
}

export default function CalendarioDefinitivo() {
  const [eventos, setEventos] = useState<any[]>([])
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState({ show: false, id: '' })

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [userSession, setUserSession] = useState<any>(null)
  const [loginForm, setLoginForm] = useState({ usuario: '', password: '' })
  const [loginError, setLoginError] = useState('')

  const [form, setForm] = useState({ 
    id: '', 
    titulo: '', 
    fecha_dia: '', 
    fecha_hora: '', 
    ministerio: 'General', 
    descripcion: '' 
  })

  useEffect(() => {
    fetchEventos()
    const session = localStorage.getItem('user_admin_session')
    if (session) setUserSession(JSON.parse(session))
  }, [darkMode])

  async function fetchEventos() {
    const { data } = await supabase.from('actividades').select('*')
    if (data) {
      setEventos(data.map(ev => {
        const estilo = coloresMinisterios[ev.ministerio_cargo] || coloresMinisterios['Default']
        return {
          id: ev.id,
          title: ev.titulo,
          start: ev.fecha_inicio,
          extendedProps: {
            descripcion: ev.descripcion,
            ministerio: ev.ministerio_cargo,
            id_db: ev.id,
            hora: ev.fecha_inicio.includes(' ') ? ev.fecha_inicio.split(' ')[1].slice(0, 5) : null
          },
          backgroundColor: darkMode ? '#1c1917' : estilo.bg,
          borderColor: estilo.border,
          textColor: darkMode ? estilo.bg : estilo.text,
        }
      }))
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const { data } = await supabase.from('usuarios_admin').select('*').eq('username', loginForm.usuario).eq('password', loginForm.password).single()
    if (data) {
      localStorage.setItem('user_admin_session', JSON.stringify(data))
      setUserSession(data)
      setShowLoginModal(false)
    } else {
      setLoginError('Credenciales incorrectas')
    }
  }

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault()
    const fechaFinal = form.fecha_hora ? `${form.fecha_dia} ${form.fecha_hora}:00` : form.fecha_dia
    const datos = { titulo: form.titulo, fecha_inicio: fechaFinal, ministerio_cargo: form.ministerio, descripcion: form.descripcion }
    const { error } = isEditing ? await supabase.from('actividades').update(datos).eq('id', form.id) : await supabase.from('actividades').insert([datos])
    if (!error) { setShowCreate(false); setSelectedEvent(null); fetchEventos(); }
  }

  const handleEliminar = async () => {
    const { error } = await supabase.from('actividades').delete().eq('id', showConfirmDelete.id)
    if (!error) { setShowConfirmDelete({ show: false, id: '' }); setSelectedEvent(null); fetchEventos(); }
  }

  const estiloModal = selectedEvent ? (coloresMinisterios[selectedEvent.extendedProps.ministerio] || coloresMinisterios['Default']) : coloresMinisterios['Default']

  return (
    <main className={`flex h-screen transition-colors duration-700 overflow-hidden ${darkMode ? 'bg-[#0a0a0a] text-stone-300' : 'bg-[#fafaf9] text-stone-800'}`}>
      
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* NAV */}
        <nav className={`px-8 py-6 flex justify-between items-center border-b transition-colors ${darkMode ? 'border-stone-900' : 'border-stone-200'}`}>
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">Calendario</h2>
            <p className="text-xs font-serif italic opacity-60">Actividades de la iglesia</p>
          </div>
          <div className="flex items-center gap-4">
            {!userSession ? (
              <button onClick={() => setShowLoginModal(true)} className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-200 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-100 transition-all dark:border-stone-800 dark:hover:bg-stone-900">
                <ShieldCheck size={14} strokeWidth={1.5} /> Acceso
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <button onClick={() => { setIsEditing(false); setForm({ id: '', titulo: '', fecha_dia: '', fecha_hora: '', ministerio: 'General', descripcion: '' }); setShowCreate(true); }} className="bg-stone-900 text-stone-100 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-700 transition-all dark:bg-stone-100 dark:text-stone-900">
                  Nuevo Evento
                </button>
                <button onClick={() => { localStorage.removeItem('user_admin_session'); setUserSession(null); }} className="p-2.5 text-stone-400 hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* CALENDAR CONTAINER */}
        <div className="p-8 max-w-6xl mx-auto w-full">
          <div className={`p-8 rounded-[2rem] border transition-all ${darkMode ? 'bg-stone-900/40 border-stone-800' : 'bg-white border-stone-100 shadow-sm'}`}>
            <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" locale={esLocale} events={eventos} displayEventTime={false} eventClick={(info) => setSelectedEvent(info.event)} headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }} height="auto" />
          </div>
        </div>
      </div>

      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* MODAL CREACIÓN / EDICIÓN */}
      {showCreate && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-md flex items-center justify-center z-[200] p-4">
          <form onSubmit={handleGuardar} className={`w-full max-w-lg rounded-[2.5rem] p-10 border shadow-2xl transition-all ${darkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-100'}`}>
            <div className="text-center space-y-3 mb-10">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-400">{isEditing ? 'Editor de Actividad' : 'Nueva Entrada'}</h2>
              <p className={`text-lg font-serif italic ${darkMode ? 'text-stone-200' : 'text-stone-700'}`}>Define los detalles del encuentro</p>
            </div>
            <div className="space-y-5">
              <input required placeholder="Título" className={`w-full px-6 py-4 rounded-2xl text-xs outline-none border ${darkMode ? 'bg-stone-950 border-stone-800 text-stone-200' : 'bg-stone-50 border-stone-100'}`} value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <input type="date" required className={`w-full px-4 py-3 rounded-xl text-xs border ${darkMode ? 'bg-stone-950 border-stone-800 text-stone-300' : 'bg-stone-50 border-stone-100'}`} value={form.fecha_dia} onChange={(e) => setForm({ ...form, fecha_dia: e.target.value })} />
                <input type="time" className={`w-full px-4 py-3 rounded-xl text-xs border ${darkMode ? 'bg-stone-950 border-stone-800 text-stone-300' : 'bg-stone-50 border-stone-100'}`} value={form.fecha_hora} onChange={(e) => setForm({ ...form, fecha_hora: e.target.value })} />
              </div>
              <select className={`w-full px-4 py-4 rounded-2xl text-xs border ${darkMode ? 'bg-stone-950 border-stone-800 text-stone-300' : 'bg-stone-50 border-stone-100'}`} value={form.ministerio} onChange={(e) => setForm({ ...form, ministerio: e.target.value })}>
                {Object.keys(coloresMinisterios).filter(m => m !== 'Default').map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <textarea placeholder="Descripción..." className={`w-full px-6 py-4 rounded-2xl text-xs h-32 outline-none border resize-none ${darkMode ? 'bg-stone-950 border-stone-800 text-stone-200' : 'bg-stone-50 border-stone-100'}`} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
            </div>
            <div className="pt-8 space-y-3">
              <button type="submit" className="w-full bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-lg"> {isEditing ? 'Actualizar' : 'Publicar'} </button>
              <button type="button" onClick={() => setShowCreate(false)} className="w-full text-[9px] font-bold text-stone-400 uppercase text-center">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {/* DETALLES DEL EVENTO */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-stone-950/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-50 text-stone-900'} rounded-[2.5rem] p-10 max-w-sm w-full border shadow-2xl relative text-center`}>
            <button onClick={() => setSelectedEvent(null)} className="absolute top-6 right-6 text-stone-400"><X size={20} /></button>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] mb-4 inline-block px-4 py-1.5 rounded-full" style={{ backgroundColor: estiloModal.bg, color: estiloModal.text }}>{selectedEvent.extendedProps.ministerio}</span>
            <h3 className="text-2xl font-serif italic mb-4">{selectedEvent.title}</h3>
            <div className="flex flex-col items-center gap-1 mb-6 text-stone-400">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Calendar size={14} />{new Date(selectedEvent.start).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-500"><Clock size={14} />{selectedEvent.extendedProps.hora ? `${selectedEvent.extendedProps.hora} HRS` : 'TODO EL DÍA'}</div>
            </div>
            <p className="text-stone-500 text-sm italic font-serif mb-8 opacity-80 leading-relaxed">"{selectedEvent.extendedProps.descripcion || "Sin descripción adicional."}"</p>
            {userSession && (
              <div className="flex gap-2">
                <button onClick={() => { const f = new Date(selectedEvent.start).toISOString().split('T')[0]; setForm({ id: selectedEvent.extendedProps.id_db, titulo: selectedEvent.title, fecha_dia: f, fecha_hora: selectedEvent.extendedProps.hora || '', ministerio: selectedEvent.extendedProps.ministerio, descripcion: selectedEvent.extendedProps.descripcion }); setIsEditing(true); setShowCreate(true); }} className="flex-1 py-4 text-[9px] font-black uppercase rounded-2xl border transition-all hover:opacity-80" style={{ backgroundColor: estiloModal.bg, color: estiloModal.text, borderColor: estiloModal.border }}>Editar</button>
                <button onClick={() => setShowConfirmDelete({ show: true, id: selectedEvent.extendedProps.id_db })} className="p-4 bg-red-50 text-red-500 dark:bg-red-500/10 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONFIRMAR ELIMINAR - REDISEÑADO PARA MÁXIMO CONTRASTE */}
      {showConfirmDelete.show && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-xl flex items-center justify-center z-[300] p-4">
          <div className={`${darkMode ? 'bg-stone-900 border-stone-700' : 'bg-white border-stone-200'} p-10 rounded-[2.5rem] max-w-xs w-full text-center border shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all`}>
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
              <AlertTriangle size={32} strokeWidth={1.5} />
            </div>
            <h4 className={`font-serif italic text-2xl mb-2 ${darkMode ? 'text-white' : 'text-stone-900'}`}>
              ¿Estás seguro?
            </h4>
            <p className={`text-xs mb-8 leading-relaxed ${darkMode ? 'text-stone-400' : 'text-stone-500'}`}>
              Esta acción eliminará la actividad permanentemente del calendario.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowConfirmDelete({ show: false, id: '' })} 
                className={`py-4 text-[9px] font-black uppercase rounded-2xl border transition-all ${darkMode ? 'bg-stone-800 border-stone-600 text-stone-100 hover:bg-stone-700' : 'bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-200'}`}
              >
                No, cancelar
              </button>
              <button 
                onClick={handleEliminar} 
                className="py-4 bg-red-600 text-white text-[9px] font-black uppercase rounded-2xl shadow-lg shadow-red-900/40 hover:bg-red-500 transition-all active:scale-95"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-md flex items-center justify-center z-[200] p-4">
          <div className={`w-full max-sm rounded-[2.5rem] p-10 border shadow-2xl ${darkMode ? 'bg-stone-900 border-stone-800 text-stone-200' : 'bg-white border-stone-100'}`}>
            <div className="text-center mb-10"><h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">Acceso Admin</h2></div>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
                <input type="text" placeholder="Usuario" className={`w-full pl-12 pr-4 py-4 rounded-2xl text-xs border ${darkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-100'}`} value={loginForm.usuario} onChange={(e) => setLoginForm({ ...loginForm, usuario: e.target.value })} />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
                <input type="password" placeholder="Contraseña" className={`w-full pl-12 pr-4 py-4 rounded-2xl text-xs border ${darkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-100'}`} value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
              </div>
              {loginError && <p className="text-[10px] text-red-500 font-bold uppercase text-center">{loginError}</p>}
              <button className="w-full bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest mt-4">Entrar</button>
              <button type="button" onClick={() => setShowLoginModal(false)} className="w-full text-[9px] font-bold text-stone-400 uppercase text-center pt-2">Cerrar</button>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        .fc { --fc-border-color: ${darkMode ? '#1c1917' : '#f5f5f4'}; }
        .fc-theme-standard td, .fc-theme-standard th { border: 1px solid var(--fc-border-color) !important; }
        .fc-col-header-cell-cushion { color: #a8a29e !important; font-weight: 700 !important; text-transform: uppercase !important; font-size: 9px !important; tracking: 0.2em !important; text-decoration: none !important; }
        .fc-daygrid-day-number { color: #a8a29e !important; font-size: 10px !important; text-decoration: none !important; padding: 10px !important; }
        .fc .fc-toolbar-title { font-family: serif; font-style: italic; font-size: 1.2rem !important; color: ${darkMode ? '#e7e5e4' : '#44403c'}; }
        .fc-button-primary { background: transparent !important; border: 1px solid ${darkMode ? '#292524' : '#e7e5e4'} !important; color: #a8a29e !important; font-size: 9px !important; border-radius: 99px !important; }
        .fc-day-today { background: ${darkMode ? '#171717' : '#fafafa'} !important; }
        .fc-scrollgrid { border: none !important; }
        .fc-event { cursor: pointer; border-left: 4px solid !important; border-radius: 8px !important; padding: 2px 4px !important; transition: transform 0.2s ease; }
        .fc-event:hover { transform: scale(1.02); }
      `}</style>
    </main>
  )
}