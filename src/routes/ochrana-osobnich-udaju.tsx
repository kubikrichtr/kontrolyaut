import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/ochrana-osobnich-udaju")({
  head: () => ({
    meta: [
      { title: "Ochrana osobních údajů | KontrolyAut.cz" },
      {
        name: "description",
        content:
          "Jak zpracováváme osobní údaje na webu kontrolyaut.cz — rozsah údajů z objednávky kontroly vozu, účel zpracování, doba uchování a vaše práva dle GDPR.",
      },
      { property: "og:title", content: "Ochrana osobních údajů | KontrolyAut.cz" },
      {
        property: "og:description",
        content:
          "Jak zpracováváme osobní údaje na webu kontrolyaut.cz v souladu s nařízením GDPR.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kontrolyaut.cz/ochrana-osobnich-udaju" },
    ],
    links: [{ rel: "canonical", href: "https://kontrolyaut.cz/ochrana-osobnich-udaju" }],
  }),
  component: () => (
    <LegalPage
      title="Ochrana osobních údajů"
      intro="Tento dokument popisuje, jakým způsobem provozovatel webu kontrolyaut.cz zpracovává osobní údaje v souladu s nařízením GDPR."
      updated="17. 9. 2026"
      sections={[
        {
          heading: "1. Správce osobních údajů",
          paragraphs: [
            "Správcem osobních údajů je Lukáš Doubek, provozovatel webu kontrolyaut.cz, IČO 74154231, DIČ CZ8608010433. Kontakt: info@kontrolyaut.cz.",
          ],
        },
        {
          heading: "2. Rozsah zpracovávaných údajů",
          bullets: [
            "Jméno a příjmení",
            "Telefonní číslo",
            "E-mailová adresa",
            "Údaje o vozidle (značka, model, rok výroby, VIN)",
            "Místo a preferovaný termín kontroly",
          ],
        },
        {
          heading: "3. Účel zpracování",
          paragraphs: [
            "Údaje zpracováváme za účelem zpracování objednávky kontroly vozidla před koupí, sjednání termínu a místa kontroly, přípravy zprávy o stavu vozidla a souvisejících obchodních činností.",
          ],
        },
        {
          heading: "4. Doba uchování",
          paragraphs: [
            "Osobní údaje uchováváme po dobu nezbytně nutnou k naplnění uvedeného účelu, případně po dobu vyžadovanou právními předpisy.",
          ],
        },
        {
          heading: "5. Práva subjektu údajů",
          paragraphs: [
            "Máte právo na přístup, opravu, výmaz, omezení zpracování, přenositelnost a vznesení námitky. Tato práva můžete uplatnit na e-mailu info@kontrolyaut.cz.",
          ],
        },
      ]}
    />
  ),
});
