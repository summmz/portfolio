"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

type PermState = "hidden" | "idle" | "granted" | "denied";

export function Background() {
  const { scrollYProgress } = useScroll();
  const hue = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const filter = useTransform(hue, (h) => `hue-rotate(${h}deg)`);

  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const x = useSpring(tx, { stiffness: 80, damping: 16, mass: 0.5 });
  const y = useSpring(ty, { stiffness: 80, damping: 16, mass: 0.5 });
  const rotate = useTransform(tx, (v) => v * 0.3);

  const attachRef = useRef<() => void>(() => undefined);
  const requestRef = useRef<() => void>(() => undefined);
  const lastRead = useRef(0);
  const [gate, setGate] = useState<PermState>("hidden");
  const [readout, setReadout] = useState("");

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    const setFromGyro = (gamma: number, beta: number) => {
      const g = Math.max(-18, Math.min(18, gamma));
      const b = Math.max(-26, Math.min(26, beta));
      tx.set(g * 5);
      ty.set(-b * 3.4);
    };
    const onOrientation = (e: DeviceOrientationEvent) => {
      const g = e.gamma ?? 0;
      const b = e.beta ?? 0;
      setFromGyro(g, b);
      const now = performance.now();
      if (now - lastRead.current > 120) {
        lastRead.current = now;
        setReadout(`g ${g.toFixed(1)}° b ${b.toFixed(1)}°`);
      }
    };
    const onPoint = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      tx.set(nx * (isCoarse ? 46 : 26));
      ty.set(ny * (isCoarse ? 34 : 18));
    };

    const attach = () => {
      window.addEventListener("deviceorientation", onOrientation, true);
      window.addEventListener(
        "deviceorientationabsolute",
        onOrientation,
        true
      );
      setGate("granted");
    };
    attachRef.current = attach;

    const DOEvt = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied" | "default">;
    };
    const needsPermission =
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DOEvt?.requestPermission === "function";

    const doRequest = () => {
      if (!needsPermission) {
        attach();
        return;
      }
      DOEvt.requestPermission!()
        .then((state) => {
          if (state === "granted") {
            attach();
            setGate("granted");
          } else {
            setGate("denied");
          }
        })
        .catch(() => setGate("denied"));
    };
    requestRef.current = doRequest;

    if (isCoarse) {
      window.addEventListener("pointermove", onPoint, { passive: true });

      let rafId = 0;
      if (!needsPermission) {
        doRequest();
      } else {
        rafId = window.requestAnimationFrame(() => setGate("idle"));
      }

      const onGesture = () => doRequest();
      window.addEventListener("touchstart", onGesture, { once: true });
      window.addEventListener("click", onGesture, { once: true });
      window.addEventListener("touchend", onGesture, { once: true });

      return () => {
        if (rafId) window.cancelAnimationFrame(rafId);
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
    <>
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

      {gate !== "hidden" && gate !== "granted" && (
        <motion.button
          type="button"
          onClick={() => requestRef.current()}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full border border-cyan/40 bg-background/80 px-4 py-2 font-mono text-xs text-cyan backdrop-blur transition-colors hover:border-cyan"
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 animate-ping rounded-full bg-cyan" />
          {gate === "denied"
            ? "Motion blocked — tap to retry"
            : "Tap to enable motion effects"}
        </motion.button>
      )}

      {gate === "granted" && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none fixed bottom-5 left-4 z-40 font-mono text-[10px] tracking-tight text-dim"
        >
          {readout || "gyro — waiting"} gyro ✓
        </motion.span>
      )}
    </>
  );
}