import { Routes } from "@angular/router";
import { LayoutPageComponent } from "./layout/layout-page/layout-page.component";
import { CVMODULEROUTES } from "./cv.router.const";
import { ShowCvComponent } from "./pages/show-cv/show-cv.component";
import { CreateCvComponent } from "./pages/create-cv/create-cv.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: `${ CVMODULEROUTES.SHOWCV }`,
        component: ShowCvComponent,
      },
      {
        path: `${ CVMODULEROUTES.CREATECV }`,
        component: CreateCvComponent,
      },
      {
        path: '**',
        redirectTo: `${ CVMODULEROUTES.SHOWCV }`
      }
    ]
  },
  {
    path: '**',
    redirectTo: `${ CVMODULEROUTES.SHOWCV }`
  }
];
