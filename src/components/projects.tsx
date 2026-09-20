"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, MoveRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";

function handleMouseMove(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — open project`}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group card-surface relative flex h-full w-full flex-col overflow-hidden rounded-3xl p-7 transition-colors duration-300 hover:border-cyan/50"
      style={{ "--x": "0px", "--y": "0px" } as CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--x) var(--y), rgba(34,211,238,0.12), transparent 70%)",
        }}
      />

      <div className="mb-8 flex items-start justify-between">
        <span className="font-mono text-5xl font-semibold text-foreground/10 transition-colors duration-300 group-hover:text-cyan/25 sm:text-6xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-edge bg-elevated transition-all duration-500 group-hover:scale-110 group-hover:border-cyan/50 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.35)]">
          <Icon name={project.icon} className="h-5 w-5 text-cyan" />
        </span>
      </div>

      <h3 className="font-display text-2xl font-semibold text-foreground transition-colors group-hover:text-cyan">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-edge bg-elevated px-3 py-1 font-mono text-[11px] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-dim transition-colors group-hover:text-cyan">
        View on GitHub
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </motion.a>
  );
}

function Heading() {
  return (
    <div>
      <p className="mb-3 font-mono text-sm text-cyan">
        <span className="text-dim">{"//"}</span> 03 / selected work
      </p>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Scroll to fly
          <br />
          through the work
          <span className="text-cyan">.</span>
        </h2>
        <a
          href="https://github.com/summmz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-edge bg-elevated px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-cyan/50 hover:text-foreground"
        >
          All projects
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function CloseCard() {
  return (
    <a href="#contact" className="group flex flex-col items-center gap-3 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full border border-edge bg-elevated transition-all duration-300 group-hover:border-cyan/60 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
        <ArrowRight className="h-7 w-7 text-cyan transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span className="font-display text-xl font-semibold text-foreground group-hover:text-cyan">
        Your project here?
      </span>
      <span className="text-sm text-muted">Let&apos;s make it real.</span>
    </a>
  );
}

export function Projects() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);

  if (reduce) {
    return (
      <section id="projects" className="relative scroll-mt-24 py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-10">
          <Heading />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={(i % 2) * 0.1}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative scroll-mt-24"
      aria-label="Selected projects"
    >
      {/* Desktop: scrubbed horizontal rail */}
      <div ref={ref} className="hidden md:block" style={{ height: "360vh" }}>
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-10">
            <Reveal>
              <Heading />
            </Reveal>

            <motion.div style={{ x }} className="mt-12 flex gap-6">
              {projects.map((project, i) => (
                <div
                  key={project.title}
                  className="w-[78vw] shrink-0 sm:w-[420px]"
                  aria-label={project.title}
                >
                  <ProjectCard project={project} index={i} />
                </div>
              ))}
              <div className="flex w-[320px] shrink-0 items-center justify-center sm:w-[420px]">
                <CloseCard />
              </div>
            </motion.div>

            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="mx-auto mt-10 h-px w-[min(60vw,420px)] origin-left bg-gradient-to-r from-cyan via-violet to-fuchsia"
            />
          </div>
        </div>
      </div>

      {/* Mobile / tablet: native swipe carousel */}
      <div className="mx-auto max-w-6xl px-5 py-24 md:hidden">
        <Reveal>
          <Heading />
        </Reveal>

        <div
          className="mt-10 -mr-5 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="w-[80vw] max-w-sm shrink-0 snap-center"
              aria-label={project.title}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
          <div className="flex w-[60vw] max-w-[240px] shrink-0 snap-center items-center justify-center">
            <CloseCard />
          </div>
        </div>

        <p className="mt-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
          <MoveRight className="h-3.5 w-3.5 text-cyan" />
          swipe through the work
        </p>
      </div>
    </section>
  );
}