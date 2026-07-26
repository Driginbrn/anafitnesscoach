import { createFileRoute } from "@tanstack/react-router";
import {
  Utensils,
  Trophy,
  TrendingUp,
  HeartHandshake,
  Pill,
  Video,
  Hourglass,
  Award,
  Target,
  Check,
  X,
  Instagram,
  Mail,
} from "lucide-react";

import anaCutout from "@/assets/ana-cutout.png";
import lifestyle2 from "@/assets/lifestyle-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ana — Mentorstvo za zdravlje i mršavljenje" },
      {
        name: "description",
        content:
          "Individualno mentorstvo za žene koje žele održivo mršavljenje, zdrav životni stil i podršku svake nedelje.",
      },
      { property: "og:title", content: "Ana — Mentorstvo za zdravlje i mršavljenje" },
      {
        property: "og:description",
        content:
          "Individualno mentorstvo za žene: personalizovana ishrana, trening i nedeljno praćenje.",
      },
    ],
  }),
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
  align = "left",
  caps = false,
}: {
  title: string;
  intro?: string;
  align?: "left" | "center";
  /** Naslovi pisani verzalom traže pozitivan razmak — bez toga se slova slepe. */
  caps?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <h2 className={`text-4xl md:text-5xl ${caps ? "tracking-[0.02em]" : ""}`}>{title}</h2>
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

function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <Container className="flex items-center justify-between py-6 md:py-8">
        <a href="#" className="flex items-center gap-2 text-brand-brown">
          <span className="font-display text-2xl tracking-tight">Ana — Fitness Coach</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8 text-sm text-brand-brown/80">
            <a href="#ana" className="hover:text-brand-green transition">
              O meni
            </a>
          </nav>
          <a
            href="#prijava"
            className="inline-flex items-center gap-2 rounded-full border border-brand-brown/25 px-5 py-2 text-sm text-brand-brown hover:bg-brand-brown hover:text-primary-foreground transition"
          >
            Prijavi se
          </a>
        </div>
      </Container>
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
    { icon: Utensils, title: "Individualni plan ishrane", text: "prilagođen tvojim potrebama" },
    { icon: Trophy, title: "Individualan plan treninga", text: "prema tvojim ciljevima" },
    { icon: TrendingUp, title: "Praćenje napretka", text: "na nedeljnom nivou i izmene" },
    { icon: HeartHandshake, title: "Moja podrška", text: "7 dana u nedelji" },
    { icon: Pill, title: "Plan suplementacije", text: "po potrebi" },
    { icon: Video, title: "Video materijal", text: "sa pravilnim izvođenjem vežbi" },
  ];
  return (
    <section id="sta-obuhvata" className="py-24 md:py-32 bg-brand-cream-deep/60">
      <Container>
        <SectionHeading caps title="ŠTA OBUHVATA MENTORSTVO?" />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

function Pristup() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <img
              src={anaCutout}
              alt="Ana Avramović — online fitness trener"
              loading="lazy"
              width={304}
              height={1010}
              className="h-[420px] sm:h-[520px] lg:h-[640px] w-auto"
            />
          </div>
          <div className="lg:col-span-7">
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
        <div className="mt-14 flex justify-end">
          <a
            href="mailto:talicm@icloud.com"
            aria-label="Izradio M.T — piši mi"
            className="font-display text-sm tracking-[0.3em] text-brand-brown/45 hover:text-brand-green transition-colors duration-300"
          >
            M.T
          </a>
        </div>
      </Container>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <OMeni />
      <StaObuhvata />
      <KakoFunkcionise />
      <ZaKoga />
      <Pristup />
      <FinalCTA />
      <Footer />
    </main>
  );
}
