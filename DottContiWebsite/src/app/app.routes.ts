import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dottore } from './pages/dottore/dottore';
import { Andrologia } from './pages/andrologia/andrologia';
import { Urologia } from './pages/urologia/urologia';
import { Prestazioni } from './pages/prestazioni/prestazioni';
import { Contatti } from './pages/contatti/contatti';

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
    path: 'contatti',
    component: Contatti,
  },
];
