import { Component } from '@angular/core';
import { ActiviteStatComponent } from "../activite-stat/activite-stat.component";
import { DashboardStatComponent } from "../dashboard-stat/dashboard-stat.component";
import { CardStatComponent } from "../card-stat/card-stat.component";

@Component({
  selector: 'app-stat',
  imports: [ActiviteStatComponent, DashboardStatComponent, CardStatComponent],
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.css'
})
export class StatComponent {

}
