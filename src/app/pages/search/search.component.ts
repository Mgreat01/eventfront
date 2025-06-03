import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SearchCardComponent } from '../search-card/search-card.component';
import { SearchService } from '../../services/search.service';
import { Category } from '../../models/category';
import { EventSearch } from '../../models/event';
import { Meta } from '../../models/meta';
import { LinkUrl } from '../../models/link';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { from, firstValueFrom } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-search',
  imports: [NgFor, SearchCardComponent, NgIf, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  images = [
    'https://images.unsplash.com/photo-1626107096629-834f944251af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyZWUlMjBhdWRpdG9yaXVtfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1568772472528-9f7f5795e094?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZyZWUlMjBhdWRpdG9yaXVtfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1724753996329-3eef20c164c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZyZWUlMjBhdWRpdG9yaXVtfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1626107096629-834f944251af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyZWUlMjBhdWRpdG9yaXVtfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1568772472528-9f7f5795e094?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZyZWUlMjBhdWRpdG9yaXVtfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1724753996329-3eef20c164c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZyZWUlMjBhdWRpdG9yaXVtfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1626107096629-834f944251af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyZWUlMjBhdWRpdG9yaXVtfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1568772472528-9f7f5795e094?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZyZWUlMjBhdWRpdG9yaXVtfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1724753996329-3eef20c164c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZyZWUlMjBhdWRpdG9yaXVtfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1626107096629-834f944251af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyZWUlMjBhdWRpdG9yaXVtfGVufDB8fDB8fHww',
  ];

  isOpenDropDown: boolean = false;
  searchService = inject(SearchService);
  events: EventSearch[] = [];
  pagination!: Meta;
  pageUrl!: LinkUrl;
  url!: string;
  isLoaded: boolean = false;
  prevPage!: string;
  currentPage!: string;
  nextPage!: string;
  searchTerm: string = '';
  private apiUrl = 'http://localhost:8000/api';
  searchForm = new FormControl('');
  perPage = new FormControl<number>(10);
  errorCatch : boolean = false;
  items = []; 

  ngOnInit() {
    this.loadEvents();
  }

  async loadEvents(url?: string) {
    try {
      const response = await firstValueFrom(this.searchService.getEvents(this.url));
      this.isLoaded = !this.isLoaded;
      this.events = response.data;
      this.pagination = response.meta;
      this.pageUrl = response.links;
      this.isLoaded = true;
      this.errorCatch = false;
      console.log(this.pagination);

      this.currentPage = `${this.pagination.path}&${this.pagination.current_page}`;
      console.log(this.currentPage);
      if (this.pageUrl.prev != null) {
        this.prevPage = this.pageUrl.prev;
      }
      if (this.pageUrl.next != null) {
        this.nextPage = this.pageUrl.next;
      }
    } catch (error: any) {
      if (error.status === 404) {
        console.error('Erreur 404 : Ressource non trouvée.');
        console.log(error.status);
        this.errorCatch = true;
        this.events = [];

      } else {
        console.error('Une erreur est survenue :', error);
      }
      this.isLoaded = false;
    }
  }

  goToPage(url: string) {
    this.url = url;
    this.ngOnInit();
  }

  submit(event: Event) {
    event.preventDefault();
    console.log(this.searchForm.value);
    this.url = this.pagination.path + '?search=' + this.searchForm.value;
    console.log('Terme de recherche :', this.url);

    this.goToPage(this.url);
  }

  toggleDropdown(): void {
    this.isOpenDropDown = !this.isOpenDropDown;
  }

  openDropdown(): void {
    this.isOpenDropDown = false;
  }

  resetFilters(): void {

  }
}
