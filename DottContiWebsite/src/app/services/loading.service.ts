import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private counter = 0;

  show() {
    this.counter++;
    this.loadingSubject.next(true);
  }

  hide() {
    this.counter--;
    if (this.counter <= 0) {
      this.counter = 0;
      this.loadingSubject.next(false);
    }
  }

  reset() {
    this.counter = 0;
    this.loadingSubject.next(false);
  }

  preloadImages(images: string[]): Promise<void> {
    this.show();
    const promises = images.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = src;
      });
    });
    return Promise.all(promises)
      .then(() => this.hide())
      .catch(() => this.hide());
  }
}
