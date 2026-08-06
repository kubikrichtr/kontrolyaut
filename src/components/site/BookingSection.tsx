import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Check, AlertCircle, ArrowRight, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  lookupPostalPrice,
  suggestCities,
  lookupCityPrice,
  BASE_PRICE,
  getPricingSettings,
  type CitySuggestion,
} from "@/lib/geo.functions";
import { toast } from "sonner";

const CARS_EU_URL = "https://ajafqafoonxoubbhcxnk.supabase.co/functions/v1/public-submit-inquiry";
const CARS_EU_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqYWZxYWZvb254b3ViYmhjeG5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwNzM1NTQsImV4cCI6MjA4MzY0OTU1NH0.j5SJwClkiZD_fIVTI4UBKRK2Z76ykMuk1HLF169c-6A";

const schema = z
  .object({
    fullName: z.string().trim().min(2, { message: "Zadejte jméno a příjmení" }).max(100),
    email: z.string().trim().email({ message: "Zadejte platnou e-mailovou adresu" }).max(255),
    phone: z
      .string()
      .trim()
      .min(9, { message: "Zadejte platné telefonní číslo" })
      .max(20)
      .regex(/^[+\d\s()-]+$/, { message: "Telefon obsahuje neplatné znaky" }),
    carUrl: z.string().trim().max(500).optional(),
    preferredDate: z.string().trim().optional(),
    attendance: z.string().optional(),
    city: z.string().trim().min(2, { message: "Zadejte město (vyberte z našeptávače)" }).max(100),
    cityPlaceId: z.string().optional(),
    postalCode: z
      .string()
      .trim()
      .regex(/^\d{3}\s?\d{2}$/, { message: "Zadejte PSČ (5 číslic)" }),
    note: z.string().trim().max(1000).optional(),
  })
  .superRefine((v, ctx) => {
    if (!v.cityPlaceId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["city"],
        message: "Vyberte město ze seznamu našeptávače",
      });
    }
  });

type FormValues = z.infer<typeof schema>;

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();


const FEATURES = [
  "Nezávislá kontrola přes 100 bodů",
  "Report s fotodokumentací",
  "Přijedeme kamkoli po ČR",
];

const czk = (n: number) => n.toLocaleString("cs-CZ").replace(/\u00a0/g, " ");

export function BookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    trigger,
    clearErrors,
    watch,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { city: "", postalCode: "", attendance: "", note: "", carUrl: "" },
  });

  const postalCode = (watch("postalCode") ?? "").replace(/\s+/g, "");

  const { data: pricing } = useQuery({
    queryKey: ["pricing-settings"],
    queryFn: () => getPricingSettings(),
    staleTime: 30 * 1000,
  });
  const basePrice = pricing?.basePrice ?? BASE_PRICE;

  const lookup = useServerFn(lookupPostalPrice);
  const cityLookup = useServerFn(lookupCityPrice);

  const pscValid = /^\d{5}$/.test(postalCode);
  const { data: priceInfo, isFetching: priceLoading } = useQuery({
    queryKey: ["postal-price", postalCode, pricing?.pricePerKm, pricing?.coefficient, basePrice],
    queryFn: () => lookup({ data: { postalCode } }),
    enabled: pscValid,
    staleTime: 30 * 1000,
  });

  const finalPrice = priceInfo?.ok ? priceInfo.totalPrice ?? null : null;

  const cityValue = watch("city") ?? "";
  const cityPlaceId = watch("cityPlaceId") ?? "";

  // Ruční zadání PSČ zpětně doplní město, pokud ještě není vybráno.
  useEffect(() => {
    if (priceInfo?.ok && priceInfo.city && !cityValue.trim()) {
      setValue("city", priceInfo.city, { shouldValidate: false });
      setValue("cityPlaceId", `psc:${postalCode}`, { shouldValidate: false });
    }
  }, [priceInfo?.ok, priceInfo?.city, cityValue, postalCode, setValue]);

  const postalMismatch =
    !!priceInfo?.ok &&
    !!priceInfo.city &&
    !!cityValue.trim() &&
    normalize(priceInfo.city) !== normalize(cityValue) &&
    !normalize(cityValue).includes(normalize(priceInfo.city)) &&
    !normalize(priceInfo.city).includes(normalize(cityValue));


  const onSubmit = async (values: FormValues) => {
    const attendanceText =
      values.attendance === "yes"
        ? "Klient se chce kontroly účastnit"
        : values.attendance === "no"
          ? "Klient se kontroly účastnit nechce"
          : "";
    const priceText = priceInfo?.ok
      ? `Cena včetně dopravy: ${czk(priceInfo.totalPrice ?? 0)} Kč (doprava ${czk(
          priceInfo.travelPrice ?? 0,
        )} Kč, ~${priceInfo.distanceKm} km vzdušnou čarou)`
      : `Základní cena: ${czk(basePrice)} Kč`;

    const message = [
      `Místo kontroly: ${values.city}, ${values.postalCode}`,
      priceText,
      attendanceText,
      values.note || "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch(CARS_EU_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: CARS_EU_ANON,
          Authorization: `Bearer ${CARS_EU_ANON}`,
        },
        body: JSON.stringify({
          source_site: "kontrolyaut",
          name: values.fullName,
          email: values.email,
          phone: values.phone,
          service: "Kontrola vozu před koupí",
          car_name: null,
          vehicle_url: values.carUrl || null,
          preferred_date: values.preferredDate || null,
          message,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSubmitted(true);
      reset();
    } catch (err) {
      console.error("Booking submit failed", err);
      toast.error("Odeslání se nezdařilo. Zkuste to prosím znovu nebo nás kontaktujte.");
    }
  };

  const onInvalid = (errs: typeof errors) => {
    const order: (keyof FormValues)[] = [
      "fullName",
      "email",
      "phone",
      "city",
      "postalCode",
      "preferredDate",
    ];
    const first = order.find((k) => errs[k]);
    if (first) setFocus(first);
  };

  const errorCount = Object.keys(errors).length;

  return (
    <section
      id="kontakt"
      className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/40 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div id="cena" className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Objednávka</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Objednejte kontrolu vozu
          </h2>
          <span className="mx-auto mt-6 block h-[3px] w-24 rounded-full bg-primary" aria-hidden />

          <div className="mt-10 flex items-baseline justify-center gap-3">
            <span className="text-5xl font-bold text-primary sm:text-6xl">{czk(basePrice)} Kč</span>
            <span className="text-sm font-medium text-muted-foreground">
              základní cena vč. DPH + doprava
            </span>
          </div>

          <ul className="mt-8 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-x-10">
            {FEATURES.map((b) => (
              <li key={b} className="flex items-center gap-2 text-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 rounded-3xl border border-border/60 bg-card p-6 text-card-foreground shadow-xl shadow-primary/5 sm:p-10">
          {submitted ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Děkujeme za objednávku</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Ozveme se vám telefonicky nebo e-mailem a domluvíme termín kontroly.
              </p>
              <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
                Odeslat další objednávku
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit, onInvalid)}
              noValidate
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {isSubmitted && errorCount > 0 && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive sm:col-span-2 lg:col-span-3"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>Zkontrolujte prosím vyznačená pole.</span>
                </div>
              )}

              <Field label="Jméno a příjmení" id="fullName" error={errors.fullName?.message}>
                <Input
                  id="fullName"
                  autoComplete="name"
                  className="h-12 rounded-lg border-border bg-background text-base sm:text-sm"
                  {...register("fullName")}
                />
              </Field>
              <Field label="E-mail" id="email" error={errors.email?.message}>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="h-12 rounded-lg border-border bg-background text-base sm:text-sm"
                  {...register("email")}
                />
              </Field>
              <Field label="Telefon" id="phone" error={errors.phone?.message}>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  className="h-12 rounded-lg border-border bg-background text-base sm:text-sm"
                  {...register("phone")}
                />
              </Field>

              <Field label="Město kontroly" id="city" error={errors.city?.message}>
                <CityAutocomplete
                  value={cityValue}
                  invalid={!!errors.city}
                  onChange={(v) => {
                    setValue("cityPlaceId", "");
                    setValue("city", v, { shouldValidate: isSubmitted });
                  }}
                  onSelect={async (s) => {
                    setValue("cityPlaceId", s.placeId);
                    setValue("city", s.name);
                    clearErrors("city");
                    void trigger("city");
                    const info = await cityLookup({ data: { placeId: s.placeId } });
                    if (info.ok && info.postalCode) {
                      setValue("postalCode", info.postalCode, { shouldValidate: true });
                    }
                  }}

                />
                {!errors.city && cityPlaceId && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-primary">
                    <Check className="h-3.5 w-3.5 shrink-0" /> Město ověřeno
                  </p>
                )}
              </Field>

              <Field label="PSČ" id="postalCode" error={errors.postalCode?.message}>
                <Input
                  id="postalCode"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="Např. 602 00"
                  className="h-12 rounded-lg border-border bg-background text-base sm:text-sm"
                  {...register("postalCode")}
                />
                {!errors.postalCode && postalMismatch && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    PSČ {postalCode.slice(0, 3)} {postalCode.slice(3)} patří k obci{" "}
                    {priceInfo?.city}. Zkontrolujte prosím zadání.
                  </p>
                )}
              </Field>


              <Field
                label="Preferovaný termín (nepovinné)"
                id="preferredDate"
                error={errors.preferredDate?.message}
              >
                <Input
                  id="preferredDate"
                  type="date"
                  className="h-12 rounded-lg border-border bg-background text-base sm:text-sm"
                  {...register("preferredDate")}
                />
              </Field>

              <Field label="Odkaz na inzerát (nepovinné)" id="carUrl" error={errors.carUrl?.message}>
                <Input
                  id="carUrl"
                  placeholder="https://..."
                  className="h-12 rounded-lg border-border bg-background text-base sm:text-sm"
                  {...register("carUrl")}
                />
              </Field>

              <Field label="Účast na kontrole (nepovinné)" id="attendance">
                <Controller
                  name="attendance"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="attendance"
                        aria-label="Účast na kontrole"
                        className="h-12 rounded-lg border-border bg-background text-base sm:text-sm"
                      >
                        <SelectValue placeholder="Chcete být u kontroly?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Ano, chci být u kontroly</SelectItem>
                        <SelectItem value="no">Ne, proveďte kontrolu bez mé účasti</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field
                label="Poznámka (nepovinné)"
                id="note"
                className="sm:col-span-2 lg:col-span-3"
                error={errors.note?.message}
              >
                <Textarea
                  id="note"
                  rows={3}
                  className="rounded-lg border-border bg-background text-base sm:text-sm"
                  {...register("note")}
                />
              </Field>

              <div
                aria-live="polite"
                className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary sm:col-span-2 lg:col-span-3"
              >
                <MapPin className="h-4 w-4 shrink-0" />
                {priceLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Počítám cenu dopravy…
                  </span>
                ) : !pscValid ? (
                  <span className="text-muted-foreground">
                    Zadejte město a PSČ pro výpočet konečné ceny
                  </span>
                ) : priceInfo?.ok && finalPrice ? (
                  <span>
                    Konečná cena včetně dopravy {czk(finalPrice)} Kč
                    <span className="ml-2 font-normal text-muted-foreground">
                      (doprava {czk(priceInfo.travelPrice ?? 0)} Kč · ~{priceInfo.distanceKm} km)
                    </span>
                  </span>
                ) : (
                  <span className="text-destructive">
                    {priceInfo?.error ?? "Cenu dopravy se nepodařilo spočítat."}
                  </span>
                )}
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="group h-14 w-full rounded-xl text-base font-semibold"
                >
                  {isSubmitting ? (
                    "Odesílám…"
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      Objednat kontrolu
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Ozveme se do 24 hodin a potvrdíme termín.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function CityAutocomplete({
  value,
  invalid,
  selected,
  onChange,
  onSelect,
}: {
  value: string;
  invalid?: boolean;
  selected?: boolean;
  onChange: (v: string) => void;
  onSelect: (s: CitySuggestion) => void;
}) {
  const suggest = useServerFn(suggestCities);
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [debounced, setDebounced] = useState(value);
  const [active, setActive] = useState(0);
  const skipNext = useRef(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 250);
    return () => clearTimeout(t);
  }, [query]);

  // Pole města upravené ručně po výběru – když se text vrátí do stavu čitelné obce, drž ho synchronizovaný.
  useEffect(() => {
    if (value !== query && !open) setQuery(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const { data: options = [], isFetching } = useQuery({
    queryKey: ["city-suggest", debounced],
    queryFn: () => suggest({ data: { query: debounced } }),
    enabled: debounced.length >= 2 && !skipNext.current,
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => setActive(0), [options]);

  // Ruční přepsání města: pokud text přesně odpovídá jedné obci, potvrď ji automaticky.
  useEffect(() => {
    if (selected || !debounced || autoRef.current === debounced) return;
    const q = normalize(debounced);
    const exact = options.filter((o) => normalize(o.name) === q);
    if (exact.length === 1) {
      autoRef.current = debounced;
      onSelect(exact[0]!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, debounced, selected]);

  const choose = (o: CitySuggestion) => {
    skipNext.current = true;
    autoRef.current = o.name;
    setQuery(o.name);
    setDebounced(o.name);
    setOpen(false);
    onSelect(o);
  };


  return (
    <div className="relative" ref={boxRef}>
      <Input
        id="city"
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        placeholder="Např. Brno nebo 60200"
        aria-invalid={invalid}
        className="h-12 rounded-lg border-border bg-background text-base sm:text-sm"
        value={query}
        onChange={(e) => {
          skipNext.current = false;
          autoRef.current = "";
          setQuery(e.target.value);
          setOpen(true);
          onChange(e.target.value);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (!open || options.length === 0) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => (i + 1) % options.length);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => (i - 1 + options.length) % options.length);
          } else if (e.key === "Enter") {
            e.preventDefault();
            choose(options[active] ?? options[0]!);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        onBlur={() => {
          // Ruční zadání bez výběru: pokud sedí jediný návrh, potvrď ho.
          if (selected) return;
          const q = normalize(query);
          const exact = options.filter((o) => normalize(o.name) === q);
          if (exact.length === 1) choose(exact[0]!);
        }}
      />
      {isFetching && (
        <Loader2 className="pointer-events-none absolute right-3 top-4 h-4 w-4 animate-spin text-muted-foreground" />
      )}
      {open && debounced.length >= 2 && options.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-border bg-popover py-1 shadow-lg"
        >
          {options.map((o, i) => (
            <li key={o.placeId}>
              <button
                type="button"
                role="option"
                aria-selected={i === active}
                className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-accent ${
                  i === active ? "bg-accent" : ""
                }`}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(o)}
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="font-medium">{o.name}</span>
                {o.region && <span className="text-muted-foreground">{o.region}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


function Field({
  label,
  id,
  error,
  className = "",
  children,
}: {
  label: string;
  id: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-2 block text-sm font-semibold text-foreground">
        {label}
      </Label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-destructive">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
