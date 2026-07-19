const profileData = import.meta.glob('../content/site-profile/index.json', { eager: true });
const profile = ((Object.values(profileData)[0] as any)?.default || {}) as SiteProfile;

export type SiteProfile = {
  name: string;
  title: string;
  description: string;
  url: string;
  leader: string;
  leaderChinese: string;
  leaderAvatar: string;
  affiliation: string;
  address: string;
  email: string;
  scholarUrl: string;
  researchGateUrl: string;
  biography: string[];
  professionalActivities: string[];
};

// const profile = (siteProfileData as SiteProfile[])[0];

export const site = {
  name: profile.name,
  title: profile.title,
  description: profile.description,
  url: profile.url,
  leader: profile.leader,
  leaderChinese: profile.leaderChinese,
  leaderAvatar: profile.leaderAvatar,
  affiliation: profile.affiliation,
  address: profile.address,
  email: profile.email,
  scholarUrl: profile.scholarUrl,
  researchGateUrl: profile.researchGateUrl
};

export const biography = profile.biography;

export const professionalActivities = profile.professionalActivities;
