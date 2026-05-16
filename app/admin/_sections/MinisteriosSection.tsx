"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { uploadToStorage, removeFromStorage } from "@/lib/storage";
import type { Integrante, MinisterioKey } from "@/types";
import { Plus, Trash2, Check, X, Upload, Loader } from "lucide-react";
import { inputCls, btnPrimary, btnSecondary, labelCls, rowCls, cardCls } from "@/lib/admin-ui";

type MinisterioTab = MinisterioKey;

interface Props { darkMode: boolean }

export default function MinisteriosSection({ darkMode }: Props) {
  const [tab, setTab] = useState<MinisterioTab>("alabanza-general");
  const [integrantes, setIntegrantes] = useState<Integrante[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFoto, setSelectedFoto] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ nombre: "", rol: "", orden: 0 });

  useEffect(() => { fetch(); setShowForm(false); }, [tab]);

  async function fetch() {
    const { data } = await supabase.from("ministerio_integrantes").select("*").eq("ministerio", tab).order("orden");
    if (data) setIntegrantes(data);
  }

  function reset() { setForm({ nombre: "", rol: "", orden: integrantes.length }); setSelectedFoto(null); setEditingId(null); setShowForm(false); }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let foto_url: string | null = null;
      if (selectedFoto) foto_url = await uploadToStorage(selectedFoto, `ministerios/${tab}`);
      if (editingId) {
        const update: any = { nombre: form.nombre, rol: form.rol || null, orden: form.orden };
        if (foto_url) update.foto_url = foto_url;
        await supabase.from("ministerio_integrantes").update(update).eq("id", editingId);
      } else {
        await supabase.from("ministerio_integrantes").insert({ ministerio: tab, nombre: form.nombre, rol: form.rol || null, foto_url, orden: form.orden });
      }
      reset(); fetch();
    } finally { setSaving(false); }
  }

  async function eliminar(id: string, fotoUrl: string | null) {
    if (!confirm("¿Eliminar este integrante?")) return;
    if (fotoUrl) await removeFromStorage(fotoUrl);
    await supabase.from("ministerio_integrantes").delete().eq("id", id);
    fetch();
  }

  const TABS: { id: MinisterioTab; label: string }[] = [
    { id: "alabanza-general", label: "Alabanza General" },
    { id: "grace-and-mercy",  label: "Grace & Mercy" },
    { id: "produccion",       label: "Producción" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>Integrantes</h2>
          <p className={`text-[11px] mt-1 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>Gestiona los miembros de cada ministerio.</p>
        </div>
        <button onClick={() => { setForm({ nombre: "", rol: "", orden: integrantes.length }); setEditingId(null); setSelectedFoto(null); setShowForm(true); }} className={btnPrimary(darkMode)}>
          <Plus size={14} />Agregar
        </button>
      </div>

      {/* Sub-tabs */}
      <div className={`flex gap-1 p-1 rounded-xl border overflow-x-auto ${darkMode ? "bg-stone-900/50 border-stone-800" : "bg-stone-100 border-stone-200"}`}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 whitespace-nowrap py-2 px-3 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] transition-all ${tab === t.id ? (darkMode ? "bg-stone-800 text-stone-100" : "bg-white text-stone-900 shadow-sm") : (darkMode ? "text-stone-500 hover:text-stone-300" : "text-stone-400 hover:text-stone-700")}`}>
            {t.label}
          </button>
        ))}
      </div>

      {showForm && (
        <div className={cardCls(darkMode)}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] ${darkMode ? "text-stone-300" : "text-stone-600"}`}>{editingId ? "Editar" : "Nuevo"} Integrante</h3>
            <button onClick={reset}><X size={18} className="text-stone-400" /></button>
          </div>
          <form onSubmit={guardar} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={labelCls}>Nombre *</label><input required value={form.nombre} onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))} placeholder="Nombre completo" className={inputCls(darkMode)} /></div>
              <div><label className={labelCls}>Rol / Instrumento</label><input value={form.rol} onChange={e => setForm(p => ({ ...p, rol: e.target.value }))} placeholder="Guitarra, Vocalista…" className={inputCls(darkMode)} /></div>
              <div><label className={labelCls}>Orden</label><input type="number" min={0} value={form.orden} onChange={e => setForm(p => ({ ...p, orden: Number(e.target.value) }))} className={inputCls(darkMode)} /></div>
              <div>
                <label className={labelCls}>Foto {editingId && "(vacío = mantener actual)"}</label>
                <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer ${darkMode ? "border-stone-700 text-stone-500" : "border-stone-200 text-stone-400"}`}>
                  <Upload size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest truncate">{selectedFoto ? selectedFoto.name : "Subir foto"}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => setSelectedFoto(e.target.files?.[0] || null)} />
                </label>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className={btnPrimary(darkMode)}>
                {saving ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
                {saving ? "Guardando…" : "Guardar"}
              </button>
              <button type="button" onClick={reset} className={btnSecondary(darkMode)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {integrantes.length === 0 && !showForm && (
          <div className="text-center py-20"><p className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? "text-stone-700" : "text-stone-300"}`}>No hay integrantes en este ministerio</p></div>
        )}
        {integrantes.map(i => (
          <div key={i.id} className={rowCls(darkMode)}>
            {i.foto_url ? <img src={i.foto_url} alt={i.nombre} className="w-12 h-12 rounded-full object-cover shrink-0 border dark:border-stone-700" /> : <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${darkMode ? "bg-stone-800" : "bg-stone-100"}`}><span className={`font-serif italic text-lg ${darkMode ? "text-stone-400" : "text-stone-500"}`}>{i.nombre[0]}</span></div>}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{i.nombre}</p>
              {i.rol && <p className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>{i.rol}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => { setEditingId(i.id); setForm({ nombre: i.nombre, rol: i.rol ?? "", orden: i.orden }); setSelectedFoto(null); setShowForm(true); }} className={`px-3 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-widest ${darkMode ? "border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-300" : "border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-700"}`}>Editar</button>
              <button onClick={() => eliminar(i.id, i.foto_url)} className={`p-2 rounded-full border ${darkMode ? "border-stone-800 text-stone-600 hover:text-red-400" : "border-stone-200 text-stone-300 hover:text-red-400"}`}><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
