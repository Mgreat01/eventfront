import { Component } from '@angular/core';
import { CardBilletComponent } from "../card-billet/card-billet.component";
import { TriBilletsComponent } from "../tri-billets/tri-billets.component";

@Component({
  selector: 'app-mes-billets',
  imports: [CardBilletComponent, TriBilletsComponent],
  templateUrl: './mes-billets.component.html',
  styleUrl: './mes-billets.component.css'
})
export class MesBilletsComponent {

}
