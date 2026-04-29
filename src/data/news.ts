import newsData from './content/news.json';

export type NewsItem = {
  date: string;
  text: string;
  highlight?: boolean;
};

export const news: NewsItem[] = newsData as NewsItem[];
