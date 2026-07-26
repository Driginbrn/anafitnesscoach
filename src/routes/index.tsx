import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { SEO } from "@/lib/seo";
import {
  Plus,
  Minus,
  Utensils,
  Trophy,
  TrendingUp,
  HeartHandshake,
  Hourglass,
  Award,
  Target,
  Check,
  X,
  Menu,
  Instagram,
  Mail,
} from "lucide-react";

import anaCutout from "@/assets/ana-cutout.webp";
import lifestyle2 from "@/assets/lifestyle-2.webp";
import transformacija1 from "@/assets/transformacija-1.webp";
import transformacija2 from "@/assets/transformacija-2.webp";

export const Route = createFileRoute("/")({
  /* Naslov i opis dolaze iz SEO konstante u __root.tsx — ovde se ne ponavljaju. */
  component: Index,
});

/* ---------- Reusable primitives ---------- */

function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>{children}</div>;
}

function SectionHeading({
  title,
  intro,
  eyebrow,
  align = "left",
  caps = false,
}: {
  title: string;
  intro?: string;
  /** Sitan nadnaslov sa crticom ispred, iznad glavnog naslova. */
  eyebrow?: string;
  align?: "left" | "center";
  /** Naslovi pisani verzalom traže pozitivan razmak — bez toga se slova slepe. */
  caps?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-brand-green ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-brand-green/50" aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-4xl md:text-5xl ${eyebrow ? "mt-5" : ""} ${caps ? "tracking-[0.02em]" : ""}`}
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{intro}</p>
      )}
    </div>
  );
}

/* Hover oboji ceo boks u brand-green. Dele ga oba stila kartica. */
const cardHover =
  "group transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant hover:bg-brand-green hover:border-brand-green";

const fadeToWhite = "transition-colors duration-500 group-hover:text-white";

type BtnProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "outline" | "terracotta";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 will-change-transform";
  const styles: Record<string, string> = {
    primary:
      "bg-brand-green text-primary-foreground shadow-soft hover:shadow-elegant hover:-translate-y-0.5",
    outline:
      "border border-brand-brown/20 text-brand-brown hover:bg-brand-brown/5 hover:border-brand-brown/40",
    /* Terakota je svetla — beo tekst na njoj pada na ~2.7:1, pa ide braon (~5:1). */
    terracotta:
      "bg-brand-terracotta text-brand-brown shadow-soft hover:shadow-elegant hover:-translate-y-0.5",
    ghost: "text-brand-brown hover:text-brand-green",
  };
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) {
    /* Spoljni linkovi se otvaraju u novom tabu da posetilac ne izgubi stranicu. */
    const spoljni = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(spoljni ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/* ---------- Sections ---------- */

const navLinkovi = [
  { href: "#ana", label: "O meni" },
  { href: "#sta-obuhvata", label: "Šta obuhvata" },
  { href: "#kako-funkcionise", label: "Kako funkcioniše" },
  { href: "#za-koga", label: "Za koga" },
  { href: "#pitanja", label: "Pitanja" },
];

function Nav() {
  const [otvoren, setOtvoren] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <Container className="flex items-center justify-between py-6 md:py-8">
        <a href="#" className="flex items-center gap-2 text-brand-brown">
          <span className="font-display text-2xl tracking-tight">Ana — Fitness Coach</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          <nav className="flex items-center gap-6 text-sm text-brand-brown/80">
            {navLinkovi.map(({ href, label }) => (
              <a key={href} href={href} className="hover:text-brand-green transition">
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#prijava"
            className="inline-flex items-center gap-2 rounded-full border border-brand-brown/25 px-5 py-2 text-sm text-brand-brown hover:bg-brand-brown hover:text-primary-foreground transition"
          >
            Prijavi se
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOtvoren((o) => !o)}
          aria-expanded={otvoren}
          aria-label={otvoren ? "Zatvori meni" : "Otvori meni"}
          className="md:hidden flex h-11 w-11 items-center justify-center rounded-full border border-brand-brown/25 text-brand-brown transition hover:bg-brand-brown hover:text-primary-foreground"
        >
          {otvoren ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {otvoren && (
        <Container className="md:hidden pb-4">
          <nav className="rounded-3xl border border-border bg-card p-2 shadow-elegant">
            {navLinkovi.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOtvoren(false)}
                className="block rounded-2xl px-5 py-3.5 text-brand-brown transition hover:bg-brand-green hover:text-white"
              >
                {label}
              </a>
            ))}
            <a
              href="#prijava"
              onClick={() => setOtvoren(false)}
              className="mt-1 block rounded-2xl bg-brand-brown px-5 py-3.5 text-center text-sm font-medium text-primary-foreground"
            >
              Prijavi se
            </a>
          </nav>
        </Container>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32 pb-20 md:pb-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 fade-in-up">
            <h1 className="text-[2.75rem] leading-[1.02] sm:text-6xl md:text-7xl text-brand-brown">
              Radiš ceo dan, treniraš, paziš na ishranu – a stomak ti izgleda{" "}
              <em className="italic text-brand-green">isto</em>?
            </h1>
            <p className="mt-7 max-w-lg text-base md:text-lg text-muted-foreground leading-relaxed">
              Vodim žene kroz proces održivog mršavljenja i izgradnje zdravih navika — bez dijeta i
              jojo efekta.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Button href="#prijava" variant="primary">
                PRIJAVI SE ZA MENTORSTVO
              </Button>
              <Button
                href="https://preview.mailerlite.io/preview/2485512/sites/191881653543503200/anaavramovic-oczfis"
                variant="terracotta"
              >
                PREUZMI BESPLATAN VODIČ
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-brand-cream-deep shadow-elegant">
              <img
                src={anaCutout}
                alt="Ana Avramović — online fitness trener"
                width={304}
                height={1010}
                className="h-full w-full object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* Predstavljanje odmah ispod hero-a. Bez slike — Anina fotografija je taman iznad. */
function OMeni() {
  return (
    <section id="ana" className="pt-8 md:pt-10 pb-24 md:pb-32">
      <Container>
        <div className="flex flex-col items-center">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-brown/60">O meni</p>
          <h2 className="mt-5 text-4xl md:text-5xl tracking-[0.02em] text-brand-brown text-center">
            ANA AVRAMOVIĆ
          </h2>
          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-brand-green">
            Online fitness trener
          </p>

          <div className="mt-10 max-w-3xl space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Već 8 godina se aktivno bavim fitnesom. U tom periodu prošla sam kroz različite faze —
              dijete, prejedanja, hormonski disbalans, anemiju. Moje zdravstveno stanje prirodno me
              je dovelo do toga da istražujem, edukujem se i sada pomažem drugim ženama da žive
              kvalitetniji život.
            </p>
            <p>
              Moj cilj nije samo gubitak kilograma, već usvajanje zdravih navika, bolje zdravstveno
              stanje i razumevanje kako naše telo funkcioniše. Znam kako izgleda živeti nezdrav
              život, a još bolje znam kako se osećam sada kada živim zdrav život. I to je ono što me
              pokreće da se ne vraćam na staro.
            </p>
            <p>
              Zato pravim sistem u kom te učim kako da dobiješ pre svega zdrave navike koje će ti
              služiti ceo život, a ne još jednu dijetu koju ćeš da mrziš. Moj fokus je na tome da
              postaneš bolja osoba kroz ovaj proces i zato se radujem našem druženju.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* Stil A — svetlo žalfija ikonica, naslov + dopuna. */
function StaObuhvata() {
  const items = [
    {
      icon: Utensils,
      title: "Individualni plan ishrane",
      text: "Sastavljen je prema tvojim potrebama i ciljevima od hrane koju inače voliš. Dobijaš konkretnu namirnicu i konkretnu količinu u planu tako da se ne opterećuješ računanjem. Plan korigujem jednom nedeljno nakon tvog izveštaja i menjam ono što ti je eventualno dosadilo i ubacujem ono što bi želela pazeći da su svi nutrijenti pokriveni.",
    },
    {
      icon: Trophy,
      title: "Individualni plan treninga",
      text: "Trening koji je po volumenu, intenzitetu, frekvenciji i odabiru vežbi prilagođen tebi. To znači da trening neće biti isti za tebe i neku drugu osobu. Dobijaš tačan broj ponavljanja, serije, video i objašnjenje za svaku vežbu i po potrebi snimaš svoje treninge kako bih ti ispravila tehniku. Trening periodizujem tako da nema stagnacije.",
    },
    {
      icon: TrendingUp,
      title: "Praćenje napretka",
      text: "Ovo je ono što razlikuje bilo koji plan ishrane od mentorstva. Praćenje znači da sam upoznata sa tvojim napretkom i sve korigujem u cilju maksimalnih rezultata. Tvoj napredak najviše zavisi od toga koliko ćeš da mi daješ tačan i iskren feedback i radi se na nedelju dana. Jer na osnovu tvog feedbacka ja radim sve izmene.",
    },
    {
      icon: HeartHandshake,
      title: "Komunikacija i podrška",
      text: "Ovo je ono što je tebi zapravo najpotrebnije. Ne još jedan PDF plan sa kojim si bačena u vatru, već moja dostupnost 7 dana u nedelji za pitanja koja imaš. To ne znači da ću da te vučem za ruku da poštuješ plan, već služi tome da ti nekim savetom pomognem da nešto bolje razumeš. To je ono što moje klijentkinje najčešće ističu kao najbolji deo saradnje. Izazova će uvek biti, ali razlika je u tome da li ih prolaziš sama ili sa nekim ko ima znanja i iskustva.",
    },
  ];
  return (
    <section id="sta-obuhvata" className="py-24 md:py-32 bg-brand-cream-deep/60">
      <Container>
        <SectionHeading caps title="ŠTA OBUHVATA MENTORSTVO?" />
        {/* Četiri kartice sa dugačkim tekstom — dve kolone im daju širinu za čitanje. */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className={`${cardHover} rounded-3xl border border-border bg-card p-7`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green-soft text-brand-green transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className={`mt-6 text-xl text-brand-brown ${fadeToWhite}`}>{title}</h3>
              {text && (
                <p
                  className={`mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-white/85`}
                >
                  {text}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* Stil B — krem ikonica, prva kartica statično zelena. */
function KakoFunkcionise() {
  const items = [
    {
      icon: Hourglass,
      text: "Na početku saradnje popunjavaš upitnik na osnovu kog dobijam informacije i sastavljam plan ishrane i treninga",
    },
    { icon: Award, text: "Plan pravim prema tvojim ciljevima, trenutnom stanju i mogućnostima" },
    { icon: TrendingUp, text: "Na nedeljnom nivou mi šalješ izveštaj i pratim napredak" },
    { icon: Utensils, text: "Na osnovu izveštaja pravim izmene u ishrani i treningu po potrebi" },
    { icon: Target, text: "Sve se prilagođava tako da dobiješ maksimum" },
  ];
  return (
    <section id="kako-funkcionise" className="py-24 md:py-32">
      <Container>
        <SectionHeading caps title="KAKO FUNKCIONIŠE?" />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, text }, i) => {
            const zelena = i === 0;
            return (
              <div
                key={text}
                className={`group rounded-3xl p-8 border transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant ${
                  zelena
                    ? "bg-brand-green border-brand-green"
                    : "bg-card border-border hover:bg-brand-green hover:border-brand-green"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-500 ${
                    zelena
                      ? "bg-white/15 text-white"
                      : "bg-brand-cream-deep text-brand-green group-hover:bg-white/15 group-hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3
                  className={`mt-6 text-xl leading-snug ${
                    zelena ? "text-white" : `text-brand-brown ${fadeToWhite}`
                  }`}
                >
                  {text}
                </h3>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function ZaKoga() {
  const forYou = [
    "Za žene koje jedu malo, a ne mršave",
    "Za žene koje žele da poprave svoje zdravlje",
    "Za žene koje žele da izgrade mišiće",
    "Za žene koje žele proveren i siguran sistem bez lutanja i frustracija",
    "Za žene koje žele da treniraju",
    "Ako želiš vođenje i podršku, a ne jedan standardizovan plan",
    "Ako ne želiš kupus dijete, već pravu hranu koja te drži sitom",
  ];
  const notForYou = [
    "Za one koje ne žele da treniraju",
    "Za one koje žele brze rezultate i čarobne pilule",
    "Za one koje žele detokse, dijete i izgladnjivanje",
    "Za one koje nisu spremne da promene svoje navike",
    "Za one koje ne žele individualan pristup i neozbiljne su",
  ];

  return (
    <section id="za-koga" className="py-24 md:py-32 bg-brand-cream-deep/60">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
          <div className="rounded-3xl bg-card border border-border p-8 md:p-10">
            <h3 className="text-3xl md:text-4xl tracking-[0.02em] text-brand-brown">
              ZA KOGA JE MENTORSTVO?
            </h3>
            <ul className="mt-8 space-y-4">
              {forYou.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green text-primary-foreground">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-brand-brown/90 leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-brand-brown text-primary-foreground p-8 md:p-10">
            <h3 className="text-3xl md:text-4xl tracking-[0.02em] text-primary-foreground">
              ZA KOGA NIJE MENTORSTVO?
            </h3>
            <ul className="mt-8 space-y-4">
              {notForYou.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/90">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-white/85 leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* Naizmenično prikazuje dve fotografije uz prelaz. Slike su „pre/posle" poređenja,
   pa idu u object-contain — isecanje bi odseklo pola poređenja. */
function TransformacijeSlider() {
  const slike = [
    { src: transformacija1, alt: "Rezultat klijentkinje — pre i posle" },
    { src: transformacija2, alt: "Rezultat klijentkinje — pre i posle" },
  ];
  const [aktivna, setAktivna] = useState(0);
  const sledeca = () => setAktivna((i) => (i + 1) % slike.length);

  /* Zavisnost od `aktivna` znači da klik resetuje odbrojavanje —
     sledeća smena je puna 4.5s posle, a ne odmah. */
  useEffect(() => {
    const tajmer = setInterval(() => setAktivna((i) => (i + 1) % slike.length), 4500);
    return () => clearInterval(tajmer);
  }, [aktivna, slike.length]);

  return (
    <button
      type="button"
      onClick={sledeca}
      aria-label="Prikaži sledeću fotografiju"
      className="relative block aspect-[4/5] w-full overflow-hidden rounded-3xl bg-brand-cream-deep shadow-elegant"
    >
      {/* Traka sa svim slikama; pomera se u stranu za po jednu širinu okvira. */}
      <div
        className="flex h-full w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${aktivna * 100}%)` }}
      >
        {slike.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            loading="lazy"
            aria-hidden={i !== aktivna}
            className="h-full w-full shrink-0 object-contain"
          />
        ))}
      </div>
    </button>
  );
}

function Pristup() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        {/* Na telefonu tekst ide prvi, slike ispod. Na desktopu se slike vraćaju levo. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <TransformacijeSlider />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <h2 className="text-4xl md:text-5xl text-brand-brown">
              Verujem da <em className="italic text-brand-green">promena</em> počinje iz
              razumevanja, ne iz kazne.
            </h2>
            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Godinama unazad radim sa ženama koje su prošle kroz sve — dijete, restrikcije,
                razočaranja. Moj rad nije još jedan plan ishrane. To je proces u kome zajedno
                gradimo zdrav odnos sa hranom, telom i sobom.
              </p>
              <p>
                Verujem u strpljenje, individualnost i realne, održive korake. Mentorstvo koje nudim
                je topao, ali struktuiran prostor — dovoljno blizak da te razume, dovoljno
                profesionalan da te odvede tamo gde želiš.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="prijava" className="py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-green text-primary-foreground px-8 md:px-16 py-20 md:py-28 text-center">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <img src={lifestyle2} alt="" className="h-full w-full object-cover" aria-hidden />
          </div>
          <div className="relative">
            <h2 className="text-4xl md:text-6xl text-primary-foreground max-w-3xl mx-auto">
              Tvoja transformacija počinje jednom odlukom.
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-white/80 leading-relaxed">
              Prijavi se i dobićeš uputstva za sledeći korak u roku od 24h. Broj klijentkinja
              mesečno je ograničen kako bih svakoj posvetila pravu pažnju.
            </p>
            <div className="mt-10">
              <a
                href="https://wa.me/4915753058942"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-brand-brown px-8 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elegant"
              >
                Prijavi se za mentorstvo 1:1
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* Van komponente jer isti sadržaj hrani i sekciju i FAQPage strukturirane podatke. */
const faqStavke = [
  {
    q: "Da li može kućni trening ili u teretani?",
    a: "Pravim planove i za kućni i za teretanu. Trening u teretani je mnogo bolja opcija jer pruža veću mogućnost napretka. Ako izabereš kućni trening potrebno je kupiti nekoliko tegova i osnovnu opremu.",
  },
  {
    q: "Koliko mi treba vremena za pripremu obroka?",
    a: "Zapravo u kuhinji ćeš provesti manje vremena nego što si mislila. Obroci su jednostavni i ukusni, možeš ih pripremiti za nekoliko dana unapred. Za pripremu jednog obroka ti je potrebno od 2 do 15 minuta, a ako spremiš za nekoliko dana unapred još i manje.",
  },
  {
    q: "Da li mogu uzeti samo plan ishrane ili treninga?",
    a: "Postoji opcija i toga, ali je to jednokratni plan koji ne uključuje moje vođenje i praćenje napretka. I naravno cena je niža.",
  },
  {
    q: "Koliko traje mentorstvo?",
    a: "Mentorstvo traje minimum 4 nedelje, postoji mogućnost plaćanja 2 meseca odjednom i u tom slučaju je cena povoljnija. Mentorstvo nije program koji ima kraj, to je vođenje kroz proces do tvog cilja i nema ograničenja.",
  },
  {
    q: "Kada mogu da vidim napredak?",
    a: "Napredak je individualna stvar, ali ako poštuješ plan, već posle nedelju dana ćeš osetiti prve promene u energiji i smanjenju nadutosti. Napredak u izgledu se vidi već posle 3-4 nedelje, ali najbolji rezultati dolaze posle 8-12 nedelja kontinuiranog rada.",
  },
  {
    q: "Da li sama računam makrose?",
    a: "Ne. Od mene dobijaš sve već izračunato i pratiš količine i namirnice koje sam napisala. Ako želiš da neku namirnicu zameniš dobijaš i kalkulator koji ti automatski izračuna kalorije za tu namirnicu koju menjaš.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="pitanja" className="py-24 md:py-32">
      <Container>
        <SectionHeading title="Česta pitanja" />
        <div className="mt-14 max-w-3xl divide-y divide-border border-y border-border">
          {faqStavke.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`pitanje-${i}`}
                >
                  <span className="text-lg md:text-xl text-brand-brown font-medium">{it.q}</span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition ${
                      isOpen
                        ? "bg-brand-green text-primary-foreground border-brand-green"
                        : "text-brand-brown"
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  id={`pitanje-${i}`}
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-muted-foreground leading-relaxed pr-12">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="font-display text-3xl text-brand-brown">Ana Avramović</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-brand-brown/60">Kontakt</div>
            <a
              href="mailto:ana.onlinefitnesscoach@gmail.com"
              className="mt-3 inline-flex items-center gap-2 text-brand-brown hover:text-brand-green transition"
            >
              <Mail className="h-4 w-4" /> ana.onlinefitnesscoach@gmail.com
            </a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-brand-brown/60">Prati</div>
            <a
              href="https://www.instagram.com/ana_fitnesscoach_/"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex items-center gap-2 text-brand-brown hover:text-brand-green transition"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ana Avramović. Sva prava zadržana.</p>
          <p className="flex items-center gap-2">
            <span>Dizajn i izrada</span>
            <span aria-hidden className="h-px w-5 bg-brand-brown/20" />
            <a
              href="mailto:talicm@icloud.com"
              className="group font-display text-sm tracking-[0.28em] text-brand-brown/70 transition-colors duration-300 hover:text-brand-green"
            >
              M.T
              <span className="block h-px w-0 bg-brand-green transition-all duration-300 group-hover:w-full" />
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

/* Strukturirani podaci. Pretraživači i AI asistenti odavde izvlače činjenice —
   ko je Ana, šta nudi i odgovore na česta pitanja — bez čitanja rasporeda stranice.
   Sve tvrdnje ovde moraju da postoje i u vidljivom tekstu. */
function StrukturiraniPodaci() {
  const graf = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SEO.sajt}/#sajt`,
        url: `${SEO.sajt}/`,
        name: SEO.naslov,
        description: SEO.opis,
        inLanguage: "sr-Latn-RS",
        publisher: { "@id": `${SEO.sajt}/#ana` },
      },
      {
        "@type": "Person",
        "@id": `${SEO.sajt}/#ana`,
        name: "Ana Avramović",
        givenName: "Ana",
        familyName: "Avramović",
        jobTitle: "Online fitness trener",
        url: `${SEO.sajt}/`,
        email: "mailto:ana.onlinefitnesscoach@gmail.com",
        image: `${SEO.sajt}/og-image.jpg`,
        sameAs: ["https://www.instagram.com/ana_fitnesscoach_/"],
        knowsLanguage: "sr",
        description:
          "Online fitness trener sa osam godina iskustva u fitnesu. Vodi žene kroz proces " +
          "održivog mršavljenja i izgradnje zdravih navika kroz individualno mentorstvo — " +
          "personalizovan plan ishrane i treninga, nedeljno praćenje napretka i stalnu podršku.",
        knowsAbout: [
          "online fitness mentorstvo za žene",
          "individualni plan ishrane",
          "individualni plan treninga",
          "održivo mršavljenje bez dijeta",
          "izgradnja mišićne mase kod žena",
          "zdrave navike i promena životnog stila",
          "hormonski disbalans i ishrana",
          "praćenje napretka i korekcija plana",
        ],
      },
      {
        "@type": "Service",
        "@id": `${SEO.sajt}/#mentorstvo`,
        name: "Online mentorstvo za žene",
        serviceType: "Online fitness i nutricionističko mentorstvo",
        provider: { "@id": `${SEO.sajt}/#ana` },
        areaServed: { "@type": "Country", name: "Srbija" },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SEO.sajt}/#prijava`,
          serviceLocation: { "@type": "VirtualLocation", url: `${SEO.sajt}/` },
        },
        audience: {
          "@type": "Audience",
          audienceType: "Žene koje žele da smršaju, izgrade mišiće i poprave zdravlje bez dijeta",
        },
        description:
          "Individualno mentorstvo koje traje najmanje četiri nedelje. Obuhvata plan ishrane " +
          "sastavljen prema tvojim potrebama, plan treninga za kuću ili teretanu, nedeljno " +
          "praćenje napretka sa korekcijama i podršku sedam dana u nedelji.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Šta obuhvata mentorstvo",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Individualni plan ishrane",
                description:
                  "Sastavljen prema tvojim potrebama i ciljevima, od hrane koju voliš. " +
                  "Konkretne namirnice i količine, bez računanja kalorija. Korekcija jednom nedeljno.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Individualni plan treninga",
                description:
                  "Prilagođen po volumenu, intenzitetu, frekvenciji i odabiru vežbi. " +
                  "Za kuću ili teretanu, sa videom i objašnjenjem za svaku vežbu.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Nedeljno praćenje napretka",
                description:
                  "Na osnovu tvog nedeljnog izveštaja korigujem ishranu i trening kako ne bi došlo do stagnacije.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Komunikacija i podrška",
                description: "Dostupnost sedam dana u nedelji za pitanja tokom celog procesa.",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SEO.sajt}/#pitanja`,
        mainEntity: faqStavke.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graf) }} />
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      <StrukturiraniPodaci />
      <Nav />
      <Hero />
      <OMeni />
      <StaObuhvata />
      <KakoFunkcionise />
      <ZaKoga />
      <Pristup />
      <FinalCTA />
      <Faq />
      <Footer />
    </main>
  );
}
