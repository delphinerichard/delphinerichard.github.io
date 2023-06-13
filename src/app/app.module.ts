import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerComponent } from './banner/banner.component';
import { SkillsComponent } from './skills/skills.component';
import { SkillComponent } from './skill/skill.component';
import { FormationsComponent } from './formations/formations.component';
import { ExperienceComponent } from './experience/experience.component';

import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    BannerComponent,
    SkillsComponent,
    SkillComponent,
    FormationsComponent,
    ExperienceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
