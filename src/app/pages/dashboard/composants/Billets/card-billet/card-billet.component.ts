import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-billet',
  imports: [NgClass],
  templateUrl: './card-billet.component.html',
  styleUrl: './card-billet.component.css'
})
export class CardBilletComponent {
  @Input() ticket: any;

  getFormattedDateTime(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ' | ' + d.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getBadgeColor(): string {
    return this.ticket.status === 'Confirmé' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  }



  
}