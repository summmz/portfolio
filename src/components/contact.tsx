"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MapPin,
} from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal } from "@/components/reveal";

const inputClasses =
  "w-full rounded-xl border border-edge bg-elevated/60 px-4 py-3.5 text-sm text-foreground placeholder:text-dim outline-none transition-all duration-300 focus:border-cyan/60 focus:shadow-[0_0_16px_rgba(34,211,238,0.15)]";

const BIG = "text-[clamp(4rem,16vw,10.5rem)] font-display font-extrabold uppercase tracking-tight leading-[0.9]";

function FillHeadline() {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.55"],
  });
  const bgPosition = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["200%", "0%"]
  );

  return (
    <div className="font-display font-extrabold uppercase tracking-tight leading-[0.92]">
      <span className="text-outline block text-[clamp(3rem,12vw,8rem)]">
        Let&apos;s
      </span>
      <span ref={ref} className="relative block">
        <span
          aria-hidden
          className={`text-outline block ${BIG}`}
        >
          Build
        </span>
        <motion.span
          aria-hidden
          className={`absolute left-0 top-0 block ${BIG}`}
          style={{
            backgroundImage:
              "linear-gradient(90deg, #22d3ee 0%, #a78bfa 55%, #f472b6 80%)",
            backgroundSize: "200% 100%",
            backgroundPositionX: bgPosition,
            color: "transparent",
            WebkitBackgroundClip: "text",
          }}
        >
          Build
        </motion.span>
      </span>
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1200);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-dim">
            <span className="h-px w-10 bg-cyan/50" />
            <span>
              {"// 06 / "}
              <span className="text-cyan">contact</span>
            </span>
          </div>
          <div className="mt-6">
            <FillHeadline />
          </div>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <Reveal delay={0.1}>
              <p className="max-w-md text-lg leading-relaxed text-muted">
                Have an idea, a role to fill, or just want to talk shop? My
                inbox is open — same energy I bring to a build.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div
                  className="mt-8 flex items-center gap-4 rounded-2xl border border-edge bg-elevated/40 p-5 transition-colors duration-300 hover:border-cyan/50"
                >
                  <a
                    href={`mailto:${profile.email}`}
                    data-cursor="MAIL"
                    className="group flex min-w-0 flex-1 items-center gap-4"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-edge bg-background">
                      <Mail className="h-5 w-5 text-cyan" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-dim">
                        Email me at
                      </span>
                      <span className="block truncate font-mono text-sm text-foreground transition-colors group-hover:text-cyan">
                        {profile.email}
                      </span>
                    </span>
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    data-cursor="MAIL"
                    aria-label="Open mail app"
                    className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-edge text-dim transition-colors hover:border-cyan/60 hover:text-cyan sm:flex"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    data-cursor="COPY"
                    onClick={() => {
                      navigator.clipboard
                        ?.writeText(profile.email)
                        .then(() => {
                          window.dispatchEvent(
                            new CustomEvent("app:copy", {
                              detail: { message: "email copied to clipboard" },
                            })
                          );
                        })
                        .catch(() => undefined);
                    }}
                    aria-label="Copy email"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-edge bg-elevated text-dim transition-colors hover:border-cyan/60 hover:text-cyan"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-4 flex items-center gap-4 rounded-2xl border border-edge bg-elevated/40 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-edge bg-background">
                  <MapPin className="h-5 w-5 text-violet" />
                </span>
                <span>
                  <span className="block text-xs text-dim">Based in</span>
                  <span className="text-sm font-medium text-foreground">
                    {profile.location}
                  </span>
                </span>
                <span className="ml-auto flex items-center gap-2 rounded-full border border-lime/40 bg-lime/10 px-3 py-1 font-mono text-[11px] text-lime">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
                  {profile.availability}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-6 flex flex-wrap gap-3">
                {profile.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-edge bg-elevated/40 px-4 py-2 text-sm text-muted transition-all duration-300 hover:border-fuchsia/50 hover:text-foreground hover:shadow-[0_0_16px_rgba(244,114,182,0.15)]"
                  >
                    {social.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="animate-glow-pulse relative rounded-[1.25rem]">
              <div className="animated-border">
                <form
                  onSubmit={handleSubmit}
                  className="relative overflow-hidden rounded-[calc(1.25rem-1px)] bg-surface/95 p-7 sm:p-9"
                >
                  <div
                    aria-hidden
                    className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan/15 blur-3xl"
                  />
                  <div className="relative">
                    <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
                      <span className="text-cyan">&gt;</span> new_transmission
                    </p>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block font-mono text-xs uppercase tracking-wider text-dim"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          required
                          placeholder="Jane Doe"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block font-mono text-xs uppercase tracking-wider text-dim"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="jane@company.com"
                          className={inputClasses}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="message"
                          className="mb-2 block font-mono text-xs uppercase tracking-wider text-dim"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          placeholder="Tell me about your project..."
                          className={`${inputClasses} resize-none`}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <motion.button
                          type="submit"
                          disabled={status !== "idle"}
                          whileTap={{ scale: 0.97 }}
                          className="relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan via-violet to-fuchsia px-6 py-4 text-sm font-semibold text-background transition-opacity disabled:opacity-80"
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {status === "sending" ? (
                              <motion.span
                                key="sending"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="flex items-center gap-2"
                              >
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Sending...
                              </motion.span>
                            ) : status === "sent" ? (
                              <motion.span
                                key="sent"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                                Message sent — thanks!
                              </motion.span>
                            ) : (
                              <motion.span
                                key="idle"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="flex items-center gap-2 text-white"
                              >
                                Send message
                                <ArrowUpRight className="h-4 w-4" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}