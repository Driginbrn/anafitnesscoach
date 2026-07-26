/**
 * Jedno mesto za sve što se ponavlja po meta tagovima i strukturiranim podacima.
 * Ako se domen promeni, menja se samo `sajt` — ostalo se izvodi iz njega.
 *
 * Stoji u zasebnom fajlu, a ne u `__root.tsx`, jer izvoz koji nije komponenta
 * ruši Fast Refresh za ceo taj modul.
 */
export const SEO = {
  sajt: "https://anafitnesscoach.pages.dev",
  naslov: "Ana Avramović — Online fitness trener i mentorstvo za žene",
  opis:
    "Individualno online mentorstvo za žene: personalizovan plan ishrane i treninga, " +
    "nedeljno praćenje napretka i podrška 7 dana u nedelji. Bez dijeta i jojo efekta.",
} as const;
