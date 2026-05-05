import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ArticlesStore } from '../../services/articles.store';
import { ArticleCard } from '../../components/article-card/article-card';
import { AsyncPipe } from '@angular/common';
import { filter, map, Observable, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SeoService } from '../../services/seo.service';

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
    private sanitizer: DomSanitizer,
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

  splitText(text: string | undefined | null): string[] {
    if (!text) return [];
    return text.split('$$');
  }

  /**
   * Renderizza un paragrafo: prima fa l'escape dell'HTML (sicurezza),
   * poi sostituisce **testo** con <strong>testo</strong>.
   */
  renderParagraph(line: string | undefined | null): SafeHtml {
    if (!line) return '';
    const escaped = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    const withBold = escaped.replace(
      /\*\*(.+?)\*\*/g,
      '<strong style="color: #4f7ea2;">$1</strong>',
    );
    return this.sanitizer.bypassSecurityTrustHtml(withBold);
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

    // SEO dinamico: appena l'articolo è disponibile, aggiorna title e description
    this.article$
      .pipe(
        filter((a) => !!a),
        take(1),
      )
      .subscribe((article: any) => {
        const rawTitle = (article.title ?? '').replace(/\$\$/g, ' ').trim();
        const rawSubtitle = (article.subtitle ?? '')
          .replace(/\$\$/g, ' ')
          .replace(/\*\*/g, '')
          .trim();
        const rawArticle = (article.article ?? '')
          .replace(/\$\$/g, ' ')
          .replace(/\*\*/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        const description =
          (rawSubtitle || rawArticle).slice(0, 155).trim() +
          (rawArticle.length > 155 ? '…' : '');
        this.seo.setPage({
          title: `${rawTitle} — Dr. Enrico Conti, Urologo Andrologo`,
          description:
            description ||
            'Approfondimento del Dr. Enrico Conti, urologo e andrologo ad Alba, La Spezia e Castelnuovo Magra.',
          path: `/articolo/${this.id ?? ''}`,
          keywords: rawTitle,
        });
      });
  }

  deleteArticle() {
    if (this.id) {
      this.store.deleteArticle(this.id);
      this.router.navigate(['/articoli']);
    }
  }
}
