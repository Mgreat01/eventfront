import { UserService } from './../../../../../services/user.service';
import { Component } from '@angular/core';
import { CardBilletComponent } from "../card-billet/card-billet.component";
import { TriBilletsComponent } from "../tri-billets/tri-billets.component";
import { NgFor, NgIf } from '@angular/common';
import { EventService } from '../../../../../services/event.service';

@Component({
  selector: 'app-mes-billets',
  imports: [CardBilletComponent, TriBilletsComponent,NgFor,NgIf],
  templateUrl: './mes-billets.component.html',
  styleUrl: './mes-billets.component.css'
})
export class MesBilletsComponent {
  

   constructor(private eventService: EventService, private userService: UserService) {}

   tickets: any[] = [];
    loading = true;

ngOnInit(): void {
  this.eventService.getOrganizerTickets().subscribe({
    next: (res) =>{ this.tickets = res.data;
      this.loading = false;
    },
    error: () => this.tickets = []


  });
  this.loading = false;
}


  

}



