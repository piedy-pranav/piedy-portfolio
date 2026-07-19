"use client";

import { motion, useReducedMotion } from "framer-motion";
import Beam from "./Beam";
import { sections } from "@/lib/tokens";

// Prism geometry (DESIGN.md §4.2, adjusted per owner feedback: centered in the
// viewBox, beam path raised well above the floor, exit fan widened so the
// three labels have clear separation).
const APEX: [number, number] = [600, 180];
const BOTTOM_LEFT: [number, number] = [470, 366];
const BOTTOM_RIGHT: [number, number] = [730, 366];

const ENTRY_POINT: [number, number] = [542, 264]; // on the left face
const EXIT_POINT: [number, number] = [659, 264]; // on the right face — single shared origin for all 3 beams
const INCOMING_START: [number, number] = [-20, 331];

// Thin line endpoints at the right edge — same visual weight as the incoming beam.
// Widely spread so Work / Beyond / About labels never crowd each other.
const lineEndpoints: Record<string, [number, number]> = {
  work: [1200, 110],
  beyond: [1200, 264],
  about: [1200, 470],
};

const labelPositions: Record<string, { x: number; y: number }> = {
  work: { x: 900, y: 169 },
  beyond: { x: 900, y: 238 },
  about: { x: 900, y: 330 },
};

// Entry animation timeline (DESIGN.md §4.4)
const DRAW_STAGGER = [1.15, 1.27, 1.39];
const LABEL_DELAY = 1.75;

export default function PrismStage() {
  const reducedMotion = useReducedMotion();

  const incomingBeamInitial = reducedMotion
    ? { opacity: 0 }
    : { pathLength: 0, opacity: 1 };
  const incomingBeamAnimate = reducedMotion
    ? { opacity: 1 }
    : { pathLength: 1, opacity: 1 };
  const incomingBeamTransition = reducedMotion
    ? { duration: 0.4, ease: "easeOut" as const }
    : { delay: 0.3, duration: 0.7, ease: [0.4, 0, 0.2, 1] as const };

  const prismTransition = reducedMotion
    ? { delay: 0.05, duration: 0.4, ease: "easeOut" as const }
    : { delay: 0.85, duration: 0.9, ease: "easeOut" as const };

  const internalBeamTransition = reducedMotion
    ? { delay: 0.1, duration: 0.4, ease: "easeOut" as const }
    : { delay: 1.0, duration: 0.35, ease: "easeOut" as const };

  return (
    <div className="prism-stage relative h-full w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 44%, rgba(242,240,234,0.045), transparent 70%)",
        }}
      />
      <svg
        viewBox="0 0 1200 640"
        className="h-full w-full"
        role="img"
        aria-label="A prism refracting a beam of white light into three colored beams, one for each section: Work, Beyond, and About."
      >
        {/* Incoming white beam */}
        <motion.path
          d={`M ${INCOMING_START[0]} ${INCOMING_START[1]} L ${ENTRY_POINT[0]} ${ENTRY_POINT[1]}`}
          fill="none"
          stroke="rgba(242,240,234,0.9)"
          strokeWidth={2}
          aria-hidden="true"
          style={{ filter: "drop-shadow(0 0 6px rgba(242,240,234,0.5))" }}
          initial={incomingBeamInitial}
          animate={incomingBeamAnimate}
          transition={incomingBeamTransition}
        />

        {/* Prism */}
        <motion.polygon
          points={`${APEX[0]},${APEX[1]} ${BOTTOM_LEFT[0]},${BOTTOM_LEFT[1]} ${BOTTOM_RIGHT[0]},${BOTTOM_RIGHT[1]}`}
          fill="rgba(255,255,255,0.015)"
          stroke="rgba(242,240,234,0.85)"
          strokeWidth={1.6}
          aria-hidden="true"
          style={{ filter: "drop-shadow(0 0 12px rgba(242,240,234,0.25))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prismTransition}
        />

        {/* Internal refracted beam — parallel to the prism floor, same width as the incoming beam */}
        <motion.line
          x1={ENTRY_POINT[0]}
          y1={ENTRY_POINT[1]}
          x2={EXIT_POINT[0]}
          y2={EXIT_POINT[1]}
          stroke="rgba(242,240,234,0.7)"
          strokeWidth={2}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={internalBeamTransition}
        />

        {/* The three colored beams — real links, ARE the navigation. All three
            share the same origin point on the prism's right face. */}
        {sections.map((section, i) => (
          <Beam
            key={section.id}
            section={section}
            x1={EXIT_POINT[0]}
            y1={EXIT_POINT[1]}
            x2={lineEndpoints[section.id][0]}
            y2={lineEndpoints[section.id][1]}
            labelX={labelPositions[section.id].x}
            labelY={labelPositions[section.id].y}
            drawDelay={DRAW_STAGGER[i]}
            labelDelay={LABEL_DELAY}
            reducedMotion={Boolean(reducedMotion)}
          />
        ))}
      </svg>
    </div>
  );
}
