import { Component, Input } from '@angular/core';
import { Experience } from 'src/app/@interfaces/experience.interface';
import { AvailableLang } from 'src/app/@interfaces/translations';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent {
  @Input() lang: AvailableLang;
  jobsList: Experience[];

  constructor(private appService: AppService) {
    this.appService.getJobsData().then((res: Experience[]) => {
      this.jobsList = res;
    });
  }
}
