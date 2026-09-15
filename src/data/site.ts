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
  advisor?: string;
  advisorChinese?: string;
  advisorRole?: string;
  advisorAvatar?: string;
  advisorAffiliation?: string;
  advisorEmail?: string;
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
  researchGateUrl: profile.researchGateUrl,
  advisor: profile.advisor || 'Wenhe Liao',
  advisorChinese: profile.advisorChinese || '廖文和',
  advisorRole: profile.advisorRole || 'Professor',
  advisorAvatar: profile.advisorAvatar || '/assets/avatars/wenhe-liao.png',
  advisorAffiliation: profile.advisorAffiliation || 'School of Mechanical Engineering, Nanjing University of Science and Technology',
  advisorEmail: profile.advisorEmail || 'cnwho@njust.edu.cn'
};

export const biography = profile.biography;

export const professionalActivities = profile.professionalActivities;
