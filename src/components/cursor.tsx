"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

function subscribePointerFine(callback: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getPointerFineSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

const POINTER_FINE_SERVER = false;

export function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    () => POINTER_FINE_SERVER
  );
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });
  const spotX = useSpring(x, { stiffness: 50, damping: 24, mass: 1.2 });
  const spotY = useSpring(y, { stiffness: 50, damping: 24, mass: 1.2 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      setHovering(
        !!target?.closest("a, button, [role='button'], input, textarea, label")
      );
      const labelled = target?.closest("[data-cursor]") as HTMLElement | null;
      setLabel(labelled ? (labelled.getAttribute("data-cursor") ?? null) : null);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  const labelled = !!label;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ left: spotX, top: spotY }}
        className="pointer-events-none fixed z-[3] hidden h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen md:block"
      >
        <div
          className="h-full w-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.16) 0%, rgba(167,139,250,0.09) 40%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ left: ringX, top: ringY }}
        animate={{
          scale: labelled ? 2 : hovering ? 1.7 : 1,
          opacity: labelled ? 1 : hovering ? 0.9 : 0.5,
        }}
        transition={{ duration: 0.18 }}
        className={`pointer-events-none fixed z-[99] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border mix-blend-screen transition-colors duration-200 md:flex ${
          labelled ? "border-cyan bg-background/95" : "border-cyan/60"
        }`}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="whitespace-nowrap font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-cyan"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        aria-hidden
        style={{ left: x, top: y }}
        className="pointer-events-none fixed z-[99] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan mix-blend-screen md:block"
      />
    </>
  );
}