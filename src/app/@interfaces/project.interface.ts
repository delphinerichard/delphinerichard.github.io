import { isLink, Link } from './link';
import { isSkill, Skill } from './skill.interface';
import { isTranslation, Translation } from './translations';

export interface Project {
  title: Translation;
  description: Translation;
  imgLink: string;
  skills: Skill[];
  links?: Link[];
}

export function isProject(arg: Project): arg is Project {
  return (isTranslation(arg.title) &&
    isTranslation(arg.description) &&
    typeof arg.imgLink === 'string' &&
    typeof arg.skills === 'object' &&
    arg.skills.every(isSkill) &&
    typeof arg.links === 'undefined') ||
    (typeof arg.links === 'object' && arg.links.every(isLink))
    ? true
    : false;
}
