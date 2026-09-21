import { ArrowUp, AtSign, Camera, Code2, Heart, Palette, Share2, type LucideIcon } from "lucide-react";
import { navLinks, profile } from "@/lib/data";

const socialIcons: Record<string, LucideIcon> = {
  GitHub: Code2,
  LinkedIn: Share2,
  X: AtSign,
  Dribbble: Palette,
  Instagram: Camera,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-edge/60 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <a href="#home" className="font-display text-xl font-bold tracking-tight">
            <span className="gradient-text">{`${profile.name}`}</span>
            <span className="text-cyan">.</span>
          </a>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {profile.tagline}
          </p>
          <p className="mt-3 font-mono text-xs text-dim">
            © {year} {profile.name}. All rights reserved.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-dim">
            Sitemap
          </p>
          <ul className="grid grid-cols-2 gap-x-12 gap-y-2.5 md:grid-cols-1 md:gap-x-0 md:gap-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-cyan"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-dim">
            Elsewhere
          </p>
          <div className="flex gap-3">
            {profile.socials.map(({ label, href }) => {
              const IconComp = socialIcons[label] ?? Code2;
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-edge bg-elevated/40 text-muted transition-all duration-300 hover:border-cyan/60 hover:text-cyan hover:shadow-[0_0_16px_rgba(34,211,238,0.25)]"
                >
                  <IconComp className="h-4.5 w-4.5" />
                </a>
              );
            })}
          </div>
        </div>

        <a
          href="#home"
          aria-label="Back to top"
          className="group flex h-11 w-11 items-center justify-center self-start rounded-full border border-edge bg-elevated/40 text-muted transition-all duration-300 hover:border-cyan/60 hover:text-foreground hover:shadow-[0_0_16px_rgba(34,211,238,0.25)] md:self-auto"
        >
          <ArrowUp className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-edge/40 pt-6 text-xs text-dim">
          <span className="flex items-center gap-1.5">
            Crafted with
            <Heart className="h-3.5 w-3.5 text-fuchsia" />
            using Next.js, Tailwind & Framer Motion
          </span>
          <span className="font-mono">
            v1.0.0 — <span className="text-muted">deploy anytime</span>
          </span>
        </div>
      </div>
    </footer>
  );
}