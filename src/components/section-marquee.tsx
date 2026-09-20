"use client";

function Half({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 items-center gap-12">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex shrink-0 items-center gap-12">
          <span className="text-outline whitespace-nowrap font-display text-[clamp(3rem,10vw,7.5rem)] font-extrabold uppercase leading-none tracking-tight">
            {label}
          </span>
          <span
            className="h-2.5 w-2.5 rounded-full bg-cyan/80"
            style={{ boxShadow: "0 0 14px rgba(34,211,238,0.9)" }}
          />
        </div>
      ))}
    </div>
  );
}

export function SectionMarquee({
  label,
  rotate = 0,
}: {
  label: string;
  rotate?: number;
}) {
  return (
    <div
      aria-hidden
      className="relative w-full overflow-hidden border-y border-edge/40 py-6"
    >
      <div style={{ transform: `rotate(${rotate}deg) scale(1.06)` }}>
        <div className="animate-marquee flex w-max">
          <Half label={label} />
          <Half label={label} />
        </div>
      </div>
    </div>
  );
}