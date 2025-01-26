import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SkillComponent } from './components/skill/skill.component';
import { FormationsComponent } from './components/formations/formations.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from './app.service';
import { SmallColumnComponent } from './components/small-column/smallColumn.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { ContactComponent } from './components/contact/contact.component';
import { LanguageComponent } from './components/language/language.component';
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatMenuModule } from '@angular/material/menu';
import { SettingsComponent } from './components/settings/settings.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DownloadDialogComponent } from './components/download-dialog/download-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from './components/error-snackbar/error-snackbar.component';
import { ContactPdfOnlyComponent } from './components/contact-pdf-only/contact-pdf-only.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SkillComponent,
    FormationsComponent,
    ExperienceComponent,
    SmallColumnComponent,
    JobsComponent,
    ContactComponent,
    LanguageComponent,
    MobileHeaderComponent,
    SettingsComponent,
    DownloadDialogComponent,
    ErrorSnackbarComponent,
    ContactPdfOnlyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatGridListModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'fr',
    }),
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
