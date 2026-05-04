import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Título principal con variantes clave para buscadores
  title: "Iglesia Brisas del Mantaro | IBM Portal",

  // Descripción rica en palabras clave naturales
  description: "Portal oficial de la Iglesia Brisas del Mantaro (IBM). Conoce nuestra visión, misiones y comunidad en un solo lugar.",

  // Palabras clave para reforzar la búsqueda (aunque Google usa más el contenido, ayuda a otros motores)
  keywords: ["Iglesia Brisas del Mantaro", "Portal IBM", "IBM Portal", "Iglesia Portal", "IBM Brisas del Mantaro", "iddp IBM", "iddp Brisas del Mantaro"],

  // Configuración para que se vea bien al compartir en Facebook/WhatsApp/X
  openGraph: {
    title: "Iglesia Portal - Brisas del Mantaro | IBM",
    description: "Espacio digital de la comunidad IBM Brisas del Mantaro.",
    url: "https://iddpibm.org/", // Reemplaza con tu URL real
    siteName: "Iglesia Brisas del Mantaro",
    locale: "es_PE",
    type: "website",
  },

  // Robots le dice a Google que indexe todo y siga los enlaces
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
