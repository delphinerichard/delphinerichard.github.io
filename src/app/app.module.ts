import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SkillComponent } from './skill/skill.component';
import { FormationsComponent } from './formations/formations.component';
import { ExperienceComponent } from './experience/experience.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from './app.service';
import { SmallColumnComponent } from './small-column/smallColumn.component';
import { JobsComponent } from './jobs/jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    SkillComponent,
    FormationsComponent,
    ExperienceComponent,
    SmallColumnComponent,
    JobsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatButtonModule,
    MatGridListModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
