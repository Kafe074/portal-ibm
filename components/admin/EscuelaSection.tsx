"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { uploadToStorage, removeFromStorage } from "@/lib/storage";
import type { EscuelaSalon } from "@/types";
import { Plus, Trash2, Check, X, Loader, Upload, Pencil } from "lucide-react";
import { inputCls, textareaCls, btnPrimary, btnSecondary, labelCls, rowCls, cardCls } from "@/lib/admin-ui";

interface Props { darkMode: boolean }

export default function EscuelaSection({ darkMode }: Props) {
  const [salones, setSalones] = useState<EscuelaSalon[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [selectedFotos, setSelectedFotos] = useState<File[]>([]);
  const [form, setForm] = useState({ nombre: "", rango_edades: "", descripcion: "", orden: 0 });

  useEffect(() => { fetch(); }, []);

  async function fetch() {
    const { data } = await supabase.from("escuela_salones").select("*").order("orden");
    if (data) setSalones(data);
  }

  function editarSalon(s: EscuelaSalon) {
    setEditingId(s.id);
    setForm({ nombre: s.nombre, rango_edades: s.rango_edades, descripcion: s.descripcion ?? "", orden: s.orden });
    setSelectedFotos([]);
    setShowForm(true);
  }

  function reset() {
    setForm({ nombre: "", rango_edades: "", descripcion: "", orden: salones.length });
    setSelectedFotos([]);
    setEditingId(null);
    setShowForm(false);
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        // Actualizar texto; agregar nuevas fotos sin borrar las existentes
        const nuevasFotos: string[] = [];
        for (const f of selectedFotos) {
          const url = await uploadToStorage(f, `escuela/${form.nombre.toLowerCase()}`);
          if (url) nuevasFotos.push(url);
        }
        const salonActual = salones.find(s => s.id === editingId);
        const fotosFinales = [...(salonActual?.fotos ?? []), ...nuevasFotos];
        await supabase.from("escuela_salones").update({
          nombre: form.nombre, rango_edades: form.rango_edades,
          descripcion: form.descripcion || null, orden: form.orden, fotos: fotosFinales,
        }).eq("id", editingId);
      } else {
        const fotos: string[] = [];
        for (const f of selectedFotos) {
          const url = await uploadToStorage(f, `escuela/${form.nombre.toLowerCase()}`);
          if (url) fotos.push(url);
        }
        await supabase.from("escuela_salones").insert({ ...form, fotos, activo: true });
      }
      reset();
      fetch();
    } finally { setSaving(false); }
  }

  async function eliminarSalon(id: string, fotos: string[]) {
    if (!confirm("¿Eliminar este salón?")) return;
    for (const f of fotos) await removeFromStorage(f);
    await supabase.from("escuela_salones").delete().eq("id", id);
    fetch();
  }

  async function toggleActivo(id: string, activo: boolean) {
    await supabase.from("escuela_salones").update({ activo: !activo }).eq("id", id);
    fetch();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>Escuela Dominical</h2>
          <p className={`text-[11px] mt-1 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>Gestiona los salones por grupo de edad.</p>
        </div>
        <button onClick={() => { reset(); setShowForm(true); }} className={btnPrimary(darkMode)}><Plus size={14} />Nuevo Salón</button>
      </div>

      {showForm && (
        <div className={cardCls(darkMode)}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] ${darkMode ? "text-stone-300" : "text-stone-600"}`}>{editingId ? "Editar Salón" : "Nuevo Salón"}</h3>
            <button onClick={reset}><X size={18} className="text-stone-400" /></button>
          </div>
          <form onSubmit={guardar} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={labelCls}>Nombre del salón *</label><input required value={form.nombre} onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))} placeholder="Estrellitas" className={inputCls(darkMode)} /></div>
              <div><label className={labelCls}>Rango de edades *</label><input required value={form.rango_edades} onChange={e => setForm(p => ({ ...p, rango_edades: e.target.value }))} placeholder="3 a 6 años" className={inputCls(darkMode)} /></div>
              <div className="sm:col-span-2"><label className={labelCls}>Descripción</label><textarea rows={2} value={form.descripcion} onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))} className={textareaCls(darkMode)} /></div>
              <div><label className={labelCls}>Orden</label><input type="number" min={0} value={form.orden} onChange={e => setForm(p => ({ ...p, orden: Number(e.target.value) }))} className={inputCls(darkMode)} /></div>
              <div>
                <label className={labelCls}>Fotos / Videos ({selectedFotos.length})</label>
                <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer ${darkMode ? "border-stone-700 text-stone-500" : "border-stone-200 text-stone-400"}`}>
                  <Upload size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{selectedFotos.length > 0 ? `${selectedFotos.length} archivo(s)` : "Subir archivos"}</span>
                  <input type="file" multiple accept="image/*,video/mp4" className="hidden" onChange={e => setSelectedFotos(Array.from(e.target.files || []))} />
                </label>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className={btnPrimary(darkMode)}>
                {saving ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
                {saving ? "Guardando…" : editingId ? "Guardar Cambios" : "Crear Salón"}
              </button>
              <button type="button" onClick={reset} className={btnSecondary(darkMode)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {salones.map((s, idx) => (
          <div key={s.id} className={rowCls(darkMode)}>
            <span className={`text-sm font-serif italic shrink-0 w-6 text-center ${darkMode ? "text-stone-500" : "text-stone-400"}`}>{idx + 1}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{s.nombre}</p>
              <p className={`text-[10px] uppercase tracking-widest ${darkMode ? "text-stone-500" : "text-stone-400"}`}>{s.rango_edades} · {s.fotos.length} archivos</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => editarSalon(s)} className={`p-2 rounded-full border ${darkMode ? "border-stone-700 text-stone-500 hover:text-stone-300" : "border-stone-200 text-stone-400 hover:text-stone-700"}`}>
                <Pencil size={13} />
              </button>
              <button onClick={() => toggleActivo(s.id, s.activo ?? true)} className={`px-3 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-widest ${(s.activo ?? true) ? (darkMode ? "bg-stone-100 text-stone-900 border-stone-100" : "bg-stone-900 text-stone-100 border-stone-900") : (darkMode ? "border-stone-700 text-stone-500" : "border-stone-200 text-stone-400")}`}>
                {(s.activo ?? true) ? "ON" : "OFF"}
              </button>
              <button onClick={() => eliminarSalon(s.id, s.fotos)} className={`p-2 rounded-full border ${darkMode ? "border-stone-800 text-stone-600 hover:text-red-400" : "border-stone-200 text-stone-300 hover:text-red-400"}`}>
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
