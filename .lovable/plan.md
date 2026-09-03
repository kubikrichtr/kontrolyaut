# SEO audit kontrolyaut.cz — výsledky a doporučení

## Stav: technický základ je v pořádku

Čerstvý scan (lint, http, metadata_basics) — vše prošlo:
- Homepage dostupná (HTTP 200), bez noindex, SSR → vyhledávače vidí plný obsah
- robots.txt neblokuje crawlery, sitemap.xml validní
- Viewport, jazyk cs, favicon, titulek, meta description, OG tagy — vše nastaveno
- Google Search Console: homepage je **indexována**, canonical správně (kontrolyaut.cz), poslední crawl 30. 8. 2026

## Slabé místo: viditelnost ve vyhledávání

Data GSC za posledních 28 dní: **55 impresí, 1 klik, průměrná pozice 37**

Nejvýznamnější dotazy a pozice:
- „prověření auta před koupí" — 12 impresí, pozice **92**
- „kontrola vozu před koupí" — 3 impresy, pozice **69**
- „kontrola ojetého vozu" — pozice 34
- Stránka /provereni-vozidla — 9 impresí, pozice **84**
- Blogové články si vedou lépe (pozice 3–29), ale mají málo impresí

Závěr: technika OK, problém je obsahová relevance a autorita — typické pro nový web.

## Doporučené kroky (podle efektu)

1. **Doladit homepage na hlavní dotazy** — do title/H1/popisků promítnout fráze „kontrola auta před koupí" a „Praha a okolí" (homepage má pozici 53 na vlastní hlavní téma).
2. **Posílit stránku /provereni-vozidla** — rozšířit obsah (cca 800+ slov), přidat interní odkazy z blogových článků na tuto stránku (teď pozice 84).
3. **Interní prolinkování** — v každém blogovém článku přidat odkazy na / a /provereni-vozidla s relevantním anchor textem.
4. **Pravidelný blog** — pokračovat v dlouhých SEO dotazech (např. „na co si dát pozor při koupi ojetiny", „stočený tachometr jak poznat"), blog je aktuálně nejsilnější kanál.
5. **Mimo web (nedělám v kódu)**: založit/doladit Google firemní profil (mapy = klíčové pro lokální službu), sbírat hodnocení, získat zpětné odkazy (srovnavace, firmy.cz, partnerské weby včetně cars-eu.cz a stavbaterie.cz).

## Co můžu rovnou upravit v projektu

Body 1–3 (a případně 4 — další články) jsou úpravy obsahu a metadat v projektu. Po schválení:
- upravím title/meta/H1 homepage a /provereni-vozidla,
- doplním interní odkazy v existujících článcích (seed SQL),
- volitelně vygeneruji 2–3 nové SEO články.
