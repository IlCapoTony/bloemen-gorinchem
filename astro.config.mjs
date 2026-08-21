// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import florists from './src/data/florists.json' with { type: 'json' };

// Datum van de laatste datacontrole, zodat lastmod in de sitemap meebeweegt
// met de inhoud in plaats van met het buildmoment.
const lastmod = new Date(florists.meta.lastReviewUpdate);

// De vergelijking is de belangrijkste pagina van de site, daarna de homepage.
const priorities = {
    '/bloemist-gorinchem/': 1.0,
    '/': 0.9,
    '/bloemenwinkels-gorinchem/': 0.8,
    '/bloemen-bezorgen-gorinchem/': 0.8,
    '/rouwboeket-gorinchem/': 0.7,
    '/trouwboeket-gorinchem/': 0.7,
    '/keuzehulp/': 0.6,
    '/methode/': 0.6,
    '/zakelijke-bloemen-gorinchem/': 0.5,
    '/bloemenabonnement-gorinchem/': 0.5,
    '/over/': 0.4,
};

// https://astro.build/config
export default defineConfig({
    site: 'https://www.bloemen-gorinchem.nl',
    outDir: 'dist',
    integrations: [
        sitemap({
            serialize(item) {
                const path = new URL(item.url).pathname;
                item.lastmod = lastmod.toISOString();
                item.changefreq = 'monthly';
                item.priority = priorities[path] ?? 0.5;
                return item;
            },
        }),
    ],
    build: {
        inlineStylesheets: 'always',
    },
    compressHTML: true,
});
