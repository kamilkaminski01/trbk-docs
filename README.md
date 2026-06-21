# TRBK — Baza Wiedzy (Knowledge Base / SOP)

Wewnętrzna baza wiedzy i procedury (SOP) dla firmy zajmującej się flippingiem nieruchomości.
Pierwsza rola: **Koordynator Remontów**. Jako kolejna (widoczna jako „Wkrótce") przygotowany jest
**Pośrednik nieruchomości**. Architektura jest gotowa na dokładanie dowolnych kolejnych ról
bez przebudowy aplikacji.

Styl: nowoczesny, minimalistyczny, monochromatyczny (grafit), tryb jasny + ciemny. Działa offline,
bez logowania i bez internetu. Pełna responsywność (komputer / tablet / telefon) i wyszukiwarka.

---

## Co dostajesz — dwa warianty

| Plik | Do czego |
|------|----------|
| **`TRBK-Baza-Wiedzy.html`** | Gotowy do użycia — **jeden plik**, wszystko w środku. Kliknij dwa razy, otworzy się w przeglądarce. Najlepszy do codziennego korzystania i wysłania komuś. |
| **Folder projektu** (`index.html` + `assets/`) | Wersja modułowa — **wygodniejsza do edycji i rozbudowy**. Treść siedzi w osobnym pliku `assets/js/content.js`. |

> Obie wersje wyglądają i działają tak samo. Wybierz tę, która jest dla Ciebie wygodniejsza.

### Jak otworzyć
Kliknij dwukrotnie `TRBK-Baza-Wiedzy.html` (lub `index.html`). To wszystko — nie trzeba nic instalować.

### Jak udostępnić zespołowi (online)
To zwykła strona statyczna — możesz ją postawić za darmo na **GitHub Pages** (instrukcja niżej),
a także na Netlify Drop czy Cloudflare Pages. Każdy pracownik wejdzie wtedy pod jednym adresem,
a każdy artykuł ma własny link (np. `…/#/koordynator-remontow/faq`).

---

## Publikacja na GitHub Pages

Projekt jest już przygotowany pod GitHub Pages — dzięki nawigacji opartej na „#” (hash) i ścieżkom
względnym **działa bez żadnych zmian**, nawet gdy strona stoi w podkatalogu repozytorium
(`https://login.github.io/nazwa-repo/`). W paczce są też `.nojekyll` (wyłącza zbędne przetwarzanie
Jekyll) oraz `.gitignore`.

### Wariant A — przez stronę GitHub (bez terminala, najprościej)

1. Wejdź na **github.com** → **New repository**. Nazwij repo, np. `trbk-baza-wiedzy`, ustaw **Public**, utwórz.
2. Na stronie repo kliknij **Add file → Upload files**.
3. Przeciągnij **zawartość** folderu projektu: `index.html`, folder `assets/`, `.nojekyll`
   (oraz opcjonalnie `README.md`, `TRBK-Baza-Wiedzy.html`). **Ważne:** wgrywasz pliki, nie folder nadrzędny —
   `index.html` musi być w korzeniu repo.
4. **Commit changes**.
5. **Settings → Pages →** w „Build and deployment" wybierz **Deploy from a branch**,
   gałąź **main**, katalog **/(root)** → **Save**.
6. Po chwili na górze sekcji Pages pojawi się adres: `https://TWÓJ-LOGIN.github.io/trbk-baza-wiedzy/`. Gotowe.

### Wariant B — przez terminal (git)

W folderze projektu:

```bash
git init
git add .
git commit -m "TRBK — baza wiedzy"
git branch -M main
git remote add origin https://github.com/TWOJ-LOGIN/trbk-baza-wiedzy.git
git push -u origin main
```

Następnie w repo: **Settings → Pages → Deploy from a branch → main → /(root) → Save**.
Adres strony: `https://TWOJ-LOGIN.github.io/trbk-baza-wiedzy/`.

### Aktualizacja treści po publikacji
Edytujesz `assets/js/content.js` (patrz niżej), wgrywasz zmieniony plik / robisz `git push` —
GitHub Pages odświeży stronę w ciągu ~1 minuty.

> **Uwaga o prywatności.** W `index.html` jest `<meta name="robots" content="noindex, nofollow">`,
> więc Google nie zaindeksuje strony. Pamiętaj jednak, że **publiczne repo i publiczne GitHub Pages
> są widoczne dla każdego, kto zna adres.** Jeśli treść ma być niepubliczna, rozważ repozytorium
> prywatne z **GitHub Pages w planie płatnym** albo hosting z hasłem (np. Cloudflare Access).

---

## Jak to jest zbudowane

```
index.html              ← szkielet strony (sam mount + <noscript>)
assets/
  css/styles.css        ← cały wygląd (motyw jasny/ciemny, komponenty)
  js/content.js         ← TREŚĆ (to edytujesz na co dzień)
  js/app.js             ← silnik: routing, render bloków, wyszukiwarka, motyw
TRBK-Baza-Wiedzy.html   ← ta sama całość scalona w jeden plik
```

Cała nawigacja, strona główna i wyszukiwarka **budują się automatycznie z danych** w `content.js`.
Dodajesz artykuł → sam pojawia się w menu, w wyszukiwarce i dostaje własny adres URL.

---

## Jak dodać nowy artykuł

W pliku `assets/js/content.js`:

1. Utwórz artykuł (przypisz do `A.cośtam`):

```js
A.mojArtykul = {
  id: "moj-artykul",                 // część adresu URL (małe litery, myślniki)
  title: "Mój nowy artykuł",
  summary: "Krótki opis widoczny pod tytułem i w wyszukiwarce.",
  tags: ["tag1", "tag2"],            // pomagają w wyszukiwaniu
  updated: "2026-06-21",
  blocks: [
    { t: "lead", html: "Akapit wprowadzający." },
    { t: "h", text: "Sekcja" },
    { t: "p", html: "Zwykły akapit. Można <strong>pogrubić</strong> i dać <a class='inline' href='#/koordynator-remontow/faq'>link</a>." },
    { t: "ul", items: ["punkt 1", "punkt 2"] }
  ]
};
```

2. Wstaw go do menu — w odpowiedniej grupie roli (`koordynator.groups[].items`):

```js
{ label: "Zasoby i referencje", items: [A.dostawcy, A.narzedzia, A.faq, A.checklisty, A.mojArtykul] }
```

Gotowe. (Jeśli korzystasz z wersji jednoplikowej, zrób to samo w sekcji `window.KB_CONTENT` w pliku `.html`.)

---

## Jak dodać nową rolę (np. Pośrednik nieruchomości)

W `content.js` masz już przygotowane role „Wkrótce”. Aby uruchomić rolę, zamień jej wpis
na pełny — z grupami i artykułami (wzorem `koordynator`):

```js
var posrednik = {
  id: "posrednik-nieruchomosci",
  title: "Pośrednik nieruchomości",
  icon: "handshake",
  desc: "Opis roli na stronie głównej.",
  groups: [
    { label: "Start", items: [ /* artykuły */ ] },
    { label: "Procesy", items: [ /* artykuły */ ] }
  ]
};
```

…i dodaj `posrednik` do listy `roles` w sekcji `return { … roles: [koordynator, posrednik].concat(rolesSoon) }`.
Menu, strona główna i wyszukiwarka zaktualizują się same.

---

## Ściąga: typy bloków treści (`t`)

| `t` | Co to | Najważniejsze pola |
|-----|-------|--------------------|
| `lead` | Akapit wprowadzający (większy) | `html` |
| `p` | Zwykły akapit | `html` |
| `h` | Nagłówek sekcji (trafia do spisu treści) | `text`, `lvl` (2 lub 3) |
| `ul` / `ol` | Lista punktowana / numerowana | `items: []` |
| `kv` | Tabela „klucz → wartość” (parametry) | `items: [{k, v}]` |
| `check` | Interaktywna checklista (zapisuje zaznaczenia) | `title`, `id`, `items: []` |
| `steps` | Proces krok po kroku | `items: [{title, html}]` |
| `note` | Infobox / wyróżnienie | `variant: info\|tip\|warn\|danger\|success`, `title`, `html` |
| `table` | Tabela | `head: []`, `rows: [[]]`, `caption` |
| `accordion` | Rozwijane sekcje | `items: [{q, html}]` (lub `blocks`) |
| `tabs` | Zakładki | `items: [{label, blocks}]` |
| `cards` | Siatka kart | `items: [{icon, title, tag, html}]` |
| `img` | Zdjęcie (lub placeholder) | `src`, `alt`, `caption` |
| `video` | Film osadzony (lub placeholder) | `embed` (URL), `caption` |
| `files` | Lista plików / załączników (PDF itp.) | `items: [{name, type, href, note}]` |
| `links` | Lista odnośników | `items: [{label, href, note, external}]` |
| `quote` | Cytat | `html`, `cite` |
| `divider` | Linia oddzielająca | — |

### Dodawanie zdjęć, filmów, PDF-ów i linków
- **Zdjęcie:** `{ t: "img", src: "media/lazienka.jpg", alt: "Łazienka", caption: "Po remoncie" }` — wrzuć plik np. do folderu `media/` obok `index.html`.
- **Film:** `{ t: "video", embed: "https://www.youtube.com/embed/XXXX", caption: "Instruktaż" }`.
- **PDF / załącznik:** `{ t: "files", items: [{ name: "Wzór umowy", type: "PDF", href: "media/umowa.pdf" }] }`.
- **Link:** `{ t: "links", items: [{ label: "Dysk Google", href: "https://…", external: true }] }`.

Bez ustawionego `src` / `embed` / `href` blok pokaże elegancki **placeholder** z podpowiedzią — dzięki temu od razu widać, gdzie wstawić materiał.

---

## Skróty i funkcje
- **⌘K / Ctrl+K** lub **/** — wyszukiwarka (działa też bez polskich znaków: „materialy” znajdzie „materiały”).
- **Drukuj / PDF** — przycisk u góry artykułu (czysty wydruk bez menu).
- **Tryb jasny/ciemny** — przełącznik w prawym górnym rogu (zapamiętywany).
- Zaznaczenia checklist zapisują się w przeglądarce (na danym urządzeniu).

## Dostępność i SEO
- Semantyczny HTML, znaczniki `lang="pl"`, nagłówki, etykiety ARIA, obsługa klawiatury, widoczny focus, kontrast i `prefers-reduced-motion`.
- Tytuł strony i opis (`meta description`) aktualizują się per artykuł.
- Baza jest wewnętrzna — domyślnie ustawiono `noindex` (nie indeksować w Google). Usuń ten znacznik w `index.html`, jeśli kiedyś chcesz inaczej.

---

*Wygenerowano dla zespołu TRBK · v1.0*
