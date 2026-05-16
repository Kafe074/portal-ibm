"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { uploadToStorage } from "@/lib/storage";
import type { ComedorConfig } from "@/types";
import { Check, Loader, Upload } from "lucide-react";
import { inputCls, textareaCls, btnPrimary, labelCls, cardCls } from "@/lib/admin-ui";

interface Props { darkMode: boolean }

export default function ComedorSection({ darkMode }: Props) {
  const [config, setConfig] = useState<ComedorConfig | null>(null);
  const [form, setForm] = useState({ costo: "", horario_inicio: "", horario_fin: "", dias: "", raciones: "", direccion: "", descripcion: "" });
  const [selectedFoto, setSelectedFoto] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("comedor_config").select("*").single().then(({ data }) => {
      if (data) { setConfig(data); setForm({ costo: data.costo, horario_inicio: data.horario_inicio, horario_fin: data.horario_fin, dias: data.dias, raciones: data.raciones, direccion: data.direccion ?? "", descripcion: data.descripcion ?? "" }); }
    });
  }, []);

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let foto_url = config?.foto_url ?? null;
      if (selectedFoto) {
        foto_url = await uploadToStorage(selectedFoto, "comedor");
      }
      const data = { ...form, foto_url };
      if (config) {
        await supabase.from("comedor_config").update(data).eq("id", config.id);
      } else {
        await supabase.from("comedor_config").insert(data);
      }
      const { data: updated } = await supabase.from("comedor_config").select("*").single();
      if (updated) setConfig(updated);
      setSelectedFoto(null);
    } finally { setSaving(false); }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>Comedor Popular</h2>
        <p className={`text-[11px] mt-1 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
          Actualiza el costo, horario y detalles del Comedor Misericordia.
        </p>
      </div>

      <div className={cardCls(darkMode)}>
        <form onSubmit={guardar} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Costo</label><input value={form.costo} onChange={e => setForm(p => ({ ...p, costo: e.target.value }))} placeholder="S/.3.50" className={inputCls(darkMode)} /></div>
            <div><label className={labelCls}>Días</label><input value={form.dias} onChange={e => setForm(p => ({ ...p, dias: e.target.value }))} placeholder="Lun - Vie" className={inputCls(darkMode)} /></div>
            <div><label className={labelCls}>Hora de apertura</label><input value={form.horario_inicio} onChange={e => setForm(p => ({ ...p, horario_inicio: e.target.value }))} placeholder="12:00 PM" className={inputCls(darkMode)} /></div>
            <div><label className={labelCls}>Hora de cierre</label><input value={form.horario_fin} onChange={e => setForm(p => ({ ...p, horario_fin: e.target.value }))} placeholder="2:00 PM" className={inputCls(darkMode)} /></div>
            <div><label className={labelCls}>Raciones diarias</label><input value={form.raciones} onChange={e => setForm(p => ({ ...p, raciones: e.target.value }))} placeholder="150+" className={inputCls(darkMode)} /></div>
            <div><label className={labelCls}>Dirección</label><input value={form.direccion} onChange={e => setForm(p => ({ ...p, direccion: e.target.value }))} placeholder="Calle Los Heraldos 205" className={inputCls(darkMode)} /></div>
            <div className="sm:col-span-2"><label className={labelCls}>Descripción</label><textarea rows={3} value={form.descripcion} onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))} className={textareaCls(darkMode)} /></div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Foto principal {selectedFoto && `— ${selectedFoto.name}`}</label>
              {config?.foto_url && !selectedFoto && <img src={config.foto_url} className="w-32 h-20 object-cover rounded-xl mb-2" alt="" />}
              <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer ${darkMode ? "border-stone-700 hover:border-stone-500 text-stone-500" : "border-stone-200 hover:border-stone-400 text-stone-400"}`}>
                <Upload size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{selectedFoto ? selectedFoto.name : "Cambiar foto"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={e => setSelectedFoto(e.target.files?.[0] || null)} />
              </label>
            </div>
          </div>
          <button type="submit" disabled={saving} className={btnPrimary(darkMode)}>
            {saving ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
            {saving ? "Guardando…" : "Guardar Cambios"}
          </button>
        </form>
      </div>
    </div>
  );
}
