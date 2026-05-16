"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

/** Devuelve el número de WhatsApp para el área solicitada, o null mientras carga. */
export function useContacto(area: string): string | null {
  const [numero, setNumero] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("contactos")
      .select("numero")
      .eq("area", area)
      .eq("activo", true)
      .single()
      .then(({ data }) => {
        if (data) setNumero(data.numero);
      });
  }, [area]);

  return numero;
}

/** Abre WhatsApp directamente. Recibe el número de la DB. */
export function abrirWhatsApp(numero: string | null, mensaje?: string) {
  if (!numero) return;
  const url = mensaje
    ? `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
    : `https://wa.me/${numero}`;
  window.open(url, "_blank");
}
