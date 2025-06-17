import { Component, inject } from '@angular/core';
import { UserSearch } from '../../models/user';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-public-profile',
  imports: [],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css'
})
export class PublicProfileComponent {
  userService: UserService = inject(UserService);
  user: UserSearch = {} as UserSearch;
  id = localStorage.getItem('userId');
  username = localStorage.getItem('name');
  email = localStorage.getItem('email');
  joinDate: string | null = null;

  ngOnInit() {
    this.loadUser();
  }

  async loadUser() {
    const response = await firstValueFrom(this.userService.getUserById(this.id ?? '0'));
    this.user = response.data;
    this.joinDate = this.changeMonth(this.user.created_at);

    console.log(this.user);
    console.log(this.joinDate);
  }

  changeMonth(yearMonth: string): string{
    const year = yearMonth.slice(0,4);
    const month = yearMonth.slice(5,7);
    const monthInt = parseInt(month);
    return this.monthInLetter(monthInt) + ' ' + year;
  }

  monthInLetter(month: number): string{
    const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    if (month < 1 || month > 12) {
      throw new Error("Le numéro du mois doit être compris entre 1 et 12.");
    }
    return mois[month - 1];
  }

}
