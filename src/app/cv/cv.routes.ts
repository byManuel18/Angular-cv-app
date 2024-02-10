import { Routes } from "@angular/router";
import { LayoutPageComponent } from "./layout/layout-page/layout-page.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    title: 'CV-Layout',
    children: []
  },
  {
    path: '**',
    redirectTo: ''
  }
];
