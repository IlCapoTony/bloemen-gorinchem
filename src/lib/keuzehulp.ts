/**
 * De keuzelogica achter de keuzehulp, los van de pagina.
 *
 * De pagina rekent de uitkomsten bij het bouwen al uit en zet ze in een tabel,
 * zodat bezoekers zonder JavaScript — en crawlers die geen JavaScript
 * uitvoeren — dezelfde antwoorden zien als iemand die het formulier invult.
 * Beide kanten gebruiken de functie hieronder, zodat de statische tabel en het
 * interactieve antwoord niet uit elkaar kunnen lopen.
 */

export interface KeuzehulpFlorist {
  name: string;
  url: string;
  telephone: string;
  street: string;
  total: number;
  services: Record<string, boolean>;
  webshopLive: boolean;
  channels: string;
  sub: {
    prijsKwaliteit: number;
    advies: number;
    afhaalgemak: number;
    directBestellen: number;
    rouwwerk: number;
    bruidswerk: number;
  };
  reasons: {
    prijs: string;
    gemak: string;
    online: string;
    advies: string;
    rouw: string;
    bruid: string;
  };
}

export const DOELEN = [
  { value: 'cadeau', label: 'Een cadeauboeket', kort: 'Cadeauboeket' },
  { value: 'rouw', label: 'Rouwwerk of afscheidsbloemen', kort: 'Rouwwerk' },
  { value: 'bruid', label: 'Bruidswerk', kort: 'Bruidswerk' },
  { value: 'planten', label: 'Planten of iets voor in huis', kort: 'Planten' },
] as const;

export const VOORKEUREN = [
  { value: 'prijs', label: 'Zoveel mogelijk bloemen voor mijn geld', kort: 'Prijs-kwaliteit' },
  { value: 'online', label: 'Online bestellen en meteen afrekenen', kort: 'Online bestellen' },
  { value: 'gemak', label: 'Ruime openingstijden en makkelijk parkeren', kort: 'Langsgaan' },
  { value: 'advies', label: 'Persoonlijk advies in de winkel', kort: 'Persoonlijk advies' },
] as const;

/** Welk scoreonderdeel de doorslag geeft bij welke voorkeur. */
const SLEUTEL: Record<string, keyof KeuzehulpFlorist['sub']> = {
  prijs: 'prijsKwaliteit',
  online: 'directBestellen',
  gemak: 'afhaalgemak',
  advies: 'advies',
};

export interface Keuze {
  winnaar: KeuzehulpFlorist;
  /** Waarom deze winkel eruit komt, in de woorden van de onderbouwing zelf. */
  waarom: string;
}

/**
 * Eerst vallen de winkels af die de gevraagde specialisatie niet leveren, en
 * bij "online bestellen" ook de winkels zonder werkende webshop. Wat overblijft
 * gaat op het gevraagde onderdeel op volgorde, met de Gids Score als
 * doorslaggever bij gelijke stand.
 */
export function kiesBloemist(
  florists: KeuzehulpFlorist[],
  doel: string,
  voorkeur: string
): Keuze | null {
  let kandidaten = florists.filter((f) => {
    if (doel === 'rouw') return f.services.rouwwerk;
    if (doel === 'bruid') return f.services.bruidswerk;
    return true;
  });

  if (voorkeur === 'online') {
    const metWebshop = kandidaten.filter((f) => f.webshopLive);
    if (metWebshop.length) kandidaten = metWebshop;
  }

  const veld = SLEUTEL[voorkeur] ?? 'prijsKwaliteit';
  const winnaar = [...kandidaten].sort(
    (a, b) => b.sub[veld] - a.sub[veld] || b.total - a.total
  )[0];

  if (!winnaar) return null;

  const redenen: Record<string, string> = {
    prijs: winnaar.reasons.prijs,
    online: winnaar.reasons.online,
    gemak: winnaar.reasons.gemak,
    advies: winnaar.reasons.advies,
  };

  const doelReden =
    doel === 'rouw' ? ` ${winnaar.reasons.rouw}` : doel === 'bruid' ? ` ${winnaar.reasons.bruid}` : '';

  return { winnaar, waarom: (redenen[voorkeur] ?? redenen.prijs) + doelReden };
}
