import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ArticlesStore } from '../../services/articles.store';
import { ArticleCard } from '../../components/article-card/article-card';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-articoli',
  imports: [ArticleCard, AsyncPipe],
  templateUrl: './articoli.html',
  styleUrl: './articoli.scss',
})
export class Articoli {
  constructor(
    private router: Router,
    public store: ArticlesStore,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    });
  }
}
