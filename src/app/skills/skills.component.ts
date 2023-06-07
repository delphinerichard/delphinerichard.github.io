import { Component } from '@angular/core';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

// TO DO : update the skill list according to real skills
public skillsList: Skill[] = [
  {
    name: "Skill",
    weight: 80,
    icon: 'linkedin'
  },
  {
    name: "Another Skill",
    weight: 40,
    icon: 'github'
  },
  {
    name: "Long Skill with spaces",
    weight: 20,
    icon: 'linkedin'
  },
  {
    name: "Half skill",
    weight: 15,
    icon: 'email'
  }
];
}

export interface Skill{
  name: string,
  weight: number,
  icon: string
}
