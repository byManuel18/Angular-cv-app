import { Certificate, Education, Network, Project, Skill, SkillsNames, Volunteer } from "./cv.interface";

export interface NetworkOption  {
  network: Network,
  label: string | undefined
}

export interface SkillOption  {
  skill: SkillsNames,
  label: string | undefined
}


export interface FullForm {
  personalInfo: FormBasics;
  education:    FormEducations;
  work:         FormWork;
  certificates: FormCertificates;
  projects:     FormProjects;
  skills:       FormSkills;
}

export interface FormCertificates {
  certificates: Certificate[];
}

export interface FormEducations {
  education: Education[];
}

export interface FormBasics {
  name:       string;
  label:      string;
  image:      string;
  email:      string;
  phone:      string;
  sumary:     string;
  url:        string;
  city:       string;
  region:     string;
  postalCode: string;
  profiles:   FormProfile[];
}

export interface FormProfile {
  name: Network;
  url:  string;
}

export interface FormProjects {
  projects: Project[];
}

export interface FormSkills {
  skills: Skill[];
}

export interface FormWork {
  work: Volunteer[];
}

