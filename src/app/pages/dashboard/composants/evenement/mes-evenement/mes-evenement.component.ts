import { Component, OnInit } from '@angular/core';
import { TriEvenementComponent } from "../tri-evenement/tri-evenement.component";
import { CardEveneemntComponent } from "../card-eveneemnt/card-eveneemnt.component";
import { EventService } from '../../../../../services/event.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-mes-evenement',
  imports: [TriEvenementComponent, CardEveneemntComponent,NgFor,NgIf],
  templateUrl: './mes-evenement.component.html',
  styleUrl: './mes-evenement.component.css'
})
export class MesEvenementComponent implements OnInit {
  evenements: any[] = [];
  loading = true;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.loading = true;
    this.eventService.getOrganizerEvents().subscribe({
      next: (res) => {
        this.evenements = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}