import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Experience } from '../@interfaces/experience.interface';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
})
export class FormationsComponent {
  formationsList: Experience[];

  constructor(private appService: AppService) {
    this.appService.getFormationsData().then((res: Experience[]) => {
      this.formationsList = res;
    });
  }
}
