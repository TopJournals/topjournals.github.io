
export type Honor = {
  year: number;
  title: string;
  description: string;
};

const files = import.meta.glob('../content/honors/*.json', { eager: true });
export const honors: Honor[] = (Object.values(files).map((mod: any) => mod.default) as Honor[])
  .sort((a, b) => b.year - a.year);
