"use client";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import type { NoticiaDB } from "@/types";
import CarruselImagenes from "./CarruselImagenes";

const TAG_COLORS: Record<string, string> = {
  Aviso: "text-amber-500",
  Evento: "text-rose-400",
  Anuncio: "text-sky-400",
  Celebración: "text-purple-400",
};

interface Props {
  noticia: NoticiaDB;
  darkMode: boolean;
}

export default function NoticiaCard({ noticia, darkMode }: Props) {
  const imagenes = [...(noticia.noticia_imagenes ?? [])]
    .sort((a, b) => a.orden - b.orden)
    .map((img) => img.url);

  const fechaFmt = new Date(noticia.fecha + "T12:00:00").toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article
      className={`rounded-[2.5rem] overflow-hidden border transition-all duration-500 shadow-sm hover:shadow-xl ${
        darkMode ? "bg-stone-900/60 border-stone-800" : "bg-white border-stone-100"
      }`}
    >
      {imagenes.length > 0 && (
        <div className="p-4 pb-0">
          <CarruselImagenes imagenes={imagenes} darkMode={darkMode} />
        </div>
      )}

      <div className="p-7 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className={`text-[9px] font-black uppercase tracking-[0.4em] ${TAG_COLORS[noticia.tag] ?? "text-stone-400"}`}>
            {noticia.tag}
          </span>
          <div className={`flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
            <CalendarDays size={11} />
            {fechaFmt}
          </div>
        </div>

        <h2 className={`text-2xl font-serif italic leading-tight ${darkMode ? "text-stone-100" : "text-stone-900"}`}>
          {noticia.titulo}
        </h2>

        {noticia.descripcion && (
          <p className={`text-sm font-light leading-relaxed ${darkMode ? "text-stone-400" : "text-stone-500"}`}>
            {noticia.descripcion}
          </p>
        )}

        {noticia.cta && noticia.cta_link && (
          <Link
            href={noticia.cta_link}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] uppercase tracking-[0.2em] font-bold transition-all mt-1 ${
              darkMode
                ? "border-stone-700 hover:bg-stone-800 text-stone-300"
                : "border-stone-200 hover:bg-stone-50 text-stone-700 shadow-sm"
            }`}
          >
            {noticia.cta} <ArrowRight size={12} />
          </Link>
        )}
      </div>
    </article>
  );
}
