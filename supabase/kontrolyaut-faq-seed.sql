-- FAQ pro kontrolyaut.cz
-- Spusť v SQL editoru projektu CARS-EU.
-- Smaže stávající FAQ a vloží novou sadu 8 otázek a odpovědí.

DELETE FROM public.faq_items;

INSERT INTO public.faq_items (question, answer, published, sort_order)
VALUES
  (
    'Co znamená prověření vozidla před koupí?',
    'Prověření vozidla je nezávislá technická kontrola ojetého auta, kterou provádíme ještě před podpisem kupní smlouvy. Zahrnuje kontrolu historie vozu, stavu karoserie a laku, motoru, převodovky, podvozku, interiéru, diagnostiku elektroniky a testovací jízdu. Výsledkem je jasné doporučení, zda vůz koupit a za jakou cenu.',
    true,
    1
  ),
  (
    'Poznáte při prověření vozidla stočený tachometr nebo havarovaný vůz?',
    'Ano, patří to k nejčastějším nálezům. Kombinujeme diagnostiku řídicích jednotek, kontrolu servisní historie, měření tloušťky laku a dalších stop po opravách, což spolehlivě odhalí stočený tachometr i opravu vozu po havárii.',
    true,
    2
  ),
  (
    'Jak rychle od objednání dokážete auto zkontrolovat?',
    'Standardně vyrážíme na kontrolu do 24 až 48 hodin od objednání, v určitých případech a po dohodě ihned. Vše závisí na časových možnostech prodávajícího a naší aktuální vytíženosti v dané lokalitě.',
    true,
    3
  ),
  (
    'Jak dlouho prověření auta trvá?',
    'Kompletní prověření vozidla obvykle trvá 90 až 120 minut. Ústní vyhodnocení a doporučení dostanete ihned po kontrole, písemný protokol s fotografiemi e-mailem do 24 hodin.',
    true,
    4
  ),
  (
    'Prověříte vozidlo přímo u prodejce nebo v autobazaru?',
    'Ano. Přijedeme přímo na místo, kde je vůz k vidění — do autobazaru, servisu nebo k soukromému prodejci.',
    true,
    5
  ),
  (
    'Jaké vozy prověřujete?',
    'Provádíme kontroly všech běžných osobních aut, včetně hybridů, plug-in hybridů a elektromobilů (včetně certifikovaného měření stavu baterie Aviloo). Dále kontrolujeme užitkové vozy do 3.500 Kg.',
    true,
    6
  ),
  (
    'Kde provádíte kontroly aut?',
    'Hlavní oblast působnosti je Praha a Středočeský kraj. Rádi pro vás ale zajistíme kontrolu po celé ČR i v zahraničí. U kontrol v zahraničí se zaměřujeme hlavně na Německo, konkrétně pak oblasti Drážďany, Norimberk, Mnichov.',
    true,
    7
  ),
  (
    'Je možné přes vás zajistit také dodání vozu?',
    'Ano, ať už vyberete vůz kdekoliv v Česku nebo zahraničí, je možné domluvit i dovoz vozu na vaši adresu a to včetně zajištění administrativních úkonů. Více informací o této službě včetně konečné ceny s vámi rádi probereme telefonicky nebo přes email.',
    true,
    8
  );
