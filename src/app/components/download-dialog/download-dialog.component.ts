import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DownloadDialogData {
  isLoading: boolean;
}

@Component({
  selector: 'app-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.scss'],
})
export class DownloadDialogComponent {
  readonly data = inject<DownloadDialogData>(MAT_DIALOG_DATA);
}
