import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { ArticlesStore } from '../../services/articles.store';
import { ArticleCard } from '../../components/article-card/article-card';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'articolo-detail',
  imports: [ArticleCard, AsyncPipe, RouterLink],
  templateUrl: './articolo-detail.html',
  styleUrl: './articolo-detail.scss',
})
export class ArticoloDetail implements OnInit {
  public article$: Observable<any> | undefined;
  public articlesPreview$: Observable<any> | undefined;
  public id: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public store: ArticlesStore,
    public auth: AuthService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    });
  }

  splitText(text: string | undefined | null): string[] {
    if (!text) return [];
    return text.split('$$');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log('ID articolo:', this.id);
    });
    this.article$ = this.store.getArticleById(this.id ?? '');
    this.articlesPreview$ = this.store.articles$.pipe(
      map((list) => list.slice(0, 4)),
    );
  }

  deleteArticle() {
    if (this.id) {
      this.store.deleteArticle(this.id);
      this.router.navigate(['/articoli']);
    }
  }
}
