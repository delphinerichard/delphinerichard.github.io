import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/app.service';
import { DownloadDialogComponent } from '../download-dialog/download-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from '../error-snackbar/error-snackbar.component';

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

  public isLoading = false;
  public snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);

  toggleLanguage(lang: string) {
    this.translate.use(lang);
  }

  openDialog(): void {
    this.dialog.open(DownloadDialogComponent, {
      data: { isLoading: this.isLoading },
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(ErrorSnackbarComponent, {
      data: { message, action },
      duration: 5000,
      verticalPosition: 'top',
    });
  }

  handleDownloadPdfError() {
    this.isLoading = false;
    this.closeDialog();
    this.openSnackBar('snackbar.download-pdf-error', 'OK');
  }

  async downloadPdf() {
    this.isLoading = true;
    this.openDialog();
    try {
      const pdfApiResponse: Response = await this.appService.getPdfData();
      if (pdfApiResponse.status !== 201 || !pdfApiResponse?.body) {
        this.handleDownloadPdfError();
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
      this.isLoading = false;
      this.closeDialog();
    } catch (error) {
      this.handleDownloadPdfError();
      return;
    }
  }
}
