import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent {
  @Input() name: string = "";
  @Input() weight: number = 0;
  @Input() icon: string = "";
  weightColor: string ="";

  ngOnInit() {

    const first = "#fb8500";
    const second = "#fd9e02";
    const third = "#ffb703";

    if(this.weight > 70){
      this.weightColor = first;
     } else if (this.weight < 70 && this.weight > 39){
      this.weightColor = second;
    } else {
      this.weightColor = third;
    }
  }
}
