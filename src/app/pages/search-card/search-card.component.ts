import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventSearch } from '../../models/event';
import { Category } from '../../models/category';

@Component({
  selector: 'app-search-card',
  imports: [],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.css'
})
export class SearchCardComponent {
  router: Router = inject(Router);
  @Input() event?: EventSearch;
  categories : Category[] = this.event?.categories || [];
  
}
