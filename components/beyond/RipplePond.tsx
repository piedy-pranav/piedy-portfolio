"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { beyondInterests } from "@/lib/content";

const CELL = 4;
const DAMPING = 0.985;

// Palette: black water, teal ripples, coral crests. h is roughly in [-1, 1]:
// still -> near-black; small |h| -> teal glow; strong crest -> coral; troughs -> deep blue-black.
function heightToColor(h: number): [number, number, number] {
  const a = Math.abs(h);
  if (a < 0.015) return [6, 8, 9];

  if (h > 0) {
    if (h < 0.35) {
      const t = h / 0.35;
      return [6 + t * (24 - 6), 8 + t * (135 - 8), 9 + t * (152 - 9)];
    }
    const t = Math.min((h - 0.35) / 0.5, 1);
    return [24 + t * (232 - 24), 135 + t * (115 - 135), 152 + t * (90 - 152)];
  }
  const t = Math.min(a / 0.6, 1);
  return [6 + t * (10 - 6), 8 + t * (48 - 8), 9 + t * (66 - 9)];
}

type Point = [number, number];
type DropFn = (px: number, py: number, strength?: number, radius?: number) => void;

export default function RipplePond() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropRef = useRef<DropFn>(() => {});
  const [positions, setPositions] = useState<Point[]>([]);
  const [visible, setVisible] = useState<boolean[]>(() =>
    beyondInterests.map(() => false)
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let buf1 = new Float32Array(0);
    let buf2 = new Float32Array(0);
    let imageData: ImageData;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W;
      canvas!.height = H;
      cols = Math.ceil(W / CELL) + 2;
      rows = Math.ceil(H / CELL) + 2;
      buf1 = new Float32Array(cols * rows);
      buf2 = new Float32Array(cols * rows);
      imageData = ctx!.createImageData(W, H);
    }
    resize();

    function drop(px: number, py: number, strength = 3.0, radius = 2) {
      const cx = Math.floor(px / CELL);
      const cy = Math.floor(py / CELL);
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const x = cx + dx;
          const y = cy + dy;
          if (x > 0 && x < cols - 1 && y > 0 && y < rows - 1) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist <= radius) {
              buf1[y * cols + x] +=
                strength * Math.cos((dist / radius) * Math.PI * 0.5);
            }
          }
        }
      }
    }
    dropRef.current = drop;

    function step() {
      for (let y = 1; y < rows - 1; y++) {
        const row = y * cols;
        for (let x = 1; x < cols - 1; x++) {
          const i = row + x;
          buf2[i] =
            ((buf1[i - 1] + buf1[i + 1] + buf1[i - cols] + buf1[i + cols]) / 2 -
              buf2[i]) *
            DAMPING;
        }
      }
      const tmp = buf1;
      buf1 = buf2;
      buf2 = tmp;
    }

    function render() {
      const data = imageData.data;
      for (let py = 0; py < H; py++) {
        const cy = Math.floor(py / CELL) + 1;
        const rowOff = cy * cols;
        const pRow = py * W;
        for (let px = 0; px < W; px++) {
          const cx = Math.floor(px / CELL) + 1;
          const [r, g, b] = heightToColor(buf1[rowOff + cx]);
          const idx = (pRow + px) * 4;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }
      ctx!.putImageData(imageData, 0, 0);
    }

    // Interest positions, randomized each visit — confined to a circle so the
    // whole cluster reads as one group instead of scattering across the page.
    // Reserved rectangles keep labels clear of the header/title/caption text;
    // the ripple simulation itself is unaffected and still spans the full page.
    function generatePositions(): Point[] {
      const placed: Point[] = [];
      const minDist = Math.min(W, H) * 0.15;
      const circleCx = W * 0.5;
      const circleCy = H * 0.54;
      const circleRadius = Math.min(W, H) * 0.32;

      const reserved: [number, number, number, number][] = [
        [0, 0, W, 90], // header
        [0, 60, 480, 300], // title block
        [W - 640, H - 160, W, H], // concept caption (wide, single-line text)
      ];
      function inReserved(x: number, y: number) {
        return reserved.some(
          ([x1, y1, x2, y2]) => x >= x1 && x <= x2 && y >= y1 && y <= y2
        );
      }
      function randomPointInCircle(): Point {
        const angle = Math.random() * Math.PI * 2;
        const r = circleRadius * Math.sqrt(Math.random());
        return [circleCx + r * Math.cos(angle), circleCy + r * Math.sin(angle)];
      }

      for (let i = 0; i < beyondInterests.length; i++) {
        let best: Point | null = null;
        for (let attempt = 0; attempt < 300; attempt++) {
          const [x, y] = randomPointInCircle();
          if (inReserved(x, y)) continue;
          const tooClose = placed.some(
            (p) => Math.hypot(p[0] - x, p[1] - y) < minDist
          );
          if (!tooClose) {
            best = [x, y];
            break;
          }
          if (!best) best = [x, y];
        }
        placed.push(best || [circleCx, circleCy]);
      }
      return placed;
    }

    setPositions(generatePositions());

    function handleResize() {
      resize();
      setPositions(generatePositions());
    }
    window.addEventListener("resize", handleResize);

    let lastMove = 0;
    function handlePointerMove(e: PointerEvent) {
      const now = performance.now();
      if (now - lastMove > 28) {
        drop(e.clientX, e.clientY, 1.0, 1);
        lastMove = now;
      }
    }
    function handlePointerDown(e: PointerEvent) {
      drop(e.clientX, e.clientY, 9.0, 3);
    }
    function handleTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      if (t) {
        const now = performance.now();
        if (now - lastMove > 28) {
          drop(t.clientX, t.clientY, 1.2, 1);
          lastMove = now;
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafId: number | null = null;

    function loop() {
      step();
      render();
      rafId = requestAnimationFrame(loop);
    }

    let onDemandFrames = 0;
    function onDemandTick() {
      step();
      render();
      if (++onDemandFrames < 240) {
        rafId = requestAnimationFrame(onDemandTick);
      } else {
        rafId = null;
      }
    }
    function triggerOnDemand() {
      if (rafId) return;
      onDemandFrames = 0;
      rafId = requestAnimationFrame(onDemandTick);
    }

    if (reduceMotion) {
      render(); // one still black frame
      window.addEventListener("pointerdown", triggerOnDemand);
      window.addEventListener("pointermove", triggerOnDemand);
    } else {
      loop();
    }

    // Entrance: interests surface one by one, silently — no ripples yet.
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    beyondInterests.forEach((_, i) => {
      const delay = reduceMotion ? 100 : 500 + i * 380;
      timeouts.push(
        setTimeout(() => {
          setVisible((v) => {
            const next = [...v];
            next[i] = true;
            return next;
          });
        }, delay)
      );
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("pointerdown", triggerOnDemand);
      window.removeEventListener("pointermove", triggerOnDemand);
      if (rafId) cancelAnimationFrame(rafId);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  function handleInterestEnter(e: MouseEvent<HTMLSpanElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    dropRef.current(r.left + r.width / 2, r.top + r.height / 2 + 30, 6.0, 3);
  }
  function handleInterestClick(e: MouseEvent<HTMLSpanElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    dropRef.current(r.left + r.width / 2, r.top + r.height / 2 + 30, 11.0, 4);
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-0 block h-full w-full"
      />
      {positions.map(([x, y], i) => (
        <span
          key={beyondInterests[i]}
          className="interest-label fixed z-[15] -translate-x-1/2 -translate-y-1/2 cursor-pointer text-[19px] whitespace-nowrap text-ink/90 transition-opacity duration-[1100ms] ease-out select-none min-[761px]:text-[24px]"
          style={{
            left: x,
            top: y,
            opacity: visible[i] ? 1 : 0,
            fontFamily: "var(--font-display)",
          }}
          onMouseEnter={handleInterestEnter}
          onClick={handleInterestClick}
        >
          {beyondInterests[i]}
        </span>
      ))}
    </>
  );
}
