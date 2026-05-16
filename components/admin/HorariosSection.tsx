"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Horario } from "@/types";
import { Plus, Trash2, Check, X, Loader, Pencil } from "lucide-react";
import { inputCls, btnPrimary, btnSecondary, labelCls, rowCls, cardCls } from "@/lib/admin-ui";

const SECCIONES = [
  { value: "inicio",           label: "Inicio (Reuniones generales)" },
  { value: "alabanza-general", label: "Alabanza General" },
  { value: "grace-and-mercy",  label: "Grace & Mercy" },
];

const ICONOS = ["clock", "users", "heart", "music"];

interface Props { darkMode: boolean }

export default function HorariosSection({ darkMode }: Props) {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    seccion: "inicio", titulo: "", dias: "", hora_inicio: "",
    hora_fin: "", color: "text-amber-500", icono: "clock", orden: 0,
  });

  useEffect(() => { fetch(); }, []);

  async function fetch() {
    const { data } = await supabase.from("horarios").select("*").order("seccion").order("orden");
    if (data) setHorarios(data);
  }

  function editarHorario(h: Horario) {
    setEditingId(h.id);
    setForm({
      seccion: h.seccion, titulo: h.titulo, dias: h.dias,
      hora_inicio: h.hora_inicio, hora_fin: h.hora_fin ?? "",
      color: h.color, icono: h.icono, orden: h.orden,
    });
    setShowForm(true);
  }

  function reset() {
    setForm({ seccion: "inicio", titulo: "", dias: "", hora_inicio: "", hora_fin: "", color: "text-amber-500", icono: "clock", orden: horarios.length });
    setEditingId(null);
    setShowForm(false);
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, hora_fin: form.hora_fin || null };
    if (editingId) {
      await supabase.from("horarios").update(payload).eq("id", editingId);
    } else {
      await supabase.from("horarios").insert({ ...payload, activo: true });
    }
    setSaving(false);
    reset();
    fetch();
  }

  async function eliminar(id: string) {
    if (!confirm("¿Eliminar este horario?")) return;
    await supabase.from("horarios").delete().eq("id", id);
    fetch();
  }

  async function toggleActivo(id: string, activo: boolean) {
    await supabase.from("horarios").update({ activo: !activo }).eq("id", id);
    fetch();
  }

  const gruposSeccion = SECCIONES.map(s => ({
    ...s,
    items: horarios.filter(h => h.seccion === s.value),
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>Horarios</h2>
          <p className={`text-[11px] mt-1 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
            Gestiona los horarios de reuniones y ensayos por sección.
          </p>
        </div>
        <button onClick={() => { reset(); setShowForm(true); }} className={btnPrimary(darkMode)}>
          <Plus size={14} />Agregar
        </button>
      </div>

      {showForm && (
        <div className={cardCls(darkMode)}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] ${darkMode ? "text-stone-300" : "text-stone-600"}`}>
              {editingId ? "Editar Horario" : "Nuevo Horario"}
            </h3>
            <button onClick={reset}><X size={18} className="text-stone-400" /></button>
          </div>
          <form onSubmit={guardar} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Sección *</label>
                <select required value={form.seccion} onChange={e => setForm(p => ({ ...p, seccion: e.target.value }))} className={inputCls(darkMode)}>
                  {SECCIONES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Título *</label>
                <input required value={form.titulo} onChange={e => setForm(p => ({ ...p, titulo: e.target.value }))} placeholder="Oración, Ensayo…" className={inputCls(darkMode)} />
              </div>
              <div>
                <label className={labelCls}>Días *</label>
                <input required value={form.dias} onChange={e => setForm(p => ({ ...p, dias: e.target.value }))} placeholder="Martes, Lun/Mié/Jue" className={inputCls(darkMode)} />
              </div>
              <div>
                <label className={labelCls}>Hora inicio *</label>
                <input required value={form.hora_inicio} onChange={e => setForm(p => ({ ...p, hora_inicio: e.target.value }))} placeholder="19:30" className={inputCls(darkMode)} />
              </div>
              <div>
                <label className={labelCls}>Hora fin</label>
                <input value={form.hora_fin} onChange={e => setForm(p => ({ ...p, hora_fin: e.target.value }))} placeholder="21:30" className={inputCls(darkMode)} />
              </div>
              <div>
                <label className={labelCls}>Ícono</label>
                <select value={form.icono} onChange={e => setForm(p => ({ ...p, icono: e.target.value }))} className={inputCls(darkMode)}>
                  {ICONOS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Color (clase Tailwind)</label>
                <input value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} placeholder="text-amber-500" className={inputCls(darkMode)} />
              </div>
              <div>
                <label className={labelCls}>Orden</label>
                <input type="number" min={0} value={form.orden} onChange={e => setForm(p => ({ ...p, orden: Number(e.target.value) }))} className={inputCls(darkMode)} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className={btnPrimary(darkMode)}>
                {saving ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
                {saving ? "Guardando…" : editingId ? "Guardar Cambios" : "Guardar"}
              </button>
              <button type="button" onClick={reset} className={btnSecondary(darkMode)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {gruposSeccion.map(grupo => (
        <div key={grupo.value} className="space-y-3">
          <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">{grupo.label}</p>
          {grupo.items.length === 0 && (
            <p className={`text-[10px] py-4 text-center ${darkMode ? "text-stone-700" : "text-stone-300"}`}>Sin horarios en esta sección</p>
          )}
          {grupo.items.map(h => (
            <div key={h.id} className={rowCls(darkMode)}>
              <div className={`w-2 h-2 rounded-full shrink-0 ${h.activo ? "bg-green-400" : "bg-stone-400"}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{h.titulo}</p>
                <p className={`text-[10px] uppercase tracking-widest ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
                  {h.dias} · {h.hora_inicio}{h.hora_fin ? ` — ${h.hora_fin}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleActivo(h.id, h.activo)}
                  className={`px-3 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all ${h.activo ? (darkMode ? "bg-stone-100 text-stone-900 border-stone-100" : "bg-stone-900 text-stone-100 border-stone-900") : (darkMode ? "border-stone-700 text-stone-500" : "border-stone-200 text-stone-400")}`}
                >
                  {h.activo ? "ON" : "OFF"}
                </button>
                <button onClick={() => editarHorario(h)} className={`p-2 rounded-full border ${darkMode ? "border-stone-700 text-stone-500 hover:text-stone-300" : "border-stone-200 text-stone-400 hover:text-stone-700"}`}>
                  <Pencil size={13} />
                </button>
                <button onClick={() => eliminar(h.id)} className={`p-2 rounded-full border ${darkMode ? "border-stone-800 text-stone-600 hover:text-red-400" : "border-stone-200 text-stone-300 hover:text-red-400"}`}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
