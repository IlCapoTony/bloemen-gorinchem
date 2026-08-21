/**
 * Genereert de Open Graph-afbeelding uit de actuele gidsdata.
 * Draaien na elke datawijziging: `npm run og`.
 */
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const data = JSON.parse(readFileSync('src/data/florists.json', 'utf8'));
const count = data.florists.length;
const month = new Date(data.meta.lastReviewUpdate).toLocaleDateString('nl-NL', {
  month: 'long',
  year: 'numeric',
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#12362B"/>
  <rect x="0" y="0" width="1200" height="10" fill="#C24131"/>
  <circle cx="1040" cy="150" r="190" fill="#1B4D3E"/>
  <circle cx="1090" cy="520" r="130" fill="#1B4D3E"/>
  <text x="80" y="200" font-family="Georgia, 'Times New Roman', serif" font-size="82" font-weight="bold" fill="#FFFFFF">Bloemen Gorinchem</text>
  <text x="80" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="82" font-weight="bold" fill="#FFFFFF">Gids</text>
  <rect x="80" y="350" width="120" height="6" fill="#C24131"/>
  <text x="80" y="430" font-family="Helvetica, Arial, sans-serif" font-size="38" fill="#E2E8E4">Alle ${count} bloemisten met een eigen winkel</text>
  <text x="80" y="486" font-family="Helvetica, Arial, sans-serif" font-size="38" fill="#E2E8E4">in Gorinchem, naast elkaar gezet</text>
  <text x="80" y="566" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#9DB5A8">Bijgewerkt ${month} &#183; bloemen-gorinchem.nl</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile('public/og-bloemen-gorinchem.png');

console.log(`og-bloemen-gorinchem.png bijgewerkt (${count} bloemisten, ${month})`);
