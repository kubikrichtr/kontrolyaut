import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/duvera-a-bezpecnost")({
  head: () => ({
    meta: [
      { title: "Důvěra a bezpečnost | KontrolyAut.cz" },
      {
        name: "description",
        content:
          "Jak zajišťujeme bezpečnost a ochranu dat na kontrolyaut.cz — šifrovaný přenos, přístupy k datům, subdodavatelé, cookies a kontakt pro hlášení bezpečnostních problémů.",
      },
      { property: "og:title", content: "Důvěra a bezpečnost | KontrolyAut.cz" },
      {
        property: "og:description",
        content:
          "Jak zajišťujeme bezpečnost, soukromí a ochranu údajů klientů na webu kontrolyaut.cz.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kontrolyaut.cz/duvera-a-bezpecnost" },
    ],
    links: [{ rel: "canonical", href: "https://kontrolyaut.cz/duvera-a-bezpecnost" }],
  }),
  component: () => (
    <LegalPage
      title="Důvěra a bezpečnost"
      intro="Tato stránka popisuje, jak přistupujeme k bezpečnosti, soukromí a provozu naší služby kontroly ojetých vozů před koupí. Nejedná se o nezávislou certifikaci ani auditem ověřený dokument — obsah popisuje aktuální praxi provozovatele a platformových nástrojů, které využíváme."
      updated="17. 9. 2026"
      sections={[
        {
          heading: "Sdílená odpovědnost",
          paragraphs: [
            "Web a backendová část běží na platformě Lovable Cloud (technologicky postavené na Supabase a moderním edge prostředí). Platforma zajišťuje hosting, šifrovaný přenos (HTTPS), správu přístupů a izolaci dat. Provozovatel webu odpovídá za obsah, zpracování objednávek a komunikaci se zákazníky. Zákazník odpovídá za přesnost údajů, které nám poskytne.",
          ],
        },
        {
          heading: "Přístup a autentizace",
          bullets: [
            "Komunikace s webem probíhá výhradně přes HTTPS.",
            "Administrátorský přístup k backendu má pouze provozovatel.",
            "Citlivé operace se provádějí na serverové straně, nikoli v prohlížeči.",
          ],
        },
        {
          heading: "Jaké údaje zpracováváme",
          paragraphs: [
            "Z objednávkového formuláře zpracováváme jméno, telefon, e-mail, údaje o vozidle, místo a preferovaný termín kontroly. Detailní popis najdete na stránce",
          ],
        },
        {
          heading: "Subdodavatelé a integrace",
          bullets: [
            "Lovable Cloud / Supabase — hosting webu, databáze a serverových funkcí.",
            "Google Maps — výpočet dopravy k místu kontroly.",
            "Poskytovatel e-mailových služeb pro doručení objednávky provozovateli.",
          ],
        },
        {
          heading: "Cookies a analytika",
          paragraphs: [
            "Web používá pouze nezbytné cookies pro správné fungování stránek a anonymní měření návštěvnosti. Podrobnosti najdete v Zásadách cookies.",
          ],
        },
        {
          heading: "Uchování a smazání údajů",
          paragraphs: [
            "Údaje z objednávek uchováváme po dobu nezbytně nutnou ke zpracování objednávky a dále po dobu vyžadovanou právními předpisy. O výmaz můžete kdykoli požádat e-mailem.",
          ],
        },
        {
          heading: "Práva uživatelů",
          paragraphs: [
            "Máte právo na přístup, opravu, výmaz, omezení zpracování, přenositelnost údajů a vznesení námitky. Žádost zašlete na info@kontrolyaut.cz.",
          ],
        },
        {
          heading: "Kontakt pro hlášení bezpečnostních problémů",
          paragraphs: [
            "Pokud objevíte zranitelnost nebo bezpečnostní problém týkající se webu kontrolyaut.cz, kontaktujte nás prosím na info@kontrolyaut.cz. Nahlášení posoudíme a budeme vás informovat o dalším postupu.",
          ],
        },
        {
          heading: "Změny tohoto dokumentu",
          paragraphs: [
            "Obsah stránky průběžně aktualizujeme tak, aby odpovídal aktuální praxi. Datum poslední revize je uvedeno na začátku stránky.",
          ],
        },
      ]}
    >
      <p className="mt-8 text-sm text-muted-foreground">
        Související dokumenty:{" "}
        <Link to="/ochrana-osobnich-udaju" className="font-medium text-primary hover:underline">
          Ochrana osobních údajů
        </Link>{" "}
        ·{" "}
        <Link to="/obchodni-podminky" className="font-medium text-primary hover:underline">
          Obchodní podmínky
        </Link>
      </p>
    </LegalPage>
  ),
});
