export interface ResearchTeamData {
  advisors: Advisor[];
  collaborators: Collaborator[];
  students: Student[];
  past_collaborators_mentors: PastCollaboratorMentor[];
}

export interface Advisor {
  name: string;
  designation: string;
  affiliation: string;
  duration: string;
  photo: string;
  link: string;
}

export interface People {
  name: string;
  affiliation: string;
  photo: string;
  link: string;
  duration: string;
}


export interface Collaborator extends People {
  designation: string;
}

export interface Student extends People {
  degree: string;
  current_affiliation: string;
}

export interface PastCollaboratorMentor extends People {
  designation: string;

}

export interface Person {
  name: string;
  designation?: string;
  affiliation: string;
  duration: string;
  photo: string;
  link: string;
  degree?: string;
  current_affiliation?: string;
  university?: string;
}