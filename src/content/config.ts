// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Site profile – single entry collection
export const siteProfile = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    url: z.string().optional(),
    leader: z.string().optional(),
    leaderChinese: z.string().optional(),
    leaderAvatar: z.string().optional(),
    affiliation: z.string().optional(),
    address: z.string().optional(),
    email: z.string().optional(),
    scholarUrl: z.string().optional(),
    researchGateUrl: z.string().optional(),
    biography: z.array(z.string()).optional(),
    professionalActivities: z.array(z.string()).optional()
  })
});

export const publications = defineCollection({
  type: 'data',
  schema: z.object({
    year: z.union([z.number(), z.string()]).optional(),
    authors: z.string().optional(),
    title: z.string().optional(),
    venue: z.string().optional(),
    tags: z.array(z.string()).optional(),
    paperUrl: z.string().optional(),
    featured: z.boolean().optional(),
    highlyCited: z.boolean().optional(),
    status: z.string().optional(),
    researchCategory: z.string().optional(),
    designCategories: z.array(z.string()).optional()
  })
});

export const news = defineCollection({
  type: 'data',
  schema: z.object({
    date: z.string().optional(),
    text: z.string().optional(),
    highlight: z.boolean().optional()
  })
});

export const people = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    start: z.string().optional(),
    avatar: z.string().optional(),
    scholarUrl: z.string().optional(),
    researchGateUrl: z.string().optional(),
    status: z.string().optional()
  })
});

export const honors = defineCollection({
  type: 'data',
  schema: z.object({
    year: z.union([z.number(), z.string()]).optional(),
    title: z.string().optional(),
    description: z.string().optional()
  })
});

export const conference = defineCollection({
  type: 'data',
  schema: z.object({
    kind: z.string().optional(),
    title: z.string().optional(),
    contributors: z.string().optional(),
    venue: z.string().optional(),
    location: z.string().optional(),
    date: z.string().optional()
  })
});

export const patents = defineCollection({
  type: 'data',
  schema: z.object({
    year: z.union([z.number(), z.string()]).optional(),
    inventors: z.string().optional(),
    title: z.string().optional(),
    type: z.string().optional()
  })
});

export const software = defineCollection({
  type: 'data',
  schema: z.object({
    year: z.union([z.number(), z.string()]).optional(),
    holders: z.string().optional(),
    title: z.string().optional(),
    authority: z.string().optional()
  })
});

export const standards = defineCollection({
  type: 'data',
  schema: z.object({
    year: z.union([z.number(), z.string()]).optional(),
    title: z.string().optional(),
    authority: z.string().optional(),
    code: z.string().optional()
  })
});

export const collections = {
  'site-profile': siteProfile,
  publications,
  news,
  people,
  honors,
  conference,
  patents,
  software,
  standards
};
