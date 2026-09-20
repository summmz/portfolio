"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { navLinks, profile } from "@/lib/data";

type Item = { label: string; hint: string; href: string; group: string };

const items: Item[] = [
  ...navLinks.map((l) => ({
    label: l.label,
    hint: l.href,
    href: l.href,
    group: "Navigate",
  })),
  {
    label: "Email me",
    hint: profile.email,
    href: `mailto:${profile.email}`,
    group: "Actions",
  },
  {
    label: "Hire me",
    hint: "#contact",
    href: "#contact",
    group: "Actions",
  },
  {
    label: "GitHub",
    hint: profile.socials[0]?.href ?? "",
    href: profile.socials[0]?.href ?? "#contact",
    group: "Actions",
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setActive(0);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      `${it.label} ${it.hint}`.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setActive(0);
      }
    };
    const onLauncher = () => {
      setOpen(true);
      setQuery("");
      setActive(0);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("app:palette-toggle", onLauncher as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(
        "app:palette-toggle",
        onLauncher as EventListener
      );
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const target = filtered[active];
        if (target) window.location.href = target.href;
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, active, filtered]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-background/70 pt-[18vh] backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 14, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 14, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 24, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="w-[min(92vw,30rem)] overflow-hidden rounded-2xl border border-edge bg-surface/95 shadow-[0_0_60px_rgba(34,211,238,0.12)]"
          >
            <div className="flex items-center gap-3 border-b border-edge px-4 py-3.5">
              <Search className="h-4 w-4 text-dim" />
              <input
                autoFocus
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Type a section or command…"
                className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-dim outline-none"
              />
              <kbd className="rounded border border-edge bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-dim">
                esc
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-8 text-center font-mono text-sm text-dim">
                  no matches — keep typing
                </li>
              )}
              {filtered.map((item, i) => (
                <li key={item.href + item.label}>
                  <a
                    href={item.href}
                    data-cursor="GO"
                    onClick={() => setOpen(false)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ${
                      active === i ? "bg-cyan/10" : ""
                    }`}
                  >
                    <span
                      className={`flex items-center gap-3 text-sm ${
                        active === i ? "text-cyan" : "text-foreground/80"
                      }`}
                    >
                      {active === i && (
                        <span className="font-mono text-[10px] text-cyan">
                          &gt;
                        </span>
                      )}
                      {item.label}
                      <span className="text-[11px] text-dim">
                        {item.group}
                      </span>
                    </span>
                    <span className="font-mono text-[11px] text-dim">
                      {item.hint}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="border-t border-edge px-4 py-2.5 font-mono text-[10px] text-dim">
              &uarr;&darr; navigate&ensp;·&ensp;enter open&ensp;·&ensp;may
              the best commit win
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}