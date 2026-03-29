'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  Moon
} from 'lucide-react'

interface SidebarProps {
  darkMode: boolean
  setDarkMode: (val: boolean) => void
}

export default function Sidebar({ darkMode, setDarkMode }: SidebarProps) {
  // Iniciamos en true para que esté minimizada al cargar
  const [isCollapsed, setIsCollapsed] = useState(true)
  const pathname = usePathname() // Detecta la ruta actual automáticamente

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home, href: '/' },
    { id: 'calendario', label: 'Calendario', icon: Calendar, href: '/calendario' },
    { id: 'cursos', label: 'Cursos', icon: BookOpen, href: '/cursos' },
    { id: 'talentos', label: 'Talentos', icon: Sparkles, href: '/talentos' },
    { id: 'escuela', label: 'Escuela', icon: GraduationCap, href: '/escuela' },
    { id: 'refugio', label: 'Refugio', icon: ShieldCheck, href: 'https://ciudadrefugiohuancayo.org/' },
  ]

  return (
    <aside
      className={`relative transition-all duration-700 border-l flex flex-col h-screen z-[100] ${isCollapsed ? 'w-20' : 'w-64'
        } ${darkMode ? 'bg-[#121212] border-stone-800' : 'bg-[#fafaf9] border-stone-200'}`}
    >
      {/* BOTÓN DE CONTRAER/EXPANDIR */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -left-3 top-12 w-6 h-6 rounded-full border shadow-sm flex items-center justify-center z-[110] transition-all duration-300 active:scale-90 ${darkMode
            ? 'bg-stone-800 border-stone-700 text-stone-400 hover:bg-stone-700'
            : 'bg-white border-stone-200 text-stone-400 hover:bg-stone-50'
          }`}
      >
        {isCollapsed ? (
          <ChevronLeft size={14} strokeWidth={2} />
        ) : (
          <ChevronRight size={14} strokeWidth={2} />
        )}
      </button>

      {/* MENÚ DE NAVEGACIÓN */}
      <div className="flex-1 flex flex-col py-20 overflow-x-hidden scrollbar-hide">
        {menuItems.map((item) => {
          const Icon = item.icon
          // Un item está activo si el pathname coincide con su href
          const isActive = pathname === item.href

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group relative px-7 py-6 flex items-center transition-all duration-500 ${isActive
                  ? (darkMode ? 'text-stone-100 bg-stone-800/40' : 'text-stone-900 bg-stone-100/50')
                  : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-200'
                }`}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2 : 1.2}
                className={`shrink-0 transition-all duration-500 ${isActive ? (darkMode ? 'text-stone-100' : 'text-stone-900') : 'text-stone-400'
                  }`}
              />

              <span className={`ml-6 text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap transition-all duration-700 ${isCollapsed ? 'opacity-0 -translate-x-10 pointer-events-none' : 'opacity-100 translate-x-0'
                }`}>
                {item.label}
              </span>

              {/* Tooltip para modo colapsado */}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-4 py-2 bg-stone-800 text-stone-100 text-[9px] font-bold uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-2 group-hover:translate-x-0 z-[120] shadow-xl">
                  {item.label}
                </div>
              )}

              {/* Indicador de activo sutil */}
              {isActive && (
                <div className={`absolute left-0 w-1 h-1 rounded-full ml-2 ${darkMode ? 'bg-stone-100' : 'bg-stone-900'}`} />
              )}
            </Link>
          )
        })}
      </div>

      {/* BOTÓN DE CAMBIO DE TEMA */}
      <div className="mt-auto pb-10 flex justify-center border-t border-transparent group">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-4 rounded-full transition-all duration-500 flex items-center justify-center ${darkMode ? 'text-stone-500 hover:text-stone-200' : 'text-stone-400 hover:text-stone-900'
            }`}
          title="Cambiar tema"
        >
          {darkMode ? (
            <Sun size={18} strokeWidth={1.2} className="transition-transform group-hover:rotate-45" />
          ) : (
            <Moon size={18} strokeWidth={1.2} className="transition-transform group-hover:-rotate-12" />
          )}

          {!isCollapsed && (
            <span className="ml-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-opacity">
              {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </span>
          )}
        </button>
      </div>
    </aside>
  )
}