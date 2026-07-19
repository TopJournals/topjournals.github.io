
export type NewsItem = {
  date: string;
  text: string;
  highlight?: boolean;
};

const files = import.meta.glob('../content/news/*.json', { eager: true });
export const news: NewsItem[] = (Object.values(files).map((mod: any) => mod.default) as NewsItem[])
  .sort((a, b) => b.date.localeCompare(a.date));
