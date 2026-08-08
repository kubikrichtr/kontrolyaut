import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, CheckCircle2, Phone } from "lucide-react";
import lukasAsset from "@/assets/lukas-doubek.webp.asset.json";
import lukasLqip from "@/assets/lukas-doubek-lqip.webp.asset.json";

export const Route = createFileRoute("/o-mne")({
  head: () => ({
    meta: [
      { title: "O mně | Lukáš Doubek | KontrolyAut" },
      {
        name: "description",
        content:
          "Lukáš Doubek — autorizovaný prodejce a technický poradce s více než 15 lety zkušeností ve světě automobilů. Pomohu vám s výběrem, kontrolou i koupí vozu.",
      },
      { property: "og:title", content: "O mně | Lukáš Doubek | KontrolyAut" },
      {
        property: "og:description",
        content:
          "Lukáš Doubek — autorizovaný prodejce a technický poradce s více než 15 lety zkušeností ve světě automobilů.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://kontrolyaut.cz/o-mne" },
      { property: "og:image", content: `https://kontrolyaut.cz${lukasAsset.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "O mně | Lukáš Doubek | KontrolyAut" },
      {
        name: "twitter:description",
        content: "Technický poradce s více než 15 lety zkušeností ve světě automobilů.",
      },
      { name: "twitter:image", content: `https://kontrolyaut.cz${lukasAsset.url}` },
    ],
    links: [
      { rel: "canonical", href: "https://kontrolyaut.cz/o-mne" },
      { rel: "preload", as: "image", href: lukasAsset.url, type: "image/webp", fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Lukáš Doubek",
          jobTitle: "Technický poradce a kontrolor vozidel",
          image: `https://kontrolyaut.cz${lukasAsset.url}`,
          url: "https://kontrolyaut.cz/o-mne",
          worksFor: { "@type": "Organization", name: "KontrolyAut", url: "https://kontrolyaut.cz/" },
        }),
      },
    ],
  }),

  component: AboutMePage,
});

function AboutMePage() {
  const skills = [
    "Konzultace a výběr vozu",
    "Důkladná kontrola historie a stavu",
    "Testovací jízda a odborné zhodnocení",
    "Vyřízení dokumentů a přihlášení",
    "Pomoc s financováním a pojištěním",
    "Dovoz vozu ze zahraničí",
    "Prodej vašeho vozu na komisi",
    "Komunikace v angličtině",
  ];
  return (
    <section className="container-page py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Photo */}
        <div className="relative mx-auto lg:mx-0 max-w-sm lg:max-w-md">
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl shadow-primary/10 bg-card">
            {/* LQIP placeholder — zamezuje CLS a urychluje vykreslení */}
            <img
              src={lukasLqip.url}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-md scale-105"
              width={20}
              height={20}
            />
            <picture>
              <source srcSet={lukasAsset.url} type="image/webp" />
              <img
                src="/lukas-doubek.jpg"
                alt="Lukáš Doubek"
                className="relative w-full h-auto object-cover"
                width={300}
                height={300}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
            <ShieldCheck className="h-4 w-4" />
            15+ let zkušeností
          </div>
        </div>

        {/* Content */}
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-primary">
            Váš průvodce světem aut
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold">Lukáš Doubek</h1>
          <p className="mt-2 text-lg text-muted-foreground">Autorizovaný prodejce a technický poradce</p>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Jmenuji se Lukáš a více než 15 let se pohybuji ve světě automobilů — od prodeje nových i ojetých vozů
            až po jejich důkladnou technickou kontrolu. Díky bohatým zkušenostem vám pomohu celým procesem koupě,
            od prvotní konzultace a výběru vozu, přes prověření historie a fyzického stavu včetně testovací jízdy,
            až po vyřízení všech formalit, financování a pojištění. Před samotnou koupí dostanete jasné
            doporučení nebo varování, abyste ušetřili čas i peníze a vyhnuli se nepříjemným překvapením jako
            nečekané opravy nebo nevýhodné financování. Hovořím anglicky a těším se na vaši zprávu nebo hovor —
            společně najdeme vůz, který perfektně sedne vašim potřebám i rozpočtu.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/#kontakt" className="btn-primary">
              Objednat kontrolu
            </a>
            <a
              href="tel:+420737008532"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition"
            >
              <Phone className="h-4 w-4" />
              +420 737 008 532
            </a>
          </div>
        </div>
      </div>

      {/* What I can do for you */}
      <div className="mt-16 md:mt-24 rounded-3xl border border-border bg-card p-8 md:p-12 shadow-xl shadow-primary/5">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Co pro vás mohu udělat</h2>
        <div className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
