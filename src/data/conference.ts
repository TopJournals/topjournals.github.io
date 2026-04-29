import conferenceData from './content/conference.json';

export type ConferenceActivity = {
  kind: 'Conference Paper' | 'Presentation';
  title: string;
  contributors: string;
  venue: string;
  location: string;
  date: string;
  url?: string;
};

export const conferenceActivities: ConferenceActivity[] = conferenceData as ConferenceActivity[];
