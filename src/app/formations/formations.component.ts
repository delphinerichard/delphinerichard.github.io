import { Component } from '@angular/core';
import { Formation } from '../@interfaces/formation.interface';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationsComponent {

  formationsList: Formation[] = [
    {
      title: "Premiere formation",
      date: "2020 - 2022",
      description: "Voici la première formation",
      hiddenDescription: "",
      collapsed: true
    },
    {
      title: "Deuxième formation",
      date: "2018 - 2020",
      description: "Debut de la formation",
      hiddenDescription: "Logoden biniou degemer mat an penn ar bed gwiskamant, gwir pluenn neuiñ galv derc’hel start nec’h lakaat garm, us diaoul degouezhout da traezh pe beaj. E taol vantell us tour divalav rak da brudet, kazeg melen fourchetez dimeziñ talvoudus tasenn aketus kreñv geot, gwerzhañ hed pegañ nerzh ebrel ha tremen.",
      collapsed: true
    }
  ]
}

