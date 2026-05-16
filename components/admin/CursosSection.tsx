"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { uploadToStorage, removeFromStorage } from "@/lib/storage";
import type { Curso, CursoTema, CursoEstado } from "@/types";
import {
  Plus, Trash2, Check, X, Loader, Upload, ChevronDown, ChevronUp, Pencil,
} from "lucide-react";
import { inputCls, textareaCls, btnPrimary, btnSecondary, labelCls, rowCls, cardCls } from "@/lib/admin-ui";

const ESTADOS: { value: CursoEstado; label: string; color: string }[] = [
  { value: "proximo",    label: "Próximamente", color: "text-amber-500" },
  { value: "en-curso",  label: "En Curso",      color: "text-green-500" },
  { value: "finalizado",label: "Finalizado",    color: "text-stone-400" },
];

const CATEGORIAS = ["Discipulado", "Ministerial", "Bíblico", "Liderazgo", "Familiar"];

interface Props { darkMode: boolean }

export default function CursosSection({ darkMode }: Props) {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [selectedImg, setSelectedImg] = useState<File | null>(null);

  const [form, setForm] = useState({
    titulo: "", descripcion: "", categoria: "Discipulado", duracion: "",
    estado: "proximo" as CursoEstado, instructor: "", fecha_inicio: "",
    fecha_fin: "", horario: "", orden: 0,
  });

  // Temas del curso en edición
  const [temas, setTemas] = useState<{ titulo: string; descripcion: string }[]>([]);
  const [nuevoTema, setNuevoTema] = useState({ titulo: "", descripcion: "" });

  useEffect(() => { fetchCursos(); }, []);

  async function fetchCursos() {
    const { data } = await supabase.from("cursos")
      .select("*, curso_temas(*)")
      .order("orden");
    if (data) setCursos(data as Curso[]);
  }

  function resetForm() {
    setForm({ titulo: "", descripcion: "", categoria: "Discipulado", duracion: "", estado: "proximo", instructor: "", fecha_inicio: "", fecha_fin: "", horario: "", orden: cursos.length });
    setTemas([]);
    setNuevoTema({ titulo: "", descripcion: "" });
    setSelectedImg(null);
    setEditingId(null);
    setShowForm(false);
  }

  function editarCurso(c: Curso) {
    setEditingId(c.id);
    setForm({
      titulo: c.titulo, descripcion: c.descripcion ?? "", categoria: c.categoria,
      duracion: c.duracion ?? "", estado: c.estado, instructor: c.instructor ?? "",
      fecha_inicio: c.fecha_inicio ?? "", fecha_fin: c.fecha_fin ?? "",
      horario: c.horario ?? "", orden: c.orden,
    });
    setTemas((c.curso_temas ?? []).sort((a,b) => a.orden - b.orden).map(t => ({ titulo: t.titulo, descripcion: t.descripcion ?? "" })));
    setSelectedImg(null);
    setShowForm(true);
  }

  function agregarTema() {
    if (!nuevoTema.titulo.trim()) return;
    setTemas(p => [...p, { titulo: nuevoTema.titulo.trim(), descripcion: nuevoTema.descripcion.trim() }]);
    setNuevoTema({ titulo: "", descripcion: "" });
  }

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let imagen_url: string | null = editingId ? (cursos.find(c => c.id === editingId)?.imagen_url ?? null) : null;
      if (selectedImg) {
        const url = await uploadToStorage(selectedImg, "cursos");
        if (url) imagen_url = url;
      }

      const payload = { ...form, imagen_url, fecha_inicio: form.fecha_inicio || null, fecha_fin: form.fecha_fin || null };

      let cursoId = editingId;
      if (editingId) {
        await supabase.from("cursos").update(payload).eq("id", editingId);
        await supabase.from("curso_temas").delete().eq("curso_id", editingId);
      } else {
        const { data } = await supabase.from("cursos").insert({ ...payload, activo: true }).select().single();
        cursoId = data?.id ?? null;
      }

      if (cursoId && temas.length > 0) {
        await supabase.from("curso_temas").insert(
          temas.map((t, i) => ({ curso_id: cursoId, titulo: t.titulo, descripcion: t.descripcion || null, orden: i }))
        );
      }

      resetForm(); fetchCursos();
    } finally { setSaving(false); }
  }

  async function eliminarCurso(id: string, imagenUrl: string | null) {
    if (!confirm("¿Eliminar este curso?")) return;
    if (imagenUrl) await removeFromStorage(imagenUrl);
    await supabase.from("cursos").delete().eq("id", id);
    fetchCursos();
  }

  async function cambiarEstado(id: string, estado: CursoEstado) {
    await supabase.from("cursos").update({ estado }).eq("id", id);
    fetchCursos();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>Cursos</h2>
          <p className={`text-[11px] mt-1 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
            Gestiona los cursos, sus temas, horarios e instructores.
          </p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className={btnPrimary(darkMode)}>
          <Plus size={14} />Nuevo Curso
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className={cardCls(darkMode)}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] ${darkMode ? "text-stone-300" : "text-stone-600"}`}>
              {editingId ? "Editar Curso" : "Nuevo Curso"}
            </h3>
            <button onClick={resetForm}><X size={18} className="text-stone-400" /></button>
          </div>
          <form onSubmit={guardar} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelCls}>Título *</label>
                <input required value={form.titulo} onChange={e => setForm(p => ({ ...p, titulo: e.target.value }))} placeholder="Nombre del curso" className={inputCls(darkMode)} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Descripción</label>
                <textarea rows={3} value={form.descripcion} onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))} className={textareaCls(darkMode)} />
              </div>

              <div>
                <label className={labelCls}>Categoría</label>
                <select value={form.categoria} onChange={e => setForm(p => ({ ...p, categoria: e.target.value }))} className={inputCls(darkMode)}>
                  {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Estado</label>
                <select value={form.estado} onChange={e => setForm(p => ({ ...p, estado: e.target.value as CursoEstado }))} className={inputCls(darkMode)}>
                  {ESTADOS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                </select>
              </div>

              <div>
                <label className={labelCls}>Instructor</label>
                <input value={form.instructor} onChange={e => setForm(p => ({ ...p, instructor: e.target.value }))} placeholder="Nombre del instructor" className={inputCls(darkMode)} />
              </div>
              <div>
                <label className={labelCls}>Duración</label>
                <input value={form.duracion} onChange={e => setForm(p => ({ ...p, duracion: e.target.value }))} placeholder="8 Sesiones" className={inputCls(darkMode)} />
              </div>

              <div className="sm:col-span-2">
                <label className={labelCls}>Horario</label>
                <input value={form.horario} onChange={e => setForm(p => ({ ...p, horario: e.target.value }))} placeholder="Sábados 9:00 AM – 11:00 AM" className={inputCls(darkMode)} />
              </div>

              <div>
                <label className={labelCls}>Fecha de inicio</label>
                <input type="date" value={form.fecha_inicio} onChange={e => setForm(p => ({ ...p, fecha_inicio: e.target.value }))} className={inputCls(darkMode)} />
              </div>
              <div>
                <label className={labelCls}>Fecha de fin</label>
                <input type="date" value={form.fecha_fin} onChange={e => setForm(p => ({ ...p, fecha_fin: e.target.value }))} className={inputCls(darkMode)} />
              </div>

              <div>
                <label className={labelCls}>Orden de visualización</label>
                <input type="number" min={0} value={form.orden} onChange={e => setForm(p => ({ ...p, orden: Number(e.target.value) }))} className={inputCls(darkMode)} />
              </div>
              <div>
                <label className={labelCls}>Imagen {editingId && "(vacío = mantener actual)"}</label>
                <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer ${darkMode ? "border-stone-700 text-stone-500" : "border-stone-200 text-stone-400"}`}>
                  <Upload size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest truncate">{selectedImg ? selectedImg.name : "Subir imagen"}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => setSelectedImg(e.target.files?.[0] || null)} />
                </label>
              </div>
            </div>

            {/* Temas del curso */}
            <div className="space-y-3 pt-2">
              <label className={labelCls}>Temas del curso ({temas.length})</label>
              <div className="space-y-2">
                {temas.map((t, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${darkMode ? "bg-stone-800" : "bg-stone-50"}`}>
                    <span className={`text-[10px] font-bold pt-1 shrink-0 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>{i + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{t.titulo}</p>
                      {t.descripcion && <p className={`text-[11px] ${darkMode ? "text-stone-500" : "text-stone-400"}`}>{t.descripcion}</p>}
                    </div>
                    <button type="button" onClick={() => setTemas(p => p.filter((_, idx) => idx !== i))} className="text-stone-400 hover:text-red-400 transition-colors shrink-0 pt-0.5">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              {/* Agregar tema */}
              <div className={`p-4 rounded-xl border-2 border-dashed space-y-2 ${darkMode ? "border-stone-700" : "border-stone-200"}`}>
                <input
                  value={nuevoTema.titulo}
                  onChange={e => setNuevoTema(p => ({ ...p, titulo: e.target.value }))}
                  placeholder="Título del tema"
                  className={inputCls(darkMode)}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); agregarTema(); } }}
                />
                <input
                  value={nuevoTema.descripcion}
                  onChange={e => setNuevoTema(p => ({ ...p, descripcion: e.target.value }))}
                  placeholder="Descripción breve (opcional)"
                  className={inputCls(darkMode)}
                />
                <button type="button" onClick={agregarTema} disabled={!nuevoTema.titulo.trim()} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest ${darkMode ? "bg-stone-700 text-stone-300 hover:bg-stone-600 disabled:opacity-40" : "bg-stone-100 text-stone-600 hover:bg-stone-200 disabled:opacity-40"}`}>
                  <Plus size={12} />Agregar tema
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className={btnPrimary(darkMode)}>
                {saving ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
                {saving ? "Guardando…" : (editingId ? "Guardar Cambios" : "Publicar Curso")}
              </button>
              <button type="button" onClick={resetForm} className={btnSecondary(darkMode)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de cursos */}
      <div className="space-y-3">
        {cursos.length === 0 && !showForm && (
          <div className="text-center py-20">
            <p className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? "text-stone-700" : "text-stone-300"}`}>No hay cursos publicados</p>
          </div>
        )}
        {cursos.map(c => {
          const estadoInfo = ESTADOS.find(e => e.value === c.estado) ?? ESTADOS[0];
          const isExpanded = expandedId === c.id;
          return (
            <div key={c.id} className={`rounded-2xl border overflow-hidden transition-all ${darkMode ? "bg-stone-900/50 border-stone-800" : "bg-white border-stone-100 shadow-sm"}`}>
              <div className="flex items-center gap-4 p-4">
                {c.imagen_url ? (
                  <img src={c.imagen_url} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                ) : (
                  <div className={`w-14 h-14 rounded-xl shrink-0 ${darkMode ? "bg-stone-800" : "bg-stone-100"}`} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${estadoInfo.color}`}>{estadoInfo.label}</span>
                    <span className={`text-[9px] uppercase tracking-widest ${darkMode ? "text-stone-600" : "text-stone-300"}`}>· {c.categoria}</span>
                  </div>
                  <p className={`text-sm font-serif italic truncate ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{c.titulo}</p>
                  {c.instructor && <p className={`text-[10px] ${darkMode ? "text-stone-500" : "text-stone-400"}`}>{c.instructor}</p>}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Cambio rápido de estado */}
                  <select
                    value={c.estado}
                    onChange={e => cambiarEstado(c.id, e.target.value as CursoEstado)}
                    className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1.5 rounded-lg border outline-none ${darkMode ? "bg-stone-800 border-stone-700 text-stone-300" : "bg-stone-50 border-stone-200 text-stone-600"}`}
                  >
                    {ESTADOS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                  </select>

                  <button onClick={() => editarCurso(c)} className={`p-2 rounded-full border ${darkMode ? "border-stone-700 text-stone-500 hover:text-stone-300" : "border-stone-200 text-stone-400 hover:text-stone-700"}`}>
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => setExpandedId(isExpanded ? null : c.id)} className={`p-2 rounded-full border ${darkMode ? "border-stone-700 text-stone-500" : "border-stone-200 text-stone-400"}`}>
                    {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                  <button onClick={() => eliminarCurso(c.id, c.imagen_url)} className={`p-2 rounded-full border ${darkMode ? "border-stone-800 text-stone-600 hover:text-red-400" : "border-stone-200 text-stone-300 hover:text-red-400"}`}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Panel expandido — temas */}
              {isExpanded && (
                <div className={`px-4 pb-4 pt-2 border-t space-y-2 ${darkMode ? "border-stone-800" : "border-stone-100"}`}>
                  <p className={labelCls}>Temas ({c.curso_temas?.length ?? 0})</p>
                  {(c.curso_temas?.length ?? 0) === 0 ? (
                    <p className={`text-[11px] italic ${darkMode ? "text-stone-600" : "text-stone-400"}`}>Sin temas registrados</p>
                  ) : (
                    <div className="space-y-1.5">
                      {[...c.curso_temas].sort((a, b) => a.orden - b.orden).map((t, i) => (
                        <div key={t.id} className={`flex items-start gap-2 text-sm ${darkMode ? "text-stone-400" : "text-stone-600"}`}>
                          <span className={`shrink-0 font-bold text-[10px] pt-0.5 ${darkMode ? "text-stone-600" : "text-stone-400"}`}>{i + 1}.</span>
                          <div>
                            <span className="font-medium">{t.titulo}</span>
                            {t.descripcion && <span className={`ml-2 text-[11px] ${darkMode ? "text-stone-600" : "text-stone-400"}`}>— {t.descripcion}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {c.horario && <p className={`text-[10px] pt-2 ${darkMode ? "text-stone-600" : "text-stone-400"}`}>🕐 {c.horario}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
