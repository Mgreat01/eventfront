import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SearchCardComponent } from '../search-card/search-card.component';
import { Category } from '../../models/category';
import { EventSearch } from '../../models/event';
import { Meta } from '../../models/meta';
import { LinkUrl } from '../../models/link';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-search',
  imports: [NgFor, SearchCardComponent, NgIf, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  isOpenDropDown: boolean = false;
  searchService = inject(EventService);
  events: EventSearch[] = [];
  categories: Category[] = [];
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
  categoryForm = new FormControl('');
  perPage = new FormControl<number>(10);
  errorCatch : boolean = false;
  items = [];

  ngOnInit() {
    this.loadEvents();
  }

  async loadEvents(url?: string) {
    try {
      const response = await firstValueFrom(this.searchService.getEvents(this.url));
      const responseCategory = await firstValueFrom(this.searchService.getCategories(undefined, true));
      this.isLoaded = !this.isLoaded;
      this.events = response.data;
      this.categories = responseCategory.data;
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
    this.url = this.pagination.path + '?search=' + this.searchForm.value + '&categories=' + this.categoryForm.value;
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
