"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { TalentosConfig } from "@/types";
import { Check, Loader, Plus, X } from "lucide-react";
import { inputCls, textareaCls, btnPrimary, labelCls, cardCls } from "@/lib/admin-ui";

interface Props { darkMode: boolean }

export default function TalentosSection({ darkMode }: Props) {
  const [config, setConfig] = useState<TalentosConfig | null>(null);
  const [form, setForm] = useState({
    dia_entrenamiento: "", hora_inicio: "", hora_fin: "",
    edad_min: 7, edad_max: 17, participantes: "", categorias: 2,
    descripcion: "", video_url: "",
  });
  const [requisitos, setRequisitos] = useState<string[]>([]);
  const [nuevoRequisito, setNuevoRequisito] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("talentos_config").select("*").single().then(({ data }) => {
      if (data) {
        setConfig(data);
        setForm({ dia_entrenamiento: data.dia_entrenamiento, hora_inicio: data.hora_inicio, hora_fin: data.hora_fin, edad_min: data.edad_min, edad_max: data.edad_max, participantes: data.participantes, categorias: data.categorias, descripcion: data.descripcion ?? "", video_url: data.video_url ?? "" });
        setRequisitos(data.requisitos ?? []);
      }
    });
  }, []);

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...form, requisitos };
      if (config) {
        await supabase.from("talentos_config").update(data).eq("id", config.id);
      } else {
        await supabase.from("talentos_config").insert(data);
      }
    } finally { setSaving(false); }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>Academia de Talentos</h2>
        <p className={`text-[11px] mt-1 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>Actualiza la información y requisitos de la academia de fútbol.</p>
      </div>

      <div className={cardCls(darkMode)}>
        <form onSubmit={guardar} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Día de entrenamiento</label><input value={form.dia_entrenamiento} onChange={e => setForm(p => ({ ...p, dia_entrenamiento: e.target.value }))} placeholder="Sábados" className={inputCls(darkMode)} /></div>
            <div><label className={labelCls}>Participantes</label><input value={form.participantes} onChange={e => setForm(p => ({ ...p, participantes: e.target.value }))} placeholder="25+" className={inputCls(darkMode)} /></div>
            <div><label className={labelCls}>Hora de inicio</label><input value={form.hora_inicio} onChange={e => setForm(p => ({ ...p, hora_inicio: e.target.value }))} placeholder="4:00 PM" className={inputCls(darkMode)} /></div>
            <div><label className={labelCls}>Hora de fin</label><input value={form.hora_fin} onChange={e => setForm(p => ({ ...p, hora_fin: e.target.value }))} placeholder="6:00 PM" className={inputCls(darkMode)} /></div>
            <div><label className={labelCls}>Edad mínima</label><input type="number" value={form.edad_min} onChange={e => setForm(p => ({ ...p, edad_min: Number(e.target.value) }))} className={inputCls(darkMode)} /></div>
            <div><label className={labelCls}>Edad máxima</label><input type="number" value={form.edad_max} onChange={e => setForm(p => ({ ...p, edad_max: Number(e.target.value) }))} className={inputCls(darkMode)} /></div>
            <div><label className={labelCls}>Categorías</label><input type="number" value={form.categorias} onChange={e => setForm(p => ({ ...p, categorias: Number(e.target.value) }))} className={inputCls(darkMode)} /></div>
            <div><label className={labelCls}>URL del video hero</label><input value={form.video_url} onChange={e => setForm(p => ({ ...p, video_url: e.target.value }))} placeholder="https://..." className={inputCls(darkMode)} /></div>
            <div className="sm:col-span-2"><label className={labelCls}>Descripción</label><textarea rows={3} value={form.descripcion} onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))} className={textareaCls(darkMode)} /></div>
          </div>

          {/* Requisitos */}
          <div className="space-y-3">
            <label className={labelCls}>Requisitos</label>
            <div className="space-y-2">
              {requisitos.map((r, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`flex-1 text-sm ${darkMode ? "text-stone-300" : "text-stone-700"}`}>{r}</span>
                  <button type="button" onClick={() => setRequisitos(req => req.filter((_, idx) => idx !== i))} className="text-stone-400 hover:text-red-400 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={nuevoRequisito}
                onChange={e => setNuevoRequisito(e.target.value)}
                placeholder="Agregar requisito…"
                className={`${inputCls(darkMode)} flex-1`}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); if (nuevoRequisito.trim()) { setRequisitos(p => [...p, nuevoRequisito.trim()]); setNuevoRequisito(""); } } }}
              />
              <button
                type="button"
                onClick={() => { if (nuevoRequisito.trim()) { setRequisitos(p => [...p, nuevoRequisito.trim()]); setNuevoRequisito(""); } }}
                className={`px-4 py-2 rounded-xl border text-[10px] font-bold ${darkMode ? "border-stone-700 text-stone-400" : "border-stone-200 text-stone-600"}`}
              >
                <Plus size={14} />
              </button>
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
