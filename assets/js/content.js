/* ==========================================================================
   TRBK - Baza Wiedzy  ·  TREŚĆ
   --------------------------------------------------------------------------
   To jedyny plik, który edytujesz, aby dodać/zmienić treść.
   Struktura: roles[] → groups[] → items[] (artykuły) → blocks[] (treść).

   ➕ Nowy artykuł:  dodaj obiekt { id, title, summary, tags, blocks:[...] }
                     i wstaw go do wybranej grupy (groups[].items).
   ➕ Nowa rola:     dodaj obiekt roli do tablicy `roles` (wzór: koordynator).
                     Rola „w przygotowaniu” → ustaw soon:true (pokaże się jako
                     „Wkrótce”, bez własnych artykułów).

   Dostępne typy bloków (pole "t"): lead, p, h, ul, ol, kv, check, steps, note,
   table, accordion, tabs, cards, img, video, files, links, quote, divider.
   Pełna ściąga w pliku README.md.
   ========================================================================== */
window.KB_CONTENT = (function () {

  /* Artykuły roli „Koordynator Remontów”.
     Każdy przypisujemy do klucza w A.*, a niżej układamy w grupy menu. */
  var A = {};

  /* ====================== START ====================== */

  A.wprowadzenie = {
    id: "wprowadzenie",
    title: "Wprowadzenie",
    summary: "Kim jest koordynator remontów w TRBK, jak wygląda współpraca z flipperem i jak korzystać z tej bazy wiedzy.",
    tags: ["start", "onboarding", "wdrożenie"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Witaj w zespole TRBK. Ta baza wiedzy to Twój kompletny przewodnik wdrożeniowy. Znajdziesz tu wszystko, czego potrzebujesz, aby samodzielnie prowadzić remonty - od rekrutacji ekip, przez zamawianie materiałów, po nadzór i raportowanie." },
      { t: "note", variant: "info", title: "Jak korzystać z tej bazy", html: "Czytaj artykuły po kolei z menu po lewej stronie, albo użyj <strong>wyszukiwarki</strong> (skrót <span class='kbd'>⌘K</span> / <span class='kbd'>Ctrl K</span>), żeby błyskawicznie znaleźć konkretną procedurę. Każdy artykuł ma własny adres - możesz go skopiować i wysłać współpracownikowi." },

      { t: "h", text: "Czym zajmuje się TRBK" },
      { t: "p", html: "TRBK działa w modelu <strong>flippingu nieruchomości</strong>: flipper kupuje mieszkanie, przeprowadza remont i sprzedaje je z zyskiem. Pracujemy zarówno na <strong>rynku pierwotnym</strong> (mieszkania od deweloperów), jak i <strong>wtórnym</strong> (mieszkania używane). Najczęściej prowadzimy <strong>kilka remontów jednocześnie</strong> - i właśnie dlatego potrzebny jest koordynator, który spina całość." },

      { t: "h", text: "Rola koordynatora remontów" },
      { t: "p", html: "Koordynator remontów to osoba, która w imieniu flippera <strong>prowadzi remonty od strony operacyjnej</strong>. Flipper podejmuje decyzje strategiczne i finansowe; koordynator dba o to, żeby prace działy się sprawnie, terminowo i zgodnie ze standardem." },
      { t: "cards", items: [
        { icon: "users", title: "Ekipy", html: "Wyszukujesz, rekrutujesz i nadzorujesz ekipy remontowe." },
        { icon: "cart", title: "Materiały", html: "Zamawiasz materiały i wyposażenie, koordynujesz dostawy." },
        { icon: "clipboard", title: "Nadzór", html: "Pilnujesz postępu prac i regularnie raportujesz flipperowi." },
        { icon: "truck", title: "Terminy", html: "Organizujesz stolarzy, sprzątanie, fotografa, kontenery itp." }
      ] },

      { t: "h", text: "Jak wygląda współpraca - od inwestycji do sprzedaży" },
      { t: "steps", items: [
        { title: "Nowa inwestycja", html: "Flipper przekazuje Ci adres i zakres nowej inwestycji oraz oczekiwany standard wykończenia i termin." },
        { title: "Rekrutacja ekipy", html: "Wystawiasz ogłoszenia, umawiasz spotkania na miejscu, wybieracie ekipę i podpisujecie umowę." },
        { title: "Uruchomienie prac", html: "Organizujesz start: dostęp do lokalu, pierwsze materiały i harmonogram." },
        { title: "Nadzór i kontakt", html: "Odwiedzasz inwestycję min. 2× w tygodniu, jesteś w bieżącym kontakcie z ekipą, rozwiązujesz problemy." },
        { title: "Materiały i dostawy", html: "Na bieżąco zamawiasz materiały według list od ekipy i pilnujesz terminów dostaw." },
        { title: "Raportowanie", html: "Po każdej wizycie dodajesz raport ze zdjęciami do Nozbe (i informujesz flippera)." },
        { title: "Zakończenie", html: "Odbiór prac od ekipy, poprawki, sprzątanie, homestaging i fotograf - mieszkanie trafia do sprzedaży." }
      ] },

      { t: "h", text: "Od czego zacząć" },
      { t: "p", html: "Przejdź kolejno przez sekcję <strong>Start</strong>, a następnie zapoznaj się z <strong>procesami operacyjnymi</strong>. Najważniejsze artykuły na początek:" },
      { t: "links", items: [
        { label: "Zakres obowiązków", href: "#/koordynator-remontow/zakres-obowiazkow", note: "Co należy do Ciebie" },
        { label: "Co robimy / czego nie robimy", href: "#/koordynator-remontow/co-robimy-czego-nie", note: "Granice roli" },
        { label: "Rekrutacja ekip remontowych", href: "#/koordynator-remontow/rekrutacja-ekip", note: "Pierwszy proces" },
        { label: "Checklisty", href: "#/koordynator-remontow/checklisty", note: "Gotowe listy kontrolne" }
      ] },
      { t: "note", variant: "tip", title: "Złota zasada", html: "Jeśli czegoś nie wiesz - <strong>zapytaj flippera</strong>. Lepiej dopytać raz, niż naprawiać błąd przez tydzień. Z czasem ta baza odpowie na większość pytań samodzielnie." }
    ]
  };

  A.zakres = {
    id: "zakres-obowiazkow",
    title: "Zakres obowiązków",
    summary: "Szczegółowa lista zadań koordynatora remontów - pogrupowana w cztery główne obszary.",
    tags: ["obowiązki", "zakres", "odpowiedzialność"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Poniżej znajdziesz pełen zakres obowiązków. To nie jest wyczerpująca lista co do joty - życie inwestycji bywa nieprzewidywalne - ale obejmuje wszystkie najważniejsze zadania, za które odpowiadasz." },

      { t: "h", text: "Obowiązki w pigułce" },
      { t: "cards", items: [
        { icon: "users", title: "Ekipy remontowe", tag: "Ludzie", html: "Wyszukiwanie, rekrutacja, umowy, nadzór i bieżący kontakt." },
        { icon: "cart", title: "Materiały i dostawcy", tag: "Zakupy", html: "Zamawianie materiałów i wyposażenia, kontakt z dostawcami, organizacja dostaw." },
        { icon: "clipboard", title: "Nadzór i raporty", tag: "Kontrola", html: "Wizyty na inwestycji, kontrola postępu, raportowanie flipperowi." },
        { icon: "truck", title: "Koordynacja terminów", tag: "Logistyka", html: "Stolarze, sprzątanie, fotograf, kontenery, hydraulik, elektryk." }
      ] },

      { t: "h", text: "1. Ekipy remontowe" },
      { t: "ul", items: [
        "Wyszukiwanie ekip remontowych w internecie (OLX, Fixly, Facebook).",
        "Rekrutacja ekip - spotkania na miejscu inwestycji, omówienie zakresu prac, standardu wykończenia, terminów i wyceny.",
        "Rekrutujemy przede wszystkim <strong>ekipy kompleksowe</strong> (wykończenie + elektryka + hydraulika). Osobno elektryków/hydraulików szukamy tylko w wyjątkowych sytuacjach.",
        "Podpisywanie umów z ekipami (gotowy wzór dostarcza flipper).",
        "Nadzorowanie postępu prac i bieżący kontakt z ekipami.",
        "Odpowiadanie na pytania ekip - a gdy brakuje wiedzy, konsultacja z flipperem."
      ] },

      { t: "h", text: "2. Materiały i dostawcy" },
      { t: "ul", items: [
        "Zamawianie materiałów i wyposażenia potrzebnych do remontu.",
        "Kontakt z dostawcami materiałów.",
        "Organizowanie dostaw materiałów na inwestycję (termin, dostęp, odbiór)."
      ] },

      { t: "h", text: "3. Nadzór i raportowanie" },
      { t: "ul", items: [
        "Odwiedzanie każdej inwestycji <strong>minimum dwa razy w tygodniu</strong>.",
        "Kontrola postępu prac względem harmonogramu.",
        "Regularne raportowanie flipperowi (raport ze zdjęciami po każdej wizycie)."
      ] },

      { t: "h", text: "4. Koordynacja terminów i logistyki" },
      { t: "ul", items: [
        "Organizowanie terminów dla stolarzy, ekip remontowych, sprzątaczek, fotografów i kontenerów na odpady.",
        "W razie potrzeby - hydraulików (np. przeniesienie wodomierzy) oraz elektryków (np. wykonanie WLZ na rynku wtórnym)."
      ] },

      { t: "h", text: "5. Rozwiązywanie sytuacji awaryjnych" },
      { t: "ul", items: [
        "Gdy ekipa lub inna osoba odpowiedzialna czegoś nie wykona albo nie może wykonać - w zależności od sytuacji organizujesz to samodzielnie.",
        "Masz też do dyspozycji <strong>pomocnika z busem</strong>, który przewozi większe rzeczy: wywóz pozostałych odpadów po remoncie, transport większych elementów od dostawcy, zwroty pozostałości materiałów.",
        "Odbiór wykończonych prac od ekipy i egzekwowanie poprawek - patrz <a href='#/koordynator-remontow/odbior-prac'>Odbiór wykończonego lokalu</a>."
      ] },

      { t: "h", text: "Kluczowe parametry roli" },
      { t: "kv", items: [
        { k: "Wizyty na inwestycji", v: "Minimum 2× w tygodniu, każda zakończona raportem." },
        { k: "Raportowanie", v: "Po każdej wizycie - zdjęcia + status + potrzeby na kolejny tydzień." },
        { k: "Typ ekip", v: "Kompleksowe (wykończenie + elektryka + hydraulika)." },
        { k: "Umowy", v: "Zawsze na wzorze dostarczonym przez flippera." },
        { k: "Płatności za materiały", v: "Realizuje flipper (Ty kompletujesz i przekazujesz do opłacenia)." },
        { k: "Wykończenie i projekt", v: "Decyduje flipper (panele, płytki, kolory, armatura)." },
        { k: "Wsparcie logistyczne", v: "Pomocnik z busem (wywóz odpadów, transport, zwroty pozostałości)." },
        { k: "Eskalacja", v: "Brak wiedzy / decyzja poza zakresem → konsultacja z flipperem." }
      ] },
      { t: "note", variant: "warn", title: "Czego nie rozstrzygasz samodzielnie", html: "Zmiana zakresu prac, istotne odstępstwa od standardu, dodatkowe koszty i kwestie finansowe wymagają zgody flippera. Szczegóły w artykule <a href='#/koordynator-remontow/co-robimy-czego-nie'>Co robimy / czego nie robimy</a>." }
    ]
  };

  A.coRobimy = {
    id: "co-robimy-czego-nie",
    title: "Co robimy / czego nie robimy",
    summary: "Jasne granice roli koordynatora - co należy do Ciebie, a co zostaje po stronie flippera lub ekipy.",
    tags: ["zasady", "granice", "standardy"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Dobra współpraca opiera się na jasnym podziale odpowiedzialności. Poniżej masz wprost rozpisane, co robimy, a czego nie." },

      { t: "note", variant: "success", title: "✅ Co robimy", html: "<ul><li>Aktywnie szukamy i rekrutujemy <strong>ekipy kompleksowe</strong>.</li><li>Spotykamy się na inwestycji, omawiamy zakres, standard, termin i wycenę.</li><li>Podpisujemy umowy na wzorze flippera.</li><li>Zamawiamy materiały i koordynujemy dostawy.</li><li>Nadzorujemy prace (min. 2×/tydzień) i raportujemy.</li><li>Organizujemy stolarzy, sprzątanie, fotografa, kontenery, w razie potrzeby hydraulika/elektryka.</li><li>Jesteśmy pierwszym kontaktem dla ekipy w sprawach bieżących.</li></ul>" },
      { t: "note", variant: "danger", title: "🚫 Czego nie robimy", html: "<ul><li>Nie rekrutujemy osobno elektryków ani hydraulików - tylko wyjątkowo, gdy sytuacja tego wymaga.</li><li>Nie zlecamy prac bez podpisanej umowy.</li><li>Nie zmieniamy zakresu prac ani standardu bez zgody flippera.</li><li>Nie opłacamy materiałów z własnych środków bez wcześniejszych ustaleń.</li><li>Nie podejmujemy samodzielnie decyzji finansowych i projektowych.</li><li>Nie obiecujemy ekipie rzeczy, których nie potwierdził flipper.</li><li>Nie wykonujemy prac remontowych własnoręcznie - od tego jest ekipa.</li></ul>" },

      { t: "h", text: "Decyzje wykończeniowe i projekt - po stronie flippera" },
      { t: "p", html: "O ostatecznym wyglądzie mieszkania decyduje <strong>flipper</strong>. To on przekazuje Ci wytyczne dotyczące standardu i konkretnych materiałów, a Twoim zadaniem jest je zrealizować przy zamawianiu i nadzorze." },
      { t: "note", variant: "info", title: "Co ustala flipper", html: "Flipper informuje koordynatora m.in. o tym, jakie mają być: <strong>panele</strong>, <strong>płytki</strong>, <strong>kolory ścian</strong>, <strong>kolory frontów zabudów stolarskich</strong>, <strong>armatura</strong> oraz pozostałe elementy wykończenia. Jeśli czegoś brakuje w wytycznych - dopytaj, zanim zamówisz." },
      { t: "p", html: "Za <strong>projekt i rysunki techniczne</strong> również odpowiada flipper. Jeśli ekipa ma pytania dotyczące projektu, na które nie potrafisz odpowiedzieć, może skontaktować się z <strong>architektem</strong> (kontakt udostępnia flipper) - patrz <a href='#/koordynator-remontow/nadzor-nad-remontem'>Nadzór nad remontem</a>." },

      { t: "h", text: "Nasze standardy pracy" },
      { t: "ul", items: [
        "<strong>Jakość przede wszystkim.</strong> Wykończenie ma wyglądać jak produkt premium gotowy do sprzedaży.",
        "<strong>Terminowość.</strong> Pilnujemy harmonogramu i reagujemy, gdy coś się opóźnia.",
        "<strong>Dokumentacja.</strong> Każda wizyta = zdjęcia i krótki raport. Raporty i zdjęcia z remontów trafiają do <strong>Nozbe</strong>.",
        "<strong>Komunikacja.</strong> Szybkie, konkretne odpowiedzi na WhatsAppie. Brak odpowiedzi też jest odpowiedzią - unikamy ciszy.",
        "<strong>Transparentność kosztów.</strong> Koszty kontrolujemy w Arkuszach Google; nie ma niespodzianek."
      ] },

      { t: "h", text: "Granica decyzji: kiedy pytać flippera" },
      { t: "table", head: ["Sytuacja", "Decyzja koordynatora", "Decyzja flippera"], rows: [
        ["Drobne pytanie ekipy (technika montażu)", "Tak - jeśli wiesz", "Gdy nie masz pewności"],
        ["Zamówienie materiałów z listy", "Tak - kompletujesz", "Płatność / akceptacja kwoty"],
        ["Zmiana zakresu lub standardu", "Nie", "Tak"],
        ["Dodatkowy, nieplanowany koszt", "Nie", "Tak"],
        ["Wybór ekipy / podpisanie umowy", "Rekomendacja + realizacja", "Akceptacja warunków"],
        ["Reklamacja / poprawki w ramach umowy", "Tak - egzekwujesz", "Gdy sporne"]
      ] },
      { t: "note", variant: "tip", html: "Zasada kciuka: jeśli decyzja zmienia <strong>budżet, zakres albo termin</strong> - najpierw flipper, potem działanie." }
    ]
  };

  A.standardy = {
    id: "standardy-i-oczekiwania",
    title: "Standardy i oczekiwania",
    summary: "Jak pracujemy na co dzień: komunikacja, czas reakcji, dokumentacja i dobre nawyki koordynatora.",
    tags: ["standardy", "komunikacja", "oczekiwania"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Te standardy sprawiają, że kilka remontów naraz da się prowadzić bez chaosu. Trzymaj się ich od pierwszego dnia." },

      { t: "h", text: "Komunikacja" },
      { t: "ul", items: [
        "Podstawowy kanał to <strong>WhatsApp</strong> - osobno z każdą ekipą i z flipperem.",
        "Na wiadomości odpowiadamy tego samego dnia roboczego, najlepiej w ciągu kilku godzin.",
        "Piszemy konkretnie: co, gdzie, kiedy, czego potrzebuję. Załączamy zdjęcia.",
        "Ustalenia istotne dla budżetu/zakresu potwierdzamy na piśmie (wiadomość), nie tylko telefonicznie."
      ] },

      { t: "h", text: "Czego oczekuje flipper" },
      { t: "kv", items: [
        { k: "Proaktywność", v: "Sam wychodzisz z inicjatywą: szukasz ekip, przypominasz o terminach, sygnalizujesz ryzyka zanim staną się problemem." },
        { k: "Rzetelne raporty", v: "Po każdej wizycie: zdjęcia, etap prac, status względem harmonogramu, problemy, potrzeby na kolejny tydzień." },
        { k: "Porządek w dokumentach", v: "Umowy i faktury na Dysku Google; zdjęcia i raporty z remontów w Nozbe." },
        { k: "Kontrola kosztów", v: "Wydatki na bieżąco wpisywane do Arkusza Google danej inwestycji." },
        { k: "Samodzielność", v: "Rozwiązujesz typowe sytuacje sam; eskalujesz tylko to, co naprawdę wymaga decyzji flippera." }
      ] },

      { t: "h", text: "Dobre nawyki koordynatora" },
      { t: "check", title: "Rytm tygodnia", id: "rytm-tygodnia", items: [
        "Zaplanowane min. 2 wizyty na każdej aktywnej inwestycji.",
        "Po każdej wizycie wysłany raport ze zdjęciami.",
        "Zaktualizowany arkusz kosztów po nowych zamówieniach/fakturach.",
        "Sprawdzone, czego ekipy będą potrzebować w przyszłym tygodniu (materiały, decyzje).",
        "Potwierdzone terminy dostaw i podwykonawców na najbliższe dni.",
        "Przejrzane zaległe wiadomości od ekip i flippera - brak „wiszących” pytań."
      ] },
      { t: "note", variant: "info", title: "Jedna inwestycja = jedno miejsce prawdy", html: "Dla każdej inwestycji trzymaj porządek: dokumenty na Dysku Google, zdjęcia i raporty w Nozbe, koszty w jednym arkuszu. Dzięki temu, gdy prowadzisz 4-5 remontów naraz, nic Ci nie umyka." }
    ]
  };

  /* ================ PROCESY OPERACYJNE ================ */

  A.rekrutacja = {
    id: "rekrutacja-ekip",
    title: "Rekrutacja ekip remontowych",
    summary: "Gdzie szukać ekip, jak napisać dobre ogłoszenie, jak przeprowadzić spotkanie na inwestycji i podpisać umowę.",
    tags: ["ekipy", "rekrutacja", "olx", "fixly", "facebook", "ogłoszenie", "umowa", "faktura vat", "pytania"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Pozyskanie dobrej ekipy to jedno z Twoich najważniejszych zadań. Szukamy przede wszystkim <strong>ekip kompleksowych</strong>, które wykonują wykończenie wraz z elektryką i hydrauliką - bez konieczności zatrudniania osobnych fachowców." },
      { t: "note", variant: "tip", title: "Kogo szukamy", html: "Ekip <strong>kompleksowych</strong> (wykończenie + elektryka + hydraulika). Osobno elektryka czy hydraulika szukamy tylko wyjątkowo - np. WLZ na rynku wtórnym albo przeniesienie wodomierzy." },
      { t: "note", variant: "warn", title: "Wymóg: firma + faktura VAT", html: "Współpracujemy <strong>wyłącznie z wykonawcami prowadzącymi działalność gospodarczą</strong>, którzy mogą wystawić <strong>fakturę VAT</strong>. Dotyczy to ekip remontowych, stolarzy i pozostałych podwykonawców - potwierdź to już przy pierwszym kontakcie." },

      { t: "h", text: "Gdzie szukamy ekip" },
      { t: "cards", items: [
        { icon: "store", title: "OLX", tag: "Ogłoszenia", html: "Przeglądasz oferty wykonawców i wystawiasz własne zapytanie. Duża baza ekip." },
        { icon: "tools", title: "Fixly", tag: "Zlecenia", html: "Publikujesz zlecenie z zakresem - wykonawcy sami się zgłaszają z wyceną." },
        { icon: "users", title: "Facebook", tag: "Grupy / Spotted", html: "Grupy remontowe i lokalne „Spotted”. Dobre do szybkiego dotarcia w okolicy inwestycji." }
      ] },

      { t: "h", text: "Jak przygotować ogłoszenie" },
      { t: "p", html: "Niezależnie od kanału, dobre ogłoszenie zawiera komplet informacji - dzięki temu zgłaszają się ekipy faktycznie pasujące do zlecenia:" },
      { t: "ul", items: [
        "<strong>Lokalizacja inwestycji</strong> (miasto / dzielnica).",
        "<strong>Zakres prac</strong> (np. kompleksowe wykończenie mieszkania pod klucz).",
        "<strong>Oczekiwany termin rozpoczęcia.</strong>",
        "Informacja, że szukamy <strong>ekip kompleksowych</strong> (wykończenie + elektryka + hydraulika).",
        "Prośba o <strong>przesłanie realizacji</strong> (zdjęcia) oraz <strong>numeru telefonu</strong>."
      ] },
      { t: "tabs", items: [
        { label: "Wzór wiadomości (rynek pierwotny)", blocks: [
          { t: "p", html: "<em>Sprawdzony wzór do skopiowania - uzupełnij dane w nawiasach:</em>" },
          { t: "note", variant: "info", html: "Poszukuję ekipy, którzy wykonają remont mieszkania w stanie deweloperskim <strong>[metraż] m²</strong> na <strong>[parter / piętro]</strong> (rynek pierwotny) w <strong>[miasto]</strong>. Zakres prac to <strong>prosty standard</strong>, bez zmian układu, bez przeróbek kuchni ani łazienki. Mam gotowy projekt i rysunki, zapewniam materiały. Szukam <strong>ekipy kompleksowej</strong> (wykończenie + elektryka + hydraulika).<br>Możliwy start w <strong>[miesiąc]</strong>. Proszę o odpowiedź zwrotną, czy taki termin odpowiada, a jeśli tak - jak to wygląda cenowo. Pozdrawiam." }
        ] },
        { label: "Wariant: Facebook / Spotted", blocks: [
          { t: "note", variant: "info", html: "Poszukuję <strong>kompleksowej ekipy remontowej</strong> do wykończenia mieszkania <strong>[metraż] m²</strong> (<strong>[dzielnica, miasto]</strong>).<br>Zakres: pełne wykończenie pod klucz - w tym elektryka i hydraulika. Mam gotowy projekt i zapewniam materiały.<br>Start: <strong>[termin]</strong>.<br>Proszę o przesyłanie <strong>numeru telefonu</strong> w wiadomości prywatnej lub w komentarzu. Z góry dziękuję!" }
        ] },
        { label: "Wariant: Fixly", blocks: [
          { t: "note", variant: "info", html: "Kompleksowe wykończenie mieszkania <strong>[metraż] m²</strong>, <strong>[dzielnica, miasto]</strong>. Zakres: wykończenie + elektryka + hydraulika, prosty standard. Mam gotowy projekt i materiały. Start: <strong>[termin]</strong>. Proszę o wycenę oraz przewidywany czas realizacji. Spotkanie i szczegóły na inwestycji." }
        ] }
      ] },

      { t: "h", text: "Proces rekrutacji krok po kroku" },
      { t: "steps", items: [
        { title: "Publikujesz ogłoszenie", html: "Na OLX / Fixly / Facebooku, z kompletem informacji jak wyżej." },
        { title: "Zbierasz zgłoszenia", html: "Notujesz kontakty, robisz wstępną selekcję." },
        { title: "Umawiasz spotkanie na inwestycji", html: "Z wybranymi ekipami - najlepiej bezpośrednio w remontowanym lokalu." },
        { title: "Omawiasz szczegóły", html: "Zakres prac, standard wykończenia, termin realizacji oraz wycenę." },
        { title: "Wybieracie ekipę", html: "Rekomendujesz flipperowi; po akceptacji warunków przechodzicie do umowy." },
        { title: "Podpisujecie umowę", html: "Na gotowym wzorze dostarczonym przez flippera." }
      ] },

      { t: "h", text: "Spotkanie na inwestycji - co omówić" },
      { t: "check", title: "Agenda spotkania z ekipą", id: "agenda-spotkania", items: [
        "Pełny zakres prac (pomieszczenie po pomieszczeniu).",
        "Standard wykończenia i oczekiwana jakość.",
        "Czy ekipa robi elektrykę i hydraulikę (kompleksowość).",
        "Prowadzi działalność gospodarczą i wystawia fakturę VAT.",
        "Termin rozpoczęcia i orientacyjny czas realizacji.",
        "Wycena - zakres objęty ceną i co jest poza nią.",
        "Kto dostarcza materiały (my) i jak wygląda przepływ list materiałowych.",
        "Dostępność ekipy (czy nie prowadzi 5 innych zleceń naraz).",
        "Realizacje / referencje do wglądu."
      ] },

      { t: "h", text: "Jak rozmawiać z ekipą - przykładowe pytania" },
      { t: "p", html: "Na spotkaniu prowadź rozmowę konkretnie. Poniżej pytania, które warto zadać, oraz przykładowy fragment rozmowy." },
      { t: "ul", items: [
        "Czy prowadzą Państwo działalność gospodarczą i wystawiają fakturę VAT?",
        "Czy ekipa wykonuje kompleksowo wykończenie wraz z elektryką i hydrauliką?",
        "Ile osób liczy ekipa i ile zleceń prowadzą Państwo obecnie równolegle?",
        "W jakim terminie możecie zacząć i ile potrwa realizacja takiego metrażu?",
        "Co dokładnie obejmuje wycena, a co jest poza nią (np. materiały, wywóz odpadów)?",
        "Czy mogę zobaczyć zdjęcia ostatnich realizacji o podobnym standardzie?",
        "Jak wygląda płatność - etapy/transze przy określonym postępie prac?",
        "Czy podpiszą Państwo umowę na naszym wzorze?"
      ] },
      { t: "note", variant: "info", title: "Przykładowy fragment rozmowy", html: "<strong>Ty:</strong> Dzień dobry, prowadzę remont mieszkania w stanie deweloperskim, ok. [metraż] m², prosty standard - pełne wykończenie z elektryką i hydrauliką. Materiały i projekt zapewniamy my. Czy to zakres, który Państwo robią?<br><strong>Wykonawca:</strong> Tak, robimy kompleksowo.<br><strong>Ty:</strong> Świetnie. Prowadzą Państwo działalność i wystawiają fakturę VAT?<br><strong>Wykonawca:</strong> Tak.<br><strong>Ty:</strong> To jaki termin startu i ile zajmie taki metraż? I co obejmuje wycena? Poproszę też o kilka zdjęć ostatnich realizacji. Umowę podpisujemy na naszym wzorze." },

      { t: "h", text: "Umowa z ekipą" },
      { t: "p", html: "Umowę zawsze zawieramy na <strong>gotowym wzorze, który dostarcza flipper</strong>. Nie tworzysz własnych umów ani nie zlecasz prac „na słowo”." },
      { t: "note", variant: "danger", title: "Zasada bezwzględna", html: "Żadne prace nie ruszają bez podpisanej umowy. To chroni i nas, i ekipę." },
      { t: "files", items: [
        { name: "Wzór umowy z ekipą remontową", type: "PDF", note: "Udostępnia flipper" }
      ] },

      { t: "h", text: "Najczęstsze błędy" },
      { t: "ul", items: [
        "Brak spotkania na miejscu - wycena „w ciemno” prawie zawsze się rozjeżdża.",
        "Niejasny zakres prac - potem spory o to, co było w cenie.",
        "Wybór najtańszej oferty bez sprawdzenia realizacji i dostępności.",
        "Zlecenie prac przed podpisaniem umowy."
      ] },
      { t: "note", variant: "tip", title: "Dobra praktyka", html: "Buduj własną listę sprawdzonych ekip. Dobra, dostępna ekipa jest na wagę złota przy kilku remontach naraz." }
    ]
  };

  A.rekrutacjaStolarzy = {
    id: "rekrutacja-stolarzy",
    title: "Rekrutacja stolarzy",
    summary: "Jak pozyskać stolarza do kuchni i zabudów na wymiar: moce przerobowe, terminy, faktura VAT oraz gotowy wzór zapytania ofertowego.",
    tags: ["stolarze", "rekrutacja", "kuchnie", "zabudowy", "wycena", "faktura vat", "moce przerobowe"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Stolarz wykonuje kuchnie i zabudowy stałe na wymiar - to jeden z droższych i najbardziej wrażliwych terminowo elementów. Szukamy firm, które udźwigną <strong>powtarzalną</strong> produkcję dla wielu mieszkań i utrzymają terminy." },
      { t: "note", variant: "warn", title: "Wymóg: firma + faktura VAT", html: "Współpracujemy wyłącznie ze stolarzami <strong>prowadzącymi działalność gospodarczą</strong>, którzy wystawiają <strong>fakturę VAT</strong>." },

      { t: "h", text: "Czego szukamy u stolarza" },
      { t: "ul", items: [
        "<strong>Moce przerobowe</strong> - zdolność realizacji kilku mieszkań (często 2-6) w zakładanym terminie.",
        "<strong>Powtarzalność</strong> - ten sam układ i zabudowa w wielu lokalach, z tych samych materiałów.",
        "<strong>Terminowość</strong> - montaż na lokalu maksymalnie 3-4 dni (meble przygotowane i skompletowane wcześniej).",
        "Jakość frontów i zgodność z projektem oraz wytycznymi flippera (kolory, materiały).",
        "Gotowość do <strong>długofalowej współpracy</strong> przy kolejnych inwestycjach."
      ] },

      { t: "h", text: "Gdzie szukać" },
      { t: "cards", items: [
        { icon: "store", title: "OLX", tag: "Ogłoszenia", html: "Zapytania do stolarzy i firm meblowych." },
        { icon: "users", title: "Facebook", tag: "Grupy / polecenia", html: "Grupy stolarskie i lokalne polecenia." },
        { icon: "handshake", title: "Polecenia", tag: "Sieć kontaktów", html: "Sprawdzeni stolarze z dotychczasowych realizacji." }
      ] },

      { t: "h", text: "Jak wygląda proces" },
      { t: "steps", items: [
        { title: "Wyślij zapytanie z wyceną", html: "Prześlij specyfikację stolarki (PDF) i poproś o wycenę, moce przerobowe oraz terminy." },
        { title: "Zbierz oferty", html: "Porównaj ceny, realne moce przerobowe i terminy realizacji." },
        { title: "Spotkanie w biurze", html: "Dopięcie modelu współpracy, harmonogramu i warunków." },
        { title: "Próbna realizacja", html: "Pierwsze mieszkanie - wzajemne poznanie i wypracowanie modelu pracy." },
        { title: "Długofalowa współpraca", html: "Po udanej realizacji - kolejne inwestycje wg ustalonego modelu." }
      ] },

      { t: "h", text: "Wzór wiadomości do stolarza (zapytanie ofertowe)" },
      { t: "p", html: "<em>Skopiuj i dostosuj dane w nawiasach. Załącz specyfikację PDF.</em>" },
      { t: "note", variant: "info", html: "Witam,<br>przesyłamy do wyceny stolarkę meblową dla mieszkania o powierzchni <strong>[metraż] m²</strong>, planowanego do realizacji w <strong>[miesiąc]</strong>.<br>Zależy nam nie tylko na wycenie jednego mieszkania, ale również na określeniu Państwa możliwości produkcyjnych. W zależności od ustaleń możemy zlecić wykonanie 2, 3, 4, a nawet 6 mieszkań o identycznym układzie i praktycznie takiej samej zabudowie meblowej, wykonanej z tych samych materiałów.<br><br>Na tym etapie chcielibyśmy poznać:<br>- cenę wykonania stolarki dla jednego mieszkania zgodnie z załączoną specyfikacją PDF,<br>- Państwa moce przerobowe i liczbę mieszkań, jaką byliby Państwo w stanie zrealizować w zakładanym terminie,<br>- terminy realizacji.<br><br>Jeżeli współpraca przy pierwszej realizacji przebiegnie pomyślnie, liczymy na długofalową współpracę przy kolejnych inwestycjach. Oczywiście przy pierwszym mieszkaniu musimy się wzajemnie poznać, spotkać i wypracować odpowiedni model działania. Kluczowe są jednak dla nas terminy realizacji oraz realne moce przerobowe Państwa zespołu.<br><br>Zależy nam na współpracy z firmą, która jest przygotowana do sprawnej i powtarzalnej realizacji większej liczby lokali. Nie możemy pozwolić sobie na sytuację, w której montaż stolarki w mieszkaniu o powierzchni [metraż] m² trwa dwa tygodnie. Zakładamy model pracy, w którym meble są odpowiednio przygotowane i skompletowane wcześniej, a sam montaż na lokalu powinien zamknąć się maksymalnie w 3-4 dniach.<br><br>Po otrzymaniu wyceny będziemy mogli przejść do dalszych rozmów dotyczących współpracy, ustalenia harmonogramu, warunków realizacji oraz spotkania w biurze w celu dopięcia wszystkich szczegółów.<br>Prosimy o konkretną informację zwrotną dotyczącą ceny, terminów oraz możliwości realizacyjnych.<br>Poniżej przesyłamy pełną specyfikację do wyceny. Bardzo nam zależy, aby do <strong>[termin]</strong> otrzymać ofertę zwrotną.<br>Z góry dziękujemy i czekamy na odpowiedź.<br>Pozdrawiam," },
      { t: "files", items: [
        { name: "Specyfikacja stolarki (PDF)", type: "PDF", note: "Udostępnia flipper / projektant" }
      ] },

      { t: "h", text: "Checklista wyboru stolarza" },
      { t: "check", title: "Kryteria stolarza", id: "kryteria-stolarza", items: [
        "Działalność gospodarcza i faktura VAT.",
        "Wycena na podstawie specyfikacji PDF.",
        "Potwierdzone moce przerobowe (liczba mieszkań w terminie).",
        "Terminy realizacji i montaż na lokalu maksymalnie 3-4 dni.",
        "Zgodność z projektem i wytycznymi (materiały, kolory frontów).",
        "Gotowość do długofalowej, powtarzalnej współpracy.",
        "Realizacje / referencje do wglądu."
      ] }
    ]
  };

  A.rekrutacjaPodwykonawcy = {
    id: "rekrutacja-podwykonawcy",
    title: "Rekrutacja pozostałych podwykonawców",
    summary: "Złota rączka, sprzątaczka, szklarz, spawacz i inni specjaliści wzywani w razie potrzeby - gdzie ich szukać i na co zwracać uwagę.",
    tags: ["podwykonawcy", "rekrutacja", "złota rączka", "sprzątaczka", "szklarz", "spawacz", "faktura vat"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Poza ekipą remontową i stolarzem czasem potrzebujesz dodatkowych specjalistów - do drobnych napraw, prac wykończeniowych czy porządków. Warto mieć ich sprawdzonych i pod telefonem." },
      { t: "note", variant: "warn", title: "Firma + faktura VAT", html: "Tam, gdzie to możliwe, współpracujemy z wykonawcami na <strong>fakturę VAT</strong> (działalność gospodarcza)." },

      { t: "h", text: "Kogo najczęściej potrzebujemy" },
      { t: "cards", items: [
        { icon: "tools", title: "Złota rączka", tag: "Drobne naprawy", html: "Szybkie naprawy i usterki, gdy coś się zepsuje lub wymaga poprawki." },
        { icon: "clipboard", title: "Sprzątaczka", tag: "Sprzątanie", html: "Sprzątanie poremontowe przed homestagingiem i sesją zdjęciową." },
        { icon: "image", title: "Szklarz", tag: "Lustra / szyby", html: "Lustra łazienkowe i szyby na wymiar." },
        { icon: "bolt", title: "Spawacz", tag: "Metaloplastyka", html: "Balustrady i elementy metalowe na wymiar." },
        { icon: "tools", title: "Elektryk", tag: "Wyjątkowo", html: "Np. WLZ na rynku wtórnym." },
        { icon: "tools", title: "Hydraulik", tag: "Wyjątkowo", html: "Np. przeniesienie wodomierzy." }
      ] },
      { t: "p", html: "Lista jest otwarta - w razie potrzeby dochodzą kolejni specjaliści (np. monter, ślusarz)." },

      { t: "h", text: "Gdzie szukać i jak prowadzić" },
      { t: "ul", items: [
        "Kanały: OLX, Fixly, Facebook (grupy / Spotted), polecenia.",
        "Ustal zakres, wycenę, dostępność i fakturę VAT już przy pierwszym kontakcie.",
        "Sprawdzonych, dostępnych wykonawców dopisuj do <a href='#/koordynator-remontow/spis-telefonow'>Spisu telefonów</a> - to oszczędza czas przy kolejnych inwestycjach."
      ] },
      { t: "note", variant: "tip", html: "Najwięcej zyskujesz na <strong>powtarzalności</strong>: raz sprawdzony szklarz czy złota rączka pod telefonem to mniej szukania przy każdym remoncie." }
    ]
  };

  A.materialy = {
    id: "zamawianie-materialow",
    title: "Zamawianie materiałów",
    summary: "Ogólny obieg zamówień oraz dokładne procedury dla Leroy Merlin, Benmar, Nexterio, Mexen, Allegro i Led-Lux.",
    tags: ["materiały", "zamówienia", "leroy merlin", "benmar", "nexterio", "mexen", "allegro", "led-lux", "oświetlenie", "sztukateria", "płatności", "dostawa"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Materiały zamawiasz na podstawie list od ekipy oraz potrzeb wynikających ze standardu wykończenia. Obowiązuje stała zasada płatności: <strong>zamówienie kompletujesz Ty, opłaca je flipper</strong>." },
      { t: "note", variant: "info", title: "Co zamawiamy, wynika z wytycznych flippera", html: "Konkretne materiały (panele, płytki, kolory, armatura, oświetlenie itd.) wskazuje <strong>flipper</strong>. Ty zamawiasz zgodnie z tymi wytycznymi i projektem - patrz <a href='#/koordynator-remontow/co-robimy-czego-nie'>Co robimy / czego nie robimy</a>." },

      { t: "h", text: "Ogólny obieg zamówienia" },
      { t: "steps", items: [
        { title: "Ekipa przesyła listę materiałów", html: "Lub potrzeba wynika z projektu/standardu." },
        { title: "Kompletujesz zamówienie u właściwego dostawcy", html: "Według procedury dla danego sklepu (poniżej)." },
        { title: "Płatność realizuje flipper", html: "Najczęściej: przelew tradycyjny + zrzut ekranu z danymi do płatności przesłany flipperowi." },
        { title: "Organizujesz dostawę na inwestycję", html: "Ustalasz termin i dostęp; pilnujesz odbioru." }
      ] },
      { t: "note", variant: "warn", title: "Zasada płatności", html: "Standard to <strong>przelew tradycyjny</strong>. Przy dostawcach z płatnością online robisz <strong>zrzut ekranu z danymi do przelewu</strong> i wysyłasz go flipperowi do opłacenia. Nie płacisz z własnych środków bez wcześniejszych ustaleń." },

      { t: "h", text: "Procedury dla dostawców" },
      { t: "tabs", items: [
        { label: "Leroy Merlin", blocks: [
          { t: "p", html: "Większość materiałów budowlanych i wyposażenia, a także panele." },
          { t: "steps", items: [
            { title: "Przygotuj listę materiałów", html: "Skompletuj potrzebne pozycje." },
            { title: "Wyślij mailowo do opiekuna", html: "Dołącz <strong>adres dostawy</strong> oraz <strong>termin dostawy</strong>." },
            { title: "Opiekun przygotowuje zamówienie", html: "Po stronie Leroy Merlin." },
            { title: "Zamówienie trafia do flippera", html: "Do akceptacji i opłacenia." },
            { title: "Flipper opłaca zamówienie", html: "Po opłaceniu realizowana jest dostawa." }
          ] }
        ] },
        { label: "Benmar", blocks: [
          { t: "p", html: "Dostawca obsługujący zamówienia materiałowe wraz z organizacją dostawy." },
          { t: "steps", items: [
            { title: "Ekipa przesyła listę materiałów", html: "Zbierasz dokładną specyfikację." },
            { title: "Przesyłasz dane do Benmaru", html: "Podajesz: <strong>adres inwestycji</strong>, <strong>numer telefonu wykonawcy</strong> oraz <strong>listę materiałów</strong>." },
            { title: "Benmar przygotowuje zamówienie i dostawę", html: "Organizuje kompletację oraz transport na miejsce." }
          ] }
        ] },
        { label: "Nexterio", blocks: [
          { t: "p", html: "Płytki." },
          { t: "steps", items: [
            { title: "Skompletuj zamówienie na stronie", html: "Dodaj wszystkie potrzebne pozycje (płytki + akcesoria)." },
            { title: "Wybierz „przelew tradycyjny”", html: "Przy finalizacji zamówienia." },
            { title: "Zrzut ekranu z danymi do płatności", html: "Zapisz screenshot z numerem konta i kwotą." },
            { title: "Wyślij screenshot flipperowi", html: "On dokonuje płatności." }
          ] }
        ] },
        { label: "Mexen", blocks: [
          { t: "p", html: "Armatura." },
          { t: "steps", items: [
            { title: "Zaloguj się na platformę B2B", html: "Korzystamy z konta hurtowego B2B." },
            { title: "Dodaj produkty do koszyka", html: "Skompletuj armaturę z listy/projektu." },
            { title: "Złóż zamówienie i wybierz „przelew tradycyjny”", html: "Jako metodę płatności." },
            { title: "Zrzut ekranu z danymi do przelewu", html: "Zapisz screenshot." },
            { title: "Wyślij screenshot flipperowi", html: "W celu opłacenia zamówienia." }
          ] }
        ] },
        { label: "Allegro", blocks: [
          { t: "p", html: "Sztukateria, listwy, gotowe lustra, oświetlenie i drobne wyposażenie." },
          { t: "steps", items: [
            { title: "Skompletuj koszyk", html: "Dodaj potrzebne pozycje (sztukateria, listwy, gotowe lustra, oświetlenie itp.)." },
            { title: "Wybierz przelew tradycyjny", html: "Przygotuj podsumowanie / zrzut ekranu z danymi do płatności." },
            { title: "Wyślij flipperowi do opłacenia", html: "Po opłaceniu pilnujesz dostawy na inwestycję." }
          ] }
        ] },
        { label: "Led-Lux", blocks: [
          { t: "p", html: "Wyspecjalizowany dostawca <strong>oświetlenia</strong>." },
          { t: "steps", items: [
            { title: "Skompletuj listę oświetlenia", html: "Według projektu i wytycznych flippera." },
            { title: "Ustal zamówienie i płatność", html: "Przygotuj podsumowanie / zrzut ekranu z danymi do przelewu." },
            { title: "Przekaż flipperowi do opłacenia", html: "Następnie koordynujesz dostawę." }
          ] }
        ] }
      ] },

      { t: "h", text: "Skrót: dostawca → metoda → kto płaci" },
      { t: "table", head: ["Dostawca", "Co zamawiamy", "Jak składamy", "Płatność"], rows: [
        ["Leroy Merlin", "Materiały, wyposażenie, panele", "Mailowo do opiekuna (adres + termin)", "Flipper opłaca przygotowane zamówienie"],
        ["Benmar", "Materiały budowlane + dostawa", "Adres + tel. wykonawcy + lista", "Otwarty rachunek"],
        ["Nexterio", "Płytki", "Koszyk na stronie, przelew tradycyjny", "Screenshot → flipper opłaca"],
        ["Mexen", "Armatura", "Platforma B2B, przelew tradycyjny", "Screenshot → flipper opłaca"],
        ["Allegro", "Sztukateria, listwy, gotowe lustra, oświetlenie", "Koszyk na Allegro, przelew tradycyjny", "Wg ustaleń z flipperem"],
        ["Led-Lux", "Oświetlenie", "Zamówienie u dostawcy", "Screenshot → flipper opłaca"]
      ], caption: "Pełne kroki dla każdego dostawcy znajdziesz w zakładkach powyżej." },

      { t: "h", text: "Zanim wyślesz zamówienie" },
      { t: "check", title: "Checklista zamówienia", id: "checklista-zamowienia", items: [
        "Lista kompletna i zgodna z tym, czego potrzebuje ekipa.",
        "Ilości sprawdzone (m², sztuki, zapas na docinki/straty).",
        "Wybrany właściwy dostawca dla danego asortymentu.",
        "Podany poprawny adres inwestycji i termin dostawy.",
        "Wybrana właściwa metoda płatności (najczęściej przelew tradycyjny).",
        "Zrzut ekranu / zamówienie przesłane flipperowi do opłacenia.",
        "Dostawa skoordynowana z dostępem do lokalu i obecnością ekipy."
      ] },
      { t: "note", variant: "tip", html: "Zamawiaj z wyprzedzeniem. Brakujący materiał potrafi zatrzymać całą ekipę na kilka dni - a to realny koszt." }
    ]
  };

  A.nadzor = {
    id: "nadzor-nad-remontem",
    title: "Nadzór nad remontem",
    summary: "Oględziny remontów, kontakt z ekipami i raporty po każdej wizycie - co dokładnie ma zawierać.",
    tags: ["nadzór", "raport", "wizyta", "kontrola", "harmonogram", "zdjęcia", "nozbe", "architekt"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Regularny nadzór to serce Twojej roli. Dzięki niemu flipper ma stały wgląd w postęp wszystkich inwestycji, a problemy łapiemy zanim urosną." },
      { t: "note", variant: "warn", title: "Częstotliwość wizyt", html: "Każdą inwestycję odwiedzasz <strong>minimum dwa razy w tygodniu</strong>. Każda wizyta kończy się krótkim raportem." },

      { t: "h", text: "Przebieg wizyty" },
      { t: "steps", items: [
        { title: "Oględziny postępu", html: "Przechodzisz przez lokal, porównujesz stan z harmonogramem i standardem." },
        { title: "Dokumentacja zdjęciowa", html: "Robisz zdjęcia każdego pomieszczenia i kluczowych detali." },
        { title: "Rozmowa z ekipą", html: "Pytasz o postępy, blokery i potrzeby na kolejny tydzień." },
        { title: "Notujesz problemy i decyzje", html: "Wszystko, co wymaga reakcji Twojej lub flippera." },
        { title: "Dodajesz raport do Nozbe", html: "Po wizycie dodajesz raport ze zdjęciami do Nozbe i w razie potrzeby informujesz flippera." }
      ] },

      { t: "h", text: "Raport z wizyty - co zawiera" },
      { t: "p", html: "Po każdej wizycie przygotowujesz krótki raport. Powinien zawierać:" },
      { t: "kv", items: [
        { k: "Dokumentacja zdjęciowa", v: "Zdjęcia z bieżącej wizyty (pomieszczenia + detale)." },
        { k: "Etap prac", v: "Krótki opis, co aktualnie się dzieje." },
        { k: "Postęp vs harmonogram", v: "Czy jesteśmy na czas, przed czy po terminie." },
        { k: "Problemy", v: "Lista ewentualnych problemów i ryzyk." },
        { k: "Potrzeby na kolejny tydzień", v: "Materiały, decyzje, zamówienia, dodatkowe prace itp." }
      ] },
      { t: "note", variant: "info", title: "Gdzie trafia raport", html: "Raport wraz ze zdjęciami dodajesz do <strong>Nozbe</strong> - tam prowadzimy raportowanie i zarządzanie flipami. Zdjęć z remontów nie wrzucamy na Dysk Google. O gotowym raporcie możesz krótko poinformować flippera na WhatsApp." },

      { t: "h", text: "Bieżący kontakt z ekipą" },
      { t: "ul", items: [
        "Jesteś pierwszym kontaktem ekipy w sprawach bieżących.",
        "Na pytania, które znasz - odpowiadasz od razu. Gdy brakuje wiedzy - konsultujesz z flipperem i wracasz z odpowiedzią.",
        "Pytania techniczne dotyczące <strong>projektu i rysunków</strong> (za które odpowiada flipper) ekipa może kierować do <strong>architekta</strong> - kontakt udostępnia flipper.",
        "Nie zostawiasz ekipy bez odpowiedzi - przestój generuje koszty i opóźnienia."
      ] },

      { t: "h", text: "Najczęstsze problemy i jak reagować" },
      { t: "table", head: ["Problem", "Reakcja"], rows: [
        ["Opóźnienie względem harmonogramu", "Ustal przyczynę, zaktualizuj plan, poinformuj flippera."],
        ["Brak materiału blokuje prace", "Pilne domówienie; na przyszłość zamawiaj z większym wyprzedzeniem."],
        ["Jakość poniżej standardu", "Wskaż ekipie poprawki w ramach umowy, udokumentuj zdjęciami."],
        ["Pytanie poza Twoją wiedzą", "Skonsultuj z flipperem, nie zgaduj."],
        ["Ekipa proponuje zmianę zakresu", "Nie decyduj sam - przekaż flipperowi do akceptacji."]
      ] },
      { t: "check", title: "Checklista raportu po wizycie", id: "checklista-raportu", items: [
        "Zdjęcia ze wszystkich pomieszczeń wykonane.",
        "Opisany aktualny etap prac.",
        "Określony status względem harmonogramu.",
        "Spisane problemy / ryzyka.",
        "Spisane potrzeby ekipy na kolejny tydzień.",
        "Raport ze zdjęciami dodany do Nozbe.",
        "W razie potrzeby flipper poinformowany o statusie."
      ] }
    ]
  };

  A.terminy = {
    id: "terminy-i-dostawy",
    title: "Organizacja terminów i dostaw",
    summary: "Kogo i kiedy umawiamy: stolarze, sprzątanie, homestaging, fotograf, kontenery, hydraulik, elektryk, pomocnik - oraz logistyka dostaw.",
    tags: ["terminy", "harmonogram", "stolarz", "fotograf", "sprzątanie", "homestaging", "kontener", "pomocnik", "bus", "dostawy", "logistyka"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Remont to nie tylko ekipa. Wokół niej krąży kilku podwykonawców i dostaw, które trzeba spiąć w czasie, żeby nikt na nikogo nie czekał." },

      { t: "h", text: "Kogo umawiasz" },
      { t: "cards", items: [
        { icon: "tools", title: "Ekipa remontowa", html: "Główny wykonawca - wyznacza rytm całego harmonogramu." },
        { icon: "hardhat", title: "Stolarze", html: "Kuchnie i zabudowy stałe. Pomiar i montaż na konkretnym etapie." },
        { icon: "image", title: "Fotograf", html: "Zdjęcia gotowego mieszkania do oferty sprzedażowej." },
        { icon: "clipboard", title: "Sprzątaczki", html: "Sprzątanie poremontowe przed sesją i przekazaniem." },
        { icon: "truck", title: "Kontener na odpady", html: "Podstawienie i odbiór gruzu/odpadów w odpowiednim momencie." },
        { icon: "bolt", title: "Elektryk", html: "Np. wykonanie WLZ na rynku wtórnym." },
        { icon: "tools", title: "Hydraulik", html: "Np. przeniesienie wodomierzy, wymiana grzejników, przeróbki pionów." },
        { icon: "image", title: "Homestaging", html: "Aranżacja i dekoracja wnętrza przed sesją zdjęciową - lepsza prezentacja oferty." },
        { icon: "truck", title: "Pomocnik z busem", html: "Transport większych rzeczy: wywóz odpadów, dostawy, zwroty pozostałości." }
      ] },

      { t: "h", text: "Typowa kolejność prac" },
      { t: "p", html: "Kolejność bywa różna, ale zwykle wygląda tak (skrót - szczegóły zależą od projektu):" },
      { t: "steps", items: [
        { title: "Prace rozbiórkowe / przygotowawcze", html: "Kontener na odpady podstawiony na czas." },
        { title: "Instalacje (elektryka, hydraulika)", html: "Na rynku wtórnym często wymiana; na pierwotnym zwykle modyfikacje." },
        { title: "Prace mokre i wykończeniowe", html: "Tynki, gładzie, płytki, malowanie." },
        { title: "Pomiar stolarki", html: "Stolarz mierzy kuchnię/zabudowy, gdy ściany i instalacje są gotowe." },
        { title: "Podłogi, biały montaż, armatura", html: "Panele, drzwi, montaż armatury (Mexen) i ceramiki." },
        { title: "Montaż kuchni i zabudów", html: "Stolarze montują na umówiony termin." },
        { title: "Lustra na wymiar", html: "Szklarz po ustaleniu finalnych wymiarów w łazience." },
        { title: "Sprzątanie poremontowe", html: "Przed homestagingiem i sesją zdjęciową." },
        { title: "Homestaging", html: "Aranżacja i dekoracja wnętrza, aby mieszkanie lepiej prezentowało się na zdjęciach i w ofercie." },
        { title: "Sesja zdjęciowa", html: "Fotograf - materiał do oferty sprzedaży." }
      ] },
      { t: "note", variant: "tip", title: "Zasada wyprzedzenia", html: "Stolarzy i fotografa rezerwuj z wyprzedzeniem - dobre terminy potrafią być zajęte. Pomiar stolarki umawiaj dopiero, gdy ściany i instalacje są na swoim miejscu." },

      { t: "h", text: "Dostawy materiałów na inwestycję" },
      { t: "ul", items: [
        "Termin dostawy ustalaj tak, by ktoś mógł odebrać materiał (ekipa na miejscu).",
        "Zadbaj o dostęp do lokalu i miejsce na rozładunek.",
        "Przy większych dostawach uprzedź ekipę, żeby zaplanowała pracę.",
        "Na rynku pierwotnym pamiętaj o kwestii <strong>prądu budowlanego</strong> - patrz <a href='#/koordynator-remontow/rynek-pierwotny'>Rynek pierwotny</a>."
      ] },

      { t: "h", text: "Pomocnik z busem i sytuacje awaryjne" },
      { t: "p", html: "Gdy ekipa lub podwykonawca czegoś nie wykona albo trzeba przewieźć coś większego, masz do dyspozycji <strong>pomocnika z busem</strong>." },
      { t: "ul", items: [
        "Wywóz pozostałych odpadów po remoncie.",
        "Transport większych elementów od dostawcy na inwestycję.",
        "Zwroty pozostałości materiałów z remontu.",
        "Inne sytuacje wymagające większego transportu."
      ] },

      { t: "check", title: "Checklista koordynacji terminów", id: "checklista-koordynacji", items: [
        "Harmonogram prac ekipy znany i aktualny.",
        "Kontener na odpady umówiony na etap rozbiórki.",
        "Pomiar stolarki zaplanowany po gotowości ścian/instalacji.",
        "Montaż kuchni i zabudów potwierdzony ze stolarzem.",
        "Szklarz umówiony po finalnych wymiarach luster.",
        "Sprzątanie poremontowe zarezerwowane przed homestagingiem.",
        "Homestaging zaplanowany przed sesją zdjęciową.",
        "Fotograf zarezerwowany na termin po homestagingu.",
        "Dostawy zsynchronizowane z dostępem do lokalu."
      ] }
    ]
  };

  A.odbior = {
    id: "odbior-prac",
    title: "Odbiór wykończonego lokalu",
    summary: "Jak odebrać prace od ekipy: co dokładnie sprawdzić pomieszczenie po pomieszczeniu, jak spisać usterki i wyegzekwować poprawki.",
    tags: ["odbiór", "odbiór prac", "usterki", "poprawki", "jakość", "kontrola"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Odbiór wykończonego lokalu to moment, w którym sprawdzasz, czy prace zostały wykonane zgodnie z projektem i standardem, oraz spisujesz usterki do poprawy. To Twój odbiór prac od ekipy - nie mylić z odbiorem mieszkania od dewelopera." },
      { t: "note", variant: "info", title: "Kiedy robimy odbiór", html: "Gdy ekipa zgłasza zakończenie prac (lub etapu). Najlepiej z udziałem ekipy - od razu wskazujesz, co wymaga poprawy." },

      { t: "h", text: "Cel odbioru" },
      { t: "ul", items: [
        "Potwierdzić zgodność wykonania z <strong>projektem</strong> i ustalonym <strong>standardem</strong>.",
        "Wychwycić usterki i niedoróbki, zanim mieszkanie trafi do homestagingu i sprzedaży.",
        "Wyegzekwować poprawki w ramach umowy, zanim nastąpi rozliczenie z ekipą."
      ] },

      { t: "h", text: "Co sprawdzić - pomieszczenie po pomieszczeniu" },
      { t: "p", html: "Przejdź cały lokal metodycznie. Dobre światło i miarka bardzo pomagają." },
      { t: "table", head: ["Obszar", "Na co zwrócić uwagę"], rows: [
        ["Ściany i malowanie", "Równość, brak zacieków, smug i przebarwień; jednolity kolor; brak pęknięć."],
        ["Płytki i fugi", "Równe ułożenie, brak pustek pod płytką, równe i czyste fugi, estetyczny silikon."],
        ["Podłogi i listwy", "Panele bez uszkodzeń i szczelin, listwy równo, dylatacje przy ścianach."],
        ["Drzwi i okna", "Montaż, regulacja, domykanie, brak rys i uszkodzeń."],
        ["Biały montaż i armatura", "Szczelność, brak przecieków, stabilny montaż, estetyka."],
        ["Elektryka", "Działające gniazdka, włączniki i oświetlenie; równo osadzony osprzęt."],
        ["Stolarka (kuchnia, zabudowy)", "Równe szczeliny, domyk frontów, zgodność z projektem i kolorem."],
        ["Wykończenie ogólne", "Sztukateria, listwy ozdobne, lustra - równo i estetycznie."],
        ["Czystość", "Brak resztek kleju, farby, zaprawy; lokal gotowy do sprzątania/homestagingu."]
      ] },

      { t: "h", text: "Usterki i poprawki" },
      { t: "steps", items: [
        { title: "Spisz usterki", html: "Zrób listę z dokumentacją zdjęciową (zdjęcia trafiają do Nozbe)." },
        { title: "Ustal poprawki z ekipą", html: "Wskaż, co i do kiedy ma być poprawione - w ramach umowy." },
        { title: "Sprawdź wykonanie poprawek", html: "Odbiór kontrolny po naprawach; dokumentuj efekt." },
        { title: "Zgłoś status flipperowi", html: "Raport z odbioru w Nozbe; sprawy sporne konsultuj z flipperem przed rozliczeniem." }
      ] },
      { t: "note", variant: "warn", title: "Najpierw poprawki, potem dalsze etapy", html: "Homestaging i sesję zdjęciową planuj dopiero po usunięciu usterek. Poprawki po wniesieniu dekoracji są dużo bardziej kłopotliwe." },

      { t: "h", text: "Co dalej" },
      { t: "p", html: "Po czystym odbiorze: sprzątanie poremontowe → homestaging → sesja zdjęciowa → przekazanie do sprzedaży. Kolejność i terminy ogarniasz w <a href='#/koordynator-remontow/terminy-i-dostawy'>Organizacji terminów i dostaw</a>, a komplet list znajdziesz w <a href='#/koordynator-remontow/checklisty'>Checklistach</a>." },
      { t: "check", title: "Checklista odbioru prac", id: "odbior-checklist", items: [
        "Zgodność wykonania z projektem i standardem.",
        "Ściany i malowanie - równe, bez zacieków i przebarwień.",
        "Płytki i fugi - równo, bez pustek, czyste fugi i silikon.",
        "Podłogi, panele i listwy - bez uszkodzeń i szczelin.",
        "Drzwi i okna - montaż, regulacja, brak rys.",
        "Biały montaż i armatura - szczelność, brak przecieków.",
        "Elektryka - gniazdka, włączniki, oświetlenie działające.",
        "Stolarka - fronty, równe szczeliny, domyk.",
        "Czystość po pracach.",
        "Usterki spisane (zdjęcia w Nozbe) i poprawki ustalone z ekipą."
      ] }
    ]
  };

  /* ================ RODZAJE INWESTYCJI ================ */

  A.pierwotny = {
    id: "rynek-pierwotny",
    title: "Rynek pierwotny",
    summary: "Mieszkania od deweloperów - większość naszych inwestycji. Organizacja startu prac w nowej inwestycji.",
    tags: ["rynek pierwotny", "deweloper", "prąd budowlany", "nowa inwestycja", "start"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Na obecnym etapie <strong>większość naszych inwestycji to rynek pierwotny</strong> - mieszkania kupowane od deweloperów. Stan deweloperski upraszcza część prac (instalacje są nowe), ale ma swoją specyfikę, którą trzeba znać." },

      { t: "h", text: "Charakterystyka rynku pierwotnego" },
      { t: "ul", items: [
        "Mieszkanie w stanie deweloperskim - instalacje (elektryka, hydraulika) są nowe i zgodne z normami.",
        "Zwykle nie ma rozbiórek ani wymiany instalacji na pełną skalę.",
        "Pojawiają się za to tematy charakterystyczne dla nowych inwestycji: prąd budowlany i organizacja startu prac.",
        "Często pracujemy w budynku, w którym trwają jeszcze inne wykończenia."
      ] },

      { t: "h", text: "Prąd budowlany" },
      { t: "p", html: "W nowych inwestycjach na czas wykończenia korzysta się zwykle z <strong>prądu budowlanego</strong>, zanim mieszkanie zostanie podłączone do docelowego licznika." },
      { t: "note", variant: "warn", title: "O co zadbać", html: "Ustal, skąd ekipa będzie czerpać prąd (rozdzielnia budowlana / gniazdo budowlane), czy jest dostępny w lokalu i czy nie ma ograniczeń ze strony dewelopera. Brak prądu = brak pracy." },
      { t: "steps", items: [
        { title: "Sprawdź dostępność prądu budowlanego", html: "Przy przejęciu lokalu / pierwszym wejściu ekipy." },
        { title: "Ustal punkt poboru", html: "Gdzie ekipa się podłącza i na jakich zasadach (deweloper / zarządca)." },
        { title: "Zgłoś ewentualne braki", html: "Jeśli prądu brakuje - eskaluj do flippera, bo to blokuje start." }
      ] },

      { t: "h", text: "Rozpoczęcie prac w nowej inwestycji" },
      { t: "steps", items: [
        { title: "Przejęcie / dostęp do lokalu", html: "Klucze, karty dostępu, zasady wejścia na teren budowy." },
        { title: "Zasady dewelopera / zarządcy", html: "Godziny pracy, droga transportu materiałów, miejsce na odpady, ochrona." },
        { title: "Prąd i woda", html: "Potwierdź dostęp do mediów potrzebnych do pracy." },
        { title: "Wprowadzenie ekipy", html: "Pokaż lokal, omów zakres i standard, ustal harmonogram." },
        { title: "Pierwsze materiały i kontener", html: "Zorganizuj start: materiały na pierwszy etap, kontener jeśli potrzebny." }
      ] },

      { t: "h", text: "Najczęstsze błędy" },
      { t: "ul", items: [
        "Start prac bez potwierdzonego prądu budowlanego.",
        "Nieznajomość zasad dewelopera (godziny, transport) - konflikty na budowie.",
        "Brak ustaleń co do dostępu i mediów przed wejściem ekipy."
      ] },
      { t: "note", variant: "tip", html: "Na rynku pierwotnym najwięcej czasu oszczędza dobre przygotowanie startu. Im sprawniej ekipa wejdzie, tym szybciej skończy." }
    ]
  };

  A.wtorny = {
    id: "rynek-wtorny",
    title: "Rynek wtórny",
    summary: "Mieszkania używane - proces jest inny i obejmuje dodatkowe etapy: wymianę instalacji elektrycznej, grzejników, kontakt ze spółdzielnią/wspólnotą.",
    tags: ["rynek wtórny", "elektryka", "wlz", "grzejniki", "gaz", "indukcja", "spółdzielnia", "wspólnota", "wodomierze"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Rynek wtórny to mieszkania używane. Proces wygląda <strong>inaczej niż na rynku pierwotnym</strong> i obejmuje dodatkowe etapy, których nie ma w nowym budownictwie. Przygotuj się na więcej formalności i prac instalacyjnych." },

      { t: "h", text: "Pierwotny vs wtórny - kluczowe różnice" },
      { t: "table", head: ["Zagadnienie", "Rynek pierwotny", "Rynek wtórny"], rows: [
        ["Instalacja elektryczna", "Nowa, zgodna z normami", "Często wymaga wymiany (w tym WLZ)"],
        ["Grzejniki", "Nowe", "Często wymiana na nowe"],
        ["Rozbiórki", "Zwykle brak", "Często - stare wykończenie do skucia"],
        ["Formalności", "Deweloper / zarządca", "Spółdzielnia lub wspólnota mieszkaniowa"],
        ["Prąd na czas prac", "Prąd budowlany", "Zwykle istniejąca instalacja"],
        ["Gaz / kuchnia", "Zwykle brak tematu", "Zawsze odcięcie gazu (uprawniona osoba) + indukcja"],
        ["Niespodzianki", "Rzadziej", "Częściej (stan ukrytych instalacji)"]
      ] },

      { t: "h", text: "Wymiana instalacji elektrycznej (w tym WLZ)" },
      { t: "p", html: "W starszych mieszkaniach instalacja elektryczna często nie spełnia dzisiejszych potrzeb i wymaga wymiany. Może to obejmować <strong>WLZ</strong> (wewnętrzną linię zasilającą) - tu zwykle potrzebny jest osobny elektryk." },
      { t: "note", variant: "warn", title: "Kiedy osobny elektryk", html: "Co do zasady stawiamy na ekipy kompleksowe. WLZ i poważniejsze prace elektryczne na rynku wtórnym to jeden z wyjątków, gdy angażujemy <strong>osobnego elektryka</strong>. Zakres potwierdź z flipperem." },

      { t: "h", text: "Wymiana grzejników" },
      { t: "ul", items: [
        "Stare grzejniki często wymieniamy na nowe - ustal zakres i model ze standardem wykończenia.",
        "Sprawdź ewentualne wymagania przy ingerencji w piony.",
        "Prace na pionach grzewczych mogą wymagać zgody/uzgodnienia ze spółdzielnią lub wspólnotą."
      ] },

      { t: "h", text: "Odcięcie gazu i przejście na indukcję" },
      { t: "p", html: "Na rynku wtórnym <strong>zawsze odcinamy gaz</strong> i przechodzimy na gotowanie indukcyjne (płyta indukcyjna)." },
      { t: "note", variant: "warn", title: "Tylko uprawniona osoba", html: "Odcięcie gazu wykonuje <strong>specjalna, uprawniona osoba</strong> - nie robi tego ekipa wykończeniowa ani koordynator. Zaplanuj to z wyprzedzeniem; pamiętaj, że płyta indukcyjna wymaga odpowiedniego zasilania elektrycznego (uwzględnij to przy pracach elektrycznych)." },

      { t: "h", text: "Kontakt ze spółdzielnią lub wspólnotą" },
      { t: "p", html: "Na rynku wtórnym częścią pracy jest kontakt z administracją budynku. Niektóre prace wymagają zgłoszenia lub zgody." },
      { t: "steps", items: [
        { title: "Ustal zarządcę budynku", html: "Spółdzielnia czy wspólnota - i dane kontaktowe." },
        { title: "Dopytaj o wymagania", html: "Zgłoszenia prac, godziny prowadzenia robót, zasady transportu i odpadów, ewentualne zgody (np. ingerencja w piony, liczniki)." },
        { title: "Załatw formalności przed startem", html: "Zgłoś prace tam, gdzie to wymagane, by uniknąć przestojów i konfliktów." },
        { title: "Zachowaj dokumentację", html: "Pisma i zgody trzymaj w folderze inwestycji na Dysku." }
      ] },

      { t: "h", text: "Przeniesienie wodomierzy (hydraulik)" },
      { t: "p", html: "Czasem konieczne jest <strong>przeniesienie wodomierzy</strong> - to jeden z przypadków, gdy angażujemy osobnego hydraulika. Może wiązać się z uzgodnieniem ze spółdzielnią/wspólnotą i plombowaniem licznika." },

      { t: "h", text: "Start na rynku wtórnym - checklista" },
      { t: "check", title: "Przygotowanie inwestycji (wtórny)", id: "start-wtorny", items: [
        "Ustalony zarządca (spółdzielnia / wspólnota) i kontakt.",
        "Sprawdzone wymagane zgłoszenia i zgody na prace.",
        "Oceniony zakres wymiany instalacji elektrycznej (czy WLZ).",
        "Zaplanowana wymiana grzejników (jeśli dotyczy).",
        "Ustalone ewentualne przeniesienie wodomierzy.",
        "Zlecone odcięcie gazu (uprawniona osoba) i zaplanowana indukcja.",
        "Zorganizowany kontener na odpady (rozbiórka).",
        "Potwierdzony dostęp do lokalu i zasady transportu w budynku.",
        "Zakres dodatkowych prac potwierdzony z flipperem."
      ] },
      { t: "note", variant: "danger", title: "Uwaga na formalności", html: "Prace ingerujące w części wspólne (piony, liczniki, instalacje) bez wymaganej zgody mogą skończyć się problemami z administracją. W razie wątpliwości - najpierw uzgodnij, potem zlecaj." }
    ]
  };

  /* ================ ZASOBY I REFERENCJE ================ */

  A.dostawcy = {
    id: "dostawcy",
    title: "Dostawcy i miejsca zakupów",
    summary: "Skąd najczęściej zamawiamy materiały i wyposażenie - katalog dostawców z zakresem i kanałem zamawiania.",
    tags: ["dostawcy", "leroy merlin", "mexen", "nexterio", "benmar", "allegro", "led-lux", "media expert", "agd", "stolarze", "szklarze", "armatura", "płytki", "panele", "oświetlenie", "sztukateria"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "To Twój podręczny katalog dostawców. Większość zamówień składasz w kilku stałych miejscach - dzięki temu wiesz, gdzie po co sięgnąć." },

      { t: "cards", items: [
        { icon: "store", title: "Leroy Merlin", tag: "Materiały / panele", html: "Większość materiałów budowlanych i wyposażenia oraz panele. Zamówienia mailowo przez opiekuna." },
        { icon: "tools", title: "Mexen", tag: "Armatura", html: "Armatura łazienkowa i kuchenna. Zamawiamy przez platformę <strong>B2B</strong>, przelew tradycyjny." },
        { icon: "store", title: "Nexterio", tag: "Płytki", html: "Płytki. Zamówienie kompletujesz na stronie, płatność przelewem tradycyjnym." },
        { icon: "truck", title: "Benmar", tag: "Materiały + dostawa", html: "Materiały budowlane wraz z organizacją dostawy na inwestycję." },
        { icon: "hardhat", title: "Stolarze", tag: "Kuchnie / zabudowy", html: "Kuchnie oraz zabudowy stałe na wymiar. Montują też AGD przy zabudowie." },
        { icon: "image", title: "Szklarze", tag: "Lustra", html: "Lustra łazienkowe wykonywane na wymiar." },
        { icon: "store", title: "Allegro", tag: "Sztukateria / lustra / oświetlenie", html: "Sztukateria, listwy, gotowe lustra, oświetlenie i drobne wyposażenie." },
        { icon: "bolt", title: "Led-Lux", tag: "Oświetlenie", html: "Wyspecjalizowany dostawca oświetlenia." },
        { icon: "store", title: "Media Expert", tag: "AGD", html: "Sprzęt AGD do mieszkań. Montaż AGD najczęściej wykonują stolarze przy zabudowie." }
      ] },

      { t: "h", text: "Katalog - co, gdzie i jak" },
      { t: "table", head: ["Dostawca", "Co zamawiamy", "Kanał", "Płatność"], rows: [
        ["Leroy Merlin", "Materiały budowlane, wyposażenie, panele", "Mail do opiekuna (adres + termin)", "Flipper opłaca przygotowane zamówienie"],
        ["Mexen", "Armatura", "Platforma B2B", "Przelew tradycyjny - screenshot do flippera"],
        ["Nexterio", "Płytki", "Strona internetowa", "Przelew tradycyjny - screenshot do flippera"],
        ["Allegro", "Sztukateria, listwy, gotowe lustra, oświetlenie", "Strona Allegro", "Wg ustaleń z flipperem"],
        ["Led-Lux", "Oświetlenie", "Zamówienie u dostawcy", "Przelew tradycyjny - screenshot do flippera"],
        ["Media Expert", "AGD (montaż: stolarze)", "Zamówienie u dostawcy", "Wg ustaleń z flipperem"],
        ["Benmar", "Materiały budowlane + dostawa", "Adres + tel. wykonawcy + lista", "Po stronie zamówienia Benmar"],
        ["Stolarze", "Kuchnie, zabudowy stałe", "Pomiar + zamówienie indywidualne", "Wg ustaleń z flipperem"],
        ["Szklarze", "Lustra łazienkowe na wymiar", "Pomiar + zamówienie indywidualne", "Wg ustaleń z flipperem"]
      ] },
      { t: "note", variant: "info", title: "Procedury zamówień", html: "Dokładne kroki dla Leroy Merlin, Benmar, Nexterio, Mexen, Allegro i Led-Lux znajdziesz w artykule <a href='#/koordynator-remontow/zamawianie-materialow'>Zamawianie materiałów</a>." },

      { t: "h", text: "Kontakty" },
      { t: "p", html: "Dane kontaktowe i dostępy do dostawców (osoby, telefony, loginy B2B - np. kontakt do opiekuna w Leroy Merlin czy konto B2B Mexen) <strong>uzyskasz od flippera</strong>. Jeśli czegoś brakuje - poproś o kontakt przed złożeniem zamówienia." },
      { t: "note", variant: "tip", html: "Gdy znajdziesz nowego, dobrego dostawcę (np. lepsza cena lub krótszy termin) - zaproponuj go flipperowi i dopisz do tego katalogu." }
    ]
  };

  A.spisTelefonow = {
    id: "spis-telefonow",
    title: "Spis telefonów",
    summary: "Szybki dostęp do kontaktów: ekipy, stolarze, podwykonawcy, dostawcy i zespół. Uzupełnij placeholdery realnymi danymi.",
    tags: ["telefony", "kontakty", "spis", "podwykonawcy", "dostawcy"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Podręczny spis kontaktów do bieżącej pracy. Poniżej placeholdery - uzupełnij je realnymi danymi i trzymaj aktualne." },
      { t: "note", variant: "info", title: "Skąd dane", html: "Kontakty do dostawców i sprawdzonych wykonawców <strong>uzyskasz od flippera</strong>. Resztę dopisuj na bieżąco, gdy kogoś zrekrutujesz." },

      { t: "h", text: "Wykonawcy" },
      { t: "table", head: ["Rola / firma", "Osoba", "Telefon", "Uwagi"], rows: [
        ["Ekipa remontowa", "[do uzupełnienia]", "[telefon]", "[inwestycja / status]"],
        ["Stolarz", "[do uzupełnienia]", "[telefon]", "[moce przerobowe]"],
        ["Szklarz", "[do uzupełnienia]", "[telefon]", "Lustra / szyby na wymiar"],
        ["Złota rączka", "[do uzupełnienia]", "[telefon]", "Drobne naprawy"],
        ["Sprzątaczka", "[do uzupełnienia]", "[telefon]", "Sprzątanie poremontowe"],
        ["Spawacz", "[do uzupełnienia]", "[telefon]", "Balustrady / metal"],
        ["Elektryk", "[do uzupełnienia]", "[telefon]", "WLZ - rynek wtórny"],
        ["Hydraulik", "[do uzupełnienia]", "[telefon]", "Przeniesienie wodomierzy"]
      ] },

      { t: "h", text: "Dostawcy" },
      { t: "table", head: ["Dostawca", "Kontakt / osoba", "Telefon / kanał", "Uwagi"], rows: [
        ["Leroy Merlin", "Opiekun klienta", "[telefon / mail]", "Zamówienia mailowo"],
        ["Benmar", "[do uzupełnienia]", "[telefon]", "Materiały + dostawa"],
        ["Mexen (B2B)", "[do uzupełnienia]", "[login B2B]", "Armatura"],
        ["Nexterio", "[do uzupełnienia]", "[kontakt]", "Płytki"],
        ["Allegro", "-", "[konto]", "Sztukateria, lustra, oświetlenie"],
        ["Led-Lux", "[do uzupełnienia]", "[telefon]", "Oświetlenie"],
        ["Media Expert", "[do uzupełnienia]", "[telefon]", "AGD"]
      ] },

      { t: "h", text: "Usługi i zespół" },
      { t: "table", head: ["Rola", "Osoba / firma", "Telefon", "Uwagi"], rows: [
        ["Fotograf", "[do uzupełnienia]", "[telefon]", "Sesja po homestagingu"],
        ["Homestaging", "[do uzupełnienia]", "[telefon]", "Przed sesją zdjęciową"],
        ["Kontener / odpady", "[do uzupełnienia]", "[telefon]", "Podstawienie i odbiór"],
        ["Pomocnik z busem", "[do uzupełnienia]", "[telefon]", "Transport / wywóz / zwroty"],
        ["Flipper", "[do uzupełnienia]", "[telefon]", "Decyzje i płatności"],
        ["Architekt", "[do uzupełnienia]", "[telefon]", "Pytania do projektu"]
      ] },
      { t: "note", variant: "tip", html: "Aktualizuj spis od razu po zmianie numeru lub zrekrutowaniu nowego wykonawcy - to Twoja najszybsza ściąga w terenie." }
    ]
  };

  A.narzedzia = {
    id: "narzedzia",
    title: "Narzędzia pracy",
    summary: "Narzędzia, których używasz codziennie: Nozbe (raporty i zdjęcia), Dysk Google (dokumenty), WhatsApp (komunikacja), Arkusze Google (koszty).",
    tags: ["narzędzia", "nozbe", "google drive", "dysk", "whatsapp", "arkusze google", "budżet", "koszty", "raporty"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Cała Twoja codzienna praca opiera się na kilku narzędziach. Opanuj je od pierwszego dnia - to one trzymają porządek przy kilku remontach naraz." },

      { t: "cards", items: [
        { icon: "clipboard", title: "Nozbe", tag: "Raporty / zdjęcia", html: "Raportowanie i zarządzanie flipami. Tu trafiają zdjęcia z remontów." },
        { icon: "file", title: "Dysk Google", tag: "Dokumenty", html: "Dokumenty, umowy i faktury." },
        { icon: "phone", title: "WhatsApp", tag: "Komunikacja", html: "Komunikacja z ekipami oraz zespołem." },
        { icon: "book", title: "Arkusze Google", tag: "Koszty", html: "Kontrola kosztów i budżetów remontów." }
      ] },

      { t: "h", text: "Nozbe" },
      { t: "ul", items: [
        "Główne narzędzie do <strong>raportowania i zarządzania flipami</strong>.",
        "Tu trafiają <strong>zdjęcia z remontów</strong> oraz raporty z wizyt - nie na Dysk Google.",
        "Zadania i postęp prac prowadzimy w Nozbe, dzięki czemu flipper ma wszystko w jednym miejscu."
      ] },
      { t: "note", variant: "info", title: "Zapamiętaj podział", html: "Zdjęcia i raporty z remontów → <strong>Nozbe</strong>. Dokumenty, umowy i faktury → <strong>Dysk Google</strong>." },

      { t: "h", text: "Dysk Google" },
      { t: "ul", items: [
        "Tu trzymamy dokumenty, umowy i faktury (zdjęcia z remontów trafiają do Nozbe).",
        "Utrzymuj <strong>jeden folder na inwestycję</strong> z czytelną nazwą (adres).",
        "Proponowana struktura podfolderów: <code>Umowy</code>, <code>Faktury</code>, <code>Materiały (listy)</code>, <code>Dokumenty (zgody, pisma)</code>."
      ] },
      { t: "note", variant: "info", title: "Porządek = spokój", html: "Spójne nazewnictwo folderów sprawia, że każdy plik znajdziesz w kilka sekund - i że flipper też się w tym odnajdzie." },

      { t: "h", text: "WhatsApp" },
      { t: "ul", items: [
        "Podstawowy kanał kontaktu z ekipami i zespołem.",
        "Sugerowane: osobny wątek/grupa na inwestycję, żeby ustalenia się nie mieszały.",
        "Szybkie, konkretne odpowiedzi; ważne ustalenia potwierdzaj na piśmie.",
        "Zdjęcia z wizyt dodawaj do <strong>Nozbe</strong> (raport); WhatsApp służy do bieżącej komunikacji."
      ] },

      { t: "h", text: "Arkusze Google" },
      { t: "ul", items: [
        "Służą do kontroli kosztów i budżetu każdego remontu.",
        "Po każdym zamówieniu/fakturze aktualizuj wydatki danej inwestycji.",
        "Dzięki temu flipper ma na bieżąco obraz kosztów i nie ma niespodzianek."
      ] },
      { t: "note", variant: "warn", title: "Aktualizuj na bieżąco", html: "Arkusz kosztów uzupełniany „później” szybko przestaje być wiarygodny. Wpisuj wydatki od razu po zamówieniu." },

      { t: "h", text: "Konfiguracja na start" },
      { t: "check", title: "Onboarding - dzień 1", id: "onboarding-narzedzia", items: [
        "Dostęp do Nozbe (raporty i zdjęcia z remontów).",
        "Dostęp do Dysku Google (foldery inwestycji).",
        "Zainstalowany WhatsApp + dodane kontakty zespołu i ekip.",
        "Dostęp do Arkuszy Google z budżetami remontów.",
        "Znajomość struktury folderów na Dysku.",
        "Dostęp do platformy B2B Mexen i kontaktu w Leroy Merlin."
      ] }
    ]
  };

  A.faq = {
    id: "faq",
    title: "FAQ - najczęstsze pytania",
    summary: "Szybkie odpowiedzi na pytania, które najczęściej pojawiają się na początku współpracy.",
    tags: ["faq", "pytania", "pomoc"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Zebrane w jednym miejscu odpowiedzi na najczęstsze pytania. Jeśli czegoś tu nie ma - użyj wyszukiwarki, a w ostateczności zapytaj flippera." },
      { t: "accordion", items: [
        { q: "Ekipa pyta mnie o coś, czego nie wiem. Co robić?", html: "Nie zgaduj. Skonsultuj temat z flipperem i wróć do ekipy z odpowiedzią. Lepiej chwila zwłoki niż błędna decyzja." },
        { q: "Ile razy w tygodniu mam odwiedzać inwestycję?", html: "Minimum <strong>dwa razy w tygodniu</strong> każdą aktywną inwestycję. Po każdej wizycie przygotuj raport ze zdjęciami." },
        { q: "Kto płaci za materiały?", html: "Płatność realizuje <strong>flipper</strong>. Ty kompletujesz zamówienie i (zależnie od dostawcy) przesyłasz mu zamówienie lub zrzut ekranu z danymi do przelewu." },
        { q: "Czy mogę samodzielnie podpisać umowę z ekipą?", html: "Umowę zawieramy na <strong>wzorze dostarczonym przez flippera</strong>, po akceptacji warunków (zakres, termin, cena). Nie tworzysz własnych umów." },
        { q: "Szukamy osobno elektryków i hydraulików?", html: "Nie - szukamy <strong>ekip kompleksowych</strong> (wykończenie + elektryka + hydraulika). Osobnych fachowców angażujemy wyjątkowo, np. WLZ na rynku wtórnym czy przeniesienie wodomierzy." },
        { q: "Co, jeśli ekipa nie dotrzymuje terminu?", html: "Ustal przyczynę, zaktualizuj harmonogram i poinformuj flippera. Opóźnienia dokumentuj; przy powtarzających się problemach eskaluj." },
        { q: "Gdzie szukać ekip remontowych?", html: "Na <strong>OLX</strong>, <strong>Fixly</strong> i <strong>Facebooku</strong> (grupy / Spotted). Szczegóły i wzory ogłoszeń w artykule <a href='#/koordynator-remontow/rekrutacja-ekip'>Rekrutacja ekip</a>." },
        { q: "Jak wygląda prąd na nowej inwestycji?", html: "Na rynku pierwotnym zwykle korzystamy z <strong>prądu budowlanego</strong> do czasu docelowego podłączenia. Potwierdź jego dostępność przed startem prac." },
        { q: "Czym różni się rynek wtórny od pierwotnego?", html: "Wtórny obejmuje dodatkowe etapy: wymianę instalacji elektrycznej (czasem WLZ), wymianę grzejników, odcięcie gazu i przejście na indukcję, kontakt ze spółdzielnią/wspólnotą i więcej formalności. Pełne porównanie w artykule <a href='#/koordynator-remontow/rynek-wtorny'>Rynek wtórny</a>." },
        { q: "Gdzie trzymam dokumenty, zdjęcia i raporty?", html: "Zdjęcia i raporty z remontów → <strong>Nozbe</strong>. Dokumenty, umowy i faktury → <strong>Dysk Google</strong> (jeden folder na inwestycję). Komunikacja → WhatsApp, koszty → Arkusze Google. Patrz <a href='#/koordynator-remontow/narzedzia'>Narzędzia</a>." },
        { q: "Co sprawdzić przy odbiorze prac od ekipy?", html: "Zgodność ze standardem i projektem oraz jakość wykończenia (ściany, płytki/fugi, panele/listwy, biały montaż, elektryka, stolarka), a usterki spisz i wyegzekwuj poprawki. Pełna lista w artykule <a href='#/koordynator-remontow/odbior-prac'>Odbiór wykończonego lokalu</a>. Odbioru mieszkania od dewelopera koordynator nie prowadzi." },
        { q: "Ekipa proponuje zmianę zakresu prac - mogę się zgodzić?", html: "Nie samodzielnie. Każda zmiana zakresu, standardu lub budżetu wymaga <strong>zgody flippera</strong>." },
        { q: "Kto decyduje o wykończeniu (panele, płytki, kolory)?", html: "Decyduje <strong>flipper</strong> i przekazuje Ci wytyczne: panele, płytki, kolory ścian, kolory frontów zabudów stolarskich, armatura itd. Gdy czegoś brakuje - dopytaj, zanim zamówisz. Patrz <a href='#/koordynator-remontow/co-robimy-czego-nie'>Co robimy / czego nie robimy</a>." },
        { q: "Ekipa ma pytanie techniczne do projektu - co robić?", html: "Za projekt i rysunki odpowiada flipper. Pytania, na które nie znasz odpowiedzi, ekipa może kierować do <strong>architekta</strong> (kontakt udostępnia flipper)." },
        { q: "Trzeba coś przewieźć albo wywieźć z remontu?", html: "Masz do dyspozycji <strong>pomocnika z busem</strong> - wywóz odpadów, transport większych rzeczy od dostawcy, zwroty pozostałości. Szczegóły w <a href='#/koordynator-remontow/terminy-i-dostawy'>Organizacji terminów i dostaw</a>." },
        { q: "Jak zgłaszać poprawki / reklamacje?", html: "Wskazuj ekipie poprawki w ramach umowy i dokumentuj je zdjęciami. Przy sytuacjach spornych skonsultuj z flipperem." }
      ] },
      { t: "note", variant: "tip", title: "Nie ma Twojego pytania?", html: "Skorzystaj z wyszukiwarki (<span class='kbd'>⌘K</span>). Jeśli nadal brak odpowiedzi - zapytaj flippera, a pytanie warto potem dopisać do tego FAQ." }
    ]
  };

  A.checklisty = {
    id: "checklisty",
    title: "Checklisty",
    summary: "Gotowe listy kontrolne na każdy etap pracy - od startu inwestycji po przekazanie mieszkania do sprzedaży.",
    tags: ["checklisty", "listy kontrolne", "procedury", "start", "odbiór", "zakończenie"],
    updated: "2026-06-21",
    blocks: [
      { t: "lead", html: "Zebrane w jednym miejscu listy kontrolne. Odhaczaj punkty na bieżąco podczas pracy - zaznaczenia nie są zapisywane (służą do bieżącej kontroli). Listę możesz też wydrukować (przycisk „Drukuj / PDF” u góry)." },

      { t: "h", text: "Start nowej inwestycji" },
      { t: "check", title: "Uruchomienie inwestycji", id: "cl-start", items: [
        "Otrzymany adres, zakres, standard i termin od flippera.",
        "Założony folder inwestycji na Dysku Google.",
        "Inwestycja założona w Nozbe (raporty i zdjęcia).",
        "Założony arkusz kosztów dla inwestycji.",
        "Ustalony dostęp do lokalu (klucze / karty).",
        "Potwierdzone media (prąd budowlany na rynku pierwotnym).",
        "Rozpoczęta rekrutacja ekipy."
      ] },

      { t: "h", text: "Rekrutacja ekipy" },
      { t: "check", title: "Wybór i umowa", id: "cl-rekrutacja", items: [
        "Opublikowane ogłoszenie (OLX / Fixly / Facebook).",
        "Zebrane zgłoszenia + przejrzane realizacje.",
        "Spotkanie na inwestycji odbyte.",
        "Omówiony zakres, standard, termin i wycena.",
        "Potwierdzona kompleksowość ekipy.",
        "Rekomendacja zaakceptowana przez flippera.",
        "Umowa podpisana na wzorze flippera."
      ] },

      { t: "h", text: "Przed zamówieniem materiałów" },
      { t: "check", title: "Zamówienie materiałów", id: "cl-materialy", items: [
        "Lista materiałów kompletna i potwierdzona z ekipą.",
        "Sprawdzone ilości (zapas na docinki/straty).",
        "Wybrany właściwy dostawca.",
        "Poprawny adres i termin dostawy.",
        "Właściwa metoda płatności (zwykle przelew tradycyjny).",
        "Zamówienie / screenshot przesłane flipperowi.",
        "Dostawa zsynchronizowana z obecnością ekipy."
      ] },

      { t: "h", text: "Wizyta nadzorcza i raport" },
      { t: "check", title: "Po wizycie", id: "cl-raport", items: [
        "Zdjęcia ze wszystkich pomieszczeń.",
        "Opisany aktualny etap prac.",
        "Status względem harmonogramu.",
        "Spisane problemy / ryzyka.",
        "Potrzeby ekipy na kolejny tydzień.",
        "Raport ze zdjęciami dodany do Nozbe.",
        "W razie potrzeby flipper poinformowany."
      ] },

      { t: "h", text: "Odbiór wykończonego lokalu (prace ekipy)" },
      { t: "check", title: "Odbiór prac od ekipy", id: "cl-odbior-prac", items: [
        "Zgodność wykonania z projektem i standardem.",
        "Ściany i malowanie - równe, bez zacieków i przebarwień.",
        "Płytki i fugi - równo, bez pustek, czyste fugi i silikon.",
        "Podłogi, panele i listwy - bez uszkodzeń i szczelin.",
        "Drzwi, okna, biały montaż i armatura - sprawne i szczelne.",
        "Elektryka - gniazdka, włączniki, oświetlenie działające.",
        "Stolarka - fronty, równe szczeliny, domyk.",
        "Czystość po pracach; usterki spisane (zdjęcia w Nozbe).",
        "Poprawki ustalone z ekipą w ramach umowy."
      ] },

      { t: "h", text: "Start na rynku wtórnym" },
      { t: "check", title: "Przygotowanie (wtórny)", id: "cl-wtorny", items: [
        "Ustalony zarządca (spółdzielnia / wspólnota) i kontakt.",
        "Sprawdzone wymagane zgłoszenia / zgody.",
        "Oceniony zakres wymiany elektryki (czy WLZ).",
        "Zaplanowana wymiana grzejników (jeśli dotyczy).",
        "Zlecone odcięcie gazu (uprawniona osoba) i zaplanowana indukcja.",
        "Ustalone ewentualne przeniesienie wodomierzy.",
        "Kontener na odpady zamówiony.",
        "Zakres dodatkowych prac potwierdzony z flipperem."
      ] },

      { t: "h", text: "Zakończenie i przekazanie do sprzedaży" },
      { t: "check", title: "Finisz inwestycji", id: "cl-finisz", items: [
        "Prace odebrane zgodnie ze standardem (odbiór prac od ekipy).",
        "Poprawki / usterki wyegzekwowane od ekipy.",
        "Montaż kuchni, zabudów i luster zakończony.",
        "Sprzątanie poremontowe wykonane.",
        "Homestaging wykonany przed sesją.",
        "Sesja zdjęciowa zrealizowana.",
        "Dokumenty i faktury kompletne na Dysku; raporty i zdjęcia w Nozbe.",
        "Arkusz kosztów zamknięty i zaktualizowany.",
        "Mieszkanie gotowe do przekazania do sprzedaży."
      ] }
    ]
  };

  var koordynator = {
    id: "koordynator-remontow",
    title: "Koordynator Remontów",
    icon: "hardhat",
    desc: "Kompletny przewodnik wdrożeniowy: ekipy, materiały, nadzór, rynek pierwotny i wtórny, dostawcy i narzędzia.",
    groups: [
      { label: "Start", items: [A.wprowadzenie, A.zakres, A.coRobimy, A.standardy] },
      { label: "Procesy operacyjne", items: [A.rekrutacja, A.rekrutacjaStolarzy, A.rekrutacjaPodwykonawcy, A.materialy, A.nadzor, A.terminy, A.odbior] },
      { label: "Rodzaje inwestycji", items: [A.pierwotny, A.wtorny] },
      { label: "Zasoby i referencje", items: [A.dostawcy, A.spisTelefonow, A.narzedzia, A.faq, A.checklisty] }
    ]
  };

  /* Kolejne role - architektura gotowa na rozbudowę.
     Usuń soon:true i dodaj `groups`, gdy rola będzie gotowa. */
  var rolesSoon = [
    { id: "posrednik-nieruchomosci", title: "Pośrednik nieruchomości", icon: "handshake", soon: true, desc: "Pozyskiwanie i obsługa ofert, prezentacje, negocjacje, finalizacja transakcji." }
  ];

  return {
    brand: { name: "TRBK", mark: "T", tagline: "Baza wiedzy", version: "v1.0" },
    home: {
      title: "Wszystko, czego potrzebujesz, by zacząć.",
      sub: "Wewnętrzna baza wiedzy i procedury (SOP) zespołu TRBK. Procedury, standardy i odpowiedzi na najczęstsze pytania - w jednym miejscu."
    },
    quickLinks: [
      { title: "Rekrutacja ekip", sub: "Gdzie szukać i jak rozmawiać", href: "#/koordynator-remontow/rekrutacja-ekip", icon: "users" },
      { title: "Zamawianie materiałów", sub: "Leroy, Benmar, Nexterio, Mexen", href: "#/koordynator-remontow/zamawianie-materialow", icon: "cart" },
      { title: "Nadzór i raporty", sub: "Min. 2× w tygodniu", href: "#/koordynator-remontow/nadzor-nad-remontem", icon: "clipboard" },
      { title: "FAQ", sub: "Najczęstsze pytania", href: "#/koordynator-remontow/faq", icon: "question" },
      { title: "Checklisty", sub: "Gotowe listy kontrolne", href: "#/koordynator-remontow/checklisty", icon: "check" },
      { title: "Dostawcy", sub: "Skąd zamawiamy", href: "#/koordynator-remontow/dostawcy", icon: "store" }
    ],
    searchSuggestions: [
      { title: "Zamawianie materiałów", sub: "Procesy: Leroy, Benmar, Nexterio, Mexen", href: "#/koordynator-remontow/zamawianie-materialow" },
      { title: "Rekrutacja ekip remontowych", sub: "OLX, Fixly, Facebook + wzór ogłoszenia", href: "#/koordynator-remontow/rekrutacja-ekip" },
      { title: "Raport z wizyty", sub: "Nadzór nad remontem", href: "#/koordynator-remontow/nadzor-nad-remontem" },
      { title: "Rynek wtórny", sub: "Elektryka, grzejniki, spółdzielnia", href: "#/koordynator-remontow/rynek-wtorny" },
      { title: "Checklisty", sub: "Listy kontrolne do druku", href: "#/koordynator-remontow/checklisty" }
    ],
    roles: [koordynator].concat(rolesSoon)
  };
})();
