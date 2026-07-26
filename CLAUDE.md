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

Nav → Hero → O meni → Šta obuhvata → Kako funkcioniše → Za koga → Pristup →
Finalni CTA → Česta pitanja → Footer

Interne komponente (`Container`, `SectionHeading`, `Button`) su definisane u istom fajlu.
Sekcije koriste `id` za anchor navigaciju: `#ana`, `#sta-obuhvata`,
`#kako-funkcionise`, `#za-koga`, `#prijava`, `#pitanja`.

`SectionHeading` prima i `eyebrow` — sitan nadnaslov sa crticom ispred, koristi ga FAQ.

`OMeni` je predstavljanje odmah ispod hero-a — bez slike, jer je Anina fotografija
taman iznad. `Pristup` je duža sekcija pri dnu (slika + „Verujem da promena počinje…"),
nema `id` jer se do nje ne linkuje.

### Spoljni linkovi

Konverzija ide van sajta, nema više forme:

- „PREUZMI BESPLATAN VODIČ" (hero) → MailerLite stranica
- „Prijavi se za mentorstvo 1:1" (finalni CTA) → WhatsApp `wa.me`

`Button` sam prepoznaje `href` koji počinje sa `http` i dodaje
`target="_blank" rel="noreferrer noopener"`.

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

- Nav gore desno i dalje ima dugme „Prijavi se" koje vodi na `#prijava` (sidro), dok
  pravi CTA na dnu vodi na WhatsApp — uskladiti kad se odluči.
- Finalni CTA još ima zatečen Lovable copy („Tvoja transformacija počinje jednom
  odlukom…").
- Logotip u navigaciji piše „Ana — Fitness Coach"; ime u footeru je „Ana Avramović".
- `src/assets/transformation-*.jpg`, `ana-portrait.jpg`, `hero-mentor.jpg` i
  `lifestyle-1.jpg` se više ne koriste. `lifestyle-2.jpg` je pozadina finalnog CTA.
- `ana-cutout.png` je 421 KB; WebP bi to spustio na ~80 KB.
- Nema sekcija: cene/paketi, testimonials.
- FAQ stoji **ispod** finalnog CTA, po izričitom zahtevu — uobičajenije je iznad.
- Nav ima samo jedan link („O meni") iako sada postoji pet sekcija sa sidrima.

## Lovable

Projekat je generisan i povezan sa [Lovable](https://lovable.dev) (vidi `.lovable/`).
**Ne prepisivati objavljenu git istoriju** — bez force push-a, rebase-a, amend-a ili
squash-a već pushovanih commit-a. To ruši istoriju na Lovable strani.
Commit-i na povezanoj grani se sinhronizuju nazad u Lovable editor, pa granu držati u
ispravnom stanju.
