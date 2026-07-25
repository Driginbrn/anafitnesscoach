# Ana — Mentorstvo za zdravlje i mršavljenje

Landing sajt (one-page) za Anu, mentorku za održivo mršavljenje i zdrave navike.
Ciljna publika: žene koje su umorne od dijeta i traže individualan, dugoročan pristup.
Sav tekst na sajtu je **na srpskom** (latinica).

## Stack

- TanStack Start (SSR) + TanStack Router — file-based rute u `src/routes/`
- React 19, TypeScript, Vite
- Tailwind CSS v4 — **CSS-first konfiguracija u `src/styles.css`**, nema `tailwind.config.js`
- shadcn/ui komponente u `src/components/ui/` (instalirane, koristiti po potrebi)
- TanStack Query — provider je u `__root.tsx`
- Package manager: **bun**

```sh
bun install
bun run dev      # dev server
bun run lint     # eslint
bun run format   # prettier
```

## Ton i vizuelni pravac

**Calm, elegant, premium — ne agresivan fitness.**

Estetika je editorial wellness: puno belog prostora, mirna tipografija, topli neutralni
tonovi. Sajt treba da deluje kao dobro dizajniran magazin o zdravlju, ne kao teretana.

Copy je topao i direktan, obraća se ženi na "ti". Bez uzvičnika, bez "TRANSFORMIŠI SE
ZA 30 DANA", bez brojanja kalorija kao pretnje. Naglasak na strpljenju, razumevanju i
procesu koji traje.

### Izbegavamo

- Tamne pozadine
- Glasne gradijente
- Glassmorphism
- Parallax i teške scroll efekte
- Agresivan marketinški copy, hitnost, countdown tajmere

Animacije su suptilne: blagi fade-in, mali hover lift (`-translate-y-0.5` do `-1`),
duge tranzicije (300–500ms). Ništa što skače.

## Dizajn tokeni

Definisani u `src/styles.css` kao oklch CSS varijable. **Uvek koristiti token klase**
(`text-brand-brown`, `bg-brand-green`), nikad hardkodovane hex vrednosti u komponentama.

| Token              | Hex       | Uloga                                         |
| ------------------ | --------- | --------------------------------------------- |
| `brand-brown`      | `#3D2B1F` | Primarni tekst, naslovi, tamne površine       |
| `brand-green`      | `#6A9D90` | Primary — dugmad, akcenti, `<em>` u naslovima |
| `brand-terracotta` | `#C4956A` | Sekundarni akcenat                            |
| `brand-cream`      | `#F1EDE7` | Pozadina stranice                             |
| `brand-cream-deep` | —         | Tamnija krem, za alternativne sekcije         |

Prateći tokeni: `brand-brown-soft`, `brand-green-soft`, plus standardni shadcn tokeni
(`background`, `foreground`, `card`, `muted-foreground`, `border`…).

Senke: `shadow-soft` (mirno) i `shadow-elegant` (hover, istaknute kartice).
Radijusi su veliki i meki — `rounded-3xl` za kartice, `rounded-full` za dugmad.

## Tipografija

- **Playfair Display** (serif) — svi naslovi, `font-weight: 400`,
  `letter-spacing: -0.02em`. Klasa `font-display` za tekst koji nije `<h1>`–`<h4>`.
  Učitavamo i pravi kurziv (`ital`) — koristi se za istaknute reči u naslovima
  (`<em className="italic text-brand-green">`), pa se ne sme oslanjati na sintetički.
- **Inter** — body tekst.
- Učitavaju se preko Google Fonts u `src/routes/__root.tsx`. Držati listu težina
  minimalnom — svaka dodatna usporava prvi render.
- Sitni label tekst: `text-xs uppercase tracking-[0.22em]`.

Playfair ima jak kontrast poteza i duge produžetke (`j`, `g`, `p`). Ako naslov u više
redova deluje zbijeno, popuštati `leading`, ne smanjivati font.

> Ranije je bio Fraunces; zamenjen jer su mu `j` i `g` imali neobične repove.

## Struktura stranice

Sve sekcije su trenutno u `src/routes/index.tsx`:

Nav → Hero → Online mentorstvo → Šta obuhvata → Kako funkcioniše → Za koga →
O meni → Forma za vodič → Finalni CTA → Footer

Interne komponente (`Container`, `SectionHeading`, `Button`) su definisane u istom fajlu.
Sekcije koriste `id` za anchor navigaciju: `#mentorstvo`, `#sta-obuhvata`,
`#kako-funkcionise`, `#za-koga`, `#ana`, `#vodic`, `#prijava`. Tri kartice u sekciji
„Online mentorstvo" su linkovi na naredne tri sekcije — ako se neka preimenuje ili
ukloni, ažurirati i njih.

### Kartice

Zajednički izgled je u konstantama `cardBase` i `cardText` na vrhu fajla — koristiti njih,
ne prepisivati klase po sekcijama. Kartice su bez ikonica, samo tekst.

Hover oboji **ceo boks** u `brand-green` i tekst u belo, uz postojeći lift i senku.
Tailwind to pakuje u `@media (hover: hover)`, pa na dodirnim ekranima efekta nema —
to je namerno, ne oslanjati logiku na njega.

Naslovi sekcija su pisani verzalom. Verzal traži **pozitivan** razmak između slova
(`caps` prop na `SectionHeading`, odnosno `tracking-[0.02em]`) — bez toga se slova slepe
jer je osnovni `letter-spacing` za naslove negativan.

## Poznata stanja / TODO

- Forma za besplatan vodič samo postavlja lokalni state — **nema pravog slanja**.
- CTA "Prijavi se" je `mailto:` link.
- Sekcije „O meni", „Forma za vodič" i „Finalni CTA" još imaju zatečen Lovable copy —
  čeka se novi tekst.
- `src/assets/transformation-1.jpg`, `transformation-2.jpg`, `ana-portrait.jpg`,
  `hero-mentor.jpg` i `lifestyle-*.jpg` — deo se više ne koristi.
- `ana-cutout.png` je 421 KB; WebP bi to spustio na ~80 KB.
- Placeholder kontakt: `zdravo@ana-mentorstvo.rs`, Instagram link vodi na `instagram.com`.
- Nema sekcija: cene/paketi, testimonials, FAQ.
- Nav ima samo jedan link („O meni") iako sada postoji šest sekcija sa sidrima.

## Lovable

Projekat je generisan i povezan sa [Lovable](https://lovable.dev) (vidi `.lovable/`).
**Ne prepisivati objavljenu git istoriju** — bez force push-a, rebase-a, amend-a ili
squash-a već pushovanih commit-a. To ruši istoriju na Lovable strani.
Commit-i na povezanoj grani se sinhronizuju nazad u Lovable editor, pa granu držati u
ispravnom stanju.
