"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const hashes = ["a3f9c21", "b7e2d18", "c1d6a04", "e501b9f"];

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="journey"
          title="Commit log."
          description="From first commit to deployed products — a student dev's journey on master, one consistent push at a time."
        />

        <Reveal>
          <div className="overflow-x-auto rounded-xl border border-edge bg-surface/80 font-mono text-xs text-muted sm:text-sm">
            <div className="flex items-center gap-2 border-b border-edge px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-amber-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-dim">sumit@portfolio: ~/journey</span>
            </div>
            <p className="px-4 py-4 leading-relaxed">
              <span className="text-dim">$</span>{" "}
              <span className="text-cyan">git log</span> --oneline
              {"\u00A0"}--author=<span className="text-violet">&quot;sumit&quot;</span>
              {"\u00A0"}--journey
              <span className="ml-1 inline-block h-3.5 w-2 translate-y-0.5 animate-pulse bg-cyan/80" />
            </p>
          </div>
        </Reveal>

        <div className="relative mt-12">
          <span
            aria-hidden
            className="absolute bottom-4 left-[15px] top-4 w-px bg-edge"
          />
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-4 left-[15px] top-4 w-px origin-top bg-gradient-to-b from-cyan via-violet to-amber shadow-[0_0_12px_rgba(34,211,238,0.5)]"
          />

          <ol className="space-y-8">
            {experiences.map((exp, i) => (
              <li key={exp.company} className="relative pl-12 sm:pl-14">
                <span
                  aria-hidden
                  className="absolute left-[8px] top-7 flex h-[15px] w-[15px] items-center justify-center"
                >
                  <span className="absolute h-full w-full rounded-full bg-cyan/30 blur-[6px]" />
                  <span className="relative h-[9px] w-[9px] rounded-full border-2 border-cyan bg-background" />
                </span>

                <Reveal delay={0.05}>
                  <article className="card-surface group relative overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-cyan/40 sm:p-7">
                    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] sm:text-xs">
                      <span className="text-cyan">commit {hashes[i]}</span>
                      <span className="text-dim">— {exp.period}</span>
                      <span className="text-violet">[{exp.company}]</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                      {exp.role}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {exp.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {exp.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 font-mono text-[13px] leading-relaxed text-muted"
                        >
                          <span className="text-violet">▸</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-edge bg-elevated px-3 py-1 font-mono text-[11px] text-dim transition-colors duration-300 group-hover:text-cyan"
                        >
                          --{tag.toLowerCase()}
                        </span>
                      ))}
                      <span className="rounded-full border border-lime/40 bg-lime/10 px-3 py-1 font-mono text-[11px] text-lime">
                        ok
                      </span>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}