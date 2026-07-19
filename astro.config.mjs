import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

const owner = process.env.GITHUB_REPOSITORY_OWNER ?? process.env.GITHUB_REPOSITORY?.split('/')[0];
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserOrOrgPagesRepo = owner && repo && repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;

const isDev = process.argv.includes('dev');

export default defineConfig({
  output: isDev ? 'hybrid' : 'static',
  site: owner ? `https://${owner}.github.io` : 'http://127.0.0.1:4321',
  base: owner && repo && !isUserOrOrgPagesRepo ? `/${repo}` : '/',
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    react(),
    process.argv.includes('dev') ? keystatic() : null
  ].filter(Boolean)
});
