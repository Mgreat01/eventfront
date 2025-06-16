import { Component, inject, OnInit } from '@angular/core';
import { EventSearch } from '../../models/event';
import { EventService } from '../../services/event.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EventCardComponent } from '../event-card/event-card.component';
import { QuillModule } from 'ngx-quill';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [EventCardComponent, QuillModule, NgFor],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent{
  event: EventSearch = {} as EventSearch;
  eventThrees: EventSearch[] = [];
  eventService: EventService = inject(EventService);
  id: number = -1;
  descriptionHtml: SafeHtml | undefined;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.loadEvent(this.id);
    });
    console.log(this.id);
  }

  async loadEvent(id: number) {
    try {
      const response = await firstValueFrom(this.eventService.getEventById(id));
      const responseLastEvent = await firstValueFrom(this.eventService.getLastEvents(3, id));

      this.event = response.data;
      this.eventThrees = responseLastEvent.data;

      this.descriptionHtml = this.sanitizer.bypassSecurityTrustHtml(this.event.description);
      console.log(this.event);
      console.log(this.eventThrees);

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