"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const triggers: Record<string, { emoji: string; color: string }> = {
  sumit: { emoji: "💻", color: "#22d3ee" },
  viz: { emoji: "✨", color: "#a78bfa" },
  gym: { emoji: "💪", color: "#a3e635" },
  hire: { emoji: "🚀", color: "#f472b6" },
};

type Burst = { id: number; emoji: string; color: string };

export function EasterEggs() {
  const [burst, setBurst] = useState<Burst | null>(null);
  const buffer = useRef("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      if (key.length !== 1) return;
      buffer.current = (buffer.current + key).slice(-5);
      const hit = Object.keys(triggers).find((k) =>
        buffer.current.endsWith(k)
      );
      if (hit) {
        setBurst({
          id: Date.now(),
          emoji: triggers[hit].emoji,
          color: triggers[hit].color,
        });
        buffer.current = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!burst) return;
    const t = window.setTimeout(() => setBurst(null), 1500);
    return () => window.clearTimeout(t);
  }, [burst]);

  return (
    <AnimatePresence>
      {burst && (
        <motion.div
          key={burst.id}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center"
        >
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i / 14) * Math.PI * 2;
            const dist = 120 + (i % 3) * 46;
            return (
              <motion.span
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                animate={{
                  opacity: 0,
                  x: Math.cos(angle) * dist,
                  y: Math.sin(angle) * dist,
                  scale: 1.5,
                }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="absolute text-3xl"
                style={{
                  color: burst.color,
                  textShadow: `0 0 22px ${burst.color}`,
                }}
              >
                {burst.emoji}
              </motion.span>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}