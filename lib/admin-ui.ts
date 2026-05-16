// Clases reutilizables para el panel admin
export const inputCls = (dark: boolean) =>
  `w-full px-4 py-3 rounded-xl border text-sm font-light outline-none focus:ring-2 ring-stone-400 transition-all ${
    dark
      ? "bg-stone-800 border-stone-700 text-stone-100 placeholder-stone-600"
      : "bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400"
  }`;

export const textareaCls = (dark: boolean) =>
  `${inputCls(dark)} resize-none`;

export const btnPrimary = (dark: boolean) =>
  `flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 ${
    dark
      ? "bg-stone-100 text-stone-900 hover:bg-white"
      : "bg-stone-900 text-stone-100 hover:bg-stone-700"
  }`;

export const btnSecondary = (dark: boolean) =>
  `px-6 py-3 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${
    dark
      ? "border-stone-700 text-stone-400 hover:border-stone-500 hover:text-stone-200"
      : "border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-700"
  }`;

export const cardCls = (dark: boolean) =>
  `rounded-[2rem] border p-8 ${
    dark ? "bg-stone-900 border-stone-800" : "bg-white border-stone-100 shadow-sm"
  }`;

export const rowCls = (dark: boolean) =>
  `flex items-center gap-4 p-4 rounded-2xl border transition-all ${
    dark
      ? "bg-stone-900/50 border-stone-800 hover:border-stone-700"
      : "bg-white border-stone-100 shadow-sm hover:shadow-md"
  }`;

export const labelCls = "block text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1.5";
