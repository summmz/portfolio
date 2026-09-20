"use client";

import { Pause, Play } from "lucide-react";
import { posts } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const tagColors: Record<string, string> = {
  "Build log": "text-cyan border-cyan/40 bg-cyan/10",
  Backend: "text-violet border-violet/40 bg-violet/10",
  Learning: "text-amber border-amber/40 bg-amber/10",
  "Wins & habits": "text-lime border-lime/40 bg-lime/10",
};

function Equalizer() {
  const bars = [0, 0.18, 0.36, 0.54];
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden>
      {bars.map((delay, i) => (
        <span
          key={i}
          className="animate-eq w-[3px] origin-bottom rounded-sm bg-gradient-to-t from-cyan to-violet"
          style={{ animationDelay: `${delay}s`, height: `${12 + (i % 2) * 4}px` }}
        />
      ))}
    </span>
  );
}

export function Blog() {
  return (
    <section id="blog" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="notes"
          title="Notes & writing."
          description="Build logs, database debates and study plans — my dev playlist, one track at a time."
        />

        <Reveal>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-edge bg-surface/70 backdrop-blur">
            <div className="flex items-center justify-between gap-4 border-b border-edge px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <Equalizer />
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
                  NOW PLAYING —{" "}
                  <span className="text-cyan">NOTES.WAV</span>
                </p>
              </div>
              <span className="font-mono text-[11px] text-dim">
                {String(posts.length).padStart(2, "0")} tracks
              </span>
            </div>

            <ol className="divide-y divide-edge/60">
              {posts.map((post, i) => (
                <li key={post.title}>
                  <div className="group flex cursor-pointer items-center gap-4 px-5 py-5 transition-colors duration-300 hover:bg-elevated/50 sm:gap-6 sm:px-6">
                    <span className="w-8 shrink-0 font-mono text-sm text-dim transition-colors group-hover:text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan/40 text-cyan transition-all duration-300 group-hover:border-cyan group-hover:shadow-[0_0_16px_rgba(34,211,238,0.35)] sm:flex">
                      <span className="relative">
                        <Play className="h-4 w-4 transition-opacity duration-150 group-hover:opacity-0" />
                        <Pause className="absolute inset-0 h-4 w-4 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-display text-base font-semibold text-foreground transition-colors group-hover:text-cyan sm:text-lg">
                        {post.title}
                      </h3>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-dim">
                        <span>{post.date}</span>
                        <span className="hidden sm:inline">·</span>
                        <span className="hidden sm:inline">{post.readTime}</span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 ${tagColors[post.tag] ?? "text-muted border-edge bg-elevated"}`}
                        >
                          {post.tag}
                        </span>
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-dim transition-colors group-hover:text-cyan">
                      {post.readTime}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}