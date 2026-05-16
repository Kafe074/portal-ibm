"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Contacto } from "@/types";
import { Check, Loader, Pencil } from "lucide-react";
import { inputCls, btnPrimary, labelCls, rowCls } from "@/lib/admin-ui";

interface Props { darkMode: boolean }

export default function ContactosSection({ darkMode }: Props) {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNumero, setEditNumero] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetch(); }, []);

  async function fetch() {
    const { data } = await supabase.from("contactos").select("*").order("area");
    if (data) setContactos(data);
  }

  async function guardar(id: string) {
    setSaving(true);
    await supabase.from("contactos").update({ numero: editNumero }).eq("id", id);
    setSaving(false);
    setEditingId(null);
    fetch();
  }

  async function toggleActivo(id: string, activo: boolean) {
    await supabase.from("contactos").update({ activo: !activo }).eq("id", id);
    fetch();
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>Contactos WhatsApp</h2>
        <p className={`text-[11px] mt-1 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
          Cada número se usa automáticamente en su sección correspondiente del sitio.
          El número debe incluir código de país (Ej: 51956055194).
        </p>
      </div>

      <div className="space-y-3">
        {contactos.map(c => (
          <div key={c.id} className={rowCls(darkMode)}>
            <div className={`w-2 h-2 rounded-full shrink-0 ${c.activo ? "bg-green-400" : "bg-stone-400"}`} />
            <div className="flex-1 min-w-0">
              <p className={`text-[9px] font-black uppercase tracking-widest ${darkMode ? "text-stone-500" : "text-stone-400"}`}>{c.area}</p>
              <p className={`text-sm font-medium ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{c.nombre}</p>
              {editingId === c.id ? (
                <div className="flex gap-2 items-center mt-2">
                  <input
                    value={editNumero}
                    onChange={e => setEditNumero(e.target.value)}
                    className={`${inputCls(darkMode)} max-w-[200px] py-1.5 text-xs`}
                    placeholder="51956055194"
                  />
                  <button
                    onClick={() => guardar(c.id)}
                    disabled={saving}
                    className={`p-1.5 rounded-full ${darkMode ? "bg-stone-700 text-stone-200" : "bg-stone-900 text-white"}`}
                  >
                    {saving ? <Loader size={12} className="animate-spin" /> : <Check size={12} />}
                  </button>
                </div>
              ) : (
                <p className={`text-xs font-mono ${darkMode ? "text-stone-500" : "text-stone-400"}`}>+{c.numero}</p>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              {editingId !== c.id && (
                <button
                  onClick={() => { setEditingId(c.id); setEditNumero(c.numero); }}
                  className={`p-2 rounded-full border transition-all ${darkMode ? "border-stone-700 text-stone-500 hover:text-stone-300" : "border-stone-200 text-stone-400 hover:text-stone-700"}`}
                >
                  <Pencil size={13} />
                </button>
              )}
              <button
                onClick={() => toggleActivo(c.id, c.activo)}
                className={`px-3 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all ${c.activo ? (darkMode ? "bg-stone-100 text-stone-900 border-stone-100" : "bg-stone-900 text-stone-100 border-stone-900") : (darkMode ? "border-stone-700 text-stone-500" : "border-stone-200 text-stone-400")}`}
              >
                {c.activo ? "Activo" : "Inactivo"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
