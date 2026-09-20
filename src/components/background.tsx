"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useGyro } from "./gyro-provider";

export function Background() {
  const { gx, gy } = useGyro();
  const { scrollYProgress } = useScroll();
  const hue = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const filter = useTransform(hue, (h) => `hue-rotate(${h}deg)`);

  const b1x = useTransform(gx, (v) => v * 1.1);
  const b1y = useTransform(gy, (v) => v * 0.9);
  const b2x = useTransform(gx, (v) => v * -0.85);
  const b2y = useTransform(gy, (v) => v * 0.7);
  const b3x = useTransform(gx, (v) => v * 0.6);
  const b3y = useTransform(gy, (v) => v * -1.0);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="aurora-sheen absolute inset-0" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ x: b1x, y: b1y, filter }}
          className="absolute -inset-[18%]"
        >
          <div className="animate-aurora absolute -left-[20%] -top-[30%] h-[70vh] w-[60vw] rounded-full bg-cyan/15 blur-[120px]" />
          <div className="animate-aurora-delayed absolute -right-[25%] top-[10%] h-[65vh] w-[55vw] rounded-full bg-violet/15 blur-[120px]" />
          <div className="animate-float absolute bottom-[-15%] left-[15%] h-[50vh] w-[40vw] rounded-full bg-fuchsia/10 blur-[120px]" />
        </motion.div>
        <motion.div style={{ x: b2x, y: b2y }}>
          <div className="animate-aurora absolute -left-[5%] top-[25%] h-[40vh] w-[35vw] rounded-full bg-fuchsia/10 blur-[110px]" />
          <div className="animate-aurora-delayed absolute bottom-[10%] -right-[8%] h-[45vh] w-[40vw] rounded-full bg-cyan/10 blur-[110px]" />
        </motion.div>
        <motion.div style={{ x: b3x, y: b3y }}>
          <div className="animate-float absolute left-[38%] top-[-18%] h-[35vh] w-[28vw] rounded-full bg-violet/10 blur-[110px]" />
          <div className="animate-aurora absolute left-[30%] bottom-[-20%] h-[42vh] w-[34vw] rounded-full bg-lime/5 blur-[120px]" />
        </motion.div>
      </div>
      <div className="noise absolute inset-0 opacity-[0.04] mix-blend-overlay" />
    </div>
  );
}