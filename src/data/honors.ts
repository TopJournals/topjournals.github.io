import honorsData from './content/honors.json';

export type Honor = {
  year: number;
  title: string;
  description: string;
};

export const honors: Honor[] = honorsData as Honor[];
