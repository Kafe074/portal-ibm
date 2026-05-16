"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  imagenes: string[];
  darkMode: boolean;
}

export default function CarruselImagenes({ imagenes, darkMode: _darkMode }: Props) {
  const [current, setCurrent] = useState(0);

  if (imagenes.length === 0) return null;

  if (imagenes.length === 1) {
    return (
      <div className="overflow-hidden rounded-[2rem]">
        <img src={imagenes[0]} alt="Noticia" className="w-full h-auto" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] group/carr">
      <img
        src={imagenes[current]}
        alt={`Imagen ${current + 1}`}
        className="w-full h-auto transition-all duration-700"
      />

      <button
        onClick={() => setCurrent((p) => (p - 1 + imagenes.length) % imagenes.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover/carr:opacity-100 transition-opacity hover:bg-black/60"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => setCurrent((p) => (p + 1) % imagenes.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover/carr:opacity-100 transition-opacity hover:bg-black/60"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {imagenes.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-widest">
        {current + 1} / {imagenes.length}
      </div>
    </div>
  );
}
