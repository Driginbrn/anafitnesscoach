import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  HeartHandshake,
  Sparkles,
  CalendarCheck,
  Utensils,
  Dumbbell,
  MessagesSquare,
  PlayCircle,
  Pill,
  Check,
  X,
  Instagram,
  Mail,
  ArrowRight,
} from "lucide-react";

import anaCutout from "@/assets/ana-cutout.png";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
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

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>{children}</div>;
}

function SectionHeading({
  title,
  intro,
  align = "left",
}: {
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <h2 className="text-4xl md:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{intro}</p>}
    </div>
  );
}

type BtnProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

function Button({ children, href, variant = "primary", className = "", onClick, type = "button" }: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 will-change-transform";
  const styles: Record<string, string> = {
    primary:
      "bg-brand-green text-primary-foreground shadow-soft hover:shadow-elegant hover:-translate-y-0.5",
    outline:
      "border border-brand-brown/20 text-brand-brown hover:bg-brand-brown/5 hover:border-brand-brown/40",
    ghost: "text-brand-brown hover:text-brand-green",
  };
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls}>
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
            <a href="#ana" className="hover:text-brand-green transition">O meni</a>
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
              Zdravlje koje <em className="italic text-brand-green">traje</em>,
              <br className="hidden sm:block" /> promena koja se <br className="hidden sm:block" /> ne završava dijetom.
            </h1>
            <p className="mt-7 max-w-lg text-base md:text-lg text-muted-foreground leading-relaxed">
              Vodim žene kroz proces održivog mršavljenja i izgradnje zdravih navika —
              bez restrikcija, bez pritiska, uz podršku svake nedelje.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Button href="#prijava" variant="primary">
                Prijavi se za mentorstvo
              </Button>
              <Button href="#vodic" variant="outline">
                Preuzmi besplatan vodič
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <img
              src={anaCutout}
              alt="Ana — mentorka za zdravlje i mršavljenje"
              width={304}
              height={1010}
              className="h-[440px] sm:h-[560px] lg:h-[720px] w-auto"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function WhyMentorship() {
  const items = [
    {
      icon: HeartHandshake,
      title: "Individualan pristup",
      text: "Plan koji se prilagođava tebi — tvom telu, ritmu i životu, a ne obrnuto.",
    },
    {
      icon: CalendarCheck,
      title: "Nedeljno praćenje",
      text: "Svake nedelje analiziramo napredak i prilagođavamo korake ka cilju.",
    },
    {
      icon: Sparkles,
      title: "Navike koje ostaju",
      text: "Radimo na temeljima — hrani, snu, kretanju i odnosu sa sobom.",
    },
    {
      icon: MessagesSquare,
      title: "Stalna podrška",
      text: "Nisi sama u procesu. Tu sam kad zapneš i kad slaviš svaki korak napred.",
    },
  ];
  return (
    <section id="mentorstvo" className="py-24 md:py-32">
      <Container>
        <SectionHeading title="Zašto odabrati mentorstvo umesto dijete?" />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green-soft text-brand-green">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl text-brand-brown">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function WhatYouGet() {
  const items = [
    { icon: Utensils, title: "Individualni plan ishrane", text: "Sastavljen po tvom telu, navikama i preferencijama." },
    { icon: Dumbbell, title: "Individualni plan treninga", text: "Kod kuće ili u teretani — prilagođeno tvom nivou." },
    { icon: CalendarCheck, title: "Nedeljno praćenje", text: "Redovna analiza i podešavanje strategije." },
    { icon: MessagesSquare, title: "Podrška 7 dana u nedelji", text: "Tu sam kada ti je potrebno usmerenje ili reč ohrabrenja." },
    { icon: PlayCircle, title: "Video biblioteka vežbi", text: "Jasna demonstracija svake vežbe iz plana." },
    { icon: Pill, title: "Plan suplementacije", text: "Samo ono što ima smisla — bez suvišnog." },
  ];
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading title="Sve što ti treba na jednom mestu." />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className={`rounded-3xl p-8 border border-border transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant ${
                i === 0 ? "bg-brand-green text-primary-foreground border-brand-green" : "bg-card"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  i === 0 ? "bg-white/15 text-white" : "bg-brand-cream-deep text-brand-green"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className={`mt-6 text-xl ${i === 0 ? "text-white" : "text-brand-brown"}`}>{title}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${i === 0 ? "text-white/85" : "text-muted-foreground"}`}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function IsItForYou() {
  const forYou = [
    "Umorna si od dijeta koje ne daju trajne rezultate",
    "Želiš da naučiš kako da jedeš i živiš zdravo",
    "Tražiš individualan pristup, a ne opšti plan",
    "Spremna si na proces koji traje mesecima, ne danima",
    "Želiš vođenje i podršku, ne još jedan PDF plan",
  ];
  const notForYou = [
    "Tražiš brzu dijetu za dve nedelje",
    "Nemaš vremena da se posvetiš procesu",
    "Ne želiš da menjaš navike i način razmišljanja",
    "Očekuješ rezultate bez rada i doslednosti",
  ];

  return (
    <section className="py-24 md:py-32 bg-brand-cream-deep/60">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
          <div className="rounded-3xl bg-card border border-border p-8 md:p-10">
            <h3 className="text-3xl md:text-4xl text-brand-brown">Da li je mentorstvo za tebe?</h3>
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
            <h3 className="text-3xl md:text-4xl text-primary-foreground">Kada mentorstvo nije pravi izbor?</h3>
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

function AboutAna() {
  return (
    <section id="ana" className="py-24 md:py-32 bg-brand-cream-deep/60">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <img
              src={anaCutout}
              alt="Ana — mentorka za zdravlje i mršavljenje"
              loading="lazy"
              width={304}
              height={1010}
              className="h-[420px] sm:h-[520px] lg:h-[640px] w-auto"
            />
          </div>
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-brown/60">O meni</p>
            <h2 className="mt-5 text-4xl md:text-5xl text-brand-brown">
              Verujem da <em className="italic text-brand-green">promena</em> počinje iz razumevanja, ne iz kazne.
            </h2>
            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Godinama unazad radim sa ženama koje su prošle kroz sve — dijete, restrikcije,
                razočaranja. Moj rad nije još jedan plan ishrane. To je proces u kome zajedno
                gradimo zdrav odnos sa hranom, telom i sobom.
              </p>
              <p>
                Verujem u strpljenje, individualnost i realne, održive korake. Mentorstvo koje
                nudim je topao, ali struktuiran prostor — dovoljno blizak da te razume, dovoljno
                profesionalan da te odvede tamo gde želiš.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function GuideForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sent");
  };

  return (
    <section id="vodic" className="py-24 md:py-32 bg-brand-cream-deep/60">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <img
                src={lifestyle1}
                alt="Besplatan vodič — jednostavan početak"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-4xl md:text-5xl text-brand-brown">
              Prvih sedam koraka ka zdravijem životu.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
              Ostavi svoju email adresu i pošaljem ti kratak, jasan vodič koji možeš da počneš da
              primenjuješ već ove nedelje — bez restrikcija i pritiska.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 max-w-lg space-y-4" noValidate>
              <div>
                <label htmlFor="ime" className="block text-xs uppercase tracking-[0.22em] text-brand-brown/70">
                  Ime
                </label>
                <input
                  id="ime"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tvoje ime"
                  className="mt-2 w-full rounded-2xl border border-border bg-card px-5 py-3.5 text-brand-brown placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:border-brand-green transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-[0.22em] text-brand-brown/70">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tvoj@email.com"
                  className="mt-2 w-full rounded-2xl border border-border bg-card px-5 py-3.5 text-brand-brown placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:border-brand-green transition"
                />
              </div>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button type="submit" variant="primary">
                  Preuzmi vodič <ArrowRight className="h-4 w-4" />
                </Button>
                {status === "sent" && (
                  <span className="text-sm text-brand-green">
                    Hvala — proveri svoj email za nekoliko minuta.
                  </span>
                )}
              </div>
            </form>
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
                href="mailto:zdravo@ana-mentorstvo.rs?subject=Prijava%20za%20mentorstvo"
                className="inline-flex items-center gap-2 rounded-full bg-brand-brown px-8 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elegant"
              >
                Prijavi se za mentorstvo <ArrowRight className="h-4 w-4" />
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
            <div className="font-display text-3xl text-brand-brown">Ana</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-brand-brown/60">Kontakt</div>
            <a
              href="mailto:zdravo@ana-mentorstvo.rs"
              className="mt-3 inline-flex items-center gap-2 text-brand-brown hover:text-brand-green transition"
            >
              <Mail className="h-4 w-4" /> zdravo@ana-mentorstvo.rs
            </a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-brand-brown/60">Prati</div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex items-center gap-2 text-brand-brown hover:text-brand-green transition"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>
        <div className="mt-14 flex justify-end text-xs text-muted-foreground">
          <p>Napravljeno sa pažnjom u Srbiji.</p>
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
      <WhyMentorship />
      <WhatYouGet />
      <IsItForYou />
      <AboutAna />
      <GuideForm />
      <FinalCTA />
      <Footer />
    </main>
  );
}
