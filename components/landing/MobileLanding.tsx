"use client";

import { motion, useReducedMotion } from "framer-motion";
import { landing } from "@/lib/content";
import { sections } from "@/lib/tokens";

// Small prism mark: mini prism + three short colored stubs (DESIGN.md §4.5).
// Colors ARE visible at rest on mobile — there is no hover on touch.
function MiniPrismMark() {
  return (
    <svg
      viewBox="0 0 160 120"
      width={120}
      height={90}
      role="img"
      aria-hidden="true"
    >
      <polygon
        points="90,28 65,72 115,72"
        fill="rgba(255,255,255,0.02)"
        stroke="rgba(242,240,234,0.85)"
        strokeWidth={1.4}
      />
      <polygon points="115,58 160,40 160,50" fill="#FF2A1A" />
      <polygon points="115,64 160,58 160,66" fill="#FFD500" />
      <polygon points="115,70 160,76 160,86" fill="#1E6FFF" />
    </svg>
  );
}

export default function MobileLanding() {
  const reducedMotion = useReducedMotion();

  const rowInitial = reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 };
  const rowAnimate = reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <div className="flex min-h-screen flex-col bg-bg px-6 pb-10 pt-8 text-ink">
      <header className="flex flex-col gap-1">
        <span className="font-display text-[28px]">Pranav Piedy</span>
        <span className="text-[11px] tracking-[0.16em] text-ink/45">
          ANALYTICS · STRATEGY · LOS ANGELES
        </span>
      </header>

      <div className="mt-10 flex flex-col items-start gap-6">
        <MiniPrismMark />
        <div>
          <p className="font-display text-[30px] leading-[1.3]">
            {landing.lede}
          </p>
          <p className="mt-3 text-[15px] leading-[1.7] text-ink/60">
            {landing.body}
          </p>
        </div>
      </div>

      <nav aria-label="Sections" className="mt-12 flex flex-col">
        {sections.map((section, i) => (
          <motion.a
            key={section.id}
            href={section.href}
            aria-label={`${section.label} — ${section.subLabel}`}
            className="flex flex-col gap-1 border-l-[3px] py-5 pl-5"
            style={{ borderColor: section.color }}
            initial={rowInitial}
            animate={rowAnimate}
            transition={{
              delay: reducedMotion ? 0.1 : 0.15 + i * 0.1,
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <span className="font-display text-[24px]">{section.label}</span>
            <span className="text-[11px] tracking-[0.16em] text-ink/45 uppercase">
              {section.subLabel}
            </span>
          </motion.a>
        ))}
      </nav>
    </div>
  );
}
