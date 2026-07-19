
export type Publication = {
  title: string;
  authors: string;
  year: number;
  venue: string;
  status?: string;
  tags: string[];
  researchCategory: string;
  designCategories: string[];
  featured?: boolean;
  highlyCited?: boolean;
  paperUrl?: string;
};

const researchCategoryOrder = [
  'Electromagnetic & Stealth Metastructures',
  'Mechanical Metamaterials & Lattices',
  'Manufacturing & Computational Design',
  'Biomedical & Programmable Structures'
];

const designCategoryOrder = [
  'AI & Data-driven Design',
  'Topology, Gradient & Heterogeneous Design',
  'Bio-inspired Design',
  'Reconfigurable & Tunable Design',
  'Manufacturing-aware & CAD Modeling'
];

const hasIssueOrArticleNumber = (venue: string) =>
  /,\s*\d+(?:\(\d+\))?:\s*[\w.-]+/.test(venue) || /,\s*e[\w.-]+/.test(venue) || /,\s*\d{4,}\s*$/.test(venue);

const hasDoi = (url?: string) =>
  Boolean(url && (/\bdoi\.org\/10\.\d{4,9}\//i.test(url) || /\/doi\/10\.\d{4,9}\//i.test(url)));

const inferStatus = (year: number, venue: string) => {
  if (/\bUnder Review\b/i.test(venue)) return 'Under Review';
  if (/\bRevise\b/i.test(venue)) return 'Revise';
  if (/\bAccepted\b/i.test(venue)) return 'Accepted';
  if (year >= 2023 && hasIssueOrArticleNumber(venue)) return 'Published';
  if (year < 2026) return 'Published';
  return undefined;
};

const pub = (
  item: Publication
): Publication => ({
  ...item,
  designCategories: Array.isArray(item.designCategories) ? item.designCategories : [],
  paperUrl: item.paperUrl?.trim() ? item.paperUrl : undefined,
  status: hasDoi(item.paperUrl) ? 'Published' : item.status || inferStatus(item.year, item.venue)
});

const files = import.meta.glob('../content/publications/*.json', { eager: true });
export const publications: Publication[] = (Object.values(files).map((mod: any) => pub(mod.default)))
  .sort((a, b) => b.year - a.year);

export const publicationYears = Array.from(new Set(publications.map((item) => item.year))).sort(
  (a, b) => b - a
);

export const publicationTags = Array.from(
  new Set(publications.flatMap((item) => item.tags))
).sort((a, b) => a.localeCompare(b));

export const publicationResearchCategories = researchCategoryOrder.filter((category) =>
  publications.some((item) => item.researchCategory === category)
);

export const publicationDesignCategories = designCategoryOrder.filter((category) =>
  publications.some((item) => item.designCategories.includes(category))
);
