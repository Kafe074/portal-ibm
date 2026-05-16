"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { uploadToStorage, removeFromStorage } from "@/lib/storage";
import type { MisionPunto, MisionViaje, MisionEvangelismo } from "@/types";
import { Plus, Trash2, Check, X, Loader, Upload, MapPin, Camera, Zap, Pencil } from "lucide-react";
import { inputCls, textareaCls, btnPrimary, btnSecondary, labelCls, rowCls, cardCls } from "@/lib/admin-ui";

type SubTab = "puntos" | "viajes" | "evangelismo";

interface Props { darkMode: boolean }

export default function MisionesSection({ darkMode }: Props) {
  const [subTab, setSubTab] = useState<SubTab>("puntos");
  const [puntos, setPuntos] = useState<MisionPunto[]>([]);
  const [viajes, setViajes] = useState<MisionViaje[]>([]);
  const [evangelismo, setEvangelismo] = useState<MisionEvangelismo | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedFotos, setSelectedFotos] = useState<File[]>([]);
  const [editingPuntoId, setEditingPuntoId] = useState<string | null>(null);
  const [editingViajeId, setEditingViajeId] = useState<string | null>(null);

  const [puntoForm, setPuntoForm] = useState({
    nombre: "", misionero: "", proyecto: "", bio: "",
    testimonio_texto: "", testimonio_autor: "",
    peticiones: "", lat: "", lng: "", link_externo: "", orden: 0,
  });

  const [viajeForm, setViajeForm] = useState({ lugar: "", fecha_texto: "", descripcion: "", orden: 0 });
  const [evangForm, setEvangForm] = useState({ proxima_salida: "" });

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    supabase.from("misiones_puntos").select("*").eq("activo", true).order("orden").then(({ data }) => { if (data) setPuntos(data); });
    supabase.from("misiones_viajes").select("*").order("orden").then(({ data }) => { if (data) setViajes(data); });
    supabase.from("misiones_evangelismo").select("*").eq("activo", true).single().then(({ data }) => { if (data) setEvangelismo(data); });
  }

  function editarPunto(p: MisionPunto) {
    setEditingPuntoId(p.id);
    setPuntoForm({
      nombre: p.nombre, misionero: p.misionero, proyecto: p.proyecto, bio: p.bio ?? "",
      testimonio_texto: p.testimonio_texto ?? "", testimonio_autor: p.testimonio_autor ?? "",
      peticiones: (p.peticiones ?? []).join("\n"), lat: String(p.lat), lng: String(p.lng),
      link_externo: p.link_externo ?? "", orden: p.orden,
    });
    setSelectedFotos([]);
    setShowForm(true);
  }

  function editarViaje(v: MisionViaje) {
    setEditingViajeId(v.id);
    setViajeForm({ lugar: v.lugar, fecha_texto: v.fecha_texto, descripcion: v.descripcion ?? "", orden: v.orden });
    setSelectedFotos([]);
    setShowForm(true);
  }

  async function crearPunto(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const fotos: string[] = [];
      for (const f of selectedFotos) {
        const url = await uploadToStorage(f, "misiones/puntos");
        if (url) fotos.push(url);
      }
      const peticionesArr = puntoForm.peticiones.split("\n").map(p => p.trim()).filter(Boolean);
      const basePayload = {
        nombre: puntoForm.nombre, misionero: puntoForm.misionero, proyecto: puntoForm.proyecto,
        bio: puntoForm.bio || null, testimonio_texto: puntoForm.testimonio_texto || null,
        testimonio_autor: puntoForm.testimonio_autor || null, peticiones: peticionesArr,
        lat: Number(puntoForm.lat), lng: Number(puntoForm.lng),
        link_externo: puntoForm.link_externo || null, orden: puntoForm.orden,
      };
      if (editingPuntoId) {
        const puntoActual = puntos.find(p => p.id === editingPuntoId);
        const fotosFinales = fotos.length > 0 ? [...(puntoActual?.fotos ?? []), ...fotos] : (puntoActual?.fotos ?? []);
        await supabase.from("misiones_puntos").update({ ...basePayload, fotos: fotosFinales }).eq("id", editingPuntoId);
        setEditingPuntoId(null);
      } else {
        await supabase.from("misiones_puntos").insert({ ...basePayload, fotos, activo: true });
      }
      setShowForm(false);
      setSelectedFotos([]);
      setPuntoForm({ nombre: "", misionero: "", proyecto: "", bio: "", testimonio_texto: "", testimonio_autor: "", peticiones: "", lat: "", lng: "", link_externo: "", orden: puntos.length });
      fetchAll();
    } finally { setSaving(false); }
  }

  async function crearViaje(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const fotos: string[] = [];
      for (const f of selectedFotos) {
        const url = await uploadToStorage(f, "misiones/viajes");
        if (url) fotos.push(url);
      }
      if (editingViajeId) {
        const viajeActual = viajes.find(v => v.id === editingViajeId);
        const fotosFinales = fotos.length > 0 ? [...(viajeActual?.fotos ?? []), ...fotos] : (viajeActual?.fotos ?? []);
        await supabase.from("misiones_viajes").update({ ...viajeForm, fotos: fotosFinales }).eq("id", editingViajeId);
        setEditingViajeId(null);
      } else {
        await supabase.from("misiones_viajes").insert({ ...viajeForm, fotos });
      }
      setShowForm(false);
      setSelectedFotos([]);
      setViajeForm({ lugar: "", fecha_texto: "", descripcion: "", orden: viajes.length });
      fetchAll();
    } finally { setSaving(false); }
  }

  async function actualizarEvangelismo(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const fotos: string[] = evangelismo?.fotos ?? [];
      for (const f of selectedFotos) {
        const url = await uploadToStorage(f, "misiones/evangelismo");
        if (url) fotos.push(url);
      }
      if (evangelismo) {
        await supabase.from("misiones_evangelismo").update({ proxima_salida: evangForm.proxima_salida, fotos }).eq("id", evangelismo.id);
      } else {
        await supabase.from("misiones_evangelismo").insert({ proxima_salida: evangForm.proxima_salida, fotos, activo: true });
      }
      setSelectedFotos([]);
      fetchAll();
    } finally { setSaving(false); }
  }

  async function eliminarPunto(id: string) {
    if (!confirm("¿Eliminar este punto de misión?")) return;
    await supabase.from("misiones_puntos").update({ activo: false }).eq("id", id);
    fetchAll();
  }

  async function eliminarViaje(id: string, fotos: string[]) {
    if (!confirm("¿Eliminar este viaje?")) return;
    for (const f of fotos) await removeFromStorage(f);
    await supabase.from("misiones_viajes").delete().eq("id", id);
    fetchAll();
  }

  async function eliminarFotoEvangelismo(url: string) {
    if (!evangelismo) return;
    await removeFromStorage(url);
    const newFotos = evangelismo.fotos.filter(f => f !== url);
    await supabase.from("misiones_evangelismo").update({ fotos: newFotos }).eq("id", evangelismo.id);
    fetchAll();
  }

  const SubTabBtn = ({ id, label, icon: Icon }: { id: SubTab; label: string; icon: any }) => (
    <button
      onClick={() => { setSubTab(id); setShowForm(false); }}
      className={`flex items-center gap-2 py-2 px-3 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] transition-all ${subTab === id ? (darkMode ? "bg-stone-800 text-stone-100" : "bg-white text-stone-900 shadow-sm") : (darkMode ? "text-stone-500 hover:text-stone-300" : "text-stone-400 hover:text-stone-700")}`}
    >
      <Icon size={12} />{label}
    </button>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>Misiones</h2>
          <p className={`text-[11px] mt-1 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>Gestiona puntos de misión, bitácora de viajes y evangelismo local.</p>
        </div>
        <button onClick={() => setShowForm(true)} className={btnPrimary(darkMode)}><Plus size={14} />Agregar</button>
      </div>

      {/* Sub-tabs */}
      <div className={`flex gap-1 p-1 rounded-xl border ${darkMode ? "bg-stone-900/50 border-stone-800" : "bg-stone-100 border-stone-200"}`}>
        <SubTabBtn id="puntos" label="Puntos" icon={MapPin} />
        <SubTabBtn id="viajes" label="Bitácora" icon={Camera} />
        <SubTabBtn id="evangelismo" label="Evangelismo" icon={Zap} />
      </div>

      {/* ── PUNTOS ── */}
      {subTab === "puntos" && (
        <>
          {showForm && (
            <div className={cardCls(darkMode)}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] ${darkMode ? "text-stone-300" : "text-stone-600"}`}>{editingPuntoId ? "Editar Punto" : "Nuevo Punto de Misión"}</h3>
                <button onClick={() => setShowForm(false)}><X size={18} className="text-stone-400" /></button>
              </div>
              <form onSubmit={crearPunto} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={labelCls}>Ciudad / Nombre *</label><input required value={puntoForm.nombre} onChange={e => setPuntoForm(p => ({ ...p, nombre: e.target.value }))} placeholder="Mazamari, Perú" className={inputCls(darkMode)} /></div>
                  <div><label className={labelCls}>Misionero *</label><input required value={puntoForm.misionero} onChange={e => setPuntoForm(p => ({ ...p, misionero: e.target.value }))} placeholder="Familia Romero" className={inputCls(darkMode)} /></div>
                  <div className="sm:col-span-2"><label className={labelCls}>Proyecto *</label><input required value={puntoForm.proyecto} onChange={e => setPuntoForm(p => ({ ...p, proyecto: e.target.value }))} placeholder="Nombre del proyecto" className={inputCls(darkMode)} /></div>
                  <div className="sm:col-span-2"><label className={labelCls}>Biografía</label><textarea rows={3} value={puntoForm.bio} onChange={e => setPuntoForm(p => ({ ...p, bio: e.target.value }))} className={textareaCls(darkMode)} /></div>
                  <div><label className={labelCls}>Testimonio (texto)</label><textarea rows={2} value={puntoForm.testimonio_texto} onChange={e => setPuntoForm(p => ({ ...p, testimonio_texto: e.target.value }))} className={textareaCls(darkMode)} /></div>
                  <div><label className={labelCls}>Testimonio (autor)</label><input value={puntoForm.testimonio_autor} onChange={e => setPuntoForm(p => ({ ...p, testimonio_autor: e.target.value }))} placeholder="David R." className={inputCls(darkMode)} /></div>
                  <div className="sm:col-span-2"><label className={labelCls}>Peticiones (una por línea)</label><textarea rows={3} value={puntoForm.peticiones} onChange={e => setPuntoForm(p => ({ ...p, peticiones: e.target.value }))} placeholder={"Sabiduría para el equipo\nProtección en los viajes"} className={textareaCls(darkMode)} /></div>
                  <div><label className={labelCls}>Latitud *</label><input required type="number" step="any" value={puntoForm.lat} onChange={e => setPuntoForm(p => ({ ...p, lat: e.target.value }))} placeholder="-11.321" className={inputCls(darkMode)} /></div>
                  <div><label className={labelCls}>Longitud *</label><input required type="number" step="any" value={puntoForm.lng} onChange={e => setPuntoForm(p => ({ ...p, lng: e.target.value }))} placeholder="-74.535" className={inputCls(darkMode)} /></div>
                  <div className="sm:col-span-2"><label className={labelCls}>Enlace externo (opcional)</label><input value={puntoForm.link_externo} onChange={e => setPuntoForm(p => ({ ...p, link_externo: e.target.value }))} placeholder="https://..." className={inputCls(darkMode)} /></div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Fotos ({selectedFotos.length} seleccionadas)</label>
                    <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer ${darkMode ? "border-stone-700 hover:border-stone-500 text-stone-500" : "border-stone-200 hover:border-stone-400 text-stone-400"}`}>
                      <Upload size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{selectedFotos.length > 0 ? `${selectedFotos.length} archivo(s)` : "Subir fotos"}</span>
                      <input type="file" multiple accept="image/*" className="hidden" onChange={e => setSelectedFotos(Array.from(e.target.files || []))} />
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className={btnPrimary(darkMode)}>
                    {saving ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
                    {saving ? "Publicando…" : "Publicar"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className={btnSecondary(darkMode)}>Cancelar</button>
                </div>
              </form>
            </div>
          )}
          <div className="space-y-3">
            {puntos.map(p => (
              <div key={p.id} className={rowCls(darkMode)}>
                {p.fotos[0] && <img src={p.fotos[0]} className="w-12 h-12 rounded-xl object-cover shrink-0" alt="" />}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{p.misionero}</p>
                  <p className={`text-[10px] uppercase tracking-widest ${darkMode ? "text-stone-500" : "text-stone-400"}`}>{p.nombre}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => { setSubTab("puntos"); editarPunto(p); }} className={`p-2 rounded-full border ${darkMode ? "border-stone-700 text-stone-500 hover:text-stone-300" : "border-stone-200 text-stone-400 hover:text-stone-700"}`}>
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => eliminarPunto(p.id)} className={`p-2 rounded-full border ${darkMode ? "border-stone-800 text-stone-600 hover:text-red-400" : "border-stone-200 text-stone-300 hover:text-red-400"}`}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── VIAJES ── */}
      {subTab === "viajes" && (
        <>
          {showForm && (
            <div className={cardCls(darkMode)}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] ${darkMode ? "text-stone-300" : "text-stone-600"}`}>{editingViajeId ? "Editar Viaje" : "Nuevo Viaje"}</h3>
                <button onClick={() => setShowForm(false)}><X size={18} className="text-stone-400" /></button>
              </div>
              <form onSubmit={crearViaje} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={labelCls}>Lugar *</label><input required value={viajeForm.lugar} onChange={e => setViajeForm(p => ({ ...p, lugar: e.target.value }))} placeholder="Puerto Bermudes" className={inputCls(darkMode)} /></div>
                  <div><label className={labelCls}>Fecha (texto) *</label><input required value={viajeForm.fecha_texto} onChange={e => setViajeForm(p => ({ ...p, fecha_texto: e.target.value }))} placeholder="Agosto 2025" className={inputCls(darkMode)} /></div>
                  <div className="sm:col-span-2"><label className={labelCls}>Descripción</label><textarea rows={3} value={viajeForm.descripcion} onChange={e => setViajeForm(p => ({ ...p, descripcion: e.target.value }))} className={textareaCls(darkMode)} /></div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Fotos del viaje ({selectedFotos.length})</label>
                    <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer ${darkMode ? "border-stone-700 hover:border-stone-500 text-stone-500" : "border-stone-200 hover:border-stone-400 text-stone-400"}`}>
                      <Upload size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{selectedFotos.length > 0 ? `${selectedFotos.length} archivo(s)` : "Subir fotos"}</span>
                      <input type="file" multiple accept="image/*" className="hidden" onChange={e => setSelectedFotos(Array.from(e.target.files || []))} />
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className={btnPrimary(darkMode)}>
                    {saving ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
                    {saving ? "Guardando…" : "Guardar"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className={btnSecondary(darkMode)}>Cancelar</button>
                </div>
              </form>
            </div>
          )}
          <div className="space-y-3">
            {viajes.map(v => (
              <div key={v.id} className={rowCls(darkMode)}>
                {v.fotos[0] && <img src={v.fotos[0]} className="w-12 h-12 rounded-xl object-cover shrink-0" alt="" />}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{v.lugar}</p>
                  <p className={`text-[10px] uppercase tracking-widest ${darkMode ? "text-stone-500" : "text-stone-400"}`}>{v.fecha_texto} · {v.fotos.length} fotos</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => { setSubTab("viajes"); editarViaje(v); }} className={`p-2 rounded-full border ${darkMode ? "border-stone-700 text-stone-500 hover:text-stone-300" : "border-stone-200 text-stone-400 hover:text-stone-700"}`}>
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => eliminarViaje(v.id, v.fotos)} className={`p-2 rounded-full border ${darkMode ? "border-stone-800 text-stone-600 hover:text-red-400" : "border-stone-200 text-stone-300 hover:text-red-400"}`}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── EVANGELISMO ── */}
      {subTab === "evangelismo" && (
        <div className={cardCls(darkMode)}>
          <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-6 ${darkMode ? "text-stone-300" : "text-stone-600"}`}>Evangelismo Local</h3>
          <form onSubmit={actualizarEvangelismo} className="space-y-5">
            <div>
              <label className={labelCls}>Próxima salida (texto)</label>
              <input
                value={evangForm.proxima_salida || evangelismo?.proxima_salida || ""}
                onChange={e => setEvangForm(p => ({ ...p, proxima_salida: e.target.value }))}
                placeholder="Sábado 03 de Mayo, 09:00 AM"
                className={inputCls(darkMode)}
              />
            </div>
            <div>
              <label className={labelCls}>Agregar más fotos ({selectedFotos.length})</label>
              <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer ${darkMode ? "border-stone-700 hover:border-stone-500 text-stone-500" : "border-stone-200 hover:border-stone-400 text-stone-400"}`}>
                <Upload size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{selectedFotos.length > 0 ? `${selectedFotos.length} seleccionadas` : "Subir fotos"}</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={e => setSelectedFotos(Array.from(e.target.files || []))} />
              </label>
            </div>
            {evangelismo && evangelismo.fotos.length > 0 && (
              <div>
                <label className={labelCls}>Fotos actuales (clic para eliminar)</label>
                <div className="grid grid-cols-4 gap-2">
                  {evangelismo.fotos.map((url, i) => (
                    <div key={i} className="relative group/foto">
                      <img src={url} className="w-full h-20 object-cover rounded-xl" alt="" />
                      <button
                        type="button"
                        onClick={() => eliminarFotoEvangelismo(url)}
                        className="absolute inset-0 flex items-center justify-center bg-red-500/80 rounded-xl opacity-0 group-hover/foto:opacity-100 transition-opacity text-white"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button type="submit" disabled={saving} className={btnPrimary(darkMode)}>
              {saving ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
              {saving ? "Guardando…" : "Guardar Cambios"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
