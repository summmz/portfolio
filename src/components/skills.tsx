"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skillCategories, techMarquee } from "@/lib/data";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const accentText: Record<string, string> = {
  cyan: "text-cyan",
  violet: "text-violet",
  fuchsia: "text-fuchsia",
};

const accentBar: Record<string, string> = {
  cyan: "from-cyan to-violet",
  violet: "from-violet to-fuchsia",
  fuchsia: "from-fuchsia to-amber",
};

const RINGS = [
  { chips: techMarquee.slice(0, 6), frac: 0.44, duration: 34, offset: 24 },
  { chips: techMarquee.slice(6, 11), frac: 0.33, duration: 26, offset: 48 },
  { chips: techMarquee.slice(11), frac: 0.22, duration: 20, offset: 72 },
];

function pointPct(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    x: 50 + Math.cos(rad) * r * 100,
    y: 50 + Math.sin(rad) * r * 100,
  };
}

function TechOrbit() {
  return (
    <div
      className="relative mx-auto mt-14 aspect-square w-[min(94vw,440px)] sm:w-[440px]"
      aria-label="Technology stack orbit"
      role="img"
    >
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-cyan shadow-[0_0_18px_rgba(34,211,238,0.9)]" />

      {RINGS.map(({ chips, frac, duration, offset }) => (
        <div key={frac} className="absolute inset-0">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-edge/50"
            style={{ width: `${frac * 100}%`, height: `${frac * 100}%` }}
          >
            <span
              className="absolute h-1.5 w-1.5 rounded-full bg-cyan/70 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              style={{
                left: `${50 + Math.cos(-Math.PI / 2) * frac * 100}%`,
                top: `${50 + Math.sin(-Math.PI / 2) * frac * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
          <div
            className="animate-spin-slower absolute inset-0"
            style={{ animationDuration: `${duration}s` }}
          >
            {chips.map((chip, i) => {
              const { x, y } = pointPct(
                frac,
                offset + (i / chips.length) * 360
              );
              return (
                <span
                  key={chip}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span
                    className="animate-spin-reverse block whitespace-nowrap rounded-full border border-edge bg-elevated/90 px-2 py-0.5 font-mono text-[10px] leading-4 text-muted transition-all duration-300 hover:border-cyan/60 hover:text-cyan hover:shadow-[0_0_16px_rgba(34,211,238,0.4)] sm:px-3 sm:py-1 sm:text-xs"
                    style={{ animationDuration: `${duration}s` }}
                  >
                    {chip}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan/30 bg-background/70 text-center backdrop-blur sm:h-28 sm:w-28">
        <span className="gradient-text font-display text-3xl font-bold sm:text-4xl">
          {techMarquee.length}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
          tech
        </span>
      </div>
    </div>
  );
}

function ChipCloud() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {techMarquee.map((tech, i) => (
        <Reveal key={tech} delay={i * 0.03}>
          <span className="rounded-full border border-edge bg-elevated px-4 py-2 font-mono text-xs text-muted">
            {tech}
          </span>
        </Reveal>
      ))}
    </div>
  );
}

function SkillLine({
  name,
  level,
  bar,
}: {
  name: string;
  level: number;
  bar: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="font-mono text-[11px] text-dim">
          {String(level).padStart(2, "0")}%
        </span>
      </div>
      <div className="h-px w-full bg-edge/60">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full origin-left bg-gradient-to-r ${bar}`}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="skills"
          title="The stack I train with."
          description="Every tool I've picked up while building real projects — same consistency rule as the gym."
        />

        {reduce ? <ChipCloud /> : <TechOrbit />}

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.1}>
              <div className="card-surface group h-full rounded-2xl p-7 transition-colors duration-300 hover:border-cyan/40">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-edge bg-elevated">
                    <Icon
                      name={cat.icon}
                      className={`h-5 w-5 ${accentText[cat.accent]}`}
                    />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {cat.title}
                  </h3>
                </div>
                <div className="space-y-5">
                  {cat.skills.map((skill) => (
                    <SkillLine
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      bar={accentBar[cat.accent]}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}