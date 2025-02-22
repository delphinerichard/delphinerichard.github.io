import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/@interfaces/language.interface';
import { AvailableLang } from 'src/app/@interfaces/translations';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  @Input() lang: AvailableLang;
  @Input() isHeadless: boolean;
  languagesList: Language[];

  constructor(
    private translate: TranslateService,
    private appService: AppService
  ) {
    this.appService.getLanguagesData().then((res: Language[]) => {
      this.languagesList = res;
    });
  }

  toggleLanguage(lang: string) {
    if (lang === 'french') {
      this.translate.use('fr');
    }
    if (lang === 'uk') {
      this.translate.use('en');
    }
  }
}
