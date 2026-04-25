"use client";
import { useRef, useState } from "react";
import Sidebar from "@/app/components/sidebar";
import { Map, Marker, NavigationControl } from "react-map-gl/mapbox";
import {
  MapPin,
  X,
  Quote,
  Camera,
  Heart,
  Zap,
  Clock,
  Sparkles,
  BookOpen,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const puntos = [
  {
    id: 1,
    name: "Mazamari, Perú",
    misionero: "Familia Romero",
    proyecto: "Plantación y Discipulado en la Selva Central",
    fotos: [
      "/ministerios/misiones/mazamari.jpg",
      "/ministerios/misiones/mazamari_1.jpg",
    ],
    testimonios: [
      {
        autor: "David R.",
        texto:
          "Ver cómo los jóvenes en Mazamari abren su corazón ha sido nuestra mayor recompensa este año.",
      },
    ],
    peticiones: [
      "Sabiduría para el equipo",
      "Nuevos locales en las comunidades",
      "Protección en los viajes fluviales",
    ],
    bio: "La Familia Romero dejó su hogar en El Salvador respondiendo al llamado de servir en la selva peruana. Su labor se centra en establecer centros de esperanza para comunidades indígenas, combinando la enseñanza bíblica con apoyo social.",
    lat: -11.32171943470054,
    lng: -74.5356705910892,
  },
  {
    id: 2,
    name: "San Jerónimo de Túnan, Perú",
    misionero: "Chalay Santo",
    proyecto: "Modelo de Iglesia en Casa",
    fotos: [
      "/ministerios/misiones/chalay.jpeg",
      "/ministerios/misiones/chalay_1.jpeg",
    ],
    testimonios: [
      {
        autor: "Richard C.",
        texto:
          "Evangelizar y ganar a mi familia para Dios, así como también a nuestro barrio y comunidad.",
      },
    ],
    peticiones: ["Unidad familiar", "Apertura de nuevos hogares anfitriones"],
    bio: "En el corazón del Valle del Mantaro, Chalay lidera un movimiento de iglesias orgánicas. Su enfoque es transformar la comunidad desde el núcleo familiar, fortaleciendo los lazos espirituales en entornos cotidianos y cercanos.",
    lat: -11.943488519081162,
    lng: -75.29026290268125,
  },
  {
    id: 3,
    name: "Pazos, Perú",
    misionero: "Familia Taboada",
    proyecto: "Misión en las Alturas de Huancavelica",
    fotos: [
      "/ministerios/misiones/pazos.jpg",
      "/ministerios/misiones/pazos_1.jpg",
    ],
    testimonios: [
      {
        autor: "Benjamín T.",
        texto:
          "En las alturas de Junín, la fe se siente tan pura como el aire.",
      },
    ],
    peticiones: [
      "Fortaleza física para el clima",
      "Provisión para materiales educativos",
    ],
    bio: "La Familia Taboada sirve a más de 3,800 metros de altura. Su labor es vital en comunidades donde el acceso es limitado, llevando no solo el mensaje de salvación, sino también un acompañamiento constante en el desarrollo discipular.",
    lat: -12.258744835555603,
    lng: -75.07072022168634,
  },
  {
    id: 4,
    name: "Chilca, Perú",
    misionero: "Susi Huillcas y Paola Arauco",
    proyecto: "Ministerio de Reconciliación Familiar",
    fotos: [
      "/ministerios/misiones/chilca.jpg",
      "/ministerios/misiones/chilca_1.jpg",
    ],
    testimonios: [
      {
        autor: "Paola A.",
        texto: "Dando a conocer del amor de Dios a la familia.",
      },
    ],
    peticiones: [
      "Sanidad emocional en las familias",
      "Recursos para talleres comunitarios",
    ],
    bio: "Susi y Paola enfocan su energía en el distrito de Chilca, trabajando directamente con mujeres y familias en riesgo. Su proyecto busca restaurar el tejido social a través de los valores del Reino y la mentoría personalizada.",
    lat: -12.085900440542568,
    lng: -75.20025828175238,
  },
  {
    id: 5,
    name: "Maypuco, Perú",
    misionero: "Percy ",
    proyecto: "Luz en el Amazonas",
    fotos: [
      "/ministerios/misiones/maypuco.jpg",
      "/ministerios/misiones/maypuco_1.jpg",
    ],
    testimonios: [
      {
        autor: "Percy ",
        texto: "Amando al prójimo y enseñándole del amor de nuestro Padre.",
      },
    ],
    peticiones: [
      "Nuevos líderes locales",
      "Sostenimiento para viajes extensos",
    ],
    bio: "Percy navega las riberas del Marañón llevando esperanza a pueblos que rara vez reciben visitas. Su vida es un testimonio de entrega, enfocándose en el discipulado de hombres que se conviertan en los futuros pilares de su región.",
    lat: -4.826989923629894,
    lng: -75.11991101724514,
  },
  {
    id: 6,
    name: "Ccapi Los Uros, Perú",
    misionero: "Lince ",
    proyecto: "Generación Semilla en el Titicaca",
    fotos: [
      "/ministerios/misiones/ccapi.jpg",
      "/ministerios/misiones/ccapi_1.jpg",
    ],
    testimonios: [
      {
        autor: "Lince ",
        texto: "Trabajando con niños que entreguen su corazón a Dios.",
      },
    ],
    peticiones: ["Salud para los niños", "Materiales didácticos bilingües"],
    bio: "Sobre las islas flotantes de los Uros, Lince trabaja con la generación más joven. En un entorno turístico pero de muchas necesidades espirituales, ella siembra principios eternos en el corazón de los niños que habitan el lago sagrado.",
    lat: -15.81209726283079,
    lng: -69.36955345903066,
  },
  {
    id: 7,
    name: "El Cairo, Egipto",
    misionero: "Familia Angulo ",
    proyecto: "Puentes Culturales en el Medio Oriente",
    fotos: [
      "/ministerios/misiones/cairo.jpeg",
      "/ministerios/misiones/egipto_1.jpg",
    ],
    testimonios: [
      {
        autor: "David A. ",
        texto: "Compartiendo con diferentes culturas y enseñándoles de Jesús.",
      },
    ],
    peticiones: [
      "Gracia en el aprendizaje del idioma",
      "Protección y discreción",
    ],
    bio: "La Familia Angulo representa nuestra extensión en tierras lejanas. Su labor en Egipto es un ejercicio de amor y paciencia, construyendo puentes de amistad genuina y compartiendo la luz de Cristo en un contexto cultural profundamente distinto.",
    lat: 30.099720817871646,
    lng: 31.301887758604295,
  },
  {
    id: 8,
    name: "Kuala Lumpur, Malasia",
    misionero: "Familia Cusilayme ",
    proyecto: "Misión en el Sudeste Asiático",
    fotos: [
      "/ministerios/misiones/malasia.jpeg",
      "/ministerios/misiones/malasia_1.jpeg",
    ],
    testimonios: [
      {
        autor: "Richard C. ",
        texto: "Compartiendo con diferentes culturas y enseñándoles de Jesús.",
      },
    ],
    peticiones: ["Conexiones estratégicas", "Paz para la región"],
    bio: "Desde Malasia, los Cusilayme trabajan en la integración y el testimonio dentro de una sociedad multicultural. Su enfoque es el servicio profesional como plataforma para manifestar el carácter de Dios en el continente asiático.",
    lat: 3.147356,
    lng: 101.695283,
  },
];

export default function MisionesPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const mapRef = useRef<any>(null);

  const flyToPoint = (lng: number, lat: number) => {
    mapRef.current?.flyTo({ center: [lng, lat], zoom: 6, duration: 2500 });
  };

  const [currentIndices, setCurrentIndices] = useState<{
    [key: number]: number;
  }>({});

  const handleNext = (viajeIdx: number, totalImages: number) => {
    setCurrentIndices((prev) => ({
      ...prev,
      [viajeIdx]: ((prev[viajeIdx] || 0) + 1) % totalImages,
    }));
  };

  const handlePrev = (viajeIdx: number, totalImages: number) => {
    setCurrentIndices((prev) => ({
      ...prev,
      [viajeIdx]: ((prev[viajeIdx] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  return (
    <div
      className={`flex flex-col lg:flex-row-reverse min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#121212]" : "bg-[#fafafa]"}`}
    >
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 p-4 md:p-10 space-y-12 overflow-y-auto pt-24 lg:pt-10 scrollbar-hide">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] transition-all
            ${darkMode ? "text-stone-600 hover:text-stone-200" : "text-stone-400 hover:text-stone-900"}`}
        >
          <ArrowLeft size={12} />
          Volver al Inicio
        </Link>

        {/* HEADER */}
        <div className="flex flex-col space-y-2 text-center lg:text-left">
          <h2
            className={`text-[10px] font-bold uppercase tracking-[0.4em] ${darkMode ? "text-stone-500" : "text-stone-400"}`}
          >
            Evangelismo e Impacto
          </h2>
          <h1
            className={`text-4xl md:text-6xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}
          >
            Nuestra Huella Misionera
          </h1>
        </div>

        {/* CONTENEDOR MAPA Y INFO (RESPONSIVE) */}
        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] lg:h-[650px]">
          {/* SIDEBAR INTERNO (DETALLES) */}
          <div
            className={`w-full lg:w-[450px] rounded-[3rem] border overflow-hidden transition-all duration-700 flex flex-col
            ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-white border-stone-200 shadow-sm"}`}
          >
            <div className="p-8 flex-1 overflow-y-auto scrollbar-hide">
              {!selectedPoint ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-6 opacity-30">
                  <MapPin
                    size={24}
                    strokeWidth={1}
                    className={darkMode ? "text-white" : "text-black"}
                  />
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold">
                    Selecciona un marcador en el mapa
                  </p>
                </div>
              ) : (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full">
                      Campo Misionero
                    </span>
                    <button onClick={() => setSelectedPoint(null)}>
                      <X
                        size={18}
                        className="text-stone-400 hover:text-stone-600"
                      />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <h3
                      className={`text-4xl font-serif italic leading-tight ${darkMode ? "text-stone-100" : "text-stone-900"}`}
                    >
                      {selectedPoint.misionero}
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-600">
                      {selectedPoint.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {selectedPoint.fotos.map((foto: string, i: number) => (
                      <img
                        key={i}
                        src={foto}
                        className="rounded-2xl h-28 w-full object-cover grayscale hover:grayscale-0 transition-all duration-500 shadow-md"
                        alt="Misión"
                      />
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4
                      className={`text-lg font-serif italic ${darkMode ? "text-stone-200" : "text-stone-800"}`}
                    >
                      {selectedPoint.proyecto}
                    </h4>
                    <p
                      className={`text-sm leading-relaxed font-light ${darkMode ? "text-stone-400" : "text-stone-600"}`}
                    >
                      {selectedPoint.bio}
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-2 text-stone-400">
                      <Quote size={14} className="text-amber-500" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">
                        Testimonio
                      </span>
                    </div>
                    {selectedPoint.testimonios.map((t: any, i: number) => (
                      <p
                        key={i}
                        className={`text-[14px] italic leading-relaxed border-l-2 border-amber-500 pl-4 ${darkMode ? "text-stone-300" : "text-stone-700"}`}
                      >
                        "{t.texto}"
                      </p>
                    ))}
                  </div>

                  <div className="space-y-4 pt-6">
                    <div className="flex items-center gap-2 text-amber-600">
                      <Heart size={14} fill="currentColor" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">
                        Peticiones de Oración
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {selectedPoint.peticiones.map((p: string, i: number) => (
                        <li
                          key={i}
                          className={`text-[12px] flex items-center gap-3 ${darkMode ? "text-stone-400" : "text-stone-600"}`}
                        >
                          <span className="w-1 h-1 bg-amber-500 rounded-full" />{" "}
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* MAPA */}
          <div
            className={`flex-1 min-h-[400px] lg:min-h-full relative rounded-[3rem] overflow-hidden border transition-all duration-1000
            ${darkMode ? "border-stone-800" : "border-stone-100 shadow-2xl shadow-stone-200/50"}`}
          >
            <Map
              ref={mapRef}
              mapboxAccessToken={MAPBOX_TOKEN}
              initialViewState={{ longitude: -75, latitude: -11, zoom: 4.5 }}
              mapStyle={
                darkMode
                  ? "mapbox://styles/mapbox/dark-v11"
                  : "mapbox://styles/mapbox/light-v11"
              }
            >
              <NavigationControl position="bottom-right" />
              {puntos.map((p) => (
                <Marker key={p.id} longitude={p.lng} latitude={p.lat}>
                  <button
                    onClick={() => {
                      setSelectedPoint(p);
                      flyToPoint(p.lng, p.lat);
                    }}
                    className="group relative flex items-center justify-center"
                  >
                    <div
                      className={`absolute w-12 h-12 rounded-full animate-ping opacity-10 ${selectedPoint?.id === p.id ? "bg-amber-500" : "bg-stone-400"}`}
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-[3px] border-white shadow-xl transition-all duration-700
                      ${selectedPoint?.id === p.id ? "bg-amber-500 scale-150" : "bg-stone-800 group-hover:bg-amber-500"}`}
                    />
                  </button>
                </Marker>
              ))}
            </Map>
          </div>
        </div>

        {/* 2. SECCIÓN: BITÁCORA DE VIAJES (CON FOTOS) */}
        <section className="max-w-7xl mx-auto space-y-12">
          <div className="flex items-center gap-6 border-b border-stone-200 dark:border-stone-800 pb-8">
            <Camera size={32} className="text-amber-500" />
            <h3
              className={`text-5xl font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}
            >
              Bitácora de Viajes
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                lugar: "Puerto Bermudes",
                fecha: "Agosto 2025",
                desc: "Nuestra última expedición a Puerto Bermudes. Trabajamos en el evangelismo dentro de la ciudad al igual que las comunidades aledañas con acceso un poco más complicado.",
                // Ahora aceptamos un array de imágenes
                images: [
                  "/ministerios/misiones/seccion2/viaje-selva.jpg",
                  "/ministerios/misiones/seccion2/viaje-selva-2.jpg",
                  "/ministerios/misiones/seccion2/viaje-selva-3.jpg",
                ],
              },
            ].map((viaje, i) => {
              const currentIndex = currentIndices[i] || 0;

              return (
                <div
                  key={i}
                  className={`group overflow-hidden rounded-[3.5rem] border transition-all duration-700 ${
                    darkMode
                      ? "bg-stone-900/40 border-stone-800 hover:border-stone-700"
                      : "bg-white border-stone-100 shadow-sm hover:shadow-2xl"
                  }`}
                >
                  {/* CONTENEDOR DEL CARRUSEL DE IMÁGENES */}
                  <div className="relative h-80 overflow-hidden">
                    {/* Navegación del Carrusel (Solo visible en hover) */}
                    <div className="absolute inset-0 z-10 flex justify-between items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <button
                        onClick={() => handlePrev(i, viaje.images.length)}
                        className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-all"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => handleNext(i, viaje.images.length)}
                        className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    {/* Indicadores de puntos (Dots) */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                      {viaje.images.map((_, dotIdx) => (
                        <div
                          key={dotIdx}
                          className={`h-1 rounded-full transition-all duration-500 ${
                            currentIndex === dotIdx
                              ? "w-6 bg-amber-500"
                              : "w-1 bg-white/50"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Renderizado de la imagen con transición suave */}
                    <div className="relative w-full h-full">
                      {viaje.images.map((img, imgIdx) => (
                        <img
                          key={imgIdx}
                          src={img}
                          alt={`${viaje.lugar} ${imgIdx}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                            currentIndex === imgIdx
                              ? "opacity-100 scale-100 translate-x-0"
                              : "opacity-0 scale-110 translate-x-4 pointer-events-none"
                          } ${imgIdx === currentIndex ? "grayscale-0" : "grayscale"}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* CONTENIDO DE TEXTO */}
                  <div className="p-10 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">
                        {viaje.fecha}
                      </span>
                      <span className="text-[9px] opacity-40 font-bold uppercase tracking-widest">
                        {currentIndex + 1} / {viaje.images.length}
                      </span>
                    </div>
                    <h4
                      className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-800"}`}
                    >
                      {viaje.lugar}
                    </h4>
                    <p className="text-base text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                      {viaje.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. SECCIÓN: EVANGELISMO LOCAL (CON FOTOS) */}
        <section className="max-w-7xl mx-auto space-y-10">
          <div className="flex items-center gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
            <Zap size={28} className="text-amber-500" />
            <h3
              className={`text-4xl font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}
            >
              Evangelismo Local
            </h3>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Info y Salida */}
            <div
              className={`lg:w-1/3 p-10 rounded-[3.5rem] flex flex-col justify-between ${darkMode ? "bg-stone-900/80" : "bg-stone-100"}`}
            >
              <div className="space-y-6">
                <p className="text-stone-500 italic font-light leading-relaxed">
                  "No nos avergonzamos del evangelio, porque es poder de Dios."
                  Creemos que nuestra primera misión está en nuestras calles,
                  compartiendo esperanza con cada vecino.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                    <Clock className="text-amber-500" size={24} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                        Próxima Salida
                      </p>
                      <p
                        className={`text-sm font-serif italic ${darkMode ? "text-white" : "text-stone-900"}`}
                      >
                        Sábado 26 de Abril, 10:00 AM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  window.open("https://wa.me/51956055194", "_blank")
                }
                className="mt-8 w-full py-4 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
              >
                Sumarme al equipo
              </button>
            </div>

            {/* Galería Evangelismo */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "/ministerios/misiones/seccion2/1.jpg",
                "/ministerios/misiones/seccion2/2.jpg",
                "/ministerios/misiones/seccion2/3.jpg",
                "/ministerios/misiones/seccion2/4.jpg",
              ].map((img, i) => (
                <div
                  key={i}
                  className={`rounded-[2rem] overflow-hidden h-40 md:h-full ${i === 0 ? "md:row-span-2" : ""}`}
                >
                  <img
                    src={img}
                    alt="Evangelismo"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. VERSÍCULO FINAL (LA GRAN COMISIÓN) */}
        <section className="max-w-4xl mx-auto text-center py-20 space-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 mb-4">
            <BookOpen size={32} />
          </div>
          <div className="space-y-6">
            <h2
              className={`text-2xl md:text-3xl font-serif italic leading-relaxed ${darkMode ? "text-stone-200" : "text-stone-800"}`}
            >
              "Y Jesús se acercó y les habló diciendo: Toda potestad me es dada
              en el cielo y en la tierra. Por tanto, id, y haced discípulos a
              todas las naciones, bautizándolos en el nombre del Padre, y del
              Hijo, y del Espíritu Santo; enseñándoles que guarden todas las
              cosas que os he mandado; y he aquí yo estoy con vosotros todos los
              días, hasta el fin del mundo."
            </h2>
            <div className="flex flex-col items-center gap-2">
              <span className="h-px w-12 bg-amber-500"></span>
              <p className="text-[12px] font-bold uppercase tracking-[0.4em] text-amber-600">
                Mateo 28:18-20
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
