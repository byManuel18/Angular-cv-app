import { Routes } from "@angular/router";
import { LayoutPageComponent } from "./layout/layout-page/layout-page.component";
import { CVMODULEROUTES } from "./cv.router.const";
import { ShowCvComponent } from "./pages/show-cv/show-cv.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: `${ CVMODULEROUTES.SHOWCV }/:jObj`,
        component: ShowCvComponent,
      },
      {
        path: '**',
        redirectTo: `${ CVMODULEROUTES.SHOWCV }/myCV`
      }
    ]
  },
  {
    path: '**',
    redirectTo: `${ CVMODULEROUTES.SHOWCV }/myCV`
  }
];
