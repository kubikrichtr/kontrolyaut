import { Car } from "lucide-react";

/** Deterministický "vygenerovaný" vizuál pro články bez vlastní úvodní fotky. */
function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h;
}

const PALETTES = [
  "from-primary/90 via-primary/70 to-primary/40",
  "from-primary via-primary/60 to-secondary/50",
  "from-secondary/80 via-primary/70 to-primary/95",
  "from-primary/80 via-secondary/60 to-primary/50",
];

export function BlogCover({
  title,
  category,
  className = "",
}: {
  title: string;
  category?: string | null;
  className?: string;
}) {
  const h = hash(title);
  const palette = PALETTES[h % PALETTES.length];
  const angle = h % 360;

  return (
    <div
      role="img"
      aria-label={`Ilustrační obrázek k článku: ${title}`}
      className={`relative flex h-full w-full items-end overflow-hidden bg-gradient-to-br ${palette} ${className}`}
    >
      <div
        aria-hidden
        className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/15 blur-2xl"
        style={{ transform: `rotate(${angle}deg)` }}
      />
      <div aria-hidden className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <Car aria-hidden className="absolute right-4 top-4 h-10 w-10 text-primary-foreground/40" />
      <div className="relative z-10 p-5">
        {category && (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/70">
            {category}
          </span>
        )}
        <p className="mt-1 line-clamp-3 text-lg font-bold leading-snug text-primary-foreground">{title}</p>
      </div>
    </div>
  );
}
