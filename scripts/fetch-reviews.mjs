/**
 * Haalt de actuele Google-beoordelingen op voor de bloemisten in de gids.
 *
 *   GOOGLE_PLACES_API_KEY=... node scripts/fetch-reviews.mjs
 *
 * Toont per bloemist het huidige en het opgehaalde cijfer en schrijft niets weg;
 * wijzigingen gaan bewust met de hand in src/data/florists.json, zodat er altijd
 * iemand naar de uitkomst kijkt voordat die op de site komt.
 *
 * Met --json is de uitvoer machineleesbaar.
 */
import { readFileSync } from 'node:fs';

const key = process.env.GOOGLE_PLACES_API_KEY;
if (!key) {
  console.error('GOOGLE_PLACES_API_KEY ontbreekt. Sla het cijfer deze ronde over.');
  process.exit(2);
}

const asJson = process.argv.includes('--json');
const data = JSON.parse(readFileSync('src/data/florists.json', 'utf8'));
const results = [];

for (const florist of data.florists) {
  const query = `${florist.name} ${florist.address.streetAddress} ${florist.address.addressLocality}`;

  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask':
        'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.websiteUri,places.nationalPhoneNumber,places.regularOpeningHours.weekdayDescriptions,places.businessStatus',
    },
    body: JSON.stringify({ textQuery: query, languageCode: 'nl', regionCode: 'NL' }),
  });

  if (!response.ok) {
    console.error(`${florist.name}: API-fout ${response.status} — cijfer niet bijgewerkt`);
    continue;
  }

  const place = (await response.json()).places?.[0];
  if (!place) {
    console.error(`${florist.name}: geen resultaat — cijfer niet bijgewerkt`);
    continue;
  }

  results.push({
    id: florist.id,
    naam: florist.name,
    gevonden: place.displayName?.text,
    adres: place.formattedAddress,
    status: place.businessStatus,
    huidigeScore: florist.reviews.googleScore,
    nieuweScore: place.rating,
    huidigAantal: florist.reviews.googleCount,
    nieuwAantal: place.userRatingCount,
    telefoon: place.nationalPhoneNumber,
    website: place.websiteUri,
    openingstijden: place.regularOpeningHours?.weekdayDescriptions,
  });
}

/** Namen vergelijken zonder te struikelen over hoofdletters, accenten of leestekens. */
const normaliseer = (naam = '') =>
  naam
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/** Alleen melden bij een echt andere naam, niet bij een andere schrijfwijze. */
const naamWijktAf = (gevonden, verwacht) => {
  const a = normaliseer(gevonden);
  const b = normaliseer(verwacht);
  return !a.includes(b) && !b.includes(a);
};

if (asJson) {
  console.log(JSON.stringify(results, null, 2));
} else {
  for (const r of results) {
    const veranderd =
      r.nieuweScore !== r.huidigeScore || r.nieuwAantal !== r.huidigAantal ? ' ← gewijzigd' : '';
    console.log(
      `${r.naam}: ${r.huidigeScore} (${r.huidigAantal}) → ${r.nieuweScore} (${r.nieuwAantal})${veranderd}`
    );
    if (r.status && r.status !== 'OPERATIONAL') console.log(`  let op: status ${r.status}`);
    if (naamWijktAf(r.gevonden, r.naam)) {
      console.log(`  let op: gevonden als "${r.gevonden}" — ${r.adres}`);
    }
  }
  console.log(
    '\nGoogle-profielen bevatten soms een verouderd adres of telefoonnummer. Wijkt een\n' +
      'adres af van wat de bloemist zelf publiceert, volg dan de bloemist en niet Google.'
  );
}
