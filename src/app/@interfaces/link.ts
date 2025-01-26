import { isTranslation, Translation } from './translations';

export type Link = {
  name: Translation;
  url: string;
};

export function isLink(arg: Link): arg is Link {
  return isTranslation(arg.name) && typeof arg.url === 'string' ? true : false;
}
