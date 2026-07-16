"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Newspaper } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { NoticiaDB } from "@/types";
import NoticiaCard from "@/components/noticias/NoticiaCard";

export default function NoticiasPage() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [noticias, setNoticias] = useState<NoticiaDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("noticias")
      .select("*, noticia_imagenes(url, orden)")
      .order("fecha", { ascending: false })
      .then(({ data }) => {
        if (data) setNoticias(data);
        setLoading(false);
      });
  }, []);

  return (
    <main
      className={`flex h-screen transition-colors duration-1000 overflow-hidden ${
        darkMode ? "bg-[#0a0a0a] text-stone-400" : "bg-[#fafaf9] text-stone-600"
      }`}
    >
      <div className="flex-1 flex flex-col overflow-y-auto font-light selection:bg-stone-200 custom-scrollbar">
        <div className="h-8 md:h-12" />

        <div className="w-full max-w-3xl mx-auto p-6 md:p-12 space-y-16 pb-32">
          {/* Encabezado */}
          <section className="space-y-6 animate-fade-up">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-stone-400 block">
                Iglesia Brisas del Mantaro
              </span>
              <h1
                className={`text-5xl md:text-7xl font-extralight tracking-tighter leading-[1] ${
                  darkMode ? "text-stone-100" : "text-stone-900"
                }`}
              >
                Noticias &amp;{" "}
                <span className="italic font-serif opacity-40">Anuncios.</span>
              </h1>
            </div>
            <div className={`h-px w-full ${darkMode ? "bg-stone-900" : "bg-stone-100"}`} />
          </section>

          {/* Contenido */}
          {loading ? (
            <div className="flex justify-center py-32">
              <div
                className={`w-5 h-5 rounded-full border-2 border-t-transparent animate-spin ${
                  darkMode ? "border-stone-600" : "border-stone-300"
                }`}
              />
            </div>
          ) : noticias.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-6 text-center">
              <Newspaper
                size={48}
                strokeWidth={0.8}
                className={darkMode ? "text-stone-700" : "text-stone-300"}
              />
              <div className="space-y-2">
                <p
                  className={`text-[10px] font-black uppercase tracking-[0.4em] ${
                    darkMode ? "text-stone-600" : "text-stone-400"
                  }`}
                >
                  Sin publicaciones aún
                </p>
                <p className={`text-sm font-light ${darkMode ? "text-stone-600" : "text-stone-400"}`}>
                  Las noticias y anuncios de la iglesia aparecerán aquí.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {noticias.map((noticia) => (
                <NoticiaCard key={noticia.id} noticia={noticia} darkMode={darkMode} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
    </main>
  );
}
