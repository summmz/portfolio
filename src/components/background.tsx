"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function Background() {
  const { scrollYProgress } = useScroll();
  const hue = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const filter = useTransform(hue, (h) => `hue-rotate(${h}deg)`);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="aurora-sheen absolute inset-0" />
      <motion.div
        style={{ filter }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="animate-aurora absolute -left-[20%] -top-[30%] h-[70vh] w-[60vw] rounded-full bg-cyan/15 blur-[120px]" />
        <div className="animate-aurora-delayed absolute -right-[25%] top-[10%] h-[65vh] w-[55vw] rounded-full bg-violet/15 blur-[120px]" />
        <div className="animate-float absolute bottom-[-15%] left-[15%] h-[50vh] w-[40vw] rounded-full bg-fuchsia/10 blur-[120px]" />
      </motion.div>
      <div className="noise absolute inset-0 opacity-[0.04] mix-blend-overlay" />
    </div>
  );
}