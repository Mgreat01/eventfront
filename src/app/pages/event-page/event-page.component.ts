import { Component, inject } from '@angular/core';
import { EventService } from '../../services/event.service';
import { environment } from '../../../environnement/environnement';
import { firstValueFrom } from 'rxjs';
import { EventSearch } from '../../models/event';
import { Meta } from '../../models/meta';
import { LinkUrl } from '../../models/link';
import { EventCardComponent } from "../event-card/event-card.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-event-page',
  imports: [EventCardComponent, NgIf, NgFor],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {

  eventService : EventService = inject(EventService);
  apiUrl = environment.apiUrl;
  events: EventSearch[] = [];
  pagination!: Meta;
  pageUrl!: LinkUrl;
  url!: string;
  errorCatch: boolean = false;

  ngOnInit() {
    this.loadEvents();
  }

  async loadEvents(url?: string) {
    try {
      const response = await firstValueFrom(this.eventService.getEvents(this.url));
      this.events = response.data;
      this.pagination = response.meta;
      this.pageUrl = response.links;
      console.log(this.events);
      console.log(this.pagination);
      console.log(this.pageUrl);
    } catch (error: any) {
      this.errorCatch = true;
      if (error.status === 404) {
        console.error('Erreur 404 : Ressource non trouvée.');
        console.log(error.status);
        this.events = [];


      } else {
        console.error('Une erreur est survenue :', error);
      }
    }
  }

  goToPage(url: string) {
    this.url = url;
    this.ngOnInit();
  }
}
