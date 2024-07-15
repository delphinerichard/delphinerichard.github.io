import { Component } from '@angular/core';
import { Experience } from '../@interfaces/experience.interface';
import { AppService } from '../app.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent {
  jobsList: Experience[];

  constructor(private appService: AppService) {
    this.appService.getJobsData().then((res: Experience[]) => {
      this.jobsList = res;
    });
  }
}
