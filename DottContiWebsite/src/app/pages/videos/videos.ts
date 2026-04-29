import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ArticlesStore } from '../../services/articles.store';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-videos',
  imports: [AsyncPipe],
  templateUrl: './videos.html',
  styleUrl: './videos.scss',
})
export class Videos {
  public videosPreview$: Observable<any> | undefined;

  constructor(
    private router: Router,
    public store: ArticlesStore,
    private sanitizer: DomSanitizer,
    public auth: AuthService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
      this.videosPreview$ = this.store.videos$.pipe(
        map((list) => {
          var videos = list.slice(0, 4);
          return videos.map((video) => ({
            ...video,
            url: this.getSafeUrl(video.url),
          }));
        }),
      );
    });
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
