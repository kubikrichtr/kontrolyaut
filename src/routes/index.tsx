import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ShieldCheck, Search, FileCheck, CheckCircle2, Wrench, Gauge, Phone, Car, Handshake } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroWorkshop from "@/assets/hero-workshop.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kontrola ojetých vozů před koupí | KontrolyAut" },
      {
        name: "description",
        content:
          "Nezávislá technická kontrola ojetých vozů před koupí. Přes 100 kontrolních bodů, protokol s fotografiemi, po celé ČR.",
      },
      { property: "og:title", content: "Kontrola ojetých vozů před koupí | KontrolyAut" },
      {
        property: "og:description",
        content:
          "Zajišťujeme nezávislou kontrolu osobních i užitkových vozů před koupí. Díky tomu předejdete zbytečným výdajům a nepříjemným překvapením po nákupu vozu.",
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
      <OrderForm />
      <FAQ />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-[position:78%_center] sm:bg-right md:bg-center"
        style={{ backgroundImage: `url(${heroWorkshop.url})` }}
        aria-hidden
      />
      {/* modro-bílý brand overlay ve stylu Cars-eu / Stavbaterie */}
      <div className="absolute inset-0 bg-background/55 sm:bg-background/35 md:bg-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/75 to-accent/60 md:bg-gradient-to-r md:from-background md:via-background/85 md:to-accent/30" />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5" />
      <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-background via-transparent to-background/40" />
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,_var(--primary)_1px,_transparent_0)] [background-size:24px_24px]" />
      <div className="container-page relative py-24 md:py-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Jistota při koupi vozu
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Kontrola ojetého vozu <span className="text-primary">před koupí</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Zajišťujeme nezávislou kontrolu osobních i užitkových vozů před koupí. Díky tomu předejdete zbytečným
            výdajům a nepříjemným překvapením po nákupu vozu.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#kontakt" className="btn-primary">
              Objednat kontrolu
            </a>
            <a href="#jak-probiha" className="btn-outline">
              Jak kontrola probíhá
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Nezávislé posouzení
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Protokol s fotografiemi
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Do 24 hodin
            </li>
          </ul>
          <div className="mt-10 inline-flex bg-card/90 backdrop-blur rounded-2xl shadow-xl border border-border p-4 items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">100+</div>
              <div className="text-xs text-muted-foreground">kontrolních bodů</div>
            </div>
          </div>
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
    <section className="container-page py-20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">Co pro Vás zkontrolujeme</h2>
        <p className="mt-3 text-muted-foreground">Přehled kontrolních bodů naší prohlídky</p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
    <section id="jak-probiha" className="bg-muted/40 py-20">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Jak kontrola probíhá?</h2>
          <p className="mt-3 text-muted-foreground">Jednoduchý proces ve čtyřech krocích.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </section>
  );
}

function Realized() {
  const { data } = useQuery({
    queryKey: ["realized"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("realized_inspections")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      return data;
    },
  });
  return (
    <section id="reference" className="container-page py-20">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-primary">Reference</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Realizované kontroly</h2>
        </div>
        <p className="text-muted-foreground max-w-md">
          Vybíráme z posledních prověřených vozů. Každý zákazník obdržel detailní protokol.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {(data ?? []).map((r) => (
          <article
            key={r.id}
            className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              {r.image_url && (
                <img
                  src={r.image_url}
                  alt={r.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>
            <div className="p-5">
              <h3 className="font-semibold line-clamp-2">{r.title}</h3>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {r.car_brand} · {r.year ?? ""}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary text-xs font-bold px-2.5 py-1">
                  {r.score}
                  <span className="opacity-70 font-medium">{r.score_label}</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function OrderForm() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    full_name: "",
    email: "",
    phone: "",
    car_url: "",
    location: "",
    preferred_date: "",
    attendance: "" as "" | "yes" | "no",
    note: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = orderSchema.safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Zkontrolujte formulář");
      return;
    }
    setLoading(true);

    const CARS_EU_URL = "https://ajafqafoonxoubbhcxnk.supabase.co/functions/v1/public-submit-inquiry";
    const CARS_EU_ANON =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWZxYWZvb254b3ViYmhjeG5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwNzM1NTQsImV4cCI6MjA4MzY0OTU1NH0.j5SJwClkiZD_fIVTI4UBKRK2Z76ykMuk1HLF169c-6A";

    const attendanceText =
      parsed.data.attendance === "yes"
        ? "Klient se chce kontroly účastnit"
        : parsed.data.attendance === "no"
          ? "Klient se kontroly účastnit nechce"
          : "";
    const noteParts = [
      parsed.data.location ? `Místo: ${parsed.data.location}` : "",
      attendanceText,
      parsed.data.note || "",
    ].filter(Boolean);

    const res = await fetch(CARS_EU_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: CARS_EU_ANON,
        Authorization: `Bearer ${CARS_EU_ANON}`,
      },
      body: JSON.stringify({
        source_site: "kontrolyaut",
        name: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        service: "Kontrola vozu před koupí",
        car_name: null,
        vehicle_url: parsed.data.car_url || null,
        preferred_date: parsed.data.preferred_date || null,
        message: noteParts.join("\n") || null,
      }),
    });

    setLoading(false);
    if (!res.ok) {
      toast.error("Nepodařilo se odeslat objednávku.");
      return;
    }
    toast.success("Objednávka odeslána. Ozveme se vám.");
    setValues({
      full_name: "",
      email: "",
      phone: "",
      car_url: "",
      location: "",
      preferred_date: "",
      attendance: "",
      note: "",
    });
  }

  const inputCls =
    "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

  return (
    <section id="kontakt" className="bg-gradient-to-br from-primary/10 via-background to-accent/40 py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
        <div className="lg:sticky lg:top-28">
          <span className="text-xs font-semibold tracking-wider uppercase text-primary">Objednávka</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Objednejte kontrolu vozu</h2>
          <div className="mt-6 rounded-2xl bg-card border border-border p-6 shadow-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">2 490 Kč</span>
              <span className="text-sm text-muted-foreground">včetně DPH</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> Nezávislá kontrola přes 100 bodů
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> Písemný protokol s fotografiemi
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> Přijedeme kamkoli po ČR
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> Doporučení do 24 hodin
              </li>
            </ul>
          </div>
        </div>
        <form
          onSubmit={submit}
          className="rounded-3xl bg-card border border-border p-6 md:p-8 shadow-xl shadow-primary/5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium">Jméno a příjmení *</span>
              <input
                required
                className={`${inputCls} mt-1.5`}
                value={values.full_name}
                onChange={(e) => setValues({ ...values, full_name: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">E-mail *</span>
              <input
                required
                type="email"
                className={`${inputCls} mt-1.5`}
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Telefon *</span>
              <input
                required
                className={`${inputCls} mt-1.5`}
                value={values.phone}
                onChange={(e) => setValues({ ...values, phone: e.target.value })}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium">Chcete se kontroly osobně účastnit?</span>
              <select
                className={`${inputCls} mt-1.5`}
                value={values.attendance}
                onChange={(e) => setValues({ ...values, attendance: e.target.value as "" | "yes" | "no" })}
              >
                <option value="">Nezáleží / neuvedeno</option>
                <option value="yes">Ano, chci být u kontroly</option>
                <option value="no">Ne, kontrolu proveďte bez mé účasti</option>
              </select>
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-medium">Odkaz na inzerát</span>
              <input
                placeholder="https://..."
                className={`${inputCls} mt-1.5`}
                value={values.car_url}
                onChange={(e) => setValues({ ...values, car_url: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Místo kontroly (město)</span>
              <input
                className={`${inputCls} mt-1.5`}
                value={values.location}
                onChange={(e) => setValues({ ...values, location: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Preferovaný termín</span>
              <input
                type="date"
                className={`${inputCls} mt-1.5`}
                value={values.preferred_date}
                onChange={(e) => setValues({ ...values, preferred_date: e.target.value })}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium">Poznámka</span>
              <textarea
                rows={3}
                className={`${inputCls} mt-1.5 resize-none`}
                value={values.note}
                onChange={(e) => setValues({ ...values, note: e.target.value })}
              />
            </label>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full mt-6 !py-3.5">
            {loading ? "Odesílám..." : "Odeslat objednávku"}
          </button>
          <p className="text-xs text-muted-foreground text-center mt-3">Ozveme se do 24 hodin a potvrdíme termín.</p>
        </form>
      </div>
    </section>
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
    <section id="faq" className="container-page py-20">
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
                className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-muted/40 transition"
              >
                <span className="font-semibold">{f.question}</span>
                <span
                  className={`h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-transform ${isOpen ? "rotate-45" : ""}`}
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
