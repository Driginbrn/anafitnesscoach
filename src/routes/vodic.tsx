import { createFileRoute } from "@tanstack/react-router";
import { Mail, Instagram } from "lucide-react";

import { SEO } from "@/lib/seo";
import { Container, Button } from "@/components/sajt";
import anaCutout from "@/assets/ana-cutout.webp";

const VODIC_LINK =
  "https://preview.mailerlite.io/preview/2485512/sites/191881653543503200/anaavramovic-oczfis";

const NASLOV = "Besplatan vodič — Ana Avramović";
const OPIS = "5 razloga zašto ti se stomak ne smanjuje iako jedeš zdravo.";

/**
 * Zasebna stranica za besplatan vodič. Do nje se dolazi **samo preko direktnog linka**
 * — sa početne stranice ne vodi nijedno dugme ni link, po izričitom zahtevu.
 *
 * Zato nosi `noindex` i nije u `sitemap.xml`: da ne završi u rezultatima pretrage i
 * time zaobiđe tu odluku. Ako se ikad poželi da bude pretraživa, briše se `robots`
 * meta tag ispod i dodaje unos u `public/sitemap.xml`.
 */
export const Route = createFileRoute("/vodic")({
  head: () => ({
    meta: [
      { title: NASLOV },
      { name: "description", content: OPIS },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: NASLOV },
      { property: "og:description", content: OPIS },
      { property: "og:url", content: `${SEO.sajt}/vodic` },
      { property: "og:image", content: `${SEO.sajt}/og-image.jpg` },
      { property: "og:image:alt", content: "Ana Avramović, online fitness trener" },
      { name: "twitter:title", content: NASLOV },
      { name: "twitter:description", content: OPIS },
      { name: "twitter:image", content: `${SEO.sajt}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SEO.sajt}/vodic` }],
  }),
  component: Vodic,
});

function Vodic() {
  return (
    <main className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="py-6 md:py-8">
        <Container>
          <a href="/" className="font-display text-2xl tracking-tight text-brand-brown">
            Ana Avramović
          </a>
        </Container>
      </header>

      <section className="flex-1 py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.22em] text-brand-green">
                Besplatan vodič
              </p>

              <h1 className="mt-5 text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl text-brand-brown">
                5 razloga zašto ti se stomak ne smanjuje iako{" "}
                <em className="italic text-brand-green">jedeš zdravo</em>.
              </h1>

              <div className="mt-8 max-w-xl space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Ako paziš na ishranu, treniraš i trudiš se — a u ogledalu se ništa ne menja, nije
                  do tvoje volje. Najčešće je do nekoliko stvari koje niko ne pominje.
                </p>
                <p>
                  U vodiču ih prolazim jednu po jednu, jednostavno i bez stručnih fraza, sa onim što
                  možeš da primeniš već ove nedelje.
                </p>
              </div>

              <div className="mt-10">
                <Button href={VODIC_LINK} variant="terracotta">
                  PREUZMI BESPLATAN VODIČ
                </Button>
              </div>

              <p className="mt-5 text-sm text-muted-foreground">
                Stiže ti na email, odmah nakon prijave.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="mx-auto w-full max-w-sm lg:max-w-none">
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
          </div>
        </Container>
      </section>

      <footer className="border-t border-border py-10">
        <Container>
          <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
            <a
              href="mailto:ana.onlinefitnesscoach@gmail.com"
              className="inline-flex items-center gap-2 text-brand-brown transition hover:text-brand-green"
            >
              <Mail className="h-4 w-4" /> ana.onlinefitnesscoach@gmail.com
            </a>
            <a
              href="https://www.instagram.com/ana_fitnesscoach_/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-brand-brown transition hover:text-brand-green"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </Container>
      </footer>
    </main>
  );
}
