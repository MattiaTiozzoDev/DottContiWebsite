import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ArticlesStore } from '../../services/articles.store';
import { ArticleCard } from '../../components/article-card/article-card';
import { AsyncPipe } from '@angular/common';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-articoli',
  imports: [ArticleCard, AsyncPipe],
  templateUrl: './articoli.html',
  styleUrl: './articoli.scss',
})
export class Articoli implements OnInit {
  constructor(
    private router: Router,
    public store: ArticlesStore,
    private seo: SeoService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    });
  }

  ngOnInit(): void {
    this.seo.setPage({
      title:
        'Articoli di urologia e andrologia — Dr. Enrico Conti, Alba e La Spezia',
      description:
        'Approfondimenti e articoli del Dr. Enrico Conti, urologo e andrologo, su salute maschile, prostata, disfunzione erettile, infertilità e prevenzione urologica.',
      path: '/articoli',
      keywords:
        'articoli urologia, articoli andrologia, salute maschile, prevenzione urologica',
    });
  }
}
