import { Component } from '@angular/core';
import { TriEvenementComponent } from "../tri-evenement/tri-evenement.component";
import { CardEveneemntComponent } from "../card-eveneemnt/card-eveneemnt.component";

@Component({
  selector: 'app-mes-evenement',
  imports: [TriEvenementComponent, CardEveneemntComponent],
  templateUrl: './mes-evenement.component.html',
  styleUrl: './mes-evenement.component.css'
})
export class MesEvenementComponent {

}
