"use client";

import { useEffect, useState } from "react";

const rail = [
  { index: "01", label: "about", href: "#about" },
  { index: "02", label: "skills", href: "#skills" },
  { index: "03", label: "projects", href: "#projects" },
  { index: "04", label: "journey", href: "#experience" },
  { index: "05", label: "notes", href: "#blog" },
  { index: "06", label: "contact", href: "#contact" },
];

export function SectionRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ids = rail.map((r) => r.href.slice(1));
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let current = 0;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) current = i;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:flex xl:right-6"
    >
      <div className="flex flex-col items-end gap-4">
        {rail.map((item, i) => {
          const isActive = active === i;
          return (
            <a
              key={item.href}
              href={item.href}
              data-cursor="GO"
              className="group relative flex items-center gap-3"
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={`font-mono text-[11px] transition-all duration-300 ${
                  isActive
                    ? "text-cyan"
                    : "text-dim/70 group-hover:text-muted"
                }`}
              >
                {isActive ? item.label : item.index}
              </span>
              <span
                className={`relative h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "border-cyan bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.9)]"
                    : "border-edge bg-elevated group-hover:border-cyan/60"
                }`}
              />
              {isActive && (
                <span className="absolute -right-3 h-full w-px bg-gradient-to-b from-cyan/80 to-violet/50" />
              )}
            </a>
          );
        })}
        <span className="mt-2 h-10 w-px bg-gradient-to-b from-cyan/40 to-transparent" />
      </div>
    </nav>
  );
}