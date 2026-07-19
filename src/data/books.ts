export type BookRecord = {
  year: number;
  authors: string;
  title: string;
  publisher: string;
};

const bookFiles = import.meta.glob('../content/books/*.json', { eager: true });
export const booksRecords: BookRecord[] = (Object.values(bookFiles).map((mod: any) => mod.default) as BookRecord[])
  .sort((a, b) => b.year - a.year);
