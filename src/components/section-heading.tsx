import { Reveal } from "@/components/reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-14">
      <Reveal>
        <p className="mb-3 font-mono text-sm text-cyan">
          <span className="text-dim">{"//"}</span> {index} / {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  );
}