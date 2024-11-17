import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/@interfaces/skill.interface';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent implements OnInit {
  @Input() skill: Skill;
  weightColor: string;

  ngOnInit() {
    const first = '#d26649';
    const second = '#DA846C';
    const third = '#E29F8D';

    if (this.skill.weight >= 70) {
      this.weightColor = first;
    } else if (this.skill.weight < 70 && this.skill.weight > 39) {
      this.weightColor = second;
    } else {
      this.weightColor = third;
    }
  }
}
