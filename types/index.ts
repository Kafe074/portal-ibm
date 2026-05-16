// ─── Tipos compartidos del Portal IBM ────────────────────────────────────────

export type CursoEstado = "proximo" | "en-curso" | "finalizado";

export interface CursoTema {
  id: string;
  curso_id: string;
  titulo: string;
  descripcion: string | null;
  orden: number;
}

export interface Curso {
  id: string;
  titulo: string;
  descripcion: string | null;
  imagen_url: string | null;
  categoria: string;
  duracion: string | null;
  estado: CursoEstado;
  instructor: string | null;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  horario: string | null;
  orden: number;
  activo: boolean;
  curso_temas: CursoTema[];
}

export interface Actividad {
  id: string;
  titulo: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  ministerio_cargo: string;
  descripcion: string | null;
}

export type NoticiaTag = "Aviso" | "Evento" | "Anuncio" | "Celebración";
export type MinisterioKey = "alabanza-general" | "grace-and-mercy" | "produccion";
export type IconoKey = "clock" | "users" | "heart" | "music";

export interface NoticiaDB {
  id: string;
  titulo: string;
  descripcion: string | null;
  tag: string;
  fecha: string;
  cta: string | null;
  cta_link: string | null;
  activa: boolean;
  noticia_imagenes: { id?: string; url: string; orden: number }[];
}

export interface Integrante {
  id: string;
  ministerio: string;
  nombre: string;
  rol: string | null;
  foto_url: string | null;
  orden: number;
  activo?: boolean;
}

export interface MisionPunto {
  id: string;
  nombre: string;
  misionero: string;
  proyecto: string;
  bio: string | null;
  fotos: string[];
  testimonio_texto: string | null;
  testimonio_autor: string | null;
  peticiones: string[];
  lat: number;
  lng: number;
  link_externo: string | null;
  orden: number;
  activo: boolean;
}

export interface MisionViaje {
  id: string;
  lugar: string;
  fecha_texto: string;
  descripcion: string | null;
  fotos: string[];
  orden: number;
}

export interface MisionEvangelismo {
  id: string;
  proxima_salida: string | null;
  fotos: string[];
  activo: boolean;
}

export interface Horario {
  id: string;
  seccion: string;
  titulo: string;
  dias: string;
  hora_inicio: string;
  hora_fin: string | null;
  color: string;
  icono: IconoKey;
  orden: number;
  activo: boolean;
}

export interface Contacto {
  id: string;
  area: string;
  nombre: string;
  numero: string;
  activo: boolean;
}

export interface ComedorConfig {
  id: string;
  costo: string;
  horario_inicio: string;
  horario_fin: string;
  dias: string;
  raciones: string;
  direccion: string | null;
  foto_url: string | null;
  descripcion: string | null;
}

export interface EscuelaSalon {
  id: string;
  nombre: string;
  rango_edades: string;
  descripcion: string | null;
  fotos: string[];
  orden: number;
  activo: boolean;
}

export interface TalentosConfig {
  id: string;
  dia_entrenamiento: string;
  hora_inicio: string;
  hora_fin: string;
  edad_min: number;
  edad_max: number;
  participantes: string;
  categorias: number;
  descripcion: string | null;
  video_url: string | null;
  requisitos: string[];
}
