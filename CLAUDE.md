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

| Token | Hex | Uloga |
|---|---|---|
| `brand-brown` | `#3D2B1F` | Primarni tekst, naslovi, tamne površine |
| `brand-green` | `#6A9D90` | Primary — dugmad, akcenti, `<em>` u naslovima |
| `brand-terracotta` | `#C4956A` | Sekundarni akcenat |
| `brand-cream` | `#F1EDE7` | Pozadina stranice |
| `brand-cream-deep` | — | Tamnija krem, za alternativne sekcije |

Prateći tokeni: `brand-brown-soft`, `brand-green-soft`, plus standardni shadcn tokeni
(`background`, `foreground`, `card`, `muted-foreground`, `border`…).

Senke: `shadow-soft` (mirno) i `shadow-elegant` (hover, istaknute kartice).
Radijusi su veliki i meki — `rounded-3xl` za kartice, `rounded-full` za dugmad.

## Tipografija

- **Fraunces** (serif) — svi naslovi, `font-weight: 400`, `letter-spacing: -0.02em`.
  Klasa `font-display` za tekst koji nije `<h1>`–`<h4>`.
- **Inter** — body tekst.
- Učitavaju se preko Google Fonts u `src/routes/__root.tsx`.
- Sitni label tekst: `text-xs uppercase tracking-[0.22em]`.

## Struktura stranice

Sve sekcije su trenutno u `src/routes/index.tsx`:

Nav → Hero → Zašto mentorstvo → Šta dobijaš → Da li je za tebe → O Ani →
Forma za vodič → Finalni CTA → Footer

Interne komponente (`Container`, `SectionHeading`, `Button`) su definisane u istom fajlu.
Sekcije koriste `id` za anchor navigaciju: `#mentorstvo`, `#ana`, `#vodic`, `#prijava`.

## Poznata stanja / TODO

- Forma za besplatan vodič samo postavlja lokalni state — **nema pravog slanja**.
- CTA "Prijavi se" je `mailto:` link.
- `src/assets/transformation-1.jpg` i `transformation-2.jpg` se nigde ne koriste.
- Placeholder kontakt: `zdravo@ana-mentorstvo.rs`, Instagram link vodi na `instagram.com`.
- Nema sekcija: cene/paketi, testimonials, FAQ.

## Lovable

Projekat je generisan i povezan sa [Lovable](https://lovable.dev) (vidi `.lovable/`).
**Ne prepisivati objavljenu git istoriju** — bez force push-a, rebase-a, amend-a ili
squash-a već pushovanih commit-a. To ruši istoriju na Lovable strani.
Commit-i na povezanoj grani se sinhronizuju nazad u Lovable editor, pa granu držati u
ispravnom stanju.
