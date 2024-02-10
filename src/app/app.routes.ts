import { Routes } from '@angular/router';
import { CVMODULEROUTES } from './cv/cv.router.const';

export const routes: Routes = [
  {
    path: CVMODULEROUTES.BASE,
    loadChildren: () => import('./cv/cv.module').then(m => m.CvModule),
  },
  {
    path: '**',
    redirectTo: CVMODULEROUTES.BASE
  }
];
