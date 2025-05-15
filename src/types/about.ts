export interface Profile {
  name: string;
  title: string;
  bio: string;
  profile_image: string;
}

export interface Contact {
  email1: string;
  email2: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  facebook: string;
  instagram: string;
}

export interface UserData {
  profile: Profile;
  contact: Contact;
}

export interface WorkExperience {
  position: string;
  company: string;
  duration: string;
  description: string;
  logo: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  logo: string;
}

export interface SkillCategory {
  name: string;
}

export interface Skills {
  "Programming Languages": SkillCategory[];
  "Data Science & Machine Learning": SkillCategory[];
  "Web Technologies": SkillCategory[];
  Database: SkillCategory[];
  "Cloud Technologies": SkillCategory[];
  "DevOps & Version Control": SkillCategory[];
  "Embedded Systems": SkillCategory[];
  Other: SkillCategory[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  logo: string;
}

export interface CV {
  link: string;
  last_updated: string;
}

export interface ProfessionalAssociation {
  name: string;
  logo: string;
}

export interface AchievementItem {
  title: string;
  details: string;
  date: string;
  image: string;
  link: string;
}

export interface AchievementCategory {
  category: string;
  items: AchievementItem[];
}

export interface Data {
  work_experience: WorkExperience[];
  education: Education[];
  skills: Skills;
  certifications: Certification[];
  cv: CV;
  professional_associations: ProfessionalAssociation[];
  achievements: AchievementCategory[];
}