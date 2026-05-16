"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useContacto, abrirWhatsApp } from "@/hooks/useContacto";
import { supabase } from "@/lib/supabase";
import type { Curso, CursoEstado } from "@/types";
import {
  Clock, GraduationCap, X, ArrowRight, User, CalendarDays,
  BookOpen, CheckCircle2, MessageCircle,
} from "lucide-react";

// ── Estado badge ──────────────────────────────────────────────────────────────
const ESTADO: Record<CursoEstado, { label: string; dot: string; text: string; bg: string }> = {
  proximo:    { label: "Próximamente", dot: "bg-amber-400",  text: "text-amber-600", bg: "bg-amber-500/10" },
  "en-curso": { label: "En Curso",     dot: "bg-green-400",  text: "text-green-600", bg: "bg-green-500/10" },
  finalizado: { label: "Finalizado",   dot: "bg-stone-400",  text: "text-stone-500", bg: "bg-stone-500/10" },
};

export default function CursosPublico() {
  const [darkMode, setDarkMode] = useDarkMode();
  const contacto = useContacto("cursos");
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);

  useEffect(() => {
    supabase
      .from("cursos")
      .select("*, curso_temas(*)")
      .eq("activo", true)
      .order("orden")
      .then(({ data }) => { if (data) setCursos(data as Curso[]); });
  }, []);

  const estado = selectedCurso ? ESTADO[selectedCurso.estado] : null;

  return (
    <main className={`flex h-screen transition-colors duration-1000 overflow-hidden ${darkMode ? "bg-[#0a0a0a] text-stone-400" : "bg-[#fafaf9] text-stone-600"}`}>
      <div className="flex-1 flex flex-col overflow-y-auto font-light custom-scrollbar">
        <div className="h-12 md:h-20" />

        <div className="w-full max-w-5xl mx-auto p-6 md:p-12 space-y-20">
          {/* Header */}
          <header className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className={`p-4 rounded-full border ${darkMode ? "border-stone-800" : "border-stone-100 shadow-sm"}`}>
                <GraduationCap size={32} className="opacity-40" />
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold block">Cursos IBM</span>
              <h1 className={`text-4xl md:text-6xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>
                Crecimiento Espiritual
              </h1>
            </div>
            <p className="max-w-xl mx-auto text-sm leading-relaxed opacity-70">
              Nuestros cursos están diseñados para equiparte en tu caminar con Cristo.
            </p>
          </header>

          {/* Grid de cursos */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-20">
            {cursos.map(curso => {
              const e = ESTADO[curso.estado];
              return (
                <button
                  key={curso.id}
                  onClick={() => setSelectedCurso(curso)}
                  className={`group relative overflow-hidden rounded-[2.5rem] border text-left transition-all duration-500 cursor-pointer ${darkMode ? "border-stone-900 bg-stone-950/50 hover:border-stone-700" : "border-stone-100 bg-white shadow-sm hover:shadow-xl"}`}
                >
                  {/* Imagen */}
                  <div className="aspect-[16/9] overflow-hidden relative">
                    {curso.imagen_url ? (
                      <img src={curso.imagen_url} alt={curso.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                    ) : (
                      <div className={`w-full h-full ${darkMode ? "bg-stone-900" : "bg-stone-100"}`} />
                    )}
                    {/* Badge estado */}
                    <div className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${e.bg} ${e.text} backdrop-blur-sm`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${e.dot}`} />
                      {e.label}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-8 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-stone-400">{curso.categoria}</span>
                      {curso.duracion && (
                        <div className="flex items-center gap-2 text-[10px] opacity-60">
                          <Clock size={12} />{curso.duracion}
                        </div>
                      )}
                    </div>
                    <h3 className={`text-2xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>
                      {curso.titulo}
                    </h3>
                    {curso.instructor && (
                      <p className={`text-[11px] flex items-center gap-1.5 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
                        <User size={11} />{curso.instructor}
                      </p>
                    )}
                    {curso.horario && (
                      <p className={`text-[11px] flex items-center gap-1.5 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
                        <CalendarDays size={11} />{curso.horario}
                      </p>
                    )}
                    <p className="text-xs leading-relaxed opacity-70 line-clamp-2">{curso.descripcion}</p>
                    <div className="pt-2 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-60 transition-opacity">
                      <span>Ver detalles</span><ArrowRight size={12} />
                    </div>
                  </div>
                </button>
              );
            })}
          </section>

          {/* Footer CTA */}
          <section className={`rounded-[3rem] p-6 md:p-12 text-center space-y-6 ${darkMode ? "bg-stone-900/30" : "bg-stone-100/50"}`}>
            <h4 className="font-serif italic text-xl">¿Deseas inscribirte o tienes dudas?</h4>
            <p className="text-xs opacity-70 max-w-md mx-auto">
              Las inscripciones se realizan de manera presencial al finalizar los cultos dominicales o a través de WhatsApp.
            </p>
            <div className="pt-4">
              <button
                onClick={() => abrirWhatsApp(contacto, "Hola, deseo más información sobre los cursos de la Academia IBM")}
                className="text-[10px] uppercase tracking-widest font-black border-b border-current pb-1 hover:opacity-60 transition-opacity"
              >
                Contactar para más información
              </button>
            </div>
          </section>
        </div>

        <footer className="py-24 text-center border-t border-stone-100 dark:border-stone-900 mt-20">
          <div className="space-y-6">
            <p className={`text-xs md:text-sm uppercase tracking-[0.6em] font-black italic ${darkMode ? "text-amber-500/80" : "text-stone-400"}`}>
              Equipando a los cristianos para la vida en el reino de Dios.
            </p>
            <div className="flex justify-center items-center gap-4 opacity-20">
              <div className={`h-px w-12 ${darkMode ? "bg-stone-100" : "bg-stone-900"}`} />
              <div className={`w-1 h-1 rounded-full ${darkMode ? "bg-stone-100" : "bg-stone-900"}`} />
              <div className={`h-px w-12 ${darkMode ? "bg-stone-100" : "bg-stone-900"}`} />
            </div>
            <p className="text-[9px] uppercase tracking-widest opacity-40 font-medium">
              &copy; {new Date().getFullYear()} Iglesia Brisas del Mantaro — Huancayo
            </p>
          </div>
        </footer>
      </div>

      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* ── MODAL DETALLE DEL CURSO ── */}
      {selectedCurso && estado && (
        <div
          className="fixed inset-0 bg-stone-950/70 backdrop-blur-md flex items-center justify-center z-[200] p-4"
          onClick={() => setSelectedCurso(null)}
        >
          <div
            className={`w-full max-w-2xl max-h-[90vh] rounded-[2.5rem] overflow-hidden border shadow-2xl flex flex-col ${darkMode ? "bg-stone-900 border-stone-800" : "bg-white border-stone-100"}`}
            onClick={e => e.stopPropagation()}
          >
            {/* Imagen con overlay */}
            <div className="relative aspect-[16/7] shrink-0 overflow-hidden">
              {selectedCurso.imagen_url ? (
                <img src={selectedCurso.imagen_url} alt={selectedCurso.titulo} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full ${darkMode ? "bg-stone-800" : "bg-stone-100"}`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Cerrar */}
              <button
                onClick={() => setSelectedCurso(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all"
              >
                <X size={18} />
              </button>

              {/* Badge estado + categoria */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${estado.bg} ${estado.text} backdrop-blur-sm`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${estado.dot}`} />
                  {estado.label}
                </span>
              </div>

              {/* Título sobre la imagen */}
              <div className="absolute bottom-5 left-6 right-6">
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">{selectedCurso.categoria}</p>
                <h2 className="text-white text-3xl md:text-4xl font-serif italic leading-tight">{selectedCurso.titulo}</h2>
              </div>
            </div>

            {/* Cuerpo scrollable */}
            <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-6 scrollbar-hide">
              {/* Meta info */}
              <div className={`grid grid-cols-2 gap-3`}>
                {selectedCurso.instructor && (
                  <div className={`flex items-center gap-3 p-4 rounded-2xl ${darkMode ? "bg-stone-800" : "bg-stone-50"}`}>
                    <User size={16} className="text-stone-400 shrink-0" />
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-stone-400">Instructor</p>
                      <p className={`text-sm font-medium ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{selectedCurso.instructor}</p>
                    </div>
                  </div>
                )}
                {selectedCurso.duracion && (
                  <div className={`flex items-center gap-3 p-4 rounded-2xl ${darkMode ? "bg-stone-800" : "bg-stone-50"}`}>
                    <Clock size={16} className="text-stone-400 shrink-0" />
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-stone-400">Duración</p>
                      <p className={`text-sm font-medium ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{selectedCurso.duracion}</p>
                    </div>
                  </div>
                )}
                {selectedCurso.horario && (
                  <div className={`flex items-center gap-3 p-4 rounded-2xl col-span-2 ${darkMode ? "bg-stone-800" : "bg-stone-50"}`}>
                    <CalendarDays size={16} className="text-stone-400 shrink-0" />
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-stone-400">Horario</p>
                      <p className={`text-sm font-medium ${darkMode ? "text-stone-200" : "text-stone-800"}`}>{selectedCurso.horario}</p>
                    </div>
                  </div>
                )}
                {(selectedCurso.fecha_inicio || selectedCurso.fecha_fin) && (
                  <div className={`flex items-center gap-3 p-4 rounded-2xl col-span-2 ${darkMode ? "bg-stone-800" : "bg-stone-50"}`}>
                    <BookOpen size={16} className="text-stone-400 shrink-0" />
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-stone-400">Fechas</p>
                      <p className={`text-sm font-medium ${darkMode ? "text-stone-200" : "text-stone-800"}`}>
                        {selectedCurso.fecha_inicio ? new Date(selectedCurso.fecha_inicio + "T12:00:00").toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" }) : ""}
                        {selectedCurso.fecha_inicio && selectedCurso.fecha_fin ? " → " : ""}
                        {selectedCurso.fecha_fin ? new Date(selectedCurso.fecha_fin + "T12:00:00").toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" }) : ""}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Descripción */}
              {selectedCurso.descripcion && (
                <p className={`text-sm leading-relaxed font-light ${darkMode ? "text-stone-400" : "text-stone-600"}`}>
                  {selectedCurso.descripcion}
                </p>
              )}

              {/* Temas */}
              {selectedCurso.curso_temas && selectedCurso.curso_temas.length > 0 && (
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 pb-2 border-b ${darkMode ? "border-stone-800" : "border-stone-100"}`}>
                    <BookOpen size={14} className="text-stone-400" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                      Temario — {selectedCurso.curso_temas.length} temas
                    </p>
                  </div>
                  <div className="space-y-2">
                    {[...selectedCurso.curso_temas]
                      .sort((a, b) => a.orden - b.orden)
                      .map((tema, i) => (
                        <div key={tema.id} className="flex items-start gap-3">
                          <CheckCircle2 size={14} className="text-stone-400 shrink-0 mt-0.5" />
                          <div>
                            <p className={`text-sm font-medium ${darkMode ? "text-stone-300" : "text-stone-700"}`}>{tema.titulo}</p>
                            {tema.descripcion && (
                              <p className={`text-[11px] font-light mt-0.5 ${darkMode ? "text-stone-500" : "text-stone-400"}`}>{tema.descripcion}</p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <button
                onClick={() => abrirWhatsApp(contacto, `Hola, deseo más información sobre el curso "${selectedCurso.titulo}"`)}
                className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${darkMode ? "bg-stone-100 text-stone-900 hover:bg-white" : "bg-stone-900 text-stone-100 hover:bg-black"}`}
              >
                <MessageCircle size={16} />
                {selectedCurso.estado === "proximo" ? "Consultar fecha de inicio" : "Consultar inscripción"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
