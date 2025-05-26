import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', component: HomeComponent},
    {path: 'search', component: SearchComponent},
];
