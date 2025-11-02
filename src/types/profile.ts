export interface Education {
  school: string;
  degree: string;
  years: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  duration: string;
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  company: string;
  experience: string;
  location: string;
  score: number;
  about: string;
  skills: string[];
  education: Education[];
  work_history: WorkExperience[];
  website: string;
  resume_url: string;
  email: string;
  social_links: Record<string, string>;
  ideal_next_opportunity: string;
  lpa: string;
  club_member: boolean;
  availability: string;
  created_at: string;
}

export interface UnlockedProfile {
  id: string;
  profile_id: string;
  unlocked_at: string;
}
