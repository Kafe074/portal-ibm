"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useDarkMode } from "@/hooks/useDarkMode";
import type { Session } from "@supabase/supabase-js";
import {
  Newspaper, Users, MapPin, Clock, Phone,
  Utensils, School, Trophy, LogOut, Sun, Moon,
  ExternalLink, Loader, Calendar, BookOpen,
} from "lucide-react";

// Secciones del admin
import NoticiasSection    from "@/app/admin/_sections/NoticiasSection";
import MinisteriosSection from "@/app/admin/_sections/MinisteriosSection";
import MisionesSection    from "@/components/admin/MisionesSection";
import HorariosSection    from "@/components/admin/HorariosSection";
import ContactosSection   from "@/components/admin/ContactosSection";
import ComedorSection     from "@/components/admin/ComedorSection";
import EscuelaSection     from "@/components/admin/EscuelaSection";
import TalentosSection    from "@/components/admin/TalentosSection";
import CalendarioSection  from "@/components/admin/CalendarioSection";
import CursosSection      from "@/components/admin/CursosSection";

import { inputCls } from "@/lib/admin-ui";

type Section =
  | "noticias" | "ministerios" | "misiones"
  | "horarios" | "contactos"  | "comedor"
  | "escuela"  | "talentos"   | "calendario" | "cursos";

const NAV: { id: Section; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: "noticias",    label: "Noticias",    icon: Newspaper },
  { id: "calendario",  label: "Calendario",  icon: Calendar },
  { id: "cursos",      label: "Cursos",      icon: BookOpen },
  { id: "misiones",    label: "Misiones",    icon: MapPin },
  { id: "ministerios", label: "Ministerios", icon: Users },
  { id: "horarios",    label: "Horarios",    icon: Clock },
  { id: "contactos",   label: "Contactos",   icon: Phone },
  { id: "comedor",     label: "Comedor",     icon: Utensils },
  { id: "escuela",     label: "Escuela",     icon: School },
  { id: "talentos",    label: "Talentos",    icon: Trophy },
];

export default function AdminPage() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("noticias");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) localStorage.setItem("user_admin_session", JSON.stringify({ email: session.user.email }));
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
      if (session) localStorage.setItem("user_admin_session", JSON.stringify({ email: session.user.email }));
      else localStorage.removeItem("user_admin_session");
    });
    return () => subscription.unsubscribe();
  }, []);

  async function login() {
    setLoginError(""); setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError("Correo o contraseña incorrectos");
    setLoginLoading(false);
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-[#0a0a0a]" : "bg-[#fafaf9]"}`}>
        <Loader size={22} className="animate-spin text-stone-400" />
      </div>
    );
  }

  // ── Login ────────────────────────────────────────────────────────────────────
  if (!session) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? "bg-[#0a0a0a]" : "bg-[#fafaf9]"}`}>
        <div className={`w-full max-w-sm rounded-[2.5rem] border p-10 space-y-8 shadow-2xl ${darkMode ? "bg-stone-900 border-stone-800" : "bg-white border-stone-100"}`}>
          <div className="text-center space-y-4">
            <img src="/IBM.png" alt="Logo" className={`w-12 h-12 mx-auto object-contain ${darkMode ? "opacity-40 grayscale invert" : "grayscale brightness-0"}`} />
            <span className="block text-[9px] font-black uppercase tracking-[0.5em] text-stone-400 pt-2">Panel Admin</span>
            <h1 className={`text-3xl font-serif italic ${darkMode ? "text-stone-100" : "text-stone-900"}`}>Bienvenido.</h1>
          </div>
          <div className="space-y-3">
            <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} className={inputCls(darkMode)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} className={inputCls(darkMode)} />
            {loginError && <p className="text-red-400 text-[11px] text-center font-medium">{loginError}</p>}
            <button onClick={login} disabled={loginLoading} className={`w-full py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all disabled:opacity-60 flex items-center justify-center gap-2 ${darkMode ? "bg-stone-100 text-stone-900 hover:bg-white" : "bg-stone-900 text-stone-100 hover:bg-stone-700"}`}>
              {loginLoading ? <Loader size={14} className="animate-spin" /> : "Ingresar"}
            </button>
          </div>
          <div className="flex justify-center">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full ${darkMode ? "text-stone-500 hover:text-stone-300" : "text-stone-400 hover:text-stone-700"}`}>
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Panel Admin ──────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-[#0a0a0a] text-stone-300" : "bg-[#fafaf9] text-stone-700"}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 px-6 md:px-8 py-4 border-b flex items-center justify-between ${darkMode ? "bg-[#0a0a0a]/90 border-stone-900 backdrop-blur-md" : "bg-[#fafaf9]/90 border-stone-100 backdrop-blur-md"}`}>
        <div className="flex items-center gap-4">
          {/* Hamburguesa para móvil */}
          <button onClick={() => setNavOpen(!navOpen)} className={`lg:hidden p-2 rounded-xl ${darkMode ? "text-stone-400 hover:text-stone-200" : "text-stone-500 hover:text-stone-900"}`}>
            <div className="space-y-1.5"><div className="w-5 h-px bg-current" /><div className="w-5 h-px bg-current" /><div className="w-5 h-px bg-current" /></div>
          </button>
          <img src="/IBM.png" alt="Logo" className={`w-7 h-7 object-contain ${darkMode ? "opacity-40 grayscale invert" : "grayscale brightness-0"}`} />
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-stone-400">Panel Admin</p>
            <p className={`text-[11px] font-light truncate max-w-[180px] hidden sm:block ${darkMode ? "text-stone-600" : "text-stone-400"}`}>{session.user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full ${darkMode ? "text-stone-500 hover:text-stone-300" : "text-stone-400 hover:text-stone-700"}`}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href="/" target="_blank" className={`hidden sm:flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest ${darkMode ? "text-stone-500 hover:text-stone-300" : "text-stone-400 hover:text-stone-700"}`}>
            <ExternalLink size={12} />Ver Sitio
          </a>
          <button onClick={() => supabase.auth.signOut()} className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[9px] font-bold uppercase tracking-widest ${darkMode ? "border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200" : "border-stone-200 text-stone-400 hover:border-stone-300 hover:text-stone-700"}`}>
            <LogOut size={12} />Salir
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar de navegación — desktop */}
        <nav className={`hidden lg:flex flex-col w-56 shrink-0 border-r py-6 px-3 gap-1 sticky top-[61px] self-start h-[calc(100vh-61px)] overflow-y-auto ${darkMode ? "border-stone-900 bg-[#0a0a0a]" : "border-stone-100 bg-[#fafaf9]"}`}>
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] transition-all text-left ${activeSection === id ? (darkMode ? "bg-stone-800 text-stone-100" : "bg-stone-100 text-stone-900") : (darkMode ? "text-stone-500 hover:text-stone-300 hover:bg-stone-900" : "text-stone-400 hover:text-stone-700 hover:bg-stone-50")}`}
            >
              <Icon size={14} />{label}
            </button>
          ))}
        </nav>

        {/* Sidebar móvil (overlay) */}
        {navOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-[60] lg:hidden" onClick={() => setNavOpen(false)} />
            <nav className={`fixed top-0 left-0 h-full w-56 z-[70] flex flex-col py-6 px-3 gap-1 border-r lg:hidden ${darkMode ? "border-stone-900 bg-[#0a0a0a]" : "border-stone-100 bg-white"}`}>
              <div className="mb-4 px-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">Secciones</p>
              </div>
              {NAV.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => { setActiveSection(id); setNavOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] transition-all text-left ${activeSection === id ? (darkMode ? "bg-stone-800 text-stone-100" : "bg-stone-100 text-stone-900") : (darkMode ? "text-stone-500 hover:text-stone-300" : "text-stone-400 hover:text-stone-700")}`}
                >
                  <Icon size={14} />{label}
                </button>
              ))}
            </nav>
          </>
        )}

        {/* Contenido principal */}
        <main className="flex-1 min-w-0 p-6 md:p-10 pb-24">
          <div className="max-w-4xl mx-auto">
            {activeSection === "noticias"    && <NoticiasSection    darkMode={darkMode} />}
            {activeSection === "calendario"  && <CalendarioSection  darkMode={darkMode} />}
            {activeSection === "cursos"      && <CursosSection      darkMode={darkMode} />}
            {activeSection === "ministerios" && <MinisteriosSection darkMode={darkMode} />}
            {activeSection === "misiones"    && <MisionesSection    darkMode={darkMode} />}
            {activeSection === "horarios"    && <HorariosSection    darkMode={darkMode} />}
            {activeSection === "contactos"   && <ContactosSection   darkMode={darkMode} />}
            {activeSection === "comedor"     && <ComedorSection     darkMode={darkMode} />}
            {activeSection === "escuela"     && <EscuelaSection     darkMode={darkMode} />}
            {activeSection === "talentos"    && <TalentosSection    darkMode={darkMode} />}
          </div>
        </main>
      </div>
    </div>
  );
}
