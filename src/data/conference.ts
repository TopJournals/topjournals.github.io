
export type ConferenceActivity = {
  type: 'Conference Paper' | 'Presentation';
  title: string;
  contributors: string;
  venue: string;
  location: string;
  date: string;
  url?: string;
};

const files = import.meta.glob('../content/conference/*.json', { eager: true });
export const conferenceActivities: ConferenceActivity[] = (Object.values(files).map((mod: any) => mod.default) as ConferenceActivity[])
  .sort((a, b) => b.date.localeCompare(a.date));
