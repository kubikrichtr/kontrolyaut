import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/zasady-cookies")({
  head: () => ({
    meta: [
      { title: "Zásady používání cookies | KontrolyAut.cz" },
      {
        name: "description",
        content:
          "Zásady používání cookies na webu kontrolyaut.cz — jaké cookies používáme, k čemu slouží a jak spravovat souhlas v prohlížeči.",
      },
      { property: "og:title", content: "Zásady používání cookies | KontrolyAut.cz" },
      {
        property: "og:description",
        content: "Jaké cookies web kontrolyaut.cz používá a jak spravovat souhlas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kontrolyaut.cz/zasady-cookies" },
    ],
    links: [{ rel: "canonical", href: "https://kontrolyaut.cz/zasady-cookies" }],
  }),
  component: () => (
    <LegalPage
      title="Zásady používání cookies"
      intro="Web kontrolyaut.cz používá soubory cookies za účelem zajištění správného fungování a zlepšování uživatelského zážitku."
      updated="17. 9. 2026"
      sections={[
        {
          heading: "Druhy používaných cookies",
          bullets: [
            "Nezbytné cookies — zajišťují základní funkce webu.",
            "Analytické cookies — pomáhají měřit návštěvnost a chování uživatelů.",
            "Marketingové cookies — využíváme pouze s vaším souhlasem.",
          ],
        },
        {
          heading: "Správa souhlasu",
          paragraphs: [
            "Souhlas s používáním cookies můžete kdykoli upravit v nastavení svého prohlížeče.",
          ],
        },
      ]}
    />
  ),
});
