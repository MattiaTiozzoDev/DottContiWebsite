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

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full',
  },
  {
    path: 'il-dottore',
    component: Dottore,
  },
  {
    path: 'andrologia',
    component: Andrologia,
  },
  {
    path: 'urologia',
    component: Urologia,
  },
  {
    path: 'prestazioni',
    component: Prestazioni,
  },
  {
    path: 'articoli',
    component: Articoli,
  },
  {
    path: 'articolo/:id',
    component: ArticoloDetail,
  },
  {
    path: 'contatti',
    component: Contatti,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
];
