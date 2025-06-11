import { StatComponent } from './pages/dashboard/composants/stat/stat/stat.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { ForgotPasswordComponent } from './pages/aut/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { MesEvenementComponent } from './pages/dashboard/composants/evenement/mes-evenement/mes-evenement.component';
import { MesBilletsComponent } from './pages/dashboard/composants/Billets/mes-billets/mes-billets.component';
import { CardStatComponent } from './pages/dashboard/composants/stat/card-stat/card-stat.component';
import { ResetPasswordComponent } from './pages/aut/reset-password/reset-password.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', component: HomeComponent},
    {path: 'event/:id', component: EventDetailsComponent },
    {
  path: 'reset-password',
  component: ResetPasswordComponent
},
    {path: 'search', component: SearchComponent},
    {path:'forgot-password', component: ForgotPasswordComponent},
     {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'evenements', pathMatch: 'full' },
      { path: 'evenements', component: MesEvenementComponent },
      { path: 'billets', component: MesBilletsComponent },
      { path:'stat',component: StatComponent},
    ]
  }
];
