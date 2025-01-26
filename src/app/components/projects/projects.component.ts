import { Component, Input } from '@angular/core';
import { Project } from 'src/app/@interfaces/project.interface';
import { AvailableLang } from 'src/app/@interfaces/translations';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  @Input() lang: AvailableLang;
  projectsList: Project[];

  constructor(private appService: AppService) {
    this.appService.getProjectsData().then((res: Project[]) => {
      this.projectsList = res;
    });
  }
}
