import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Experience } from 'src/app/@interfaces/experience.interface';

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
