"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { uploadToStorage, removeFromStorage } from "@/lib/storage";
import type { NoticiaDB } from "@/types";
import { Plus, Trash2, Eye, EyeOff, Upload, X, Check, Newspaper, Loader, Pencil } from "lucide-react";
import { inputCls, textareaCls, btnPrimary, btnSecondary, labelCls, rowCls, cardCls } from "@/lib/admin-ui";

interface Props { darkMode: boolean }

export default function NoticiasSection({ darkMode }: Props) {
  const [noticias, setNoticias] = useState<NoticiaDB[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<{ id: string; url: string; orden: number }[]>([]);
  const [form, setForm] = useState({
    titulo: "", descripcion: "", tag: "Anuncio", fecha: "", cta: "", ctaLink: "", activa: false,
  });

  useEffect(() => { fetch(); }, []);

  async function fetch() {
    const { data } = await supabase
      .from("noticias").select("*, noticia_imagenes(id, url, orden)")
      .order("fecha", { ascending: false });
    if (data) setNoticias(data);
  }

  function reset() {
    setForm({ titulo: "", descripcion: "", tag: "Anuncio", fecha: "", cta: "", ctaLink: "", activa: false });
    setSelectedImages([]);
    setExistingImages([]);
    setEditingId(null);
    setShowForm(false);
  }

  function editarNoticia(n: NoticiaDB) {
    setEditingId(n.id);
    setForm({
      titulo: n.titulo, descripcion: n.descripcion ?? "", tag: n.tag,
      fecha: n.fecha, cta: n.cta ?? "", ctaLink: n.cta_link ?? "", activa: n.activa,
    });
    setExistingImages([...(n.noticia_imagenes ?? [])].sort((a, b) => a.orden - b.orden).map(i => ({ id: i.id ?? "", url: i.url, orden: i.orden })));
    setSelectedImages([]);
    setShowForm(true);
  }

  async function eliminarImagenExistente(img: { id: string; url: string }) {
    await removeFromStorage(img.url);
    await supabase.from("noticia_imagenes").delete().eq("id", img.id);
    setExistingImages(p => p.filter(i => i.id !== img.id));
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);
    try {
      const payload = {
        titulo: form.titulo, descripcion: form.descripcion || null, tag: form.tag,
        fecha: form.fecha, cta: form.cta || null, cta_link: form.ctaLink || null, activa: form.activa,
      };

      if (editingId) {
        // Actualizar noticia existente
        await supabase.from("noticias").update(payload).eq("id", editingId);
        // Subir nuevas imágenes adicionales
        if (selectedImages.length > 0) {
          const maxOrden = existingImages.length > 0 ? Math.max(...existingImages.map(i => i.orden)) + 1 : 0;
          const uploads = await Promise.all(selectedImages.map((file, i) =>
            uploadToStorage(file, `noticias/${editingId}`).then(url =>
              url ? { noticia_id: editingId, url, orden: maxOrden + i } : null
            )
          ));
          const records = uploads.filter(Boolean) as any[];
          if (records.length) await supabase.from("noticia_imagenes").insert(records);
        }
      } else {
        // Crear nueva noticia
        const { data: noticia, error } = await supabase.from("noticias").insert(payload).select().single();
        if (error || !noticia) return;
        if (selectedImages.length > 0) {
          const uploads = await Promise.all(selectedImages.map((file, i) =>
            uploadToStorage(file, `noticias/${noticia.id}`).then(url =>
              url ? { noticia_id: noticia.id, url, orden: i } : null
            )
          ));
          const records = uploads.filter(Boolean) as any[];
          if (records.length) await supabase.from("noticia_imagenes").insert(records);
        }
      }
      reset(); fetch();
    } finally { setUploading(false); }
  }

  async function toggleModal(id: string, currentActiva: boolean) {
    await supabase.from("noticias").update({ activa: !currentActiva }).eq("id", id);
    fetch();
  }

  async function eliminar(id: string) {
    if (!confirm("¿Eliminar esta noticia?")) return;
    const n = noticias.find(n => n.id === id);
    if (n?.noticia_imagenes) await Promise.all(n.noticia_imagenes.map(img => removeFromStorage(img.url)));
    await supabase.from("noticias").delete().eq("id", id);
    fetch();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>Noticias y Anuncios</h2>
          <p className={`text-[11px] mt-1 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
            La noticia con <span className="font-bold">Modal ON</span> aparece al entrar al inicio.
          </p>
        </div>
        <button onClick={() => { reset(); setShowForm(true); }} className={btnPrimary(darkMode)}>
          <Plus size={14} />Nueva
        </button>
      </div>

      {showForm && (
        <div className={cardCls(darkMode)}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] ${darkMode ? "text-stone-300" : "text-stone-600"}`}>
              {editingId ? "Editar Noticia" : "Nueva Noticia"}
            </h3>
            <button onClick={reset}><X size={18} className="text-stone-400" /></button>
          </div>
          <form onSubmit={guardar} className="space-y-5">
            <div>
              <label className={labelCls}>Título *</label>
              <input required value={form.titulo} onChange={e => setForm(p => ({ ...p, titulo: e.target.value }))} placeholder="Título de la noticia" className={inputCls(darkMode)} />
            </div>
            <div>
              <label className={labelCls}>Descripción</label>
              <textarea rows={3} value={form.descripcion} onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))} className={textareaCls(darkMode)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Categoría</label>
                <select value={form.tag} onChange={e => setForm(p => ({ ...p, tag: e.target.value }))} className={inputCls(darkMode)}>
                  <option>Aviso</option><option>Evento</option><option>Anuncio</option><option>Celebración</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Fecha *</label>
                <input required type="date" value={form.fecha} onChange={e => setForm(p => ({ ...p, fecha: e.target.value }))} className={inputCls(darkMode)} />
              </div>
              <div>
                <label className={labelCls}>Botón — Texto</label>
                <input value={form.cta} onChange={e => setForm(p => ({ ...p, cta: e.target.value }))} placeholder="Ver en Calendario" className={inputCls(darkMode)} />
              </div>
              <div>
                <label className={labelCls}>Botón — Enlace</label>
                <input value={form.ctaLink} onChange={e => setForm(p => ({ ...p, ctaLink: e.target.value }))} placeholder="/calendario" className={inputCls(darkMode)} />
              </div>
            </div>

            {/* Imágenes existentes (solo en edit) */}
            {editingId && existingImages.length > 0 && (
              <div>
                <label className={labelCls}>Imágenes actuales (clic en × para eliminar)</label>
                <div className="grid grid-cols-4 gap-2">
                  {existingImages.map(img => (
                    <div key={img.id} className="relative group/img">
                      <img src={img.url} alt="" className="w-full h-20 object-cover rounded-xl" />
                      <button
                        type="button"
                        onClick={() => eliminarImagenExistente(img)}
                        className="absolute inset-0 flex items-center justify-center bg-red-500/80 rounded-xl opacity-0 group-hover/img:opacity-100 transition-opacity text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className={labelCls}>
                {editingId ? `Agregar imágenes (${selectedImages.length})` : `Imágenes (${selectedImages.length})`}
              </label>
              <label className={`flex flex-col items-center justify-center gap-2 w-full h-20 rounded-xl border-2 border-dashed cursor-pointer ${darkMode ? "border-stone-700 hover:border-stone-500 text-stone-500" : "border-stone-200 hover:border-stone-400 text-stone-400"}`}>
                <Upload size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {selectedImages.length > 0 ? `${selectedImages.length} imagen(es)` : "Seleccionar imágenes"}
                </span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={e => setSelectedImages(Array.from(e.target.files || []))} />
              </label>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <button type="button" onClick={() => setForm(p => ({ ...p, activa: !p.activa }))} className={`relative w-11 h-6 rounded-full transition-all duration-300 shrink-0 ${form.activa ? "bg-stone-800 dark:bg-stone-100" : darkMode ? "bg-stone-700" : "bg-stone-200"}`}>
                <span className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 bg-white ${form.activa ? "left-[1.375rem]" : "left-1"}`} />
              </button>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-stone-400" : "text-stone-500"}`}>
                Mostrar como modal al entrar al inicio
              </span>
            </label>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={uploading} className={btnPrimary(darkMode)}>
                {uploading ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
                {uploading ? "Guardando…" : editingId ? "Guardar Cambios" : "Publicar"}
              </button>
              <button type="button" onClick={reset} className={btnSecondary(darkMode)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {noticias.length === 0 && !showForm && (
          <div className="text-center py-20"><p className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? "text-stone-700" : "text-stone-300"}`}>No hay noticias publicadas</p></div>
        )}
        {noticias.map(n => {
          const thumb = [...(n.noticia_imagenes ?? [])].sort((a, b) => a.orden - b.orden)[0];
          const fecha = new Date(n.fecha + "T12:00:00").toLocaleDateString("es-PE", { day: "numeric", month: "short", year: "numeric" });
          return (
            <div key={n.id} className={rowCls(darkMode)}>
              {thumb ? <img src={thumb.url} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" /> : <div className={`w-14 h-14 rounded-xl shrink-0 flex items-center justify-center ${darkMode ? "bg-stone-800" : "bg-stone-100"}`}><Newspaper size={18} className="text-stone-400" /></div>}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="text-[8px] font-black uppercase tracking-widest text-amber-500">{n.tag}</span>
                  <span className={`text-[8px] uppercase tracking-widest ${darkMode ? "text-stone-600" : "text-stone-400"}`}>{fecha}</span>
                  {(n.noticia_imagenes?.length ?? 0) > 1 && <span className={`text-[8px] ${darkMode ? "text-stone-600" : "text-stone-400"}`}>· {n.noticia_imagenes.length} fotos</span>}
                </div>
                <p className={`text-sm font-serif italic truncate ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{n.titulo}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleModal(n.id, n.activa)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all ${n.activa ? (darkMode ? "bg-stone-100 text-stone-900 border-stone-100" : "bg-stone-900 text-stone-100 border-stone-900") : (darkMode ? "border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-300" : "border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-700")}`}
                >
                  {n.activa ? <Eye size={11} /> : <EyeOff size={11} />}
                  <span className="hidden sm:inline">{n.activa ? "Modal ON" : "Modal OFF"}</span>
                </button>
                <button onClick={() => editarNoticia(n)} className={`p-2 rounded-full border ${darkMode ? "border-stone-700 text-stone-500 hover:text-stone-300" : "border-stone-200 text-stone-400 hover:text-stone-700"}`}>
                  <Pencil size={13} />
                </button>
                <button onClick={() => eliminar(n.id)} className={`p-2 rounded-full border ${darkMode ? "border-stone-800 text-stone-600 hover:text-red-400" : "border-stone-200 text-stone-300 hover:text-red-400"}`}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
