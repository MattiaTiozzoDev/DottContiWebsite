import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Injectable({ providedIn: 'root' })
export class ImagePreloadResolver implements Resolve<void> {
  constructor(private loadingService: LoadingService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const images: string[] = route.data['images'] || [];
    return this.loadingService.preloadImages(images);
  }
}