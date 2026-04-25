"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Calendar,
  BookOpen,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Sidebar({ darkMode, setDarkMode }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpenMobile(false);
  }, [pathname]);

  const menuItems = [
    { id: "inicio", label: "Inicio", icon: Home, href: "/" },
    {
      id: "calendario",
      label: "Calendario",
      icon: Calendar,
      href: "/calendario",
    },
    { id: "cursos", label: "Cursos", icon: BookOpen, href: "/cursos" },
    { id: "talentos", label: "Talentos", icon: Sparkles, href: "/talentos" },
    { id: "escuela", label: "Escuela", icon: GraduationCap, href: "/escuela" },
    {
      id: "refugio",
      label: "Refugio",
      icon: ShieldCheck,
      href: "https://ciudadrefugiohuancayo.org/",
    },
  ];

  return (
    <>
      {/* 1. BOTÓN FLOTANTE PARA MÓVILES */}
      <button
        onClick={() => setIsOpenMobile(!isOpenMobile)}
        className={`lg:hidden fixed top-6 right-6 z-[150] p-3 rounded-full border shadow-2xl transition-all duration-300 active:scale-90 ${
          darkMode
            ? "bg-stone-900 border-stone-800 text-stone-100"
            : "bg-white border-stone-200 text-stone-900"
        }`}
      >
        {isOpenMobile ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* 2. OVERLAY OSCURO */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[130] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* 3. ASIDE (SIDEBAR) - CAMBIO: Eliminado lg:relative para que sea FIXED siempre */}
      <aside
        className={`fixed top-0 right-0 h-screen z-[140] transition-all duration-700 border-l flex flex-col shadow-2xl lg:shadow-none ${
          isCollapsed ? "lg:w-20" : "lg:w-64"
        } ${
          isOpenMobile
            ? "translate-x-0 w-72"
            : "translate-x-full lg:translate-x-0"
        } ${
          darkMode
            ? "bg-[#121212] border-stone-800"
            : "bg-[#fafaf9] border-stone-200"
        }`}
      >
        {/* BOTÓN DE CONTRAER/EXPANDIR */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`hidden lg:flex absolute -left-3 top-12 w-6 h-6 rounded-full border shadow-sm items-center justify-center z-[110] transition-all duration-300 active:scale-90 ${
            darkMode
              ? "bg-stone-800 border-stone-700 text-stone-400 hover:bg-stone-700"
              : "bg-white border-stone-200 text-stone-400 hover:bg-stone-50"
          }`}
        >
          {isCollapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        {/* LOGO MÓVIL */}
        <div className="lg:hidden p-10 pb-0 flex flex-col space-y-2">
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
            Navegación
          </span>
          <div
            className={`h-px w-8 ${darkMode ? "bg-stone-800" : "bg-stone-200"}`}
          />
        </div>

        {/* MENÚ DE NAVEGACIÓN */}
        <div className="flex-1 flex flex-col py-12 lg:py-20 overflow-x-hidden scrollbar-hide">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group relative px-7 py-5 lg:py-6 flex items-center transition-all duration-500 ${
                  isActive
                    ? darkMode
                      ? "text-stone-100 bg-stone-800/40"
                      : "text-stone-900 bg-stone-100/50"
                    : "text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2 : 1.2}
                  className={`shrink-0 transition-all duration-500 ${
                    isActive
                      ? darkMode
                        ? "text-stone-100"
                        : "text-stone-900"
                      : "text-stone-400"
                  }`}
                />

                <span
                  className={`ml-6 text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap transition-all duration-700 ${
                    isCollapsed
                      ? "lg:opacity-0 lg:-translate-x-10"
                      : "opacity-100 translate-x-0"
                  }`}
                >
                  {item.label}
                </span>

                {isCollapsed && (
                  <div className="hidden lg:block absolute left-full ml-4 px-4 py-2 bg-stone-800 text-stone-100 text-[9px] font-bold uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-2 group-hover:translate-x-0 z-[120] shadow-xl">
                    {item.label}
                  </div>
                )}

                {isActive && (
                  <div
                    className={`absolute left-0 w-1 h-1 rounded-full ml-2 ${darkMode ? "bg-stone-100" : "bg-stone-900"}`}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* BOTÓN DE CAMBIO DE TEMA - AJUSTE: Color de iconos mejorado */}
        <div className="mt-auto pb-10 flex flex-col items-center border-t border-stone-200 dark:border-stone-800 pt-6 group">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative p-4 rounded-full transition-all duration-500 flex items-center justify-start w-full px-7"
          >
            <div className="flex items-center justify-center shrink-0 w-6">
              {darkMode ? (
                <Sun
                  size={18}
                  strokeWidth={1.5}
                  className="text-amber-400 transition-transform group-hover:rotate-45"
                />
              ) : (
                <Moon
                  size={18}
                  strokeWidth={1.5}
                  className="text-stone-600 transition-transform group-hover:-rotate-12"
                />
              )}
            </div>

            <span
              className={`ml-6 text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap transition-all duration-700 ${
                darkMode ? "text-stone-100" : "text-stone-500"
              } ${
                isCollapsed
                  ? "lg:opacity-0 lg:-translate-x-10 lg:pointer-events-none"
                  : "opacity-100 translate-x-0"
              }`}
            >
              {darkMode ? "Modo Claro" : "Modo Oscuro"}
            </span>
          </button>
        </div>
      </aside>

      {/* 4. ESPACIADOR DINÁMICO: Para que el contenido no se tape por el Sidebar fixed en Desktop */}
      <div
        className={`hidden lg:block shrink-0 transition-all duration-700 ${isCollapsed ? "w-20" : "w-64"}`}
      />
    </>
  );
}
