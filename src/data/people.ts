import peopleData from './content/people.json';

export type Person = {
  name: string;
  role: string;
  start: string;
};

export const people: Person[] = peopleData as Person[];
