import { Component, Input, OnInit } from '@angular/core';
import { Skill } from '../@interfaces/skill.interface';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  @Input() skill: Skill;
  weightColor: string;

  ngOnInit() {
    const first = "#fb8500";
    const second = "#fd9e02";
    const third = "#ffb703";

    if(this.skill.weight > 70){
      this.weightColor = first;
     } else if (this.skill.weight < 70 && this.skill.weight > 39){
      this.weightColor = second;
    } else {
      this.weightColor = third;
    }
  }
}
