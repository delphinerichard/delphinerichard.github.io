import { Component, Input } from '@angular/core';
import { AvailableLang } from 'src/app/@interfaces/translations';

@Component({
  selector: 'app-small-column',
  templateUrl: './smallColumn.component.html',
  styleUrls: ['./smallColumn.component.scss'],
})
export class SmallColumnComponent {
  @Input() lang: AvailableLang;
}
