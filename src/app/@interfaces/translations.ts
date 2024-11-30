export type AvailableLang = 'fr' | 'en';
export type Translation = {
  [key in AvailableLang]: string;
};

export function isTranslation(arg: Translation): arg is Translation {
  return typeof arg.fr === 'string' && typeof arg.en === 'string'
    ? true
    : false;
}
