import { Component, Input } from '@angular/core';
import { Formation } from '../@interfaces/formation.interface';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent {
  @Input() formation: Formation  = {} as Formation;
}
