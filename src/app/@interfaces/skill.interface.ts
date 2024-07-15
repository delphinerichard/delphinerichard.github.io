export interface Skill {
  name: string;
  weight: number;
  icon: string;
}

export function isSkill(arg: Skill): arg is Skill {
  return typeof arg.name == 'string' &&
    typeof arg.weight == 'number' &&
    typeof arg.icon == 'string'
    ? true
    : false;
}
