import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(
    private translate: TranslateService,
    private appService: AppService
  ) {}
  toggleLanguage(lang: string) {
    this.translate.use(lang);
  }

  async downloadPdf() {
    const pdfApiResponse: Response = await this.appService.getPdfData();
    if (!pdfApiResponse?.body) {
      console.error('Erreur lors de la récupération du pdf');
      return;
    }

    const readableStream = pdfApiResponse.body;
    const chunks = [];
    const reader = readableStream.getReader();
    let result;
    while (!(result = await reader.read()).done) {
      chunks.push(result.value);
    }
    const pdfBuffer = new Blob(chunks, { type: 'application/pdf' });

    const url = window.URL.createObjectURL(pdfBuffer);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv_delphine_richard.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
