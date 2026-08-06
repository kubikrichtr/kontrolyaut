# Našeptávač měst ČR + automatické PSČ v objednávkovém formuláři

## Stav dnes

Formulář už našeptávač i doplnění PSČ obsahuje, ale běží výhradně přes Google Places/Geocoding přes klíč uložený v adminu CARS-EU. Ten klíč Google aktuálně odmítá (Places API New není v Google Cloud projektu zapnuté a klíč má omezení na HTTP referrer), takže našeptávač vrací prázdný seznam, PSČ se nedoplní a u ceny se ukáže "Služba pro výpočet dopravy není dostupná."

## Cíl

Našeptávání měst, validace a automatické doplnění PSČ musí fungovat vždy, i bez funkčního Google klíče.

## Co udělám

1. **Vestavěný číselník českých obcí** – do projektu přidám kompaktní datovou sadu obcí ČR (název, okres/kraj, hlavní PSČ, souřadnice). Slouží jako primární zdroj pro našeptávač i pro PSČ.
2. **Našeptávač bez závislosti na Google** – serverová funkce nejdřív hledá v číselníku (diakritika i bez ní, "Ceske Bud" najde "České Budějovice"). Google Places zůstane jako doplněk pro adresy, které v číselníku nejsou.
3. **Automatické PSČ** – po výběru města se PSČ doplní okamžitě z číselníku. U měst s více PSČ (Praha, Brno, Ostrava) nabídnu výběr obvodu / PSČ místo tichého dosazení jedné hodnoty.
4. **Validace**
   - Město musí být vybráno z našeptávače (ruční nesmyslný text projde validací jako chyba s hláškou "Vyberte město ze seznamu").
   - PSČ: formát 5 číslic (už je) + kontrola, že PSČ existuje v ČR a odpovídá zvolenému městu; při nesouladu upozornění, ne tvrdá blokace.
   - Ruční zadání PSČ zpětně doplní město, pokud je pole prázdné.
5. **Výpočet ceny dopravy** – vzdálenost se počítá ze souřadnic z číselníku (vzdušná čára, stejný vzorec jako dnes), takže cena se spočítá i bez Google. Když je Google klíč funkční, výsledek se ověří přes Geocoding.

## Technické detaily

- Nový modul `src/lib/cz-cities.ts` (data + vyhledávání bez diakritiky), načítaný jen na serveru v `src/lib/geo.functions.ts`.
- `suggestCities`, `lookupCityPrice`, `lookupPostalPrice` dostanou lokální větev jako první, Google jako fallback; návratové typy zůstávají stejné, takže `BookingSection.tsx` se mění minimálně (přidá se stav pro výběr obvodu a hláška u validace města).
- Zod schéma v `BookingSection.tsx` se rozšíří o kontrolu, že `cityPlaceId` (nebo lokální id) je vyplněné.
- Ceník (`ka_settings` v CARS-EU) se dál čte beze změny.

## Poznámka

Doporučuji zároveň v Google Cloud zapnout Places API (New) + Geocoding API a uložit serverový klíč bez referrer omezení — pak poběží i přesné adresy mimo číselník. Web ale nebude na Googlu závislý.
