"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, Code2, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

function Counter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="gradient-text font-mono text-2xl font-bold sm:text-3xl">
        {display.toLocaleString()}
        {suffix}
      </span>
      <span className="text-[11px] uppercase tracking-wider text-dim">
        {label}
      </span>
    </div>
  );
}

function BioWord({
  progress,
  index,
  total,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: string;
}) {
  const reduce = useReducedMotion();
  const start = index / total;
  const end = Math.min(1, (index + 1) / total);
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  const color = useTransform(progress, [start, end], ["#5e6a8c", "#eef1fb"]);

  if (reduce) {
    return <span className="text-foreground/80">{children} </span>;
  }

  return (
    <motion.span style={{ opacity, color }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

function ScrollBio() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });

  const text = `${profile.bio[0]} ${profile.bio[1]}`;
  const words = text.split(" ");

  return (
    <motion.p
      ref={ref}
      className="font-display text-xl font-semibold leading-relaxed tracking-tight text-foreground sm:text-2xl"
    >
      {words.map((word, i) => (
        <BioWord
          key={`${word}-${i}`}
          progress={scrollYProgress}
          index={i}
          total={words.length}
        >
          {word}
        </BioWord>
      ))}
      {!reduce && (
        <span className="gradient-text inline-block h-[1em] w-[3px] translate-y-1 bg-cyan" />
      )}
    </motion.p>
  );
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              index="01"
              eyebrow="about"
              title="Learning by building."
            />
            <Reveal delay={0.1}>
              <ScrollBio />
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full border border-edge bg-elevated px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-violet/60 hover:shadow-[0_0_18px_rgba(167,139,250,0.25)]"
                >
                  See what I&apos;ve built
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground"
                >
                  <MapPin className="h-4 w-4 text-cyan" />
                  {profile.location}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="animate-glow-pulse relative mx-auto max-w-md rounded-[1.25rem]">
              <div className="animated-border">
                <div className="relative overflow-hidden rounded-[calc(1.25rem-1px)] bg-surface/90 p-6 sm:p-7">
                  <div className="animate-scan pointer-events-none absolute inset-x-6 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />

                  <div className="mb-6 flex items-center justify-between border-b border-edge/60 pb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
                    <span>
                      HOLO/<span className="text-cyan">PROFILE</span>
                    </span>
                    <span className="text-cyan">PRT-2026</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                      <span className="absolute inset-0 animate-ping rounded-full bg-cyan/20" />
                      <span className="gradient-text relative flex h-16 w-16 items-center justify-center rounded-full border border-cyan/40 bg-background font-display text-2xl font-bold">
                        S
                      </span>
                    </span>
                    <div>
                      <p className="font-display text-2xl font-bold text-foreground">
                        {profile.firstName}
                      </p>
                      <a
                        href="https://github.com/summmz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-sm text-cyan transition-opacity hover:opacity-80"
                      >
                        <Code2 className="h-3.5 w-3.5" />
                        @summmz
                      </a>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-lime">
                        <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                        {profile.availability}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-edge/60 pt-6">
                    {profile.stats.map((stat) => (
                      <Counter
                        key={stat.label}
                        value={stat.value}
                        suffix={stat.suffix}
                        label={stat.label}
                      />
                    ))}
                  </div>

                  <p className="mt-6 flex items-center gap-2 font-mono text-[11px] text-dim">
                    <Sparkles className="h-3.5 w-3.5 text-violet" />
                    TRACE:// consistency beats motivation
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}