import { Skill } from './skill.interface';

export interface Experience {
  title: string;
  company: string;
  date: string;
  location: string;
  description: string;
  hiddenDescription: string;
  collapsed: boolean;
  skills: Skill[];
}

export function isExperience(arg: Experience): arg is Experience {
  return typeof arg.title === 'string' &&
    typeof arg.company === 'string' &&
    typeof arg.date === 'string' &&
    typeof arg.location === 'string' &&
    typeof arg.description === 'string' &&
    typeof arg.hiddenDescription === 'string' &&
    typeof arg.collapsed === 'boolean' &&
    typeof arg.skills === 'object'
    ? true
    : false;
}
