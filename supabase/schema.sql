-- ═══════════════════════════════════════════════════════════════════════════
-- PORTAL IBM — SCHEMA COMPLETO E IDEMPOTENTE
-- Se puede copiar y ejecutar completo en cualquier momento sin errores.
-- Supabase Dashboard → SQL Editor → New Query → pegar todo → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. TABLAS ────────────────────────────────────────────────────────────────

-- Actividades del calendario
create table if not exists public.actividades (
  id              uuid        default gen_random_uuid() primary key,
  titulo          text        not null,
  fecha_inicio    text        not null,
  fecha_fin       text,
  ministerio_cargo text       not null default 'General',
  descripcion     text,
  created_at      timestamptz default now()
);

-- Noticias
create table if not exists public.noticias (
  id          uuid        default gen_random_uuid() primary key,
  titulo      text        not null,
  descripcion text,
  tag         text        not null default 'Anuncio',
  fecha       date        not null,
  cta         text,
  cta_link    text,
  activa      boolean     not null default false,
  created_at  timestamptz default now()
);

create table if not exists public.noticia_imagenes (
  id         uuid  default gen_random_uuid() primary key,
  noticia_id uuid  not null references public.noticias(id) on delete cascade,
  url        text  not null,
  orden      int   not null default 0
);

-- Integrantes de ministerios
create table if not exists public.ministerio_integrantes (
  id         uuid        default gen_random_uuid() primary key,
  ministerio text        not null,
  nombre     text        not null,
  rol        text,
  foto_url   text,
  orden      int         not null default 0,
  activo     boolean     not null default true,
  created_at timestamptz default now()
);

-- Puntos de misión
create table if not exists public.misiones_puntos (
  id               uuid        default gen_random_uuid() primary key,
  nombre           text        not null,
  misionero        text        not null,
  proyecto         text        not null,
  bio              text,
  fotos            text[]      default '{}',
  testimonio_texto text,
  testimonio_autor text,
  peticiones       text[]      default '{}',
  lat              float       not null,
  lng              float       not null,
  link_externo     text,
  orden            int         default 0,
  activo           boolean     default true,
  created_at       timestamptz default now()
);

-- Bitácora de viajes misioneros
create table if not exists public.misiones_viajes (
  id          uuid        default gen_random_uuid() primary key,
  lugar       text        not null,
  fecha_texto text        not null,
  descripcion text,
  fotos       text[]      default '{}',
  orden       int         default 0,
  created_at  timestamptz default now()
);

-- Evangelismo local
create table if not exists public.misiones_evangelismo (
  id             uuid    default gen_random_uuid() primary key,
  proxima_salida text,
  fotos          text[]  default '{}',
  activo         boolean default true
);

-- Horarios de la iglesia
create table if not exists public.horarios (
  id          uuid    default gen_random_uuid() primary key,
  seccion     text    not null,
  titulo      text    not null,
  dias        text    not null,
  hora_inicio text    not null,
  hora_fin    text,
  color       text    default 'text-amber-500',
  icono       text    default 'clock',
  orden       int     default 0,
  activo      boolean default true
);

-- Contactos WhatsApp (area es único)
create table if not exists public.contactos (
  id      uuid    default gen_random_uuid() primary key,
  area    text    not null,
  nombre  text    not null,
  numero  text    not null,
  activo  boolean default true,
  constraint contactos_area_unique unique (area)
);

-- Configuración del comedor popular
create table if not exists public.comedor_config (
  id             uuid  default gen_random_uuid() primary key,
  costo          text  not null default 'S/.3.50',
  horario_inicio text  not null default '12:00 PM',
  horario_fin    text  not null default '2:00 PM',
  dias           text  not null default 'Lun - Vie',
  raciones       text  not null default '150+',
  direccion      text,
  foto_url       text,
  descripcion    text
);

-- Salones de Escuela Dominical
create table if not exists public.escuela_salones (
  id           uuid    default gen_random_uuid() primary key,
  nombre       text    not null,
  rango_edades text    not null,
  descripcion  text,
  fotos        text[]  default '{}',
  orden        int     default 0,
  activo       boolean default true
);

-- Configuración de la Academia de Talentos
create table if not exists public.talentos_config (
  id                uuid  default gen_random_uuid() primary key,
  dia_entrenamiento text  not null default 'Sábados',
  hora_inicio       text  not null default '4:00 PM',
  hora_fin          text  not null default '6:00 PM',
  edad_min          int   not null default 7,
  edad_max          int   not null default 17,
  participantes     text  not null default '25+',
  categorias        int   not null default 2,
  descripcion       text,
  video_url         text,
  requisitos        text[] default '{}'
);

-- Cursos (se elimina la versión anterior si tiene columnas distintas)
drop table if exists public.curso_temas cascade;
drop table if exists public.cursos     cascade;

create table public.cursos (
  id           uuid        default gen_random_uuid() primary key,
  titulo       text        not null,
  descripcion  text,
  imagen_url   text,
  categoria    text        not null default 'Discipulado',
  duracion     text,
  estado       text        not null default 'proximo',
  instructor   text,
  fecha_inicio date,
  fecha_fin    date,
  horario      text,
  orden        int         default 0,
  activo       boolean     default true,
  created_at   timestamptz default now()
);

create table public.curso_temas (
  id          uuid  default gen_random_uuid() primary key,
  curso_id    uuid  not null references public.cursos(id) on delete cascade,
  titulo      text  not null,
  descripcion text,
  orden       int   default 0
);

-- ── 2. ROW LEVEL SECURITY ────────────────────────────────────────────────────

alter table public.actividades          enable row level security;
alter table public.noticias             enable row level security;
alter table public.noticia_imagenes     enable row level security;
alter table public.ministerio_integrantes enable row level security;
alter table public.misiones_puntos      enable row level security;
alter table public.misiones_viajes      enable row level security;
alter table public.misiones_evangelismo enable row level security;
alter table public.horarios             enable row level security;
alter table public.contactos            enable row level security;
alter table public.comedor_config       enable row level security;
alter table public.escuela_salones      enable row level security;
alter table public.talentos_config      enable row level security;
alter table public.cursos               enable row level security;
alter table public.curso_temas          enable row level security;

-- ── 3. POLICIES (drop antes de crear para evitar duplicados) ─────────────────

-- actividades
drop policy if exists "actividades_select" on public.actividades;
drop policy if exists "actividades_write"  on public.actividades;
create policy "actividades_select" on public.actividades for select using (true);
create policy "actividades_write"  on public.actividades for all    using (auth.role() = 'authenticated');

-- noticias
drop policy if exists "noticias_select_public"    on public.noticias;
drop policy if exists "noticias_all_auth"          on public.noticias;
create policy "noticias_select_public" on public.noticias for select using (true);
create policy "noticias_all_auth"      on public.noticias for all    using (auth.role() = 'authenticated');

-- noticia_imagenes
drop policy if exists "noticia_img_select_public" on public.noticia_imagenes;
drop policy if exists "noticia_img_all_auth"       on public.noticia_imagenes;
create policy "noticia_img_select_public" on public.noticia_imagenes for select using (true);
create policy "noticia_img_all_auth"      on public.noticia_imagenes for all    using (auth.role() = 'authenticated');

-- ministerio_integrantes
drop policy if exists "integrantes_select_public" on public.ministerio_integrantes;
drop policy if exists "integrantes_all_auth"       on public.ministerio_integrantes;
create policy "integrantes_select_public" on public.ministerio_integrantes for select using (true);
create policy "integrantes_all_auth"      on public.ministerio_integrantes for all    using (auth.role() = 'authenticated');

-- misiones_puntos
drop policy if exists "select_public" on public.misiones_puntos;
drop policy if exists "write_auth"    on public.misiones_puntos;
create policy "select_public" on public.misiones_puntos for select using (true);
create policy "write_auth"    on public.misiones_puntos for all    using (auth.role() = 'authenticated');

-- misiones_viajes
drop policy if exists "select_public" on public.misiones_viajes;
drop policy if exists "write_auth"    on public.misiones_viajes;
create policy "select_public" on public.misiones_viajes for select using (true);
create policy "write_auth"    on public.misiones_viajes for all    using (auth.role() = 'authenticated');

-- misiones_evangelismo
drop policy if exists "select_public" on public.misiones_evangelismo;
drop policy if exists "write_auth"    on public.misiones_evangelismo;
create policy "select_public" on public.misiones_evangelismo for select using (true);
create policy "write_auth"    on public.misiones_evangelismo for all    using (auth.role() = 'authenticated');

-- horarios
drop policy if exists "select_public" on public.horarios;
drop policy if exists "write_auth"    on public.horarios;
create policy "select_public" on public.horarios for select using (true);
create policy "write_auth"    on public.horarios for all    using (auth.role() = 'authenticated');

-- contactos
drop policy if exists "select_public" on public.contactos;
drop policy if exists "write_auth"    on public.contactos;
create policy "select_public" on public.contactos for select using (true);
create policy "write_auth"    on public.contactos for all    using (auth.role() = 'authenticated');

-- comedor_config
drop policy if exists "select_public" on public.comedor_config;
drop policy if exists "write_auth"    on public.comedor_config;
create policy "select_public" on public.comedor_config for select using (true);
create policy "write_auth"    on public.comedor_config for all    using (auth.role() = 'authenticated');

-- escuela_salones
drop policy if exists "select_public" on public.escuela_salones;
drop policy if exists "write_auth"    on public.escuela_salones;
create policy "select_public" on public.escuela_salones for select using (true);
create policy "write_auth"    on public.escuela_salones for all    using (auth.role() = 'authenticated');

-- talentos_config
drop policy if exists "select_public" on public.talentos_config;
drop policy if exists "write_auth"    on public.talentos_config;
create policy "select_public" on public.talentos_config for select using (true);
create policy "write_auth"    on public.talentos_config for all    using (auth.role() = 'authenticated');

-- cursos
drop policy if exists "cursos_select_public" on public.cursos;
drop policy if exists "cursos_write_auth"    on public.cursos;
create policy "cursos_select_public" on public.cursos for select using (true);
create policy "cursos_write_auth"    on public.cursos for all    using (auth.role() = 'authenticated');

-- curso_temas
drop policy if exists "temas_select_public" on public.curso_temas;
drop policy if exists "temas_write_auth"    on public.curso_temas;
create policy "temas_select_public" on public.curso_temas for select using (true);
create policy "temas_write_auth"    on public.curso_temas for all    using (auth.role() = 'authenticated');

-- ── 4. DATOS SEMILLA ─────────────────────────────────────────────────────────
-- Solo inserta si la tabla está vacía para no duplicar datos.

-- Puntos de misión
do $$ begin
  if not exists (select 1 from public.misiones_puntos limit 1) then
    insert into public.misiones_puntos (nombre, misionero, proyecto, bio, fotos, testimonio_texto, testimonio_autor, peticiones, lat, lng, link_externo, orden) values
    ('Mazamari, Perú', 'Familia Romero', 'Plantación y Discipulado en la Selva Central',
     'La Familia Romero dejó su hogar respondiendo al llamado de servir en la selva peruana. Su labor se centra en establecer centros de esperanza para comunidades indígenas.',
     ARRAY['https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/mazamari','https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/mazamari_1'],
     'Ver cómo los jóvenes en Mazamari abren su corazón ha sido nuestra mayor recompensa este año.', 'David R.',
     ARRAY['Sabiduría para el equipo','Nuevos locales en las comunidades','Protección en los viajes fluviales'],
     -11.32171943470054, -74.5356705910892, null, 1),
    ('San Jerónimo de Túnan, Perú', 'Richard C. y Ana M.', 'Iglesia en Casa Chalaysanto',
     'En el corazón del Valle del Mantaro, Chalay lidera un movimiento de iglesias orgánicas desde el núcleo familiar.',
     ARRAY['https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/chalay','https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/chalay_1'],
     'Evangelizar y ganar a mi familia para Dios, así como también a nuestro barrio y comunidad.', 'Richard C.',
     ARRAY['Unidad familiar','Apertura de nuevos hogares anfitriones'],
     -11.943488519081162, -75.29026290268125, null, 2),
    ('Pazos, Perú', 'Familia Taboada', 'Misión en las Alturas de Huancavelica',
     'La Familia Taboada sirve a más de 3,800 metros de altura llevando el mensaje de salvación y acompañamiento discipular.',
     ARRAY['https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/pazos','https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/pazos_1'],
     'En las alturas de Junín, la fe se siente tan pura como el aire.', 'Benjamín T.',
     ARRAY['Fortaleza física para el clima','Provisión para materiales educativos'],
     -12.258744835555603, -75.07072022168634, null, 3),
    ('Chilca, Perú', 'Paola C. y Judith A.', 'Casa de Paz Reconciliación Familiar',
     'Desde la cercanía del hogar, Dios levanta espacios donde su Palabra es compartida y las familias son fortalecidas.',
     ARRAY['https://res.cloudinary.com/dv5j3lyph/image/upload/v1777816078/WhatsApp_Image_2026-04-25_at_10.38.03_PM_ijaprt.jpg','https://res.cloudinary.com/dv5j3lyph/image/upload/v1777855222/WhatsApp_Image_2026-04-25_at_10.38.17_PM_vwhx9d.jpg'],
     'Dando a conocer del amor de Dios a la familia.', 'Paola A.',
     ARRAY['Sanidad emocional en las familias','Recursos para talleres comunitarios'],
     -12.085900440542568, -75.20025828175238, null, 4),
    ('Maypuco, Perú', 'Percy R.', 'Luz en el Amazonas',
     'Percy navega las riberas del Marañón llevando esperanza a pueblos que rara vez reciben visitas.',
     ARRAY['https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/maypuco','https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/maypuco_1'],
     'Ser la luz a la comunidad indigena Urarinas Maypuco y alcanzar a las otras comunidades alrededor.', 'Percy R.',
     ARRAY['Nuevos líderes locales','Sostenimiento para viajes extensos'],
     -4.826989923629894, -75.11991101724514, null, 5),
    ('Ccapi Los Uros, Perú', 'Lince C.', 'Generación Semilla en el Titicaca',
     'Sobre las islas flotantes de los Uros, Lince trabaja con la generación más joven sembrando principios eternos.',
     ARRAY['https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/ccapi','https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/ccapi_1'],
     'Evangelizar las comunidades Aimaras en el lago Titicaca.', 'Lince C.',
     ARRAY['Salud para los niños','Materiales didácticos bilingües'],
     -15.81209726283079, -69.36955345903066, null, 6),
    ('El Cairo, Egipto', 'Familia Angulo', 'Puentes Culturales en el Medio Oriente',
     'La Familia Angulo comparte la luz de Cristo en un contexto cultural profundamente distinto al nuestro.',
     ARRAY['https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/cairo','https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/egipto_1'],
     'Compartiendo con diferentes culturas y enseñándoles de Jesús.', 'David A.',
     ARRAY['Gracia en el aprendizaje del idioma','Protección y discreción'],
     30.099720817871646, 31.301887758604295, null, 7),
    ('Kuala Lumpur, Malasia', 'Familia Cusilayme', 'Misión en el Sudeste Asiático',
     'Desde Malasia, los Cusilayme trabajan en la integración y el testimonio dentro de una sociedad multicultural.',
     ARRAY['https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/malasia','https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/malasia_1'],
     'Compartiendo con diferentes culturas y enseñándoles de Jesús.', 'Richard C.',
     ARRAY['Conexiones estratégicas','Paz para la región'],
     3.147356, 101.695283, 'https://luzenelsudesteasiatico.com/', 8);
  end if;
end $$;

-- Bitácora de viajes
do $$ begin
  if not exists (select 1 from public.misiones_viajes limit 1) then
    insert into public.misiones_viajes (lugar, fecha_texto, descripcion, fotos, orden) values
    ('Puerto Bermudes', 'Agosto 2025',
     'Nuestra última expedición a Puerto Bermudes. Trabajamos en el evangelismo dentro de la ciudad y las comunidades aledañas.',
     ARRAY['https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/ministerios/misiones/seccion2/viaje-selva','https://res.cloudinary.com/dv5j3lyph/image/upload/v1777144964/iglesia-portal/ministerios/misiones/seccion2/viaje-selva-2','https://res.cloudinary.com/dv5j3lyph/image/upload/v1777144964/iglesia-portal/ministerios/misiones/seccion2/viaje-selva-3'],
     1);
  end if;
end $$;

-- Evangelismo local
do $$ begin
  if not exists (select 1 from public.misiones_evangelismo limit 1) then
    insert into public.misiones_evangelismo (proxima_salida, fotos, activo) values
    ('Próximamente',
     ARRAY['https://res.cloudinary.com/dv5j3lyph/image/upload/v1777857373/WhatsApp_Image_2026-05-03_at_8.14.41_PM_inrajt.jpg','https://res.cloudinary.com/dv5j3lyph/image/upload/v1777857322/WhatsApp_Image_2026-05-03_at_8.14.28_PM_gjpgra.jpg','https://res.cloudinary.com/dv5j3lyph/image/upload/v1777858044/WhatsApp_Image_2026-05-03_at_8.25.36_PM_yqrl0k.jpg','https://res.cloudinary.com/dv5j3lyph/image/upload/v1777858000/WhatsApp_Image_2026-05-03_at_8.24.42_PM_il58in.jpg'],
     true);
  end if;
end $$;

-- Horarios
do $$ begin
  if not exists (select 1 from public.horarios limit 1) then
    insert into public.horarios (seccion, titulo, dias, hora_inicio, hora_fin, color, icono, orden) values
    ('inicio', 'Oración',         'Martes',   '19:30', '21:30', 'text-amber-500',  'clock',  1),
    ('inicio', 'Jóvenes',         'Sábados',  '19:30', '21:30', 'text-purple-600', 'users',  2),
    ('inicio', 'Adolescentes',    'Sábados',  '19:30', '21:30', 'text-green-300',  'users',  3),
    ('inicio', 'Reunión General', 'Domingos', '10:00', '12:00', 'text-rose-400',   'heart',  4),
    ('grace-and-mercy', 'Ensayo', 'Lunes, Miércoles, Jueves', '19:30', '21:30', 'text-purple-500', 'music', 1),
    ('grace-and-mercy', 'Ensayo', 'Sábado',   '9:30',  '11:30', 'text-purple-500', 'music', 2),
    ('alabanza-general','Ensayo', 'Viernes',  '19:00', '21:00', 'text-emerald-500','music', 1);
  end if;
end $$;

-- Contactos WhatsApp (ON CONFLICT porque area es único)
insert into public.contactos (area, nombre, numero) values
('general',   'Iglesia IBM',            '51956055194'),
('misiones',  'Ministerio Misiones',    '51956055194'),
('jovenes',   'Ministerio Jóvenes',     '51956055194'),
('teens',     'Ministerio Adolescentes','51956055194'),
('escuela',   'Escuela Dominical',      '51989495033'),
('cursos',    'Cursos y Discipulados',  '51960843024'),
('comedor',   'Comedor Popular',        '51964373959'),
('talentos',  'Academia de Talentos',   '51982794302'),
('produccion','Ministerio Producción',  '51956055194'),
('servir',    'Ministerio Servir',      '51956055194')
on conflict (area) do nothing;

-- Comedor popular (solo si está vacía)
do $$ begin
  if not exists (select 1 from public.comedor_config limit 1) then
    insert into public.comedor_config (costo, horario_inicio, horario_fin, dias, raciones, direccion, descripcion) values
    ('S/.3.50', '12:00 PM', '2:00 PM', 'Lun - Vie', '150+',
     'Calle Los Heraldos 205 - Justicia, Paz y Vida',
     'Servimos almuerzos nutritivos a precios accesibles para la comunidad. Un espacio de amor y dignidad donde cada plato cuenta.');
  end if;
end $$;

-- Salones de Escuela Dominical
do $$ begin
  if not exists (select 1 from public.escuela_salones limit 1) then
    insert into public.escuela_salones (nombre, rango_edades, descripcion, fotos, orden) values
    ('Estrellitas', '3 a 6 años', 'Un mundo de historias bíblicas, canciones y creatividad pensado para los más pequeños.',
     ARRAY['https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/escuela/estrellitas','https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/escuela/estrellitas_1','https://res.cloudinary.com/dv5j3lyph/video/upload/v1777147102/estrellitas_2_dug3z5.mp4'], 1),
    ('Campeones', '7 a 11 años', 'Aprendizaje dinámico de la Palabra con dinámicas, juegos y desafíos de fe.',
     ARRAY['https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/escuela/campeones','https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/escuela/campeones_1','https://res.cloudinary.com/dv5j3lyph/video/upload/v1777147101/campeones_2_rel0z9.mp4'], 2),
    ('Pre-Adolescentes', '12 a 15 años', 'Espacio de identidad, preguntas reales y fe construida sobre roca.',
     ARRAY['https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/escuela/pre','https://res.cloudinary.com/dv5j3lyph/video/upload/v1777147102/pre_1_cnxsm1.mp4'], 3),
    ('Adolescentes', '16 a 18 años', 'Discipulado profundo para jóvenes que buscan su propósito.',
     ARRAY['https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/escuela/teens','https://res.cloudinary.com/dv5j3lyph/video/upload/v1777147101/teens_1_rtk9y0.mp4'], 4);
  end if;
end $$;

-- Academia de Talentos (solo si está vacía)
do $$ begin
  if not exists (select 1 from public.talentos_config limit 1) then
    insert into public.talentos_config (dia_entrenamiento, hora_inicio, hora_fin, edad_min, edad_max, participantes, categorias, descripcion, video_url, requisitos) values
    ('Sábados', '4:00 PM', '6:00 PM', 7, 17, '25+', 2,
     'Formamos a niños y jóvenes a través del deporte, inculcando disciplina, trabajo en equipo y valores del reino.',
     'https://res.cloudinary.com/dv5j3lyph/video/upload/v1777147442/talentos_7_uaekvi.mp4',
     ARRAY['Uniforme de la academia','Canilleras (obligatorio)','Hidratación personal','Puntualidad y respeto']);
  end if;
end $$;

-- Cursos (siempre vacíos por el DROP CASCADE de arriba, insertar seed)
insert into public.cursos (titulo, descripcion, imagen_url, categoria, duracion, estado, orden) values
('Los dos reinos',
 'Un recorrido para aprender sobre el reino de los cielos y el reino de las tinieblas, y cómo vivir en la luz.',
 'https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/cursos/cursos_1',
 'Discipulado', '8 Sesiones', 'finalizado', 1),
('Libertad Financiera',
 'Aprende a gestionar tus finanzas a la manera del reino de Dios.',
 'https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/cursos/cursos_2',
 'Ministerial', '8 Sesiones', 'finalizado', 2),
('Doctrina Básica 1',
 'Principios bíblicos para el crecimiento espiritual y la vida cristiana.',
 'https://res.cloudinary.com/dv5j3lyph/image/upload/f_auto,q_auto/iglesia-portal/cursos/cursos_3',
 'Discipulado', '8 Sesiones', 'finalizado', 3);
