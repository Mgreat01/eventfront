import { Component, inject, OnInit } from '@angular/core';
import { EventSearch } from '../../models/event';
import { EventService } from '../../services/event.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
  selector: 'app-event-details',
  imports: [EventCardComponent],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {
  event: EventSearch = {} as EventSearch;
  eventService: EventService = inject(EventService);
  id: number = 0;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });
    console.log(this.id);
    this.loadEvent(this.id);
  }

  async loadEvent(id: number) {
    try {
      const response = await firstValueFrom(this.eventService.getEventById(id));
      this.event = response.data;
      console.log(this.event);

    } catch (error: any) {
      if (error.status === 404) {
        console.error('Erreur 404 : Ressource non trouvée.');
        console.log(error.status);

      } else {
        console.error('Une erreur est survenue :', error);
      }
    }
  }
}