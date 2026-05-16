import { supabase } from "./supabase";

const BUCKET = "portal-ibm";

/**
 * Sube un archivo al bucket de Supabase Storage.
 * Devuelve la URL pública o null si falla.
 */
export async function uploadToStorage(
  file: File,
  folder: string
): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true });

  if (error) return null;

  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/**
 * Elimina un archivo del bucket usando su URL pública.
 */
export async function removeFromStorage(url: string): Promise<void> {
  const parts = url.split(`/${BUCKET}/`);
  if (parts[1]) {
    await supabase.storage.from(BUCKET).remove([parts[1]]);
  }
}
