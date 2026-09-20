"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, MoveDownRight, Sparkles } from "lucide-react";
import { profile } from "@/lib/data";
import { Scene } from "@/components/three-scene";
import { Magnetic } from "@/components/magnetic";
import { useGyro } from "@/components/gyro-provider";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const nameContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.35 },
  },
};

const word = {
  hidden: { y: "115%", rotate: 5 },
  show: {
    y: 0,
    rotate: 0,
    transition: { duration: 0.85, ease: easeOut },
  },
};

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % profile.roles.length),
      2700
    );
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <span className="relative inline-grid overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[index]}
          initial={{ y: "115%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-115%", opacity: 0 }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="gradient-text col-start-1 row-start-1 font-semibold"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { gx, gy } = useGyro();
  const ab1x = useTransform(gx, (v) => v * 1.2);
  const ab1y = useTransform(gy, (v) => v * 0.8);
  const ab2x = useTransform(gx, (v) => v * -0.9);
  const ab2y = useTransform(gy, (v) => v * 0.7);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0">
        {!reduce ? (
          <Scene progress={scrollYProgress} />
        ) : (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div style={{ x: ab1x, y: ab1y }}>
              <div className="animate-aurora absolute -left-[15%] -top-[25%] h-[70vh] w-[60vw] rounded-full bg-cyan/15 blur-[110px]" />
            </motion.div>
            <motion.div style={{ x: ab2x, y: ab2y }}>
              <div className="animate-aurora-delayed absolute bottom-[-20%] right-[-15%] h-[65vh] w-[55vw] rounded-full bg-violet/15 blur-[110px]" />
            </motion.div>
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 45%, rgba(6,7,15,0.5), transparent 75%)",
          }}
        />
        <div className="noise absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-32 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
          className="mb-9 inline-flex items-center gap-2.5 rounded-full border border-lime/25 bg-lime/5 px-4 py-1.5 font-mono text-[11px] text-lime sm:text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          {profile.availability}
        </motion.div>

        <h1 className="font-display text-[15vw] font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl xl:text-9xl">
          <motion.span
            variants={nameContainer}
            initial="hidden"
            animate="show"
            aria-label={profile.name}
            className="block"
          >
            {profile.name.split(" ").map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="mr-[0.18em] inline-block overflow-hidden pb-2 align-bottom"
                aria-hidden
              >
                <motion.span variants={word} className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.span>
          <span
            aria-hidden
            className="mt-6 block h-[1em] text-[9vw] sm:text-5xl lg:text-6xl"
          >
            <RotatingRole />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: easeOut }}
          className="mt-10 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: easeOut }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href="#projects"
              data-cursor="WORK"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              See the work
              <MoveDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              data-cursor="SAY HI"
              className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface/50 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors duration-300 hover:border-violet/60 hover:text-violet"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-dim"
        >
          <span className="flex items-center gap-2 text-muted">
            <Sparkles className="h-3.5 w-3.5 text-cyan" />
            {profile.location}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-dim sm:block" />
          <span>
            {new Date().getFullYear()} — building in{" "}
            <span className="text-lime">real-time</span>
          </span>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-dim transition-colors hover:text-cyan"
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}