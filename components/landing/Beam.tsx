"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { SectionMeta } from "@/lib/tokens";

interface BeamProps {
  section: SectionMeta;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  labelX: number;
  labelY: number;
  drawDelay: number;
  labelDelay: number;
  reducedMotion: boolean;
}

export default function Beam({
  section,
  x1,
  y1,
  x2,
  y2,
  labelX,
  labelY,
  drawDelay,
  labelDelay,
  reducedMotion,
}: BeamProps) {
  // pathLength starts at 0 (truly absent, not just small) so the beam only
  // appears once its own draw-in begins — never before the prism is lit.
  const lineInitial = reducedMotion ? { opacity: 0 } : { pathLength: 0, opacity: 1 };
  const lineAnimate = reducedMotion ? { opacity: 1 } : { pathLength: 1, opacity: 1 };
  const lineTransition = reducedMotion
    ? { delay: 0.1, duration: 0.4, ease: "easeOut" as const }
    : { delay: drawDelay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

  const linkStyle: CSSProperties = {
    ["--beam-color" as string]: section.color,
  };

  return (
    <a
      href={section.href}
      className="beam-link"
      style={linkStyle}
      aria-label={`${section.label} — ${section.subLabel}`}
    >
      {/* Generous invisible hit area — the visible beam is a thin line */}
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="beam-hit" aria-hidden="true" />
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className="beam-shape"
        initial={lineInitial}
        animate={lineAnimate}
        transition={lineTransition}
      />
      <motion.text
        x={labelX}
        y={labelY}
        className="beam-label"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 30,
          letterSpacing: "0.02em",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: reducedMotion ? 0.15 : labelDelay,
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        {section.label}
      </motion.text>
    </a>
  );
}
