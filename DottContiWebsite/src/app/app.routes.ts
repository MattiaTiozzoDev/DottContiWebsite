import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dottore } from './pages/dottore/dottore';
import { Andrologia } from './pages/andrologia/andrologia';
import { Urologia } from './pages/urologia/urologia';
import { Prestazioni } from './pages/prestazioni/prestazioni';
import { Contatti } from './pages/contatti/contatti';
import { Login } from './pages/login/login';
import { authGuard } from './services/auth.guard';
import { Articoli } from './pages/articoli/articoli';
import { ArticoloDetail } from './pages/articolo-detail/articolo-detail';
import { ImagePreloadResolver } from './services/image-preload.resolver';
import { Videos } from './pages/videos/videos';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full',
    resolve: { images: ImagePreloadResolver },
    data: {
      images: [
        'assets/img/home_dott_conti.svg',
        'assets/img/sfondo_Banner.svg',
      ],
    },
  },
  {
    path: 'il-dottore',
    component: Dottore,
    resolve: { images: ImagePreloadResolver },
    data: { images: ['assets/img/banner_conti_dottore.svg'] },
  },
  {
    path: 'andrologia',
    component: Andrologia,
    resolve: { images: ImagePreloadResolver },
    data: { images: ['assets/img/andrologia_conti.svg'] },
  },
  {
    path: 'urologia',
    component: Urologia,
    resolve: { images: ImagePreloadResolver },
    data: { images: ['assets/img/banner_urologia.svg'] },
  },
  {
    path: 'prestazioni',
    component: Prestazioni,
    resolve: { images: ImagePreloadResolver },
    data: { images: ['assets/img/right_button.svg'] },
  },
  {
    path: 'articoli',
    component: Articoli,
    resolve: { images: ImagePreloadResolver },
    data: { images: [] },
  },
  {
    path: 'articolo/:id',
    component: ArticoloDetail,
    resolve: { images: ImagePreloadResolver },
    data: { images: [] },
  },
  {
    path: 'videos',
    component: Videos,
    resolve: { images: ImagePreloadResolver },
    data: { images: [] },
  },
  {
    path: 'contatti',
    component: Contatti,
    resolve: { images: ImagePreloadResolver },
    data: { images: ['assets/img/banner_conti_dottore.svg'] },
  },
  {
    path: 'login',
    component: Login,
    resolve: { images: ImagePreloadResolver },
    data: { images: [] },
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
];
