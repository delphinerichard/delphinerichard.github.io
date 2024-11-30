import { isTranslation, Translation } from './translations';

export interface Language {
  name: Translation;
  level: string;
  icon: string;
}

export function isLanguage(arg: Language): arg is Language {
  return isTranslation(arg.name) &&
    typeof arg.level == 'string' &&
    typeof arg.icon == 'string'
    ? true
    : false;
}
