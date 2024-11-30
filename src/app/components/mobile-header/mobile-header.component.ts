import { Component, Input } from '@angular/core';
import { AvailableLang } from 'src/app/@interfaces/translations';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
})
export class MobileHeaderComponent {
  @Input() lang: AvailableLang;
}
