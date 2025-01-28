import { Component, Input } from '@angular/core';
import { Project } from 'src/app/@interfaces/project.interface';
import { AvailableLang } from 'src/app/@interfaces/translations';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-other-stuff',
  templateUrl: './other-stuff.component.html',
  styleUrls: ['./other-stuff.component.scss'],
})
export class OtherStuffComponent {
  @Input() lang: AvailableLang;
  stuffList: Project[];

  constructor(private appService: AppService) {
    this.appService.getStuffData().then((res: Project[]) => {
      this.stuffList = res;
    });
  }
}
