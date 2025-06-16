import { Component, inject } from '@angular/core';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { EventService } from '../../services/event.service';
import { Category } from '../../models/category';
import { firstValueFrom } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Meta } from '../../models/meta';
import { LinkUrl } from '../../models/link';

@Component({
  selector: 'app-category-page',
  imports: [CategoryCardComponent, NgFor, NgIf, NgxPaginationModule],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent{
  categoryService: EventService = inject(EventService);
  categories: Category[] = [];
  pagination!: Meta;
  pageUrl!: LinkUrl;
  url!: string;
  isLoaded: boolean = false;
  prevPage!: string;
  currentPage!: string;
  nextPage!: string;
  private apiUrl = 'http://localhost:8000/api';
  errorCatch: boolean = false;
  items = [];

  ngOnInit(): void {
    this.loadCategories();
  }

  async loadCategories(url?: string) {
    try {
      const response = await firstValueFrom(this.categoryService.getCategories(this.url));
      this.isLoaded = !this.isLoaded;
      this.categories = response.data;
      this.pagination = response.meta;
      this.pageUrl = response.links;
      this.isLoaded = true;
      this.errorCatch = false;
      console.log(this.categories);
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
        this.categories = [];

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
}
