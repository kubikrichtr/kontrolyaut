import { Link } from "@tanstack/react-router";
import { BatteryCharging, Facebook, Hash, Mail, MapPin, Phone } from "lucide-react";
import logoAsset from "@/assets/kontroly-logo.svg.asset.json";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="mb-4 flex items-center">
            <img src={logoAsset.url} alt="KontrolyAut.cz" className="h-12 w-auto" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Profesionální kontrola ojetých vozů před koupí. Pomůžeme vám odhalit skryté vady a koupit auto s jistotou.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-foreground">Rychlé odkazy</h4>
          <ul className="space-y-2">
            <li><a href="/#jak-probiha" className="text-sm text-muted-foreground transition-colors hover:text-primary">Jak kontrola probíhá</a></li>
            <li><a href="/#reference" className="text-sm text-muted-foreground transition-colors hover:text-primary">Realizované kontroly</a></li>
            <li><a href="/#kontakt" className="text-sm text-muted-foreground transition-colors hover:text-primary">Kontakt</a></li>
            <li><Link to="/blog" className="text-sm text-muted-foreground transition-colors hover:text-primary">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-foreground">Služby</h4>
          <ul className="space-y-2">
            <li><a href="/#kontakt" className="text-sm text-muted-foreground transition-colors hover:text-primary">Kontrola vozu před koupí</a></li>
            <li><Link to="/provereni-vozidla" className="text-sm text-muted-foreground transition-colors hover:text-primary">Prověření vozidla</Link></li>
            <li><a href="/#faq" className="text-sm text-muted-foreground transition-colors hover:text-primary">Časté dotazy</a></li>
          </ul>
          <a href="https://stavbaterie.cz" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <BatteryCharging className="h-4 w-4" /> Měření baterií EV →
          </a>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-foreground">Kontakt</h4>
          <p className="mb-3 text-sm font-medium text-foreground">Lukáš Doubek</p>
          <ul className="space-y-3">
            <li><a href="tel:+420737008532" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"><Phone className="h-4 w-4 shrink-0" />+420 737 008 532</a></li>
            <li><a href="mailto:info@kontrolyaut.cz" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"><Mail className="h-4 w-4 shrink-0" />info@kontrolyaut.cz</a></li>
            <li><span className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 shrink-0" />Praha, Česká republika</span></li>
            <li><a href="https://www.facebook.com/profile.php?id=61555695391315" target="_blank" rel="noopener noreferrer" aria-label="Facebook KontrolyAut.cz" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"><Facebook className="h-4 w-4 shrink-0" />Facebook</a></li>
          </ul>
          <ul className="mt-4 space-y-3 border-t border-border pt-4">
            <li className="flex items-center gap-2 text-sm text-muted-foreground"><Hash className="h-4 w-4 shrink-0" />IČO: 74154231</li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground"><Hash className="h-4 w-4 shrink-0" />DIČ: CZ8608010433</li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground"><Hash className="h-4 w-4 shrink-0" />Účet: 2602056377 / 2010</li>
          </ul>
        </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} KontrolyAut.cz. Všechna práva vyhrazena.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
              <Link to="/ochrana-osobnich-udaju" className="text-sm text-muted-foreground transition-colors hover:text-primary">Ochrana osobních údajů</Link>
              <Link to="/obchodni-podminky" className="text-sm text-muted-foreground transition-colors hover:text-primary">Obchodní podmínky</Link>
              <Link to="/duvera-a-bezpecnost" className="text-sm text-muted-foreground transition-colors hover:text-primary">Důvěra a bezpečnost</Link>
              <Link to="/zasady-cookies" className="text-sm text-muted-foreground transition-colors hover:text-primary">Zásady cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
