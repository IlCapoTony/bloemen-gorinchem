// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.bloemen-gorinchem.nl',
    outDir: 'dist',
    integrations: [sitemap()],
    build: {
        inlineStylesheets: 'always'
    }
});
