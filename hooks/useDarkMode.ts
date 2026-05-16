"use client";
import { useState, useEffect } from "react";

export function useDarkMode(): [boolean, (val: boolean) => void] {
  const [darkMode, setDarkModeState] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      setDarkModeState(stored === "true");
    }
  }, []);

  const setDarkMode = (val: boolean) => {
    setDarkModeState(val);
    localStorage.setItem("darkMode", String(val));
  };

  return [darkMode, setDarkMode];
}
