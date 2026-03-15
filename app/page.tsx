'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const FullCalendar = dynamic(() => import('@fullcalendar/react'), { ssr: false })
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'

export default function CalendarioDefinitivo() {
  const [eventos, setEventos] = useState<any[]>([])
  const [perfil, setPerfil] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirm, setShowConfirm] = useState<{ show: boolean, id: string }>({ show: false, id: '' })
  const [darkMode, setDarkMode] = useState(true)
  const [form, setForm] = useState({ id: '', titulo: '', fecha: '', ministerio: 'General', descripcion: '' })

  useEffect(() => {
    fetchEventos()
    const savedSession = localStorage.getItem('user_session')
    if (savedSession) {
      setPerfil(JSON.parse(savedSession))
    }
    setLoading(false)
  }, [])

  async function fetchEventos() {
    const { data } = await supabase.from('actividades').select('*')
    if (data) {
      setEventos(data.map(ev => {
        let color = '#6366f1';
        const min = ev.ministerio_cargo;
        if (min === 'Producción') color = '#64748b';
        else if (min === 'Alabanza') color = '#a855f7';
        else if (min === 'Servir') color = '#10b981';
        else if (min === 'Conectadas') color = '#ec4899';
        else if (min === 'Niños y Adolescentes') color = '#f59e0b';
        else if (min === 'Generación Emergente') color = '#06b6d4';
        else if (min === 'Misiones') color = '#84cc16';
        else if (min === 'Pazos') color = '#ef4444';

        return {
          id: ev.id,
          title: ev.titulo,
          start: ev.fecha_inicio,
          extendedProps: { descripcion: ev.descripcion, ministerio: min, id_db: ev.id },
          backgroundColor: color,
          borderColor: color,
          textColor: '#ffffff'
        }
      }))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user_session')
    window.location.reload()
  }

  const handleEliminar = async () => {
    // 1. Intentamos borrar
    const { error } = await supabase
      .from('actividades')
      .delete()
      .eq('id', showConfirm.id);

    if (error) {
      // Si hay error de permisos o de ID, esto te lo dirá
      alert("Error de Supabase: " + error.message);
    } else {
      // 2. Si no hay error, cerramos todo y refrescamos
      setShowConfirm({ show: false, id: '' });
      setSelectedEvent(null);
      await fetchEventos(); // Esto recarga el calendario
      alert("Actividad eliminada con éxito");
    }
  };

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    const datos = {
      titulo: form.titulo,
      fecha_inicio: form.fecha || new Date().toISOString(),
      ministerio_cargo: form.ministerio,
      descripcion: form.descripcion
    };
    if (isEditing) await supabase.from('actividades').update(datos).eq('id', form.id);
    else await supabase.from('actividades').insert([datos]);
    setShowCreate(false); setIsEditing(false); setSelectedEvent(null); fetchEventos();
  }

  return (
    <main className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0f172a] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      <nav className={`${darkMode ? 'bg-[#1e293b]/80 border-slate-800' : 'bg-white/80 border-slate-200'} border-b px-4 md:px-6 py-3 flex justify-between items-center sticky top-0 z-40 backdrop-blur-md shadow-sm transition-colors duration-500`}>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-black/5 p-1.5 transition-colors duration-500">
            <img
              src="/IBM.png"
              alt="Logo IBM"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden text-slate-900 font-black text-xs uppercase">IBM</span>
          </div>
          <div className="flex flex-col">
            <span className={`text-[10px] md:text-[12px] font-black uppercase tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Brisas <span className="hidden sm:inline">del Mantaro</span>
            </span>
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.15em] md:tracking-[0.2em] text-indigo-500 font-bold">
              Portal Líderes
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-5">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative w-10 md:w-12 h-5 md:h-6 rounded-full transition-all duration-300 flex items-center px-1 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`}
          >
            <div className={`absolute w-3.5 h-3.5 md:w-4 md:h-4 rounded-full transition-all duration-500 flex items-center justify-center ${darkMode ? 'translate-x-5 md:translate-x-6 bg-yellow-400' : 'translate-x-0 bg-white shadow-sm'}`}>
              {darkMode ? (
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-slate-900" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-slate-400" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
              )}
            </div>
          </button>

          {perfil && (perfil.rol === 'pastor' || perfil.rol === 'lider') && (
            <button
              onClick={() => {
                setIsEditing(false);
                setForm({ id: '', titulo: '', fecha: '', ministerio: perfil.rol === 'pastor' ? 'General' : perfil.ministerio, descripcion: '' });
                setShowCreate(true);
              }}
              className="bg-indigo-600 text-white px-3 md:px-5 py-2 md:py-2.5 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              <span className="md:hidden">+ Nueva</span>
              <span className="hidden md:inline">+ Nueva Actividad</span>
            </button>
          )}

          {!perfil ? (
            <Link href="/login" className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-indigo-600'}`}>
              Acceso
            </Link>
          ) : (
            <div className="flex items-center gap-2 md:gap-4">
              <span className="hidden sm:inline text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{perfil.nombre.split(' ')[0]}</span>
              <button onClick={handleLogout} className="text-[9px] md:text-[10px] font-bold text-red-500 uppercase tracking-widest">
                Salir
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="w-full max-w-6xl mx-auto p-3 md:p-6">
        <div className={`rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-2xl border transition-all ${darkMode ? 'bg-[#1e293b] border-slate-800' : 'bg-white border-slate-100'}`}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale={esLocale}
            events={eventos}
            displayEventTime={false}
            eventClick={(info) => setSelectedEvent(info.event)}
            headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}
            height="auto"
          />
        </div>
      </div>

      {/* Modal Detalles Responsivo */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} rounded-[2rem] p-6 md:p-8 max-w-sm w-full border shadow-2xl`}>
            <span className="text-[9px] font-black uppercase text-indigo-500 mb-2 block tracking-widest">{selectedEvent.extendedProps.ministerio}</span>
            <h3 className={`text-lg md:text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{selectedEvent.title}</h3>
            <p className="text-slate-500 text-sm mb-6 italic leading-relaxed">"{selectedEvent.extendedProps.descripcion || "Sin descripción adicional."}"</p>

            <div className={`text-[9px] font-bold uppercase border-t pt-4 flex justify-between ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
              <span>{new Date(selectedEvent.start).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</span>
              <span className="text-indigo-500">{new Date(selectedEvent.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3">
              {(perfil?.rol === 'pastor' || (perfil?.rol === 'lider' && perfil.ministerio === selectedEvent.extendedProps.ministerio)) && (
                <>
                  <button onClick={() => {
                    setForm({ id: selectedEvent.extendedProps.id_db, titulo: selectedEvent.title, fecha: new Date(selectedEvent.start).toISOString().slice(0, 16), ministerio: selectedEvent.extendedProps.ministerio, descripcion: selectedEvent.extendedProps.descripcion });
                    setIsEditing(true); setShowCreate(true);
                  }} className="col-span-2 py-3 bg-indigo-500 text-white rounded-xl text-[10px] font-bold uppercase">Editar</button>
                  <button onClick={() => setShowConfirm({ show: true, id: selectedEvent.extendedProps.id_db })} className="col-span-2 py-3 bg-red-500/10 text-red-500 rounded-xl text-[10px] font-bold uppercase border border-red-500/10">Eliminar</button>
                </>
              )}
              <button onClick={() => setSelectedEvent(null)} className="col-span-2 py-3 text-[10px] font-bold uppercase text-slate-400">Volver</button>
            </div>
          </div>
        </div>
      )}

      {/* Formulario Nueva Actividad Responsivo */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <form onSubmit={handleGuardar} className={`${darkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} rounded-[2rem] p-6 md:p-10 max-w-md w-full border shadow-2xl space-y-4 md:space-y-5 overflow-y-auto max-h-[90vh]`}>
            <h2 className={`text-[10px] font-black uppercase text-center tracking-widest ${darkMode ? 'text-white' : 'text-slate-900'}`}>{isEditing ? 'Actualizar Actividad' : 'Nueva Actividad'}</h2>
            <input placeholder="Título de la actividad" required className={`w-full ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-xl p-3.5 text-sm outline-none`} value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
            <textarea placeholder="Detalles o descripción..." className={`w-full ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-xl p-3.5 text-sm h-24 outline-none`} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[8px] font-bold uppercase text-slate-500 ml-1">Fecha y Hora</label>
                <input type="datetime-local" required className={`w-full ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-xl p-3 text-xs outline-none`} value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[8px] font-bold uppercase text-slate-500 ml-1">Ministerio</label>
                <select className={`w-full ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-xl p-3 text-xs outline-none`} value={form.ministerio} onChange={(e) => setForm({ ...form, ministerio: e.target.value })}>
                  {perfil?.rol === 'pastor' ?
                    ['General', 'Producción', 'Alabanza', 'Servir', 'Conectadas', 'Niños y Adolescentes', 'Generación Emergente', 'Misiones', 'Pazos'].map(m => <option key={m} value={m}>{m}</option>)
                    : <option value={perfil?.ministerio}>{perfil?.ministerio}</option>}
                </select>
              </div>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase text-[10px] shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 active:scale-95 transition-all">
              {isEditing ? 'Guardar Cambios' : 'Publicar'}
            </button>
            <button type="button" onClick={() => { setShowCreate(false); setIsEditing(false); }} className="w-full text-[9px] font-bold text-slate-400 uppercase tracking-widest">Descartar</button>
          </form>
        </div>
      )}

      {/* Modal Confirmación Eliminación */}
      {showConfirm.show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[60] p-4">
          <div className={`${darkMode ? 'bg-slate-900' : 'bg-white'} p-7 rounded-3xl max-w-xs w-full text-center border ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
            <h4 className={`font-bold mb-2 text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>¿Eliminar actividad?</h4>
            <p className="text-slate-500 text-[10px] mb-6 px-2">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm({ show: false, id: '' })} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-[9px] font-bold uppercase">No</button>
              <button onClick={handleEliminar} className="flex-1 py-3 bg-red-500 text-white rounded-xl text-[9px] font-bold uppercase">Sí, eliminar</button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .fc { --fc-border-color: ${darkMode ? '#334155' : '#e2e8f0'}; --fc-page-bg-color: transparent; }
        .fc-theme-standard td, .fc-theme-standard th { border: 1px solid var(--fc-border-color) !important; }
        .fc-col-header-cell { background: ${darkMode ? '#1e293b' : '#f8fafc'} !important; }
        .fc-col-header-cell-cushion { color: ${darkMode ? '#94a3b8' : '#64748b'} !important; font-weight: 800 !important; text-transform: uppercase !important; font-size: 9px !important; padding: 10px 0 !important; text-decoration: none !important; }
        .fc-daygrid-day-number { color: ${darkMode ? '#64748b' : '#94a3b8'} !important; font-size: 10px !important; font-weight: 700 !important; padding: 6px !important; text-decoration: none !important; }
        .fc .fc-toolbar-title { color: ${darkMode ? '#ffffff' : '#0f172a'} !important; font-size: 0.95rem !important; font-weight: 900 !important; text-transform: uppercase; letter-spacing: -0.025em; }
        .fc-button-primary { background: ${darkMode ? '#334155' : '#f1f5f9'} !important; border: none !important; color: ${darkMode ? '#ffffff' : '#475569'} !important; font-size: 9px !important; font-weight: 800 !important; text-transform: uppercase !important; border-radius: 8px !important; }
        .fc-button-primary:hover { background: #6366f1 !important; color: white !important; }
        .fc-day-today { background: ${darkMode ? '#0f172a' : '#f8fafc'} !important; }
        .fc-daygrid-event { border-radius: 6px !important; border: none !important; margin: 1px 2px !important; }
        .fc-event-title { font-weight: 700 !important; font-size: 9px !important; padding: 2px 4px !important; }
        @media (max-width: 640px) {
          .fc .fc-toolbar { flex-direction: column; gap: 8px; }
          .fc .fc-toolbar-title { font-size: 0.85rem !important; }
        }
      `}</style>
    </main>
  )
}