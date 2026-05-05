import { Component, HostListener, OnInit } from '@angular/core';
import { PinCard } from '../../components/pin-card/pin-card';
import { Card } from '../../components/card/card';
import { BigCard } from '../../components/big-card/big-card';
import { ArticleCard } from '../../components/article-card/article-card';
import { Hospitals } from '../../components/hospitals/hospitals';
import { PrenotationBox } from '../../components/prenotation-box/prenotation-box';
import { Footer } from '../../components/footer/footer';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';
import { ArticlesStore } from '../../services/articles.store';
import { AsyncPipe } from '@angular/common';
import { map, Observable, tap } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'conti-home',
  imports: [
    PinCard,
    Card,
    BigCard,
    ArticleCard,
    Hospitals,
    PrenotationBox,
    Footer,
    RouterLink,
    RevealDirective,
    AsyncPipe,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  public articlesPreview$: Observable<any> | undefined;
  public videosPreview$: Observable<any> | undefined;

  constructor(
    private router: Router,
    public store: ArticlesStore,
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
  ngOnInit(): void {
    this.seo.setPage({
      title:
        'Dr. Enrico Conti — Urologo e Andrologo ad Alba, La Spezia e Castelnuovo Magra',
      description:
        'Urologo e andrologo con oltre 30 anni di esperienza. Visite specialistiche, ecografie e trattamenti per disfunzione erettile e patologie della prostata ad Alba (CN), La Spezia e Castelnuovo Magra (SP).',
      path: '/',
    });
    this.articlesPreview$ = this.store.articles$.pipe(
      map((list) => list.slice(0, 4)),
    );
    this.videosPreview$ = this.store.videos$.pipe(
      map((list) => {
        var videos = list.slice(0, 4);
        return videos.map((video) => ({
          ...video,
          url: this.getSafeUrl(video.url),
        }));
      }),
    );
  }

  getSafeUrl(url: string): SafeResourceUrl {
    if (!this.isValidUrl(url)) {
      return '';
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  isValidUrl(url: string): boolean {
    return url.startsWith('https://www.youtube.com');
  }
}
