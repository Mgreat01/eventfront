import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDarkTheme: boolean = false;  
   userName: string | null = null;
   isLoggedIn = false;
  router: any;



   constructor(private authService: UserService) {}


   ngOnInit(): void {
    this.userName = localStorage.getItem('name');

  
  if (this.userName) {
    this.isLoggedIn = true;
    
  }
  }

  toggleTheme(): void {
    this.isDarkTheme = ! this.isDarkTheme;
    const htmlPage = document.documentElement;
    htmlPage.classList.toggle('dark', this.isDarkTheme);
  }
  
   Logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    //localStorage.removeItem('access_token');
  }
}
