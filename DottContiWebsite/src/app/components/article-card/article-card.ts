import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'article-card',
  imports: [NgClass, RouterLink],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard {
  @Input() title: string | undefined = '';
  @Input() date: string | undefined = '';
  @Input() id: string | undefined = '';
  @Input() index: number = 0;

  /** Restituisce la data in formato dd/mm/yyyy. Se non riconosce il formato, restituisce il valore originale. */
  get formattedDate(): string {
    if (!this.date) return '';
    const isoMatch = this.date.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
      const [, y, m, d] = isoMatch;
      return `${d}/${m}/${y}`;
    }
    return this.date;
  }
}
