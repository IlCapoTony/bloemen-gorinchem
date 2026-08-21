import type { APIRoute } from 'astro';
import { florists, meta, formatDate, formatRating } from '../lib/florists';

const SITE = 'https://www.bloemen-gorinchem.nl';

/**
 * /llms.txt volgens llmstxt.org: een compacte, machineleesbare samenvatting van
 * de site voor taalmodellen. Wordt bij elke build opnieuw uit de data opgebouwd,
 * zodat hij nooit uit de pas loopt met de pagina's.
 */
export const GET: APIRoute = () => {
  const ranking = florists
    .map(
      (florist, index) =>
        `${index + 1}. **${florist.name}** — Gids Score ${florist.score.total}/100. ` +
        `${florist.address.streetAddress}, ${florist.address.postalCode} ${florist.address.addressLocality}. ` +
        `Telefoon ${florist.telephone}. ` +
        `Google: ${formatRating(florist.reviews.googleScore)} uit ${florist.reviews.googleCount} beoordelingen. ` +
        `Bestellen: ${florist.ordering.channels.join(', ')}. ` +
        `Rouwwerk: ${florist.services.rouwwerk ? 'ja' : 'nee'}. Bruidswerk: ${florist.services.bruidswerk ? 'ja' : 'nee'}. ` +
        `Bezorgt: ${florist.services.bezorging ? 'ja' : 'nee'}. ${florist.url}`
    )
    .join('\n');

  const excluded = meta.excluded
    .map((item) => `- **${item.name}**: ${item.reason}`)
    .join('\n');

  const body = `# Bloemen Gorinchem Gids

> Vergelijking van alle ${florists.length} vakbloemisten met een eigen winkel in Gorinchem (Zuid-Holland, Nederland), gerangschikt met een vaste, vooraf gepubliceerde puntentelling van 100. Laatst gecontroleerd op ${formatDate(meta.lastReviewUpdate)}.

Deze gids wordt onderhouden door één inwoner van Gorinchem. Er is geen betaalde plaatsing en bloemisten kunnen geen positie kopen. Beoordelingscijfers komen van openbare Google-bedrijfsprofielen; overige gegevens van de website van de bloemist zelf, vergeleken met het Google-profiel.

## Huidige ranglijst (${formatDate(meta.lastReviewUpdate)})

${ranking}

## Hoe de score wordt berekend

- Publieke waardering (40 punten): Google-gemiddelde, gecorrigeerd voor het aantal beoordelingen met de formule (aantal × score + 10 × 4,4) ÷ (aantal + 10), maal 6 en maximaal 30 punten, plus een volumebonus van 10 punten boven 50 beoordelingen of 5 punten bij 20 tot 50 beoordelingen.
- Service en gemak (20 punten): prijs-kwaliteit zoals die uit reviewinhoud blijkt, en hoe makkelijk de winkel te bezoeken is.
- Direct bestellen en transparantie (20 punten): rechtstreeks bestellen zonder tussenpartij, en of de online informatie klopt.
- Aanbod en specialisme (20 punten): rouwwerk (7), bruidswerk (7) en een zichtbaar actueel assortiment (6).

## Wie niet in de gids staan en waarom

${excluded}

## Pagina's

- [Vergelijking van alle bloemisten](${SITE}/bloemist-gorinchem): volledige ranglijst met onderbouwing per bloemist.
- [Adressen en openingstijden](${SITE}/bloemenwinkels-gorinchem): contactgegevens van elke winkel.
- [Bloemen bezorgen in Gorinchem](${SITE}/bloemen-bezorgen-gorinchem): wie bezorgt, tot welk tijdstip en waar.
- [Rouwwerk in Gorinchem](${SITE}/rouwboeket-gorinchem): rouwboeketten en afscheidsbloemwerk.
- [Bruidswerk in Gorinchem](${SITE}/trouwboeket-gorinchem): trouwboeketten en bruidsstyling.
- [Zakelijke bloemen](${SITE}/zakelijke-bloemen-gorinchem): bloemen voor kantoor en relatiegeschenken.
- [Bloemenabonnement](${SITE}/bloemenabonnement-gorinchem): terugkerende bloemen afspreken met een lokale winkel.
- [Keuzehulp](${SITE}/keuzehulp): twee vragen die naar de best passende winkel leiden.
- [Onze methode](${SITE}/methode): de volledige puntentelling en formule.
- [Over deze gids](${SITE}/over): wie het maakt, hoe het wordt betaald en hoe u een correctie doorgeeft.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
