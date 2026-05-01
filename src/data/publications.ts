import publicationsData from './content/publications.json';

export type Publication = {
  title: string;
  authors: string;
  year: number;
  venue: string;
  status?: string;
  tags: string[];
  featured?: boolean;
  highlyCited?: boolean;
  paperUrl?: string;
};

const hasIssueOrArticleNumber = (venue: string) =>
  /,\s*\d+(?:\(\d+\))?:\s*[\w.-]+/.test(venue) || /,\s*e[\w.-]+/.test(venue) || /,\s*\d{4,}\s*$/.test(venue);

const hasDoi = (url?: string) =>
  Boolean(url && (/\bdoi\.org\/10\.\d{4,9}\//i.test(url) || /\/doi\/10\.\d{4,9}\//i.test(url)));

const inferStatus = (year: number, venue: string) => {
  if (/\bUnder Review\b/i.test(venue)) return 'Under Review';
  if (/\bRevise\b/i.test(venue)) return 'Revise';
  if (/\bAccepted\b/i.test(venue)) return 'Accepted';
  if (year >= 2023 && hasIssueOrArticleNumber(venue)) return 'Published';
  return undefined;
};

const pub = (
  item: Publication
): Publication => ({
  ...item,
  paperUrl: item.paperUrl?.trim() ? item.paperUrl : undefined,
  status: hasDoi(item.paperUrl) ? 'Published' : item.status || inferStatus(item.year, item.venue)
});

export const publications: Publication[] = publicationsData.map((item) => pub(item as Publication));

export const publicationYears = Array.from(new Set(publications.map((item) => item.year))).sort(
  (a, b) => b - a
);

export const publicationTags = Array.from(
  new Set(publications.flatMap((item) => item.tags))
).sort((a, b) => a.localeCompare(b));
