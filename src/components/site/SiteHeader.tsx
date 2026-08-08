import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/kontroly-logo.svg.asset.json";

const NAV = [
  { to: "/provereni-vozidla", label: "Prověření vozidla" },
  { to: "/#jak-probiha", label: "Jak kontrola probíhá" },
  { to: "/#faq", label: "Časté dotazy" },
  { to: "/#reference", label: "Realizované kontroly" },
  { to: "/blog", label: "Blog" },
  { to: "/#kontakt", label: "Kontakt" },
  { to: "/o-mne", label: "O mně" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logoAsset.url} alt="KontrolyAut" className="h-16 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-foreground/80">
          {NAV.map((n) => (
            <a key={n.to} href={n.to} className="hover:text-primary transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+420737008532" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Phone className="h-4 w-4 text-primary" /> +420 737 008 532
          </a>
          <a href="/#kontakt" className="btn-primary">Objednat kontrolu</a>
        </div>
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-page py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <a key={n.to} href={n.to} onClick={() => setOpen(false)} className="py-2 text-sm">
                {n.label}
              </a>
            ))}
            <a href="tel:+420737008532" className="py-2 text-sm text-primary">+420 737 008 532</a>
            <a href="/#kontakt" onClick={() => setOpen(false)} className="btn-primary">Objednat kontrolu</a>
          </div>
        </div>
      )}
    </header>
  );
}
