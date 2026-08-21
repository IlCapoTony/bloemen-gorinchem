import data from '../data/florists.json';
import { calculateScore, type FloristScoring, type ScoreBreakdown } from './scoring';

export interface Florist {
  id: string;
  name: string;
  slug: string;
  isRecommended: boolean;
  isNew?: boolean;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: { latitude: number; longitude: number };
  telephone: string;
  email?: string;
  url: string;
  googleMapsUrl?: string;
  appleMapsUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  openingHours: Array<{ day: string; opens?: string; closes?: string; closed?: boolean }>;
  reviews: { googleScore: number; googleCount: number };
  dataInsufficient?: boolean;
  ordering: { channels: string[]; webshopStatus: string; note: string };
  services: Record<string, boolean>;
  scoring: FloristScoring;
  /** Weegt alleen mee in de keuzehulp, niet in de Gids Score. */
  persoonlijkAdvies: { points: number; basis: string };
  highlights: string[];
  testimonial?: {
    text: string;
    author: string;
    source: string;
    rating: number;
    url?: string;
  };
  description: string;
  lastChecked: string;
  score: ScoreBreakdown;
}

export const meta = data.meta;

/**
 * Bloemisten met een doorgerekende score, hoogste eerst. Bij een gelijke
 * score wint de bloemist met de meeste beoordelingen, zodat de volgorde
 * niet per build kan wisselen.
 */
export const florists: Florist[] = (data.florists as unknown as Florist[])
  .map((florist) => ({
    ...florist,
    score: calculateScore(florist.reviews, florist.scoring),
  }))
  .sort((a, b) => b.score.total - a.score.total || b.reviews.googleCount - a.reviews.googleCount);

export const topFlorist = florists[0];

export const utm = (url: string, campaign: string): string => {
  const target = new URL(url);
  target.searchParams.set('utm_source', 'gids-gorinchem');
  target.searchParams.set('utm_medium', 'referral');
  target.searchParams.set('utm_campaign', campaign);
  return target.href;
};

/** Datum van de laatste datacontrole, als "21 augustus 2026". */
export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

/** Maand van de laatste datacontrole, als "augustus 2026". */
export const formatMonth = (iso: string): string =>
  new Date(iso).toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' });

/** Reviewcijfer als "4,6" of "5,0" — altijd één decimaal, Nederlandse komma. */
export const formatRating = (score: number): string => score.toFixed(1).replace('.', ',');
