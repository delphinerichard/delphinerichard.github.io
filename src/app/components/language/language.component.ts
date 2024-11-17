import { Component } from '@angular/core';
import { Language } from 'src/app/@interfaces/language.interface';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  languagesList: Language[];

  constructor(private appService: AppService) {
    this.appService.getLanguagesData().then((res: Language[]) => {
      this.languagesList = res;
    });
  }
}
