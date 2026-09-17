import type { ReactNode } from "react";

interface LegalSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface LegalPageProps {
  title: string;
  intro: string;
  updated?: string;
  sections: LegalSection[];
  children?: ReactNode;
}

export function LegalPage({ title, intro, updated, sections, children }: LegalPageProps) {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <span className="text-xs font-semibold tracking-wider uppercase text-primary">Právní informace</span>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">{intro}</p>
        {updated && <p className="mt-2 text-sm text-muted-foreground">Poslední aktualizace: {updated}</p>}

        <div className="mt-10 space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              {section.heading && (
                <h2 className="text-lg font-semibold text-foreground">{section.heading}</h2>
              )}
              {section.paragraphs?.map((p, j) => (
                <p key={j} className={`${section.heading ? "mt-3" : ""} text-sm leading-relaxed text-muted-foreground`}>
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className={`space-y-2 ${section.heading ? "mt-4" : ""}`}>
                  {section.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}
