import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/kontroly-logo.svg.asset.json";

const NAV = [
  { to: "/provereni-vozidla", label: "Prověření vozidla" },
  { to: "/#jak-probiha", label: "Jak kontrola probíhá" },
  { to: "/#faq", label: "Časté dotazy" },
  { to: "/#reference", label: "Realizované kontroly a hodnocení" },
  { to: "/blog", label: "Blog" },
  { to: "/#kontakt", label: "Kontakt" },
  { to: "/o-mne", label: "O mně" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img src={logoAsset.url} alt="KontrolyAut" className="h-16 w-auto" />
        </Link>
        <nav className="hidden xl:flex flex-nowrap items-center gap-7 text-sm font-medium text-foreground/80">
          {NAV.map((n) => (
            <a
              key={n.to}
              href={n.to}
              className="whitespace-nowrap transition-colors hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+420737008532" className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-foreground">
            <Phone className="h-4 w-4 text-primary" /> +420 737 008 532
          </a>
          <a href="/#kontakt" className="btn-primary whitespace-nowrap">Objednat kontrolu</a>
        </div>
        <button
          className="tap-target xl:hidden flex items-center justify-center rounded-md"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Hlavní navigace"
          className="xl:hidden border-t border-border bg-background"
        >
          <div className="container-page py-4 flex flex-col gap-1">
            {NAV.map((n, i) => (
              <a
                key={n.to}
                href={n.to}
                ref={i === 0 ? firstLinkRef : undefined}
                onClick={() => setOpen(false)}
                className="tap-target flex items-center rounded-md px-2 py-3 text-base"
              >
                {n.label}
              </a>
            ))}
            <a
              href="tel:+420737008532"
              className="tap-target flex items-center px-2 py-3 text-base text-primary"
            >
              +420 737 008 532
            </a>
            <a
              href="/#kontakt"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 justify-center"
            >
              Objednat kontrolu
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
