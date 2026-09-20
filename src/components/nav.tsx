"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X, ArrowUpRight, Search } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { Magnetic } from "@/components/magnetic";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const prevY = useRef(0);
  const { scrollY } = useScroll();

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("app:palette-toggle"));
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
    setHidden(latest > prevY.current && latest > 120);
    prevY.current = latest;
  });

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-edge/70 py-3"
            : "border-b border-transparent py-5"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8"
        >
          <a
            href="#home"
            className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          >
            <span className="gradient-text text-xl transition-transform duration-300 group-hover:rotate-12 inline-block">
              {profile.firstName.charAt(0)}
            </span>
            <span>{profile.firstName}</span>
            <span className="text-cyan">.</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive =
                activeId === link.href.slice(1) ||
                (link.href === "#home" && activeId === "home");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive
                      ? "text-cyan"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.9)]"
                    />
                  )}
                </a>
              );
            })}
            <Magnetic>
              <a
                href="#contact"
                data-cursor="HIRE"
                className="ml-3 inline-flex items-center gap-1 rounded-full border border-edge bg-elevated px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:border-cyan/50 hover:shadow-[0_0_18px_rgba(34,211,238,0.25)]"
              >
                Hire me
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={openPalette}
              data-cursor="⌘K"
              aria-label="Open command palette"
              className="ml-2 hidden items-center gap-1.5 rounded-full border border-edge bg-elevated/60 px-3 py-2 font-mono text-[11px] text-dim transition-colors hover:border-cyan/50 hover:text-cyan sm:inline-flex lg:inline-flex"
            >
              <Search className="h-3.5 w-3.5" />
              ⌘K
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Open command palette"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-edge bg-elevated text-foreground"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-edge bg-elevated text-foreground"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-sm flex-col border-l border-edge bg-surface p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold">
                  {profile.firstName}
                  <span className="text-cyan">.</span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-edge text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-12 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                    className="font-display py-3 text-3xl font-semibold text-foreground transition-colors hover:text-cyan flex items-center justify-between border-b border-edge/60"
                  >
                    {link.label}
                    <ArrowUpRight className="h-5 w-5 text-dim" />
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto space-y-2"
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openPalette();
                  }}
                  className="group flex w-full items-center justify-between rounded-xl border border-edge bg-elevated/60 px-4 py-3 text-left transition-colors hover:border-cyan/50"
                >
                  <span className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <Search className="h-4 w-4 text-cyan" />
                    Command palette
                  </span>
                  <span className="rounded border border-edge px-1.5 py-0.5 font-mono text-[10px] text-dim">
                    ⌘K
                  </span>
                </button>
                <p className="font-mono text-xs text-dim">Get in touch</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-lg font-medium text-cyan"
                >
                  {profile.email}
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}