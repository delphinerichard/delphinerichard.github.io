import { Component, Input } from '@angular/core';
import { Experience } from 'src/app/@interfaces/experience.interface';
import { AvailableLang } from 'src/app/@interfaces/translations';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  @Input() experience: Experience = {} as Experience;
  @Input() lang: AvailableLang;
}
