import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDarkTheme: boolean = false;  

  toggleTheme(): void {
    this.isDarkTheme = ! this.isDarkTheme;
    const htmlPage = document.documentElement;
    htmlPage.classList.toggle('dark', this.isDarkTheme);
  }
  
}
