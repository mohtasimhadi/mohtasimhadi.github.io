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