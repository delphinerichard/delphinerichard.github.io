import { Component } from '@angular/core';
import { Skill } from '../@interfaces/skill.interface';
import { AppService } from '../app.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  public skillsList: Skill[]; 

  constructor(private appService : AppService){
    this.appService.getSkillsData().then((res: Skill[]) => { this.skillsList = res });
  }
}

