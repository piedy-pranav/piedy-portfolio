"use client";

import { useEffect, useState } from "react";

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3" />
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <line x1="8" y1="0.5" x2="8" y2="2.3" />
        <line x1="8" y1="13.7" x2="8" y2="15.5" />
        <line x1="0.5" y1="8" x2="2.3" y2="8" />
        <line x1="13.7" y1="8" x2="15.5" y2="8" />
        <line x1="2.6" y1="2.6" x2="3.9" y2="3.9" />
        <line x1="12.1" y1="12.1" x2="13.4" y2="13.4" />
        <line x1="13.4" y1="2.6" x2="12.1" y2="3.9" />
        <line x1="3.9" y1="12.1" x2="2.6" y2="13.4" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13.5 9.8A6 6 0 1 1 6.2 2.5a5 5 0 0 0 7.3 7.3Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ThemeToggle() {
  // Site now defaults to dark mode (see themeInitScript in app/layout.tsx),
  // so `true` is the correct fixed default for BOTH the server render and
  // the client's first hydration pass — they must match exactly, since the
  // server has no way to know the visitor's actual localStorage choice.
  // The effect below corrects this afterwards if they'd previously chosen
  // light mode. Reading `document` synchronously during the initial render
  // (instead of in this effect) would return the client's real value
  // immediately, diverging from the server-rendered HTML and causing a
  // hydration mismatch — this effect is the correct, deliberate exception
  // to the "no setState in effects" lint rule, not an oversight.
  const [dark, setDark] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-8 w-8 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
