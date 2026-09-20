"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export function Background() {
  const { scrollYProgress } = useScroll();
  const hue = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const filter = useTransform(hue, (h) => `hue-rotate(${h}deg)`);

  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const x = useSpring(tx, { stiffness: 80, damping: 16, mass: 0.5 });
  const y = useSpring(ty, { stiffness: 80, damping: 16, mass: 0.5 });
  const rotate = useTransform(tx, (v) => v * 0.3);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    const setFromGyro = (gamma: number, beta: number) => {
      if (gamma === null || beta === null) return;
      const g = Math.max(-20, Math.min(20, gamma ?? 0));
      const b = Math.max(-30, Math.min(30, beta ?? 0));
      tx.set(g * 3.2);
      ty.set(-b * 2.2);
    };
    const onOrientation = (e: DeviceOrientationEvent) =>
      setFromGyro(e.gamma ?? 0, e.beta ?? 0);
    const onPoint = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      tx.set(nx * (isCoarse ? 46 : 26));
      ty.set(ny * (isCoarse ? 34 : 18));
    };

    if (isCoarse) {
      window.addEventListener("pointermove", onPoint, { passive: true });

      const DOEvt = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<"granted" | "denied" | "default">;
      };
      const attach = () => {
        window.addEventListener("deviceorientation", onOrientation, true);
        window.addEventListener("deviceorientationabsolute", onOrientation, true);
      };
      const startListening = () => {
        if (typeof DOEvt?.requestPermission === "function") {
          DOEvt.requestPermission()
            .then((state) => {
              if (state === "granted") attach();
              console.info("[bg] gyroscope permission:", state);
            })
            .catch((err) =>
              console.info("[bg] gyroscope permission error:", err)
            );
        } else {
          attach();
        }
      };

      const needsPermission =
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DOEvt?.requestPermission === "function";
      if (!needsPermission) startListening();

      const onGesture = () => startListening();
      window.addEventListener("touchstart", onGesture, { once: true });
      window.addEventListener("click", onGesture, { once: true });
      window.addEventListener("touchend", onGesture, { once: true });

      return () => {
        window.removeEventListener("pointermove", onPoint);
        window.removeEventListener("deviceorientation", onOrientation, true);
        window.removeEventListener(
          "deviceorientationabsolute",
          onOrientation,
          true
        );
        window.removeEventListener("touchstart", onGesture);
        window.removeEventListener("click", onGesture);
        window.removeEventListener("touchend", onGesture);
      };
    }

    window.addEventListener("pointermove", onPoint, { passive: true });
    return () => window.removeEventListener("pointermove", onPoint);
  }, [tx, ty]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="aurora-sheen absolute inset-0" />
      <motion.div
        style={{ x, y, rotate, filter }}
        className="absolute -inset-[14%] overflow-hidden"
      >
        <div className="animate-aurora absolute -left-[20%] -top-[30%] h-[70vh] w-[60vw] rounded-full bg-cyan/15 blur-[120px]" />
        <div className="animate-aurora-delayed absolute -right-[25%] top-[10%] h-[65vh] w-[55vw] rounded-full bg-violet/15 blur-[120px]" />
        <div className="animate-float absolute bottom-[-15%] left-[15%] h-[50vh] w-[40vw] rounded-full bg-fuchsia/10 blur-[120px]" />
      </motion.div>
      <div className="noise absolute inset-0 opacity-[0.04] mix-blend-overlay" />
    </div>
  );
}