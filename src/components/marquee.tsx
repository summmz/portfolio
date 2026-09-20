function MarqueeRow({
  items,
  outline = false,
}: {
  items: string[];
  outline?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      aria-hidden
      className="relative z-[1] overflow-hidden border-y border-edge/40 bg-surface/30 py-5 backdrop-blur-sm"
    >
      <div className="-mx-[2%] -rotate-[1.5deg] scale-[1.02]">
        <div className="animate-marquee flex w-max items-center gap-12">
          {doubled.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-12">
              <span
                className={`font-display whitespace-nowrap text-5xl font-bold uppercase tracking-tight sm:text-7xl ${
                  outline ? "text-outline" : "text-foreground/15"
                }`}
              >
                {item}
              </span>
              <span
                className={`h-3 w-3 shrink-0 rounded-full ${
                  outline ? "bg-cyan/50" : "bg-edge"
                }`}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Marquee({
  items,
  outline = false,
}: {
  items: string[];
  outline?: boolean;
}) {
  return <MarqueeRow items={items} outline={outline} />;
}