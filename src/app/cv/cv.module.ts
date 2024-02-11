import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { ShowCvComponent } from './pages/show-cv/show-cv.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ShowCvComponent,
    PersonalInfoComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    CvRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CvModule { }
