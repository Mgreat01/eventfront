import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { EventCardComponent } from '../event-card/event-card.component';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { EventSearch } from '../../models/event';
import { EventService } from '../../services/event.service';
import { firstValueFrom } from 'rxjs';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-home',
  imports: [ NgFor, EventCardComponent, CategoryCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  images = [
    'https://images.unsplash.com/photo-1626107096629-834f944251af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyZWUlMjBhdWRpdG9yaXVtfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1568772472528-9f7f5795e094?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZyZWUlMjBhdWRpdG9yaXVtfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1724753996329-3eef20c164c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZyZWUlMjBhdWRpdG9yaXVtfGVufDB8fDB8fHww',
  ];

  eventThrees: EventSearch[] = [];
  eventService: EventService = inject(EventService);

  ngOnInit(): void {
    initFlowbite();
    this.loadEvents();
  }

  ngOnDestroy(): void {}

  async loadEvents() {
    try {
      const response = await firstValueFrom(this.eventService.getLastEvents());
      this.eventThrees = response.data;
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