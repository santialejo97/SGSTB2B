import { Routes } from '@angular/router';
import { NotFound } from './views/error/not-found/not-found';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./views/auth/auth.routes'),
  },
  {
    path: '404',
    component: NotFound,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
