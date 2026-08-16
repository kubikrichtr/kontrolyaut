import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ShieldCheck, Search, FileCheck, CheckCircle2, Wrench, Gauge, Phone, Car, Handshake, Star, Quote, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { carsEu, type CarsEuReview } from "@/lib/cars-eu-client";
import { BookingSection } from "@/components/site/BookingSection";
import heroWorkshop from "@/assets/hero-workshop.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kontrola ojetých vozů před koupí | KontrolyAut" },
      {
        name: "description",
        content:
          "Nezávislá technická kontrola ojetých vozů před koupí. Protokol s fotografiemi, po celé ČR.",
      },
      { property: "og:title", content: "Kontrola ojetých vozů před koupí | KontrolyAut" },
      {
        property: "og:description",
        content:
          "Zajišťujeme nezávislou kontrolu osobních i užitkových vozů před koupí. Díky tomu předejdete zbytečným výdajům a nepříjemným překvapením po nákupu vozu.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kontrolyaut.cz/" },
      { property: "og:image", content: `https://kontrolyaut.cz${heroWorkshop.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kontrola ojetých vozů před koupí | KontrolyAut" },
      {
        name: "twitter:description",
        content: "Nezávislá kontrola ojetých vozů před koupí. Protokol s fotografiemi.",
      },
      { name: "twitter:image", content: `https://kontrolyaut.cz${heroWorkshop.url}` },
    ],
    links: [{ rel: "canonical", href: "https://kontrolyaut.cz/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "KontrolyAut",
          url: "https://kontrolyaut.cz/",
          logo: "https://kontrolyaut.cz/favicon.svg",
          areaServed: "CZ",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Kolik stojí kontrola ojetého vozu?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Základní kontrola ojetého vozu stojí 2 490 Kč včetně DPH. Součástí je diagnostika elektroniky, kontrola karoserie, podvozku, motoru a testovací jízda.",
              },
            },
            {
              "@type": "Question",
              name: "Kontrola ojetého vozu v Praze – kolik stojí a co zahrnuje?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Kontrola ojetého vozu v Praze a okolí stojí od 2 490 Kč včetně DPH. Cena zahrnuje diagnostiku elektroniky, kontrolu motoru, převodovky, podvozku, karoserie, interiéru i zkušební jízdu. Dopravu do Prahy a Středočeského kraje si spočítáte v objednávkovém formuláři.",
              },
            },
            {
              "@type": "Question",
              name: "Jak dlouho trvá kontrola auta před koupí v Praze?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Kontrola ojetého vozu v Praze a okolí trvá obvykle 60 až 90 minut. Výsledek a doporučení dostanete okamžitě na místě, písemný protokol s fotografiemi pak e-mailem do 24 hodin.",
              },
            },
            {
              "@type": "Question",
              name: "Přijedete s kontrolou za prodejcem do Prahy?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ano, přijedeme přímo za vámi – k autobazaru, do servisu nebo na adresu soukromého prodejce v Praze a celém Středočeském kraji (např. Kladno, Mladá Boleslav, Příbram, Beroun, Kolín).",
              },
            },
            {
              "@type": "Question",
              name: "Kontrolujete auta i mimo Prahu, ve Středočeském kraji?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Ano, kromě Prahy obsluhujeme celý Středočeský kraj a po dohodě i další místa po celé ČR. Cenu dopravy předem spočítá kalkulačka v objednávkovém formuláři.",
              },
            },
            {
              "@type": "Question",
              name: "Proč si nechat zkontrolovat ojetý vůz před koupí v Praze?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Nezávislá kontrola v Praze a okolí odhalí skryté vady, stočený tachometr či vůz po havárii dřív, než podepíšete kupní smlouvu. Vyhnete se tak opravám za desítky tisíc korun a protokol využijete i při jednání o slevě.",
              },
            },
            {
              "@type": "Question",
              name: "Jak objednat kontrolu ojetého vozu v Praze?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Vyplňte objednávkový formulář na této stránce nebo zavolejte. Kontaktujeme vás do 24 hodin, domluvíme termín kontroly u prodejce v Praze či okolí a připravíme cenovou nabídku včetně dopravy.",
              },
            },
          ],
        }),
      },
    ],
  }),

  component: HomePage,
});

const orderSchema = z.object({
  full_name: z.string().trim().min(2, "Zadejte jméno").max(100),
  email: z.string().trim().email("Neplatný e-mail").max(255),
  phone: z.string().trim().min(6, "Zadejte telefon").max(30),
  car_url: z.string().trim().max(500).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  preferred_date: z.string().optional().or(z.literal("")),
  attendance: z.enum(["yes", "no", ""]).optional(),
  note: z.string().trim().max(1000).optional().or(z.literal("")),
});

function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <HowItWorks />
      <Realized />
      
      <BookingSection />
      <FAQ />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-[position:78%_center] sm:bg-right md:bg-center opacity-60"
        style={{ backgroundImage: `url(${heroWorkshop.url})` }}
        aria-hidden
      />
      {/* levý gradient pouze za textem – auto na pravé straně zůstává bez překrytí */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent sm:from-background/85 sm:via-background/60 sm:to-transparent md:from-background/75 md:via-background/45 md:to-transparent" />
      <div className="container-page relative py-16 md:py-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-2 rounded-full">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Jistota při koupi vozu
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-sm">
            Kontrola ojetého vozu <span className="text-primary">před koupí</span>
          </h1>
          <p className="mt-5 text-lg text-foreground/90 max-w-xl drop-shadow-sm">
            Zajišťujeme nezávislou kontrolu osobních i užitkových vozů před koupí. Díky tomu předejdete zbytečným
            výdajům a nepříjemným překvapením po nákupu vozu.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#kontakt" className="btn-primary shadow-lg">
              Objednat kontrolu
            </a>
            <a href="#jak-probiha" className="btn-outline shadow-sm bg-background/90 backdrop-blur-sm">
              Jak to funguje
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/80">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Nezávislé posouzení
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Protokol s fotografiemi
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Výjezd po celé ČR
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Do 24 hodin
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}


function Benefits() {
  const items = [
    {
      icon: Search,
      title: "Historie vozu",
      text: "Ověření VIN, servisní historie, kontrola tachometru a nehodovosti.",
    },
    {
      icon: Wrench,
      title: "Technický stav",
      text: "Motor, převodovka, podvozek, brzdy — vše na profesionálním zvedáku.",
    },
    {
      icon: Gauge,
      title: "Diagnostika",
      text: "Diagnostika řídících jednotek, kontrola chybových kódů a live dat.",
    },
    {
      icon: FileCheck,
      title: "Report z kontroly",
      text: "Elektronický report včetně fotodokumentace, hodnocení stavu vozu, konzultace výsledků.",
    },
  ];
  return (
    <section className="container-page py-16 md:py-20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">Co pro Vás zkontrolujeme</h2>
        <p className="mt-3 text-muted-foreground">Přehled kontrolních bodů naší prohlídky</p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div
            key={it.title}
            className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <it.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: Phone,
      title: "Konzultace a domluva",
      text: "Společně vybereme vhodný vůz a domluvíme termín prohlídky s prodejcem.",
    },
    { icon: Car, title: "Fyzická kontrola vozu", text: "Kompletní kontrola vozu u prodejce." },
    { icon: CheckCircle2, title: "Vyhodnocení", text: "Jasně doporučíme, zda vůz koupit, nebo raději hledat jiný." },
    {
      icon: Handshake,
      title: "Další postup",
      text: "Pomůžeme s administrativou nákupu nebo společně najdeme vhodnější vůz.",
    },
  ];
  return (
    <section id="jak-probiha" className="bg-muted/40 py-16 md:py-20">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Jak kontrola probíhá?</h2>
          <p className="mt-3 text-muted-foreground">Jednoduchý proces ve čtyřech krocích.</p>
        </div>

        {/* Mobilní vertikální timeline */}
        <ol className="mt-10 space-y-6 sm:hidden">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-4 pl-1">
              {i < steps.length - 1 && (
                <span
                  className="absolute left-[23px] top-12 bottom-[-24px] w-px bg-border"
                  aria-hidden
                />
              )}
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                {i + 1}
              </span>
              <div className="rounded-2xl border border-border bg-card p-4 flex-1">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop/tablet grid karet */}
        <div className="mt-12 hidden sm:grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#kontakt" className="btn-primary">
            Objednat kontrolu
          </a>
        </div>
      </div>
    </section>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5 text-primary" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

type LightboxItem = { src: string; car: string | null; customer: string | null };

function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const prev = () => onIndex((index - 1 + items.length) % items.length);
  const next = () => onIndex((index + 1) % items.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, items.length]);

  const touchX = useRef<number | null>(null);

  const item = items[index];
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        const end = e.changedTouches[0]?.clientX;
        touchX.current = null;
        if (start == null || end == null) return;
        if (Math.abs(end - start) < 40) return;
        if (end < start) next();
        else prev();
      }}
    >
      <button
        onClick={onClose}
        aria-label="Zavřít"
        className="absolute right-4 top-4 h-11 w-11 rounded-full bg-background/90 text-foreground flex items-center justify-center hover:bg-background transition"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Předchozí fotka"
        className="absolute left-3 md:left-6 h-11 w-11 rounded-full bg-background/90 text-foreground flex items-center justify-center hover:bg-background transition"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Další fotka"
        className="absolute right-3 md:right-6 h-11 w-11 rounded-full bg-background/90 text-foreground flex items-center justify-center hover:bg-background transition"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.src}
          alt={item.car ?? "Realizovaná kontrola vozu"}
          className="mx-auto max-h-[64vh] md:max-h-[70vh] w-auto rounded-xl object-contain"
        />
        <figcaption className="mt-4 text-center text-sm text-background">
          {item.car}
          {item.customer ? ` · ${item.customer}` : ""}
          <span className="ml-2 opacity-70">
            {index + 1}/{items.length}
          </span>
        </figcaption>
        <div className="mt-4 flex gap-2 overflow-x-auto justify-start md:justify-center pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((it, i) => (
            <button
              key={`${it.src}-${i}`}
              onClick={() => onIndex(i)}
              aria-label={`Fotka ${i + 1}`}
              className={`shrink-0 h-14 w-20 overflow-hidden rounded-lg border-2 transition ${
                i === index ? "border-primary opacity-100" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={it.src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </figure>
    </div>
  );
}

function Realized() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + 24;
      setActive(Math.round(el.scrollLeft / step));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollTo({ left: i * (card.offsetWidth + 24), behavior: "smooth" });
  };

  const { data } = useQuery({
    queryKey: ["carseu-reviews"],
    queryFn: async () => {
      const { data, error } = await carsEu
        .from("reviews")
        .select("id,customer_name,customer_location,car_name,rating,text,images,created_at")
        .eq("show_on_kontrolyaut", true)
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as CarsEuReview[];
    },
  });

  if (!data || data.length === 0) return null;

  const withPhoto = data.filter((r) => (r.images?.length ?? 0) > 0);
  const withoutPhoto = data.filter((r) => (r.images?.length ?? 0) === 0);

  const photos: LightboxItem[] = withPhoto.flatMap((r) =>
    (r.images ?? []).map((src) => ({
      src,
      car: r.car_name,
      customer: r.customer_name
        ? `${r.customer_name}${r.customer_location ? ` · ${r.customer_location}` : ""}`
        : null,
    })),
  );
  const firstPhotoIndex = (rid: string) => {
    let i = 0;
    for (const r of withPhoto) {
      if (r.id === rid) return i;
      i += r.images?.length ?? 0;
    }
    return 0;
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(280, el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <>
      {withPhoto.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-semibold tracking-wider uppercase text-primary">Portfolio</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">Realizované kontroly</h2>
              <p className="mt-3 text-muted-foreground">
                Vybrané vozy, které jsme prověřili a pomohli klientům s jejich koupí.
              </p>
            </div>

            <div className="relative mt-10">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Posunout doleva"
                className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full border border-border bg-card shadow items-center justify-center hover:border-primary/40 transition"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Posunout doprava"
                className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full border border-border bg-card shadow items-center justify-center hover:border-primary/40 transition"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div
                ref={trackRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {withPhoto.map((r) => (
                  <article
                    key={r.id}
                    className="group snap-start shrink-0 w-[80%] sm:w-[48%] lg:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-4.5rem)/4)] flex flex-col rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl hover:shadow-primary/5 transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setLightbox(firstPhotoIndex(r.id))}
                      className="relative aspect-[4/3] overflow-hidden bg-muted text-left"
                      aria-label={`Zvětšit fotky – ${r.car_name ?? "kontrola vozu"}`}
                    >
                      <img
                        src={r.images![0]}
                        alt={r.car_name ?? "Realizovaná kontrola vozu"}
                        loading="lazy"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 shadow">
                        <Star className="h-3 w-3 fill-current" />
                        {r.rating ?? 5}
                      </span>
                      {(r.images?.length ?? 0) > 1 && (
                        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/90 text-foreground text-xs font-medium px-2.5 py-1">
                          <ImageIcon className="h-3 w-3" />
                          {r.images!.length}
                        </span>
                      )}
                    </button>
                    <div className="p-5 flex flex-col gap-2">
                      <h3 className="font-semibold">{r.car_name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">{r.text}</p>
                      <span className="mt-1 text-xs text-muted-foreground">
                        {r.customer_name}
                        {r.customer_location ? ` · ${r.customer_location}` : ""}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {withPhoto.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => goTo(i)}
                    aria-label={`Přejít na kontrolu ${i + 1}`}
                    aria-current={i === active}
                    className={`h-2 rounded-full transition-all ${
                      i === active ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>


          {lightbox !== null && (
            <Lightbox items={photos} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
          )}
        </section>
      )}

      {withoutPhoto.length > 0 && (
        <section id="reference" className="bg-muted/40 py-16 md:py-20">
          <div className="container-page">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-semibold tracking-wider uppercase text-primary">Reference</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">Co říkají naši klienti</h2>
              <p className="mt-3 text-muted-foreground">
                Hodnocení spokojených klientů, kteří využili našich služeb.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
              {withoutPhoto.map((r) => (
                <figure
                  key={r.id}
                  className="relative rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/15" aria-hidden />
                  <Stars count={r.rating ?? 5} />
                  <blockquote className="mt-4 text-sm text-muted-foreground">„{r.text}“</blockquote>
                  <figcaption className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-4">
                    <span>
                      <span className="block font-semibold">{r.customer_name}</span>
                      {r.customer_location && (
                        <span className="block text-xs text-muted-foreground">{r.customer_location}</span>
                      )}
                    </span>
                    {r.car_name && <span className="text-xs font-medium text-primary">{r.car_name}</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}



function FAQ() {
  const { data } = useQuery({
    queryKey: ["faq"],
    queryFn: async () => {
      const { data, error } = await supabase.from("faq_items").select("*").eq("published", true).order("sort_order");
      if (error) throw error;
      return data;
    },
  });
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="faq" className="container-page py-16 md:py-20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">Časté dotazy</h2>
        <p className="mt-3 text-muted-foreground">Vše, co potřebujete vědět o kontrole ojetého vozu.</p>
      </div>
      <div className="mt-10 max-w-3xl mx-auto space-y-3">
        {(data ?? []).map((f) => {
          const isOpen = open === f.id;
          return (
            <div key={f.id} className="rounded-2xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : f.id)}
                aria-expanded={isOpen}
                className="tap-target w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-muted/40 transition"
              >
                <span className="font-semibold">{f.question}</span>
                <span
                  className={`h-8 w-8 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-transform ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              {isOpen && <div className="px-5 pb-5 text-sm text-muted-foreground whitespace-pre-line">{f.answer}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
