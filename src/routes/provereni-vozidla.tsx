import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, CheckCircle2, Search, Gauge, Wrench, FileCheck, Phone, Car } from "lucide-react";
import heroWorkshop from "@/assets/hero-workshop.png.asset.json";

export const Route = createFileRoute("/provereni-vozidla")({
  head: () => ({
    meta: [
      {
        title: "Prověření vozidla před koupí Praha | Kontrola ojetého auta | KontrolyAut",
      },
      {
        name: "description",
        content:
          "Profesionální kontrola ojetého auta před koupí v Praze a okolí. Nezávislé prověření vozidla, historie, technický stav, testovací jízda a fotografický protokol. Ušetříte desítky tisíc.",
      },
      {
        property: "og:title",
        content: "Prověření vozidla před koupí Praha | Kontrola ojetého auta | KontrolyAut",
      },
      {
        property: "og:description",
        content:
          "Nezávislá kontrola ojetého auta před koupí v Praze a okolí. Odhalíme stočený tachometr, skryté havárie i drahé závady dřív, než auto koupíte.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kontrolyaut.cz/provereni-vozidla" },
      { property: "og:image", content: `https://kontrolyaut.cz${heroWorkshop.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Prověření vozidla před koupí Praha | Kontrola ojetého auta | KontrolyAut",
      },
      {
        name: "twitter:description",
        content:
          "Nezávislá kontrola ojetého auta před koupí v Praze a okolí. Protokol s fotografiemi do 24 hodin.",
      },
      { name: "twitter:image", content: `https://kontrolyaut.cz${heroWorkshop.url}` },
    ],
    links: [{ rel: "canonical", href: "https://kontrolyaut.cz/provereni-vozidla" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Prověření vozidla před koupí",
          description: "Nezávislá kontrola ojetého auta před koupí v Praze a okolí.",
          provider: {
            "@type": "Organization",
            name: "KontrolyAut",
            url: "https://kontrolyaut.cz/",
          },
          areaServed: {
            "@type": "City",
            name: "Praha",
            containedInPlace: { "@type": "Country", name: "CZ" },
          },
          url: "https://kontrolyaut.cz/provereni-vozidla",
        }),
      },
    ],
  }),

  component: ProvereniVozidlaPage,
});

const checks = [
  {
    icon: Search,
    title: "Prověření historie vozu",
    text: "Kontrolujeme původ vozidla, předchozí majitele, servisní záznamy, evidence policie a možné exekuce nebo leasingové zatížení.",
  },
  {
    icon: Gauge,
    title: "Stav tachometru",
    text: "Porovnáváme najeté kilometry s dostupnými databázemi a servisními záznamy. Odhalíme podezření na stočení tachometru.",
  },
  {
    icon: Wrench,
    title: "Technický stav a karoserie",
    text: "Zkontrolujeme motor, převodovku, podvozek, brzdy, výfuk, karoserii a lak. Hledáme známky havárie, koroze i špatných oprav.",
  },
  {
    icon: Car,
    title: "Testovací jízda",
    text: "Vyzkoušíme chování auta na silnici — zrychlení, brzdění, řazení, podvozek a neobvyklé zvuky. Vše zhodnotíme v kontextu běžného opotřebení.",
  },
  {
    icon: FileCheck,
    title: "Fotografický protokol",
    text: "Po kontrole obdržíte detailní protokol s fotografiemi, popisem závad a doporučením, zda se koupě vyplatí nebo jaké náklady vás čekají.",
  },
];

function ProvereniVozidlaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[position:78%_center] sm:bg-right md:bg-center opacity-95"
          style={{ backgroundImage: `url(${heroWorkshop.url})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-transparent sm:from-background/90 sm:via-background/80 sm:to-transparent md:from-background/90 md:via-background/70 md:to-transparent" />
        <div className="container-page relative py-16 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-2 rounded-full">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Nezávislá kontrola vozidel
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-sm">
              Kontrola ojetého auta <span className="text-primary">před koupí Praha</span>
            </h1>
            <p className="mt-5 text-lg text-foreground/90 max-w-xl drop-shadow-sm">
              Přijedu za prodávajícím v Praze i Středočeském kraji a prověřím vůz před podpisem kupní smlouvy.
              Ušetřím vám čas, nervy a hlavně peníze — typické skryté závady odhalíme ještě před zaplacením zálohy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/#kontakt" className="btn-primary shadow-lg">
                Objednat kontrolu
              </a>
              <a href="tel:+420737008532" className="btn-outline shadow-sm bg-background/90 backdrop-blur-sm inline-flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +420 737 008 532
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What the check covers */}
      <section className="container-page py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Co při prověření vozidla <span className="text-primary">zkontroluji</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Kontrola trvá obvykle 60–90 minut a pokrývá všechny klíčové oblasti, které ovlivňují cenu i bezpečnost vozu.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {checks.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-4">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Local SEO text */}
      <section className="container-page py-16 md:py-24 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold">
            Proč si nechat prověřit auto před koupí <span className="text-primary">v Praze</span>
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Pražský trh s ojetými vozy je obrovský — nabízejí se zde auta z celé Evropy, často dovezená z Německa,
              Itálie nebo Belgie. Právě proto je důležité dát si pozor na skrytou historii, nepovedené opravy po havárii
              nebo stočený tachometr. Osobní kontrola zkušeným technikem vám dá mnohem větší jistotu než pouhé prohlédnutí fotek v inzerátu.
            </p>
            <p>
              Při prověření vozidla před koupí v Praze se zaměřuji na místo, kde auto aktuálně stojí — ať už je to garáž
              v centru, autosalon na okraji města nebo soukromý pozemek ve Středočeském kraji. Nemusíte se starat o převoz,
              diagnostiku ani o komunikaci s prodávajícím. Všechny nálezy dokumentuji fotografiemi a zapíšu do přehodného protokolu.
            </p>
            <p>
              Výsledkem není jen „ano/ne“ odpověď, ale konkrétní seznam rizik a odhad nákladů na případné opravy.
              Díky tomu můžete s prodávajícím smlouvat cenu, vyžádat si opravu před koupí, nebo od obchodu jednoduše odstoupit.
            </p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Kontrola přímo u prodávajícího v Praze",
              "Dojezd po celém Středočeském kraji",
              "Zkušenosti s dovozovými i českými vozy",
              "Report do 24 hodin od kontroly",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20 md:pb-28">
        <div className="rounded-3xl bg-primary/5 border border-primary/10 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Chcete mít jistotu při koupi vozu?</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Napište mi termín a místo kontroly. Ozvu se zpět s potvrzením a předběžnou cenou dopravy.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/#kontakt" className="btn-primary">
              Objednat prověření vozidla
            </a>
            <a href="tel:+420737008532" className="btn-outline inline-flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +420 737 008 532
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
