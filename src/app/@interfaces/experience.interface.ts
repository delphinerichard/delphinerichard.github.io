import { isSkill, Skill } from './skill.interface';
import { isTranslation, Translation } from './translations';

export interface Experience {
  title: Translation;
  company: Translation;
  date: Translation;
  location: Translation;
  description: Translation;
  hiddenDescription?: Translation;
  collapsed: boolean;
  skills: Skill[];
}

export function isExperience(arg: Experience): arg is Experience {
  return isTranslation(arg.title) &&
    isTranslation(arg.company) &&
    isTranslation(arg.date) &&
    isTranslation(arg.location) &&
    isTranslation(arg.description) &&
    (typeof arg.hiddenDescription === 'undefined' ||
      (arg.hiddenDescription && isTranslation(arg.hiddenDescription))) &&
    typeof arg.collapsed === 'boolean' &&
    typeof arg.skills === 'object' &&
    arg.skills.every(isSkill)
    ? true
    : false;
}
