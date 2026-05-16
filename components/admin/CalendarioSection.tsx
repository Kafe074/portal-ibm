"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Actividad } from "@/types";
import { Plus, Trash2, Check, X, Loader, Calendar, Pencil } from "lucide-react";
import { inputCls, textareaCls, btnPrimary, btnSecondary, labelCls, rowCls, cardCls } from "@/lib/admin-ui";

const MINISTERIOS = [
  "General", "Cursos", "Eventos",
  "Producción", "Alabanza", "Servir",
  "Conectadas", "Niños", "Misiones", "Jóvenes y Adolescentes",
];

const COLOR_DOT: Record<string, string> = {
  "General":                "bg-blue-400",
  "Cursos":                 "bg-amber-400",
  "Eventos":                "bg-teal-400",
  "Producción":             "bg-sky-400",
  "Alabanza":               "bg-green-400",
  "Servir":                 "bg-yellow-500",
  "Conectadas":             "bg-pink-400",
  "Niños":                  "bg-red-400",
  "Misiones":               "bg-orange-400",
  "Jóvenes y Adolescentes": "bg-purple-400",
};

interface Props { darkMode: boolean }

export default function CalendarioSection({ darkMode }: Props) {
  const [eventos, setEventos] = useState<Actividad[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState<string[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({
    titulo: "", fecha_dia: "", hora_inicio: "", hora_fin: "",
    ministerio: "General", descripcion: "",
  });

  useEffect(() => { fetchEventos(); }, []);

  async function fetchEventos() {
    const { data } = await supabase
      .from("actividades").select("*")
      .order("fecha_inicio", { ascending: false });
    if (data) setEventos(data);
  }

  function editarEvento(ev: Actividad) {
    setEditingId(ev.id);
    const fecha = ev.fecha_inicio.slice(0, 10);
    const horaIni = ev.fecha_inicio.includes("T") ? ev.fecha_inicio.split("T")[1].slice(0, 5) : "";
    const horaFin = ev.fecha_fin?.includes("T") ? ev.fecha_fin.split("T")[1].slice(0, 5) : "";
    setForm({
      titulo: ev.titulo, fecha_dia: fecha,
      hora_inicio: horaIni, hora_fin: horaFin,
      ministerio: ev.ministerio_cargo, descripcion: ev.descripcion ?? "",
    });
    setFechasSeleccionadas([]);
    setShowForm(true);
  }

  function agregarFecha() {
    if (form.fecha_dia && !fechasSeleccionadas.includes(form.fecha_dia)) {
      setFechasSeleccionadas(p => [...p, form.fecha_dia].sort());
    }
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const toFechaInicio = (fecha: string) => form.hora_inicio ? `${fecha}T${form.hora_inicio}:00` : fecha;
      const toFechaFin    = (fecha: string) => form.hora_fin ? `${fecha}T${form.hora_fin}:00` : toFechaInicio(fecha);

      if (editingId) {
        await supabase.from("actividades").update({
          titulo: form.titulo,
          fecha_inicio: toFechaInicio(form.fecha_dia),
          fecha_fin: toFechaFin(form.fecha_dia),
          ministerio_cargo: form.ministerio,
          descripcion: form.descripcion || null,
        }).eq("id", editingId);
      } else {
        const fechas = fechasSeleccionadas.length > 0 ? fechasSeleccionadas : [form.fecha_dia];
        const registros = fechas.map(fecha => ({
          titulo: form.titulo, ministerio_cargo: form.ministerio,
          descripcion: form.descripcion || null,
          fecha_inicio: toFechaInicio(fecha),
          fecha_fin: toFechaFin(fecha),
        }));
        await supabase.from("actividades").insert(registros);
      }
      reset(); fetchEventos();
    } finally { setSaving(false); }
  }

  function reset() {
    setForm({ titulo: "", fecha_dia: "", hora_inicio: "", hora_fin: "", ministerio: "General", descripcion: "" });
    setFechasSeleccionadas([]);
    setEditingId(null);
    setShowForm(false);
  }

  async function eliminar(id: string) {
    await supabase.from("actividades").delete().eq("id", id);
    setConfirmDeleteId(null);
    fetchEventos();
  }

  const eventosPorMes = eventos.reduce<Record<string, Actividad[]>>((acc, ev) => {
    const mes = ev.fecha_inicio.slice(0, 7);
    if (!acc[mes]) acc[mes] = [];
    acc[mes].push(ev);
    return acc;
  }, {});

  const formatMes   = (mes: string) => new Date(mes + "-01T12:00:00").toLocaleDateString("es-PE", { month: "long", year: "numeric" });
  const formatFecha = (iso: string) => new Date(iso).toLocaleDateString("es-PE", { weekday: "short", day: "numeric", month: "short" });
  const formatHora  = (iso: string) => iso.includes("T") ? iso.split("T")[1].slice(0, 5) : null;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>Calendario</h2>
          <p className={`text-[11px] mt-1 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
            Se sincroniza automáticamente con la página del calendario.
          </p>
        </div>
        <button onClick={() => { reset(); setShowForm(true); }} className={btnPrimary(darkMode)}>
          <Plus size={14} />Nuevo Evento
        </button>
      </div>

      {showForm && (
        <div className={cardCls(darkMode)}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] ${darkMode ? "text-stone-300" : "text-stone-600"}`}>
              {editingId ? "Editar Evento" : "Nuevo Evento"}
            </h3>
            <button onClick={reset}><X size={18} className="text-stone-400" /></button>
          </div>
          <form onSubmit={guardar} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelCls}>Título *</label>
                <input required value={form.titulo} onChange={e => setForm(p => ({ ...p, titulo: e.target.value }))} placeholder="Ej: Noche de Alabanza" className={inputCls(darkMode)} />
              </div>
              <div>
                <label className={labelCls}>Ministerio</label>
                <select value={form.ministerio} onChange={e => setForm(p => ({ ...p, ministerio: e.target.value }))} className={inputCls(darkMode)}>
                  {MINISTERIOS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Fecha {editingId ? "" : "(+ botón para múltiples)"}</label>
                <div className="flex gap-2">
                  <input type="date" value={form.fecha_dia} onChange={e => setForm(p => ({ ...p, fecha_dia: e.target.value }))} className={`${inputCls(darkMode)} flex-1`} />
                  {!editingId && (
                    <button type="button" onClick={agregarFecha} className={`px-3 py-2 rounded-xl border text-[10px] font-bold shrink-0 ${darkMode ? "border-stone-700 text-stone-400 hover:border-stone-500" : "border-stone-200 text-stone-500 hover:border-stone-400"}`}>+</button>
                  )}
                </div>
                {!editingId && fechasSeleccionadas.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {fechasSeleccionadas.map(f => (
                      <span key={f} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-bold ${darkMode ? "bg-stone-800 text-stone-300" : "bg-stone-100 text-stone-600"}`}>
                        {f}<button type="button" onClick={() => setFechasSeleccionadas(p => p.filter(d => d !== f))}><X size={10} /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className={labelCls}>Hora inicio</label>
                <input type="time" value={form.hora_inicio} onChange={e => setForm(p => ({ ...p, hora_inicio: e.target.value }))} className={inputCls(darkMode)} />
              </div>
              <div>
                <label className={labelCls}>Hora fin</label>
                <input type="time" value={form.hora_fin} onChange={e => setForm(p => ({ ...p, hora_fin: e.target.value }))} className={inputCls(darkMode)} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Descripción</label>
                <textarea rows={2} value={form.descripcion} onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))} className={textareaCls(darkMode)} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className={btnPrimary(darkMode)}>
                {saving ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
                {saving ? "Guardando…" : editingId ? "Guardar Cambios" : `Publicar${fechasSeleccionadas.length > 1 ? ` (${fechasSeleccionadas.length} fechas)` : ""}`}
              </button>
              <button type="button" onClick={reset} className={btnSecondary(darkMode)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {Object.keys(eventosPorMes).length === 0 && !showForm && (
        <div className="text-center py-20">
          <Calendar size={32} className={`mx-auto mb-4 ${darkMode ? "text-stone-700" : "text-stone-300"}`} strokeWidth={0.8} />
          <p className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? "text-stone-700" : "text-stone-300"}`}>Sin eventos</p>
        </div>
      )}

      {Object.entries(eventosPorMes).map(([mes, evs]) => (
        <div key={mes} className="space-y-2">
          <p className={`text-[9px] font-black uppercase tracking-widest px-1 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>{formatMes(mes)}</p>
          {evs.map(ev => {
            const horaIni = formatHora(ev.fecha_inicio);
            const horaFin = ev.fecha_fin ? formatHora(ev.fecha_fin) : null;
            return (
              <div key={ev.id} className={rowCls(darkMode)}>
                <div className={`w-2 h-2 rounded-full shrink-0 ${COLOR_DOT[ev.ministerio_cargo] ?? "bg-stone-400"}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{ev.titulo}</p>
                  <p className={`text-[10px] uppercase tracking-widest ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
                    {formatFecha(ev.fecha_inicio)}
                    {horaIni && ` · ${horaIni}${horaFin ? ` – ${horaFin}` : ""}`}
                    {" · "}{ev.ministerio_cargo}
                  </p>
                </div>
                {confirmDeleteId === ev.id ? (
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => eliminar(ev.id)} className="px-3 py-1.5 rounded-full bg-red-500 text-white text-[9px] font-bold uppercase tracking-widest">Confirmar</button>
                    <button onClick={() => setConfirmDeleteId(null)} className={`px-3 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-widest ${darkMode ? "border-stone-700 text-stone-400" : "border-stone-200 text-stone-400"}`}>No</button>
                  </div>
                ) : (
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => editarEvento(ev)} className={`p-2 rounded-full border ${darkMode ? "border-stone-700 text-stone-500 hover:text-stone-300" : "border-stone-200 text-stone-400 hover:text-stone-700"}`}>
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => setConfirmDeleteId(ev.id)} className={`p-2 rounded-full border ${darkMode ? "border-stone-800 text-stone-600 hover:text-red-400" : "border-stone-200 text-stone-300 hover:text-red-400"}`}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
