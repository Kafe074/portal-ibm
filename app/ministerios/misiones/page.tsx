"use client";
import { useRef, useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useContacto, abrirWhatsApp } from "@/hooks/useContacto";
import { supabase } from "@/lib/supabase";
import type { MisionPunto, MisionViaje, MisionEvangelismo } from "@/types";
import { Map, Marker, NavigationControl } from "react-map-gl/mapbox";
import {
  MapPin, X, Quote, Camera, Heart, Zap, Clock,
  BookOpen, ArrowLeft, ChevronLeft, ChevronRight, ArrowRight,
} from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MisionesPage() {
  const [darkMode, setDarkMode] = useDarkMode();
  const contacto = useContacto("misiones");
  const mapRef = useRef<any>(null);

  const [puntos, setPuntos] = useState<MisionPunto[]>([]);
  const [viajes, setViajes] = useState<MisionViaje[]>([]);
  const [evangelismo, setEvangelismo] = useState<MisionEvangelismo | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<MisionPunto | null>(null);
  const [currentIndices, setCurrentIndices] = useState<Record<string, number>>({});

  useEffect(() => {
    supabase.from("misiones_puntos").select("*").eq("activo", true).order("orden")
      .then(({ data }) => { if (data) setPuntos(data); });
    supabase.from("misiones_viajes").select("*").order("orden")
      .then(({ data }) => { if (data) setViajes(data); });
    supabase.from("misiones_evangelismo").select("*").eq("activo", true).single()
      .then(({ data }) => { if (data) setEvangelismo(data); });
  }, []);

  const flyToPoint = (lng: number, lat: number) => {
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 6, duration: 2500 });
  };

  const handleCarrusel = (id: string, dir: 1 | -1, total: number) => {
    setCurrentIndices((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + dir + total) % total,
    }));
  };

  return (
    <div className={`flex flex-col lg:flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#121212]" : "bg-[#fafafa]"}`}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 p-4 md:p-10 space-y-12 overflow-y-auto pt-24 lg:pt-10 scrollbar-hide">
        <Link
          href="/#ministerios"
          className={`inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] transition-all ${darkMode ? "text-stone-600 hover:text-stone-200" : "text-stone-400 hover:text-stone-900"}`}
        >
          <ArrowLeft size={12} />
          Volver al Inicio
        </Link>

        {/* HEADER */}
        <div className="flex flex-col space-y-10 text-center lg:text-left max-w-3xl">
          <div className="space-y-3">
            <h2 className={`text-[10px] font-black uppercase tracking-[0.5em] ${darkMode ? "text-stone-500" : "text-stone-400"}`}>
              Evangelismo e Impacto
            </h2>
            <h1 className={`text-4xl md:text-6xl font-serif italic leading-tight ${darkMode ? "text-stone-100" : "text-stone-900"}`}>
              Nuestra{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                Huella Misionera
              </span>
            </h1>
          </div>

          <div className="flex flex-col space-y-6">
            <div className={`relative ${darkMode ? "text-stone-400" : "text-stone-600"}`}>
              <div className="hidden lg:block absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 to-transparent" />
              <p className="text-lg md:text-xl font-serif italic leading-relaxed tracking-wide">
                "Pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo,
                y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra."
              </p>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className={`h-px w-8 ${darkMode ? "bg-stone-800" : "bg-stone-200"}`} />
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-600">Hechos 1:8</p>
            </div>
          </div>
        </div>

        {/* MAPA + SIDEBAR DE DETALLES */}
        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] lg:h-[650px]">
          {/* Panel de detalle */}
          <div className={`w-full lg:w-[450px] rounded-[3rem] border overflow-hidden transition-all duration-700 flex flex-col ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-white border-stone-200 shadow-sm"}`}>
            <div className="p-8 flex-1 overflow-y-auto scrollbar-hide">
              {!selectedPoint ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-6 opacity-30">
                  <MapPin size={24} strokeWidth={1} className={darkMode ? "text-white" : "text-black"} />
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold">
                    Las misiones es el mandato de nuestro Señor Jesucristo y en obediencia a ello nos extendemos.
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold">
                    {puntos.map((p) => p.nombre.split(",")[0]).join(" | ")}
                  </p>
                </div>
              ) : (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full">
                      Campo Misionero
                    </span>
                    <button onClick={() => setSelectedPoint(null)}>
                      <X size={18} className="text-stone-400 hover:text-stone-600" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <h3 className={`text-4xl font-serif italic leading-tight ${darkMode ? "text-stone-100" : "text-stone-900"}`}>
                      {selectedPoint.misionero}
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-600">
                      {selectedPoint.nombre}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {selectedPoint.fotos.map((foto, i) => (
                      <img key={i} src={foto} className="rounded-2xl h-28 w-full object-cover grayscale hover:grayscale-0 transition-all duration-500 shadow-md" alt="Misión" />
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className={`text-lg font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}>
                      {selectedPoint.proyecto}
                    </h4>
                    {selectedPoint.bio && (
                      <p className={`text-sm leading-relaxed font-light ${darkMode ? "text-stone-400" : "text-stone-600"}`}>
                        {selectedPoint.bio}
                      </p>
                    )}
                  </div>

                  {selectedPoint.testimonio_texto && (
                    <div className="space-y-4 pt-6 border-t border-stone-100 dark:border-stone-800">
                      <div className="flex items-center gap-2 text-stone-400">
                        <Quote size={14} className="text-amber-500" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Testimonio</span>
                      </div>
                      <p className={`text-[14px] italic leading-relaxed border-l-2 border-amber-500 pl-4 ${darkMode ? "text-stone-300" : "text-stone-700"}`}>
                        "{selectedPoint.testimonio_texto}"
                      </p>
                    </div>
                  )}

                  {selectedPoint.peticiones.length > 0 && (
                    <div className="space-y-4 pt-6">
                      <div className="flex items-center gap-2 text-amber-600">
                        <Heart size={14} fill="currentColor" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Peticiones de Oración</span>
                      </div>
                      <ul className="space-y-2">
                        {selectedPoint.peticiones.map((p, i) => (
                          <li key={i} className={`text-[12px] flex items-center gap-3 ${darkMode ? "text-stone-400" : "text-stone-600"}`}>
                            <span className="w-1 h-1 bg-amber-500 rounded-full" /> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedPoint.link_externo && (
                    <div className="pt-8 border-t border-stone-100 dark:border-stone-800">
                      <Link
                        href={selectedPoint.link_externo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center justify-between w-full px-6 py-5 rounded-[2rem] border transition-all duration-500 ${darkMode ? "border-stone-800 bg-stone-900/50 hover:bg-stone-800 text-stone-400 hover:text-stone-100" : "border-stone-100 bg-stone-50/50 hover:bg-stone-100 text-stone-500 hover:text-stone-900 shadow-sm"}`}
                      >
                        <div className="flex flex-col items-start gap-1 text-left">
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-amber-600">Sitio Externo</span>
                          <span className="text-[11px] font-bold tracking-wide">Ver plataforma del proyecto</span>
                        </div>
                        <div className="p-2 rounded-full bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
                          <ArrowRight size={16} />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mapa */}
          <div className={`w-full h-[450px] lg:h-[650px] relative rounded-[3rem] overflow-hidden border transition-all duration-1000 z-0 ${darkMode ? "border-stone-800" : "border-stone-100 shadow-2xl shadow-stone-200/50"}`}>
            <Map
              ref={mapRef}
              mapboxAccessToken={MAPBOX_TOKEN}
              initialViewState={{ longitude: -75, latitude: -11, zoom: 3.5 }}
              mapStyle={darkMode ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11"}
              style={{ width: "100%", height: "100%" }}
            >
              <NavigationControl position="bottom-right" />
              {puntos.map((p) => (
                <Marker key={p.id} longitude={p.lng} latitude={p.lat}>
                  <button
                    onClick={() => { setSelectedPoint(p); flyToPoint(p.lng, p.lat); }}
                    className="group relative flex items-center justify-center"
                  >
                    <div className={`absolute w-10 h-10 rounded-full animate-ping opacity-10 ${selectedPoint?.id === p.id ? "bg-amber-500" : "bg-stone-400"}`} />
                    <div className={`w-4 h-4 rounded-full border-[2px] border-white shadow-xl transition-all duration-700 ${selectedPoint?.id === p.id ? "bg-amber-500 scale-125" : "bg-stone-800"}`} />
                  </button>
                </Marker>
              ))}
            </Map>
          </div>
        </div>

        {/* BITÁCORA DE VIAJES */}
        {viajes.length > 0 && (
          <section className="max-w-7xl mx-auto space-y-12">
            <div className="flex items-center gap-6 border-b border-stone-200 dark:border-stone-800 pb-8">
              <Camera size={32} className="text-amber-500" />
              <h3 className={`text-3xl md:text-5xl font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}>
                Bitácora de Viajes
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {viajes.map((viaje) => {
                const idx = currentIndices[viaje.id] || 0;
                return (
                  <div key={viaje.id} className={`group overflow-hidden rounded-[3.5rem] border transition-all duration-700 ${darkMode ? "bg-stone-900/40 border-stone-800 hover:border-stone-700" : "bg-white border-stone-100 shadow-sm hover:shadow-2xl"}`}>
                    <div className="relative h-80 overflow-hidden">
                      <div className="absolute inset-0 z-10 flex justify-between items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <button onClick={() => handleCarrusel(viaje.id, -1, viaje.fotos.length)} className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-all">
                          <ChevronLeft size={20} />
                        </button>
                        <button onClick={() => handleCarrusel(viaje.id, 1, viaje.fotos.length)} className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-all">
                          <ChevronRight size={20} />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                        {viaje.fotos.map((_, dotIdx) => (
                          <div key={dotIdx} className={`h-1 rounded-full transition-all duration-500 ${idx === dotIdx ? "w-6 bg-amber-500" : "w-1 bg-white/50"}`} />
                        ))}
                      </div>
                      <div className="relative w-full h-full">
                        {viaje.fotos.map((img, imgIdx) => (
                          <img key={imgIdx} src={img} alt={`${viaje.lugar} ${imgIdx}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${idx === imgIdx ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="p-6 md:p-10 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">{viaje.fecha_texto}</span>
                        <span className="text-[9px] opacity-40 font-bold uppercase tracking-widest">{idx + 1} / {viaje.fotos.length}</span>
                      </div>
                      <h4 className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-800"}`}>{viaje.lugar}</h4>
                      {viaje.descripcion && <p className="text-base text-stone-500 dark:text-stone-400 font-light leading-relaxed">{viaje.descripcion}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* EVANGELISMO LOCAL */}
        {evangelismo && (
          <section className="max-w-7xl mx-auto space-y-10">
            <div className="flex items-center gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
              <Zap size={28} className="text-amber-500" />
              <h3 className={`text-4xl font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}>Evangelismo Local</h3>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
              <div className={`lg:w-1/3 p-6 md:p-10 rounded-[3.5rem] flex flex-col justify-between ${darkMode ? "bg-stone-900/80" : "bg-stone-100"}`}>
                <div className="space-y-6">
                  <p className="text-stone-500 italic font-light leading-relaxed">
                    "No nos avergonzamos del evangelio, porque es poder de Dios." Creemos que nuestra primera misión está en nuestras calles, compartiendo esperanza con cada vecino.
                  </p>
                  {evangelismo.proxima_salida && (
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                      <Clock className="text-amber-500" size={24} />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Próxima Salida</p>
                        <p className={`text-sm font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}>{evangelismo.proxima_salida}</p>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => abrirWhatsApp(contacto)}
                  className="mt-8 w-full py-4 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
                >
                  Sumarme al equipo
                </button>
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                {evangelismo.fotos.map((img, i) => (
                  <div key={i} className={`rounded-[2rem] overflow-hidden h-40 md:h-full ${i === 0 ? "md:row-span-2" : ""}`}>
                    <img src={img} alt="Evangelismo" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* VERSÍCULO FINAL */}
        <section className="max-w-4xl mx-auto text-center py-20 space-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 mb-4">
            <BookOpen size={32} />
          </div>
          <div className="space-y-6">
            <h2 className={`text-2xl md:text-3xl font-serif italic leading-relaxed ${darkMode ? "text-stone-200" : "text-stone-800"}`}>
              "Y Jesús se acercó y les habló diciendo: Toda potestad me es dada en el cielo y en la tierra.
              Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre,
              y del Hijo, y del Espíritu Santo; enseñándoles que guarden todas las cosas que os he mandado;
              y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo."
            </h2>
            <div className="flex flex-col items-center gap-2">
              <span className="h-px w-12 bg-amber-500" />
              <p className="text-[12px] font-bold uppercase tracking-[0.4em] text-amber-600">Mateo 28:18-20</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
