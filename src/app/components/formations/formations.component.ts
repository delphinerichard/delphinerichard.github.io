import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Experience } from 'src/app/@interfaces/experience.interface';
import { AvailableLang } from 'src/app/@interfaces/translations';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
})
export class FormationsComponent {
  @Input() lang: AvailableLang;
  formationsList: Experience[];

  constructor(private appService: AppService) {
    this.appService.getFormationsData().then((res: Experience[]) => {
      this.formationsList = res;
    });
  }
}
