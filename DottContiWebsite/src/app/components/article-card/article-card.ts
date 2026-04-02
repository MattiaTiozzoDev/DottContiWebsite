import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'article-card',
  imports: [NgClass],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard {
  @Input() title: string = '';
  @Input() date: string = '';
  @Input() index: number = 0;
}
