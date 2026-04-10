import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dottore } from './pages/dottore/dottore';

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
];
