export interface Skill{
    name: string,
    weight: number,
    icon: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSkill(arg: any): arg is Skill {
    return typeof(arg.name) == 'string' &&
        typeof(arg.weight) == 'number' &&
        typeof(arg.icon) == 'string' 
    ? true : false;
}