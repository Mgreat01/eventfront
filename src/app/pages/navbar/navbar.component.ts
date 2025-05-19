import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDarkTheme: boolean = false; 
  isModalOpen: boolean = false; 
  results: number = 100;
  listResults = ['franklin', 'kabisayi', 'katambua'];

  toggleTheme(): void {
    this.isDarkTheme = ! this.isDarkTheme;
    const htmlPage = document.documentElement;
    htmlPage.classList.toggle('dark', this.isDarkTheme);
  }
  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }
  sendSearch():void {
    this.closeModal();
  }
}
