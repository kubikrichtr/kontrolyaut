import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/kontroly-logo.svg.asset.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40 mt-24">
      <div className="container-page py-12 grid gap-8 md:grid-cols-3">
        <div>
          <img src={logoAsset.url} alt="KontrolyAut" className="h-12 w-auto" />
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Nezávislá kontrola ojetých vozů před koupí po celé ČR.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3">Navigace</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/#jak-probiha" className="hover:text-primary">Jak kontrola probíhá</a></li>
            <li><a href="/#reference" className="hover:text-primary">Realizované kontroly</a></li>
            <li><a href="/#faq" className="hover:text-primary">Časté dotazy</a></li>
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3">Kontakt</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="tel:+420737008532" className="hover:text-primary">+420 737 008 532</a></li>
            <li><a href="mailto:info@kontrolyaut.cz" className="hover:text-primary">info@kontrolyaut.cz</a></li>
            <li>Působíme po celé ČR</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-4 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} KontrolyAut.cz — všechna práva vyhrazena
        </div>
      </div>
    </footer>
  );
}
