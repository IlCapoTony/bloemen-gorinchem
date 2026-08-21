/**
 * Gids Score: van openbare feiten naar één getal van 0 tot 100.
 *
 * De formule staat voluit op /methode. Iedere bezoeker moet de score
 * kunnen narekenen met de cijfers die op de kaart zelf staan, dus alles
 * wordt hier berekend en niets wordt met de hand in de data gezet.
 */

/** Aantal reviews waaronder een gemiddelde nog richting het stadsgemiddelde wordt getrokken. */
export const CREDIBILITY_WEIGHT = 10;

/** Behoudend stadsgemiddelde voor bloemisten in Gorinchem, gebruikt als startpunt. */
export const PRIOR_RATING = 4.4;

export interface Reviews {
  googleScore: number;
  googleCount: number;
}

export interface ScoringItem {
  points: number;
  max: number;
  basis: string;
}

export interface FloristScoring {
  prijsKwaliteit: ScoringItem;
  afhaalgemak: ScoringItem;
  directBestellen: ScoringItem;
  actueleInformatie: ScoringItem;
  rouwwerk: ScoringItem;
  bruidswerk: ScoringItem;
  versAanbod: ScoringItem;
}

/**
 * Een 5,0 uit twee beoordelingen zegt minder dan een 4,6 uit honderdvijftig.
 * Daarom trekken we elk gemiddelde naar het stadsgemiddelde toe, sterker
 * naarmate er minder beoordelingen zijn.
 */
export function credibilityAdjustedRating({ googleScore, googleCount }: Reviews): number {
  const total = googleCount + CREDIBILITY_WEIGHT;
  return (googleCount * googleScore + CREDIBILITY_WEIGHT * PRIOR_RATING) / total;
}

/** Volumebonus: hoe meer beoordelingen, hoe betrouwbaarder het beeld. */
export function volumePoints(googleCount: number): number {
  if (googleCount > 50) return 10;
  if (googleCount >= 20) return 5;
  return 0;
}

export interface ScoreBreakdown {
  waardering: number;
  serviceGemak: number;
  directTransparant: number;
  aanbodSpecialisme: number;
  total: number;
  adjustedRating: number;
}

export function calculateScore(reviews: Reviews, scoring: FloristScoring): ScoreBreakdown {
  const adjustedRating = credibilityAdjustedRating(reviews);
  const waardering = Math.min(30, adjustedRating * 6) + volumePoints(reviews.googleCount);
  const serviceGemak = scoring.prijsKwaliteit.points + scoring.afhaalgemak.points;
  const directTransparant = scoring.directBestellen.points + scoring.actueleInformatie.points;
  const aanbodSpecialisme =
    scoring.rouwwerk.points + scoring.bruidswerk.points + scoring.versAanbod.points;

  return {
    waardering: round1(waardering),
    serviceGemak,
    directTransparant,
    aanbodSpecialisme,
    total: Math.round(waardering + serviceGemak + directTransparant + aanbodSpecialisme),
    adjustedRating: round1(adjustedRating * 10) / 10,
  };
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}
