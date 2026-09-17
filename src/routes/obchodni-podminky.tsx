import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/obchodni-podminky")({
  head: () => ({
    meta: [
      { title: "Obchodní podmínky | KontrolyAut.cz" },
      {
        name: "description",
        content:
          "Obchodní podmínky služby kontroly ojetých vozů před koupí na kontrolyaut.cz — předmět služby, cena, termín a místo kontroly, odpovědnost a reklamace.",
      },
      { property: "og:title", content: "Obchodní podmínky | KontrolyAut.cz" },
      {
        property: "og:description",
        content:
          "Obchodní podmínky služby nezávislé kontroly ojetých vozů před koupí na kontrolyaut.cz.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kontrolyaut.cz/obchodni-podminky" },
    ],
    links: [{ rel: "canonical", href: "https://kontrolyaut.cz/obchodni-podminky" }],
  }),
  component: () => (
    <LegalPage
      title="Obchodní podmínky"
      intro="Tyto všeobecné obchodní podmínky upravují vztahy mezi poskytovatelem služby kontroly ojetých vozů před koupí a objednatelem."
      updated="17. 9. 2026"
      sections={[
        {
          heading: "1. Předmět služby",
          paragraphs: [
            "Předmětem služby je nezávislá kontrola ojetého vozidla před koupí — prověření historie vozidla, technický stav, diagnostika, kontrola karoserie a podvozu, testovací jízda a písemná zpráva se zjištěními a doporučením.",
          ],
        },
        {
          heading: "2. Cena a platební podmínky",
          paragraphs: [
            "Cena kontroly se řídí aktuálním ceníkem uvedeným na webu kontrolyaut.cz a zahrnuje i dopravu k místu kontroly, která se počítá podle vzdálenosti. Konkrétní podmínky úhrady jsou sjednány individuálně, platební údaje najdete v kontaktních údajích.",
          ],
        },
        {
          heading: "3. Termín a místo kontroly",
          paragraphs: [
            "Termín a místo kontroly jsou sjednány po telefonickém nebo e-mailovém potvrzení objednávky. Klient je povinen zajistit přístup k vozidlu a souhlas majitele vozidla s provedením kontroly.",
          ],
        },
        {
          heading: "4. Odpovědnost",
          paragraphs: [
            "Kontrola probíhá bez zásahu do vozidla a je pořizována v dobré víře na základě zjistitelného stavu v době kontroly. Poskytovatel neodpovídá za skryté vady, které nebylo možné zjistit běžným postupem kontroly, ani za další provoz vozidla po kontrole.",
          ],
        },
        {
          heading: "5. Reklamace",
          paragraphs: [
            "Případné reklamace řešíme individuálně na základě písemné komunikace na info@kontrolyaut.cz.",
          ],
        },
      ]}
    />
  ),
});
