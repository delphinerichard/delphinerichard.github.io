import { isTranslation, Translation } from './translations';

export interface Skill {
  name: Translation;
  weight: number;
  icon: string;
}

export function isSkill(arg: Skill): arg is Skill {
  return isTranslation(arg.name) &&
    typeof arg.weight == 'number' &&
    typeof arg.icon == 'string'
    ? true
    : false;
}
