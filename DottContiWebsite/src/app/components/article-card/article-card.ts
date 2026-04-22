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
}
