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
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
