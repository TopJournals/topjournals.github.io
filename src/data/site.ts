import siteProfileData from './content/site-profile.json';

export type SiteProfile = {
  name: string;
  title: string;
  description: string;
  url: string;
  leader: string;
  leaderChinese: string;
  affiliation: string;
  address: string;
  email: string;
  scholarUrl: string;
  researchGateUrl: string;
  biography: string[];
  professionalActivities: string[];
};

const profile = (siteProfileData as SiteProfile[])[0];

export const site = {
  name: profile.name,
  title: profile.title,
  description: profile.description,
  url: profile.url,
  leader: profile.leader,
  leaderChinese: profile.leaderChinese,
  affiliation: profile.affiliation,
  address: profile.address,
  email: profile.email,
  scholarUrl: profile.scholarUrl,
  researchGateUrl: profile.researchGateUrl
};

export const biography = profile.biography;

export const professionalActivities = profile.professionalActivities;
