import type { Florist } from './florists';

const SITE = 'https://www.bloemen-gorinchem.nl';

const DAY_MAP: Record<string, string> = {
  Maandag: 'Monday',
  Dinsdag: 'Tuesday',
  Woensdag: 'Wednesday',
  Donderdag: 'Thursday',
  Vrijdag: 'Friday',
  Zaterdag: 'Saturday',
  Zondag: 'Sunday',
};

/**
 * Eén bloemist als Florist-entiteit. De Gids Score gaat mee als onze eigen
 * redactionele Review — dat is een oordeel dat wij zelf publiceren. De
 * Google-cijfers laten we bewust buiten de opmaak: die zijn niet van ons.
 */
export function floristSchema(florist: Florist, rank: number): Record<string, unknown> {
  const sameAs = [florist.facebookUrl, florist.instagramUrl].filter(Boolean);

  return {
    '@type': 'Florist',
    '@id': `${SITE}/bloemist-gorinchem/#${florist.slug}`,
    name: florist.name,
    url: florist.url,
    telephone: florist.telephone,
    ...(florist.email ? { email: florist.email } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: florist.address.streetAddress,
      postalCode: florist.address.postalCode,
      addressLocality: florist.address.addressLocality,
      addressRegion: florist.address.addressRegion,
      addressCountry: florist.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: florist.geo.latitude,
      longitude: florist.geo.longitude,
    },
    areaServed: { '@type': 'City', name: 'Gorinchem' },
    ...(sameAs.length ? { sameAs } : {}),
    ...(florist.openingHours.length
      ? {
          openingHoursSpecification: florist.openingHours
            .filter((slot) => !slot.closed)
            .map((slot) => ({
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: `https://schema.org/${DAY_MAP[slot.day]}`,
              opens: slot.opens,
              closes: slot.closes,
            })),
        }
      : {}),
    makesOffer: Object.entries(florist.services)
      .filter(([, offered]) => offered)
      .map(([service]) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: SERVICE_LABELS[service] ?? service },
      })),
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: florist.score.total,
        bestRating: 100,
        worstRating: 0,
      },
      name: `Gids Score ${florist.score.total} van 100 — plaats ${rank} in Gorinchem`,
      reviewBody: florist.description,
      datePublished: florist.lastChecked,
      author: { '@id': `${SITE}/#organization` },
    },
  };
}

const SERVICE_LABELS: Record<string, string> = {
  rouwwerk: 'Rouwbloemen en afscheidsbloemwerk',
  bruidswerk: 'Bruidsboeketten en bruidswerk',
  bezorging: 'Bloemen bezorgen in Gorinchem',
  afhalen: 'Bestelling afhalen in de winkel',
  abonnement: 'Bloemenabonnement',
  zakelijk: 'Zakelijk bloemwerk',
};

/** De ranglijst als ItemList, zodat de volgorde zelf machineleesbaar is. */
export function rankingSchema(florists: Florist[], pageUrl: string): Record<string, unknown> {
  return {
    '@type': 'ItemList',
    '@id': `${pageUrl}#ranglijst`,
    name: 'Bloemisten in Gorinchem, gerangschikt op Gids Score',
    numberOfItems: florists.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: florists.map((florist, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: florist.name,
      item: { '@id': `${SITE}/bloemist-gorinchem/#${florist.slug}` },
    })),
  };
}

export function faqSchema(
  faqs: { question: string; answer: string }[],
  pageUrl: string
): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
