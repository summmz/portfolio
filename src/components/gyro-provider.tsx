"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MotionValue } from "framer-motion";

type GyroContextValue = {
  gx: MotionValue<number>;
  gy: MotionValue<number>;
  enabled: boolean;
  request: () => void;
};

const GyroContext = createContext<GyroContextValue | null>(null);

export function useGyro() {
  const ctx = useContext(GyroContext);
  if (!ctx) throw new Error("useGyro must be used within <GyroProvider>");
  return ctx;
}

type PermState = "hidden" | "idle" | "granted" | "denied";

export function GyroProvider({ children }: { children: ReactNode }) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const gx = useSpring(rawX, { stiffness: 80, damping: 16, mass: 0.5 });
  const gy = useSpring(rawY, { stiffness: 80, damping: 16, mass: 0.5 });
  const [enabled, setEnabled] = useState(false);
  const [gate, setGate] = useState<PermState>("hidden");
  const [readout, setReadout] = useState("");
  const requestRef = useRef<() => void>(() => undefined);
  const lastRead = useRef(0);
  const baseRef = useRef<{ g: number; b: number } | null>(null);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    const tilt = (gamma: number, beta: number) => {
      if (!baseRef.current) baseRef.current = { g: gamma, b: beta };
      const base = baseRef.current;
      const dg = Math.max(-14, Math.min(14, gamma - base.g));
      const db = Math.max(-18, Math.min(18, beta - base.b));
      rawX.set(dg * 2.2);
      rawY.set(-db * 1.5);

      const now = performance.now();
      if (now - lastRead.current > 120) {
        lastRead.current = now;
        setReadout(`d${dg.toFixed(1)}° d${db.toFixed(1)}°`);
      }
    };
    const onOrientation = (e: DeviceOrientationEvent) =>
      tilt(e.gamma ?? 0, e.beta ?? 0);

    const onPoint = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      rawX.set(nx * (isCoarse ? 18 : 26));
      rawY.set(ny * (isCoarse ? 14 : 18));
    };

    let resetTimeout = 0;
    const onReshape = () => {
      rawX.set(0);
      rawY.set(0);
      baseRef.current = null;
      resetTimeout = window.setTimeout(() => {
        baseRef.current = null;
      }, 1000);
    };
    window.addEventListener("orientationchange", onReshape);
    window.visualViewport?.addEventListener("resize", onReshape);

    const DOEvt = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied" | "default">;
    };
    const needsPermission =
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DOEvt?.requestPermission === "function";

    const attach = () => {
      window.addEventListener("deviceorientation", onOrientation, true);
      window.addEventListener(
        "deviceorientationabsolute",
        onOrientation,
        true
      );
      setEnabled(true);
      setGate("granted");
    };

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
        window.clearTimeout(resetTimeout);
        window.removeEventListener("orientationchange", onReshape);
        window.visualViewport?.removeEventListener("resize", onReshape);
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
    return () => {
      window.clearTimeout(resetTimeout);
      window.removeEventListener("orientationchange", onReshape);
      window.visualViewport?.removeEventListener("resize", onReshape);
      window.removeEventListener("pointermove", onPoint);
    };
  }, [rawX, rawY]);

  return (
    <GyroContext.Provider value={{ gx, gy, enabled, request: () => requestRef.current() }}>
      {children}

      {gate === "idle" && (
        <motion.button
          type="button"
          onClick={() => requestRef.current()}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full border border-cyan/40 bg-background/80 px-4 py-2 font-mono text-xs text-cyan backdrop-blur transition-colors hover:border-cyan"
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 animate-ping rounded-full bg-cyan" />
          Tap to enable motion effects
        </motion.button>
      )}

      {gate === "denied" && (
        <motion.button
          type="button"
          onClick={() => requestRef.current()}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full border border-amber/40 bg-background/80 px-4 py-2 font-mono text-xs text-amber backdrop-blur transition-colors hover:border-amber"
        >
          Motion blocked — tap to retry
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
    </GyroContext.Provider>
  );
}