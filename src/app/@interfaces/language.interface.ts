import { Translation } from './translations';

export interface Language {
  name: Translation;
  level: string;
  icon: string;
}

export function isLanguage(arg: Language): arg is Language {
  return typeof arg.name.fr == 'string' &&
    typeof arg.name.en == 'string' &&
    typeof arg.level == 'string' &&
    typeof arg.icon == 'string'
    ? true
    : false;
}
