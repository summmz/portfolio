"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export function Background() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const hue = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const filter = useTransform(hue, (h) => `hue-rotate(${h}deg)`);

  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const x = useSpring(tx, { stiffness: 45, damping: 18, mass: 0.8 });
  const y = useSpring(ty, { stiffness: 45, damping: 18, mass: 0.8 });

  useEffect(() => {
    if (reduce) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const onOrientation = (e: DeviceOrientationEvent) => {
      const gamma = Math.max(-24, Math.min(24, e.gamma ?? 0));
      const beta = Math.max(-40, Math.min(40, e.beta ?? 0));
      tx.set(gamma * 1.4);
      ty.set(-beta * 1.0);
    };
    const onPointer = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      tx.set(nx * 22);
      ty.set(ny * 16);
    };

    if (isCoarse) {
      const DOEvt = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<"granted" | "denied" | "default">;
      };

      const startListening = () => {
        if (typeof DOEvt?.requestPermission === "function") {
          DOEvt.requestPermission()
            .then((state) => {
              if (state === "granted") {
                window.addEventListener("deviceorientation", onOrientation, true);
              }
            })
            .catch(() => undefined);
        } else {
          window.addEventListener("deviceorientation", onOrientation, true);
        }
      };

      const needsPermission =
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DOEvt?.requestPermission === "function";

      if (!needsPermission) {
        window.addEventListener("deviceorientation", onOrientation, true);
      }
      const onGesture = () => startListening();
      window.addEventListener("touchstart", onGesture, { once: true });
      window.addEventListener("click", onGesture, { once: true });

      return () => {
        window.removeEventListener("deviceorientation", onOrientation, true);
        window.removeEventListener("touchstart", onGesture);
        window.removeEventListener("click", onGesture);
      };
    }

    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => window.removeEventListener("pointermove", onPointer);
  }, [reduce, tx, ty]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="aurora-sheen absolute inset-0" />
      <motion.div
        style={{ x, y, filter }}
        className="absolute -inset-[10%] overflow-hidden"
      >
        <div className="animate-aurora absolute -left-[20%] -top-[30%] h-[70vh] w-[60vw] rounded-full bg-cyan/15 blur-[120px]" />
        <div className="animate-aurora-delayed absolute -right-[25%] top-[10%] h-[65vh] w-[55vw] rounded-full bg-violet/15 blur-[120px]" />
        <div className="animate-float absolute bottom-[-15%] left-[15%] h-[50vh] w-[40vw] rounded-full bg-fuchsia/10 blur-[120px]" />
      </motion.div>
      <div className="noise absolute inset-0 opacity-[0.04] mix-blend-overlay" />
    </div>
  );
}