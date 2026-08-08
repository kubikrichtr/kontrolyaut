import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Search,
  FileCheck,
  CheckCircle2,
  Wrench,
  Gauge,
  Phone,
  Car,
  Handshake,
} from "lucide-react";
import heroWorkshop from "@/assets/hero-workshop.png.asset.json";

const TITLE = "Prověření vozidla před koupí | Praha a celá ČR | KontrolyAut";
const DESCRIPTION =
  "Nezávislé prověření vozidla před koupí — historie, stav karoserie, motoru, podvozku i diagnostika elektroniky. Protokol s fotografiemi. Praha a celá ČR od 2 490 Kč.";
const URL = "https://kontrolyaut.cz/provereni-vozidla";
const IMAGE = `https://kontrolyaut.cz${heroWorkshop.url}`;

const FAQ = [
  {
    q: "Co znamená prověření vozidla před koupí?",
    a: "Prověření vozidla je nezávislá technická kontrola ojetého auta, kterou provádíme ještě před podpisem kupní smlouvy. Zahrnuje kontrolu historie vozu, stavu karoserie a laku, motoru, převodovky, podvozku, interiéru, diagnostiku elektroniky a testovací jízdu. Výsledkem je jasné doporučení, zda vůz koupit a za jakou cenu.",
  },
  {
    q: "Kolik stojí prověření vozidla?",
    a: "Základní prověření vozidla stojí 2 490 Kč včetně DPH. K ceně se připočítává pouze doprava na místo prohlídky, kterou si předem spočítáte v objednávkovém formuláři.",
  },
  {
    q: "Jak dlouho prověření auta trvá?",
    a: "Kompletní prověření vozidla obvykle trvá 60 až 90 minut. Ústní vyhodnocení a doporučení dostanete ihned na místě, písemný protokol s fotografiemi e-mailem do 24 hodin.",
  },
  {
    q: "Prověříte vozidlo přímo u prodejce nebo v autobazaru?",
    a: "Ano. Přijedeme přímo na místo, kde je vůz k vidění — do autobazaru, servisu nebo k soukromému prodejci v Praze, Středočeském kraji i kdekoliv v ČR.",
  },
  {
    q: "Poznate při prověření vozidla stočený tachometr nebo havarovaný vůz?",
    a: "Ano, patří to k nejčastějším nálezům. Kombinujeme diagnostiku řídicích jednotek, kontrolu servisní historie, měření tloušťky laku a prohlídku podvozku, což spolehlivě odhalí stočený tachometr i neopravenou nebo špatně opravenou havárii.",
  },
  {
    q: "Co když prověření odhalí vážnou závadu?",
    a: "Dostanete od nás jednoznačné doporučení — buď od koupě odstoupit, nebo využít zjištěné závady k vyjednání nižší ceny. Náklady na prověření se tak vrací hned při první slevě.",
  },
];

const CHECKS = [
  {
    icon: Search,
    title: "Historie a původ vozu",
    text: "Ověření VIN, servisní historie, počtu majitelů, importu a záznamů o poškození.",
  },
  {
    icon: Car,
    title: "Karoserie, lak a podvozek",
    text: "Měření tloušťky laku, kontrola geometrie, koroze, tlumičů, brzd a pneumatik.",
  },
  {
    icon: Gauge,
    title: "Diagnostika elektroniky",
    text: "Načtení chybových kódů řídicích jednotek a ověření skutečného nájezdu kilometrů.",
  },
  {
    icon: Wrench,
    title: "Motor a převodovka",
    text: "Studený i teplý start, kontrola úniků provozních kapalin, chodu a řazení.",
  },
  {
    icon: ShieldCheck,
    title: "Testovací jízda",
    text: "Zkušební jízda zaměřená na jízdní vlastnosti, hluky, vibrace a funkci asistentů.",
  },
  {
    icon: FileCheck,
    title: "Report z kontroly",
    text: "Písemný protokol s fotografiemi a jasným doporučením ke koupi do 24 hodin.",
  },
];

const STEPS = [
  { icon: Phone, title: "Konzultace a domluva", text: "Ozveme se vám, upřesníme vůz, místo a termín prohlídky." },
  { icon: Car, title: "Prověření vozu na místě", text: "Přijedeme za vozem a provedeme důkladnou technickou kontrolu." },
  { icon: CheckCircle2, title: "Vyhodnocení", text: "Ihned na místě sdělíme nálezy a reálnou hodnotu vozu." },
  { icon: Handshake, title: "Další postup", text: "Doporučíme koupit, vyjednat slevu, nebo od nákupu odstoupit." },
];

export const Route = createFileRoute("/provereni-vozidla")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Prověření vozidla před koupí",
          serviceType: "Nezávislá technická kontrola ojetého vozu",
          url: URL,
          areaServed: { "@type": "Country", name: "Česká republika" },
          provider: { "@type": "Organization", name: "KontrolyAut", url: "https://kontrolyaut.cz/" },
          offers: {
            "@type": "Offer",
            price: "2490",
            priceCurrency: "CZK",
            url: "https://kontrolyaut.cz/#kontakt",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Úvod", item: "https://kontrolyaut.cz/" },
            { "@type": "ListItem", position: 2, name: "Prověření vozidla", item: URL },
          ],
        }),
      },
    ],
  }),
  component: VehicleInspectionPage,
});

function VehicleInspectionPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroWorkshop.url}
          alt="Prověření ojetého vozidla před koupí v servisu"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        <div className="container-page relative py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" />
              Jistota při koupi vozu
            </span>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Prověření vozidla před koupí
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Nezávislé prověření vozidla vám ukáže skutečný stav auta dřív, než za něj zaplatíte.
              Provedeme důkladnou technickou kontrolu, odhalíme stočený tachometr, skryté havárie i drahé
              závady a dostanete jasné doporučení, zda vůz koupit. Praha, Středočeský kraj i celá ČR
              od 2 490 Kč.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/#kontakt" className="btn-primary">
                Objednat prověření vozu
              </a>
              <a
                href="tel:+420737008532"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <Phone className="h-4 w-4 text-primary" /> +420 737 008 532
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Co prověříme */}
      <section className="container-page py-16 md:py-24">
        <h2 className="text-2xl font-bold md:text-3xl">Co při prověření vozidla kontrolujeme</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Prověření vozidla je kombinací technické prohlídky, diagnostiky a ověření historie. Nic
          z toho neděláme od stolu — vždy jsme přímo u vozu.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CHECKS.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <c.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Průběh */}
      <section className="border-y border-border bg-muted/30 py-16 md:py-24">
        <div className="container-page">
          <h2 className="text-2xl font-bold md:text-3xl">Jak prověření vozidla probíhá</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cena a proč */}
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Kolik stojí prověření vozidla</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Kompletní prověření vozidla stojí <strong className="text-foreground">2 490 Kč včetně DPH</strong>.
              K ceně se připočítává pouze doprava na místo prohlídky, kterou si předem spočítáte
              v objednávkovém formuláři — žádné skryté poplatky. Prohlídka trvá 60–90 minut a protokol
              s fotografiemi dostanete do 24 hodin.
            </p>
            <div className="mt-6">
              <a href="/#kontakt" className="btn-primary">
                Spočítat cenu a objednat
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Proč prověření vozidla vyplátí</h2>
            <ul className="mt-4 space-y-3">
              {[
                "Průměrná skrytá závada na ojetém voze stojí desítky tisíc korun.",
                "Nálezy z kontroly slouží jako podklad pro vyjednání nižší ceny.",
                "Jsme nezávislí — nepracujeme pro prodejce ani autobazar.",
                "Přijedeme za vozem, nemusíte nikam jezdit.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-24">
        <div className="container-page">
          <h2 className="text-2xl font-bold md:text-3xl">Časté dotazy k prověření vozidla</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="/#kontakt" className="btn-primary">
              Objednat prověření vozidla
            </a>
            <Link to="/o-mne" className="text-sm font-semibold text-primary hover:underline">
              Kdo kontrolu provádí →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
