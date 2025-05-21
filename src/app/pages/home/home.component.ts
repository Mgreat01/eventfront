import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor } from '@angular/common';
import { EventCardComponent } from '../event-card/event-card.component';
import { CategoryCardComponent } from '../category-card/category-card.component';

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

  categories = [
    'Musique', 'Société', 'Histoire', 'Littérature', 'Religion', 'Philosophie'
  ];

  currentIndex = 0;
  
  next(){
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev(){
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  intervalId: any;

  startAutoplay(){
    this.intervalId = setInterval(() => { this.next()},3000)
  }

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId)
  }
}