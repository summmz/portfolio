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

const SIZE = 460;
const CENTER = SIZE / 2;

const rings = [
  { chips: techMarquee.slice(0, 6), radius: 200, duration: 34, ring: 0 },
  { chips: techMarquee.slice(6, 11), radius: 145, duration: 26, ring: 1 },
  { chips: techMarquee.slice(11), radius: 95, duration: 20, ring: 2 },
];

function anglePoint(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function TechOrbit() {
  return (
    <div
      className="relative mx-auto hidden h-[460px] w-[460px] md:block"
      aria-label="Technology stack orbit"
      role="img"
    >
      <div className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-cyan shadow-[0_0_18px_rgba(34,211,238,0.9)]" />

      {rings.map(({ radius, chips, duration, ring }) => {
        const center = {
          x: CENTER + radius * Math.cos(-Math.PI / 2),
          y: CENTER + radius * Math.sin(-Math.PI / 2),
        };
        return (
          <div key={ring} className="absolute inset-0">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-edge/50"
              style={{ width: radius * 2, height: radius * 2 }}
            >
              <span
                className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-cyan/70 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                style={{
                  left: center.x - 4,
                  top: center.y - 4,
                }}
              />
            </div>
            <div
              className="animate-spin-slower absolute inset-0"
              style={{ animationDuration: `${duration}s` }}
            >
              {chips.map((chip, i) => {
                const { x, y } = anglePoint(
                  SIZE / 2,
                  SIZE / 2,
                  radius,
                  (i / chips.length) * 360
                );
                return (
                  <span
                    key={chip}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: x, top: y }}
                  >
                    <span
                      className="animate-spin-reverse block whitespace-nowrap rounded-full border border-edge bg-elevated/90 px-3 py-1.5 font-mono text-xs text-muted shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:border-cyan/60 hover:text-cyan hover:shadow-[0_0_16px_rgba(34,211,238,0.4)]"
                      style={{ animationDuration: `${duration}s` }}
                    >
                      {chip}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-28 w-28 flex-col items-center justify-center rounded-full border border-cyan/30 bg-background/70 text-center backdrop-blur">
        <span className="gradient-text font-display text-4xl font-bold">
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
    <div className="flex flex-wrap justify-center gap-3 md:hidden">
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
        <div className="md:hidden">
          <ChipCloud />
        </div>

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