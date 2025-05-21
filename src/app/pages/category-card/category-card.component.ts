import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() name: any;
}
