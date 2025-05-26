import { Component  } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SearchCardComponent } from '../search-card/search-card.component';

@Component({
  selector: 'app-search',
  imports: [NgFor, SearchCardComponent, NgIf],
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

  toggleDropdown(): void {
    this.isOpenDropDown = !this.isOpenDropDown;
  }

  openDropdown(): void {
    this.isOpenDropDown = false; 
  }

  resetFilters(): void {
    
  }
}
