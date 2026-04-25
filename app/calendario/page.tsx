"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/app/components/sidebar";
import {
  X,
  Calendar,
  Clock,
  Trash2,
  Plus,
  Check,
  AlertTriangle,
} from "lucide-react";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";

const coloresMinisterios: {
  [key: string]: { bg: string; text: string; border: string };
} = {
  General: { bg: "#e7e5e4", text: "#44403c", border: "#d6d3d1" },
  Producción: { bg: "#fce7f3", text: "#9d174d", border: "#fbcfe8" },
  Alabanza: { bg: "#fef9c3", text: "#854d0e", border: "#fef08a" },
  Servir: { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
  Conectadas: { bg: "#fae8ff", text: "#86198f", border: "#f5d0fe" },
  Niños: { bg: "#ffedd5", text: "#9a3412", border: "#fed7aa" },
  Misiones: { bg: "#dbeafe", text: "#1e40af", border: "#bfdbfe" },
  "Jóvenes y Adolescentes": {
    bg: "#ede9fe",
    text: "#5b21b6",
    border: "#ddd6fe",
  },
  Default: { bg: "#f5f5f4", text: "#57534e", border: "#e7e5e4" },
};

export default function CalendarioDefinitivo() {
  const [eventos, setEventos] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userSession, setUserSession] = useState<any>(null);
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState<string[]>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState({
    show: false,
    id: "",
  });

  const [form, setForm] = useState({
    id: "",
    titulo: "",
    fecha_dia: "",
    hora_inicio: "",
    hora_fin: "",
    ministerio: "General",
    descripcion: "",
  });

  useEffect(() => {
    fetchEventos();
    const session = localStorage.getItem("user_admin_session");
    if (session) setUserSession(JSON.parse(session));
  }, [darkMode]);

  async function fetchEventos() {
    const { data } = await supabase.from("actividades").select("*");
    if (data) {
      setEventos(
        data.map((ev) => {
          const estilo =
            coloresMinisterios[ev.ministerio_cargo] ||
            coloresMinisterios["Default"];
          return {
            id: ev.id,
            title: ev.titulo,
            start: ev.fecha_inicio,
            end: ev.fecha_fin || ev.fecha_inicio,
            extendedProps: {
              ministerio: ev.ministerio_cargo,
              id_db: ev.id,
              descripcion: ev.descripcion,
              hora_inicio: ev.fecha_inicio.includes("T")
                ? ev.fecha_inicio.split("T")[1].slice(0, 5)
                : null,
              hora_fin: ev.fecha_fin?.includes("T")
                ? ev.fecha_fin.split("T")[1].slice(0, 5)
                : null,
            },
            // COLORES DINÁMICOS
            backgroundColor: darkMode ? `${estilo.bg}20` : estilo.bg,
            borderColor: estilo.text, // Usamos el color de texto para el borde lateral
            textColor: darkMode ? estilo.bg : estilo.text,
          };
        }),
      );
    }
  }

  const handleAgregarFecha = () => {
    if (form.fecha_dia && !fechasSeleccionadas.includes(form.fecha_dia)) {
      setFechasSeleccionadas([...fechasSeleccionadas, form.fecha_dia]);
    }
  };

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    const fechasAProcesar =
      fechasSeleccionadas.length > 0 ? fechasSeleccionadas : [form.fecha_dia];
    const registros = fechasAProcesar.map((fecha) => ({
      titulo: form.titulo,
      fecha_inicio: form.hora_inicio
        ? `${fecha}T${form.hora_inicio}:00`
        : fecha,
      fecha_fin: form.hora_fin
        ? `${fecha}T${form.hora_fin}:00`
        : form.hora_inicio
          ? `${fecha}T${form.hora_inicio}:00`
          : fecha,
      ministerio_cargo: form.ministerio,
      descripcion: form.descripcion,
    }));

    let error;
    if (isEditing) {
      const res = await supabase
        .from("actividades")
        .update(registros[0])
        .eq("id", form.id);
      error = res.error;
    } else {
      const res = await supabase.from("actividades").insert(registros);
      error = res.error;
    }

    if (!error) {
      setShowCreate(false);
      setFechasSeleccionadas([]);
      fetchEventos();
    }
  };

  const handleEliminar = async () => {
    const { error } = await supabase
      .from("actividades")
      .delete()
      .eq("id", showConfirmDelete.id);
    if (!error) {
      setShowConfirmDelete({ show: false, id: "" });
      setSelectedEvent(null);
      fetchEventos();
    }
  };

  const estiloModal = selectedEvent
    ? coloresMinisterios[selectedEvent.extendedProps.ministerio] ||
      coloresMinisterios["Default"]
    : coloresMinisterios["Default"];

  return (
    <main
      className={`flex h-screen transition-colors duration-700 overflow-hidden ${darkMode ? "bg-[#0a0a0a] text-stone-300" : "bg-[#fafaf9] text-stone-800"}`}
    >
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav
          className={`px-8 py-6 flex justify-between items-center border-b transition-colors ${darkMode ? "border-stone-900" : "border-stone-200"}`}
        >
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">
              Calendario
            </h2>
            <p className="text-xs font-serif italic opacity-60">
              Actividades de la iglesia
            </p>
          </div>
          <div className="flex items-center gap-4">
            {userSession && (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFechasSeleccionadas([]);
                  setForm({
                    id: "",
                    titulo: "",
                    fecha_dia: "",
                    hora_inicio: "",
                    hora_fin: "",
                    ministerio: "General",
                    descripcion: "",
                  });
                  setShowCreate(true);
                }}
                className="bg-stone-900 text-stone-100 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900"
              >
                Nuevo Evento
              </button>
            )}
          </div>
        </nav>

        <div className="p-8 max-w-6xl mx-auto w-full">
          <div
            className={`p-8 rounded-[2rem] border ${darkMode ? "bg-stone-900/40 border-stone-800" : "bg-white border-stone-100 shadow-sm"}`}
          >
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              locale={esLocale}
              events={eventos}
              eventClick={(info) => setSelectedEvent(info.event)}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "",
              }}
              height="auto"
              displayEventTime={false}
              // ESTA ES LA PIEZA CLAVE QUE FALTA:
              eventDidMount={(info) => {
                // Extraemos los colores que ya calculaste en fetchEventos
                const { backgroundColor, borderColor, textColor } = info.event;

                // Los inyectamos directamente en el elemento para que el CSS global los reconozca
                info.el.style.setProperty(
                  "--fc-event-bg-color",
                  backgroundColor,
                );
                info.el.style.setProperty(
                  "--fc-event-border-color",
                  borderColor,
                );
                info.el.style.setProperty("--fc-event-text-color", textColor);
              }}
            />
          </div>
        </div>
      </div>

      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* MODAL CREACIÓN / EDICIÓN */}
      {showCreate && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-md flex items-center justify-center z-[200] p-4">
          <form
            onSubmit={handleGuardar}
            className={`w-full max-w-xl rounded-[2.5rem] p-10 border shadow-2xl ${darkMode ? "bg-stone-900 border-stone-800" : "bg-white border-stone-100"}`}
          >
            <div className="text-center mb-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-400">
                {isEditing ? "Editor" : "Nuevo Evento"}
              </h2>
            </div>
            <div className="space-y-4">
              <input
                required
                placeholder="Título"
                className={`w-full px-6 py-4 rounded-2xl text-xs outline-none border ${darkMode ? "bg-stone-950 border-stone-800 text-stone-200" : "bg-stone-50 border-stone-100"}`}
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  className={`flex-1 px-4 py-3 rounded-xl text-xs border ${darkMode ? "bg-stone-950 border-stone-800 text-stone-300" : "bg-stone-50 border-stone-100"}`}
                  value={form.fecha_dia}
                  onChange={(e) =>
                    setForm({ ...form, fecha_dia: e.target.value })
                  }
                />
                {!isEditing && (
                  <button
                    type="button"
                    onClick={handleAgregarFecha}
                    className="px-4 bg-amber-500/10 text-amber-600 rounded-xl hover:bg-amber-500 hover:text-white transition-all"
                  >
                    <Plus size={18} />
                  </button>
                )}
              </div>
              {fechasSeleccionadas.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-violet-50/50 dark:bg-violet-900/10 rounded-xl border border-dashed border-violet-200 dark:border-violet-800">
                  {fechasSeleccionadas.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] font-bold bg-white dark:bg-stone-800 text-violet-600 px-3 py-1 rounded-full border border-violet-100 flex items-center gap-2"
                    >
                      {f}{" "}
                      <X
                        size={12}
                        className="cursor-pointer text-red-400"
                        onClick={() =>
                          setFechasSeleccionadas(
                            fechasSeleccionadas.filter((d) => d !== f),
                          )
                        }
                      />
                    </span>
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="time"
                  className={`px-4 py-3 rounded-xl text-xs border ${darkMode ? "bg-stone-950 border-stone-800 text-stone-300" : "bg-stone-50 border-stone-100"}`}
                  value={form.hora_inicio}
                  onChange={(e) =>
                    setForm({ ...form, hora_inicio: e.target.value })
                  }
                />
                <input
                  type="time"
                  className={`px-4 py-3 rounded-xl text-xs border ${darkMode ? "bg-stone-950 border-stone-800 text-stone-300" : "bg-stone-50 border-stone-100"}`}
                  value={form.hora_fin}
                  onChange={(e) =>
                    setForm({ ...form, hora_fin: e.target.value })
                  }
                />
              </div>
              <select
                className={`w-full px-4 py-4 rounded-2xl text-xs border ${darkMode ? "bg-stone-950 border-stone-800 text-stone-300" : "bg-stone-50 border-stone-100"}`}
                value={form.ministerio}
                onChange={(e) =>
                  setForm({ ...form, ministerio: e.target.value })
                }
              >
                {Object.keys(coloresMinisterios)
                  .filter((m) => m !== "Default")
                  .map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
              </select>
              <textarea
                placeholder="Descripción..."
                className={`w-full px-6 py-4 rounded-2xl text-xs h-24 border resize-none ${darkMode ? "bg-stone-950 border-stone-800 text-stone-200" : "bg-stone-50 border-stone-100"}`}
                value={form.descripcion}
                onChange={(e) =>
                  setForm({ ...form, descripcion: e.target.value })
                }
              />
            </div>
            <div className="pt-8 space-y-3">
              <button
                type="submit"
                className="w-full bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
              >
                <Check size={14} /> {isEditing ? "Actualizar" : "Publicar"}
              </button>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="w-full text-[9px] font-bold text-stone-400 uppercase"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DETALLES DEL EVENTO */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-stone-950/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div
            className={`${darkMode ? "bg-stone-900 border-stone-800 text-stone-100" : "bg-white border-stone-50 text-stone-900"} rounded-[2.5rem] p-10 max-w-sm w-full border shadow-2xl relative text-center`}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 text-stone-400"
            >
              <X size={20} />
            </button>
            <span
              className="text-[9px] font-black uppercase tracking-[0.3em] mb-4 inline-block px-4 py-1.5 rounded-full"
              style={{
                backgroundColor: estiloModal.bg,
                color: estiloModal.text,
              }}
            >
              {selectedEvent.extendedProps.ministerio}
            </span>
            <h3 className="text-2xl font-serif italic mb-4">
              {selectedEvent.title}
            </h3>
            <div className="flex flex-col items-center gap-1 mb-6 text-stone-400 text-[10px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Calendar size={14} />{" "}
                {new Date(selectedEvent.start).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />{" "}
                {selectedEvent.extendedProps.hora_inicio
                  ? `${selectedEvent.extendedProps.hora_inicio} ${selectedEvent.extendedProps.hora_fin ? `- ${selectedEvent.extendedProps.hora_fin}` : ""} HRS`
                  : "TODO EL DÍA"}
              </div>
            </div>
            <p className="text-stone-500 text-sm italic mb-8">
              "{selectedEvent.extendedProps.descripcion || "Sin descripción."}"
            </p>
            {userSession && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setForm({
                      id: selectedEvent.extendedProps.id_db,
                      titulo: selectedEvent.title,
                      fecha_dia: new Date(selectedEvent.start)
                        .toISOString()
                        .split("T")[0],
                      hora_inicio:
                        selectedEvent.extendedProps.hora_inicio || "",
                      hora_fin: selectedEvent.extendedProps.hora_fin || "",
                      ministerio: selectedEvent.extendedProps.ministerio,
                      descripcion: selectedEvent.extendedProps.descripcion,
                    });
                    setIsEditing(true);
                    setShowCreate(true);
                  }}
                  className="flex-1 py-4 text-[9px] font-black uppercase rounded-2xl border"
                  style={{
                    backgroundColor: estiloModal.bg,
                    color: estiloModal.text,
                    borderColor: estiloModal.border,
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() =>
                    setShowConfirmDelete({
                      show: true,
                      id: selectedEvent.extendedProps.id_db,
                    })
                  }
                  className="p-4 bg-red-50 text-red-500 dark:bg-red-500/10 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL CONFIRMACIÓN ELIMINAR */}
      {showConfirmDelete.show && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center z-[300] p-4">
          <div
            className={`max-w-xs w-full p-8 rounded-[2rem] text-center border ${darkMode ? "bg-stone-900 border-stone-800" : "bg-white border-stone-100"}`}
          >
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={32} />
            <h3 className="text-sm font-bold uppercase tracking-tighter mb-2">
              ¿Eliminar actividad?
            </h3>
            <p className="text-xs text-stone-500 mb-6 italic">
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleEliminar}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl text-[10px] font-bold uppercase"
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowConfirmDelete({ show: false, id: "" })}
                className="flex-1 py-3 bg-stone-100 dark:bg-stone-800 rounded-xl text-[10px] font-bold uppercase"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .fc {
          --fc-border-color: ${darkMode ? "#1c1917" : "#f5f5f4"};
        }
        /* QUITAR NÚMEROS (HORAS) DEL CALENDARIO */
        .fc-event-time {
          display: none !important;
        }
        .fc-event-title {
          font-size: 10px !important;
          font-weight: 800 !important;
          text-transform: uppercase;
          padding-left: 4px;
        }
        .fc-daygrid-event-dot {
          display: none !important;
        }
        .fc-theme-standard td,
        .fc-theme-standard th {
          border: 1px solid ${darkMode ? "#1c1917" : "#f5f5f4"} !important;
        }
        .fc-col-header-cell-cushion {
          color: #a8a29e !important;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 9px;
          text-decoration: none !important;
        }
        .fc-daygrid-day-number {
          color: #a8a29e !important;
          font-size: 10px;
          text-decoration: none !important;
          padding: 10px !important;
        }
        .fc-daygrid-event-dot {
          display: none !important;
        }
        .fc .fc-toolbar-title {
          font-family: serif;
          font-style: italic;
          font-size: 1.1rem !important;
          color: ${darkMode ? "#e7e5e4" : "#44403c"};
        }
        .fc-button-primary {
          background: transparent !important;
          border: 1px solid ${darkMode ? "#292524" : "#e7e5e4"} !important;
          color: #a8a29e !important;
          font-size: 9px !important;
          border-radius: 99px !important;
        }
        .fc-day-today {
          background: ${darkMode ? "#171717" : "#fafafa"} !important;
        }
        .fc-event {
          cursor: pointer !important;
          border: none !important; /* Quitamos el borde por defecto de 1px */
          background-color: var(--fc-event-bg-color) !important;
          color: var(--fc-event-text-color) !important;
          border-radius: 8px !important;
          margin: 2px 4px !important;
          padding: 2px 4px !important;
          transition: transform 0.2s ease;
          /* CREAMOS LA BARRA LATERAL DEL COLOR DEL MINISTERIO */
          border-left: 5px solid var(--fc-event-border-color) !important;
        }
        .fc-event:hover {
          transform: scale(1.02);
          filter: brightness(1.1);
        }
      `}</style>
    </main>
  );
}
