import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';

import { CvArticleComponent } from './components/cvArticle/cvArticle.component';
import { CvSectionComponent } from './components/cvSection/cvSection.component';
import { FooterComponent } from './components/footer/footer.component';
import { IconLinkComponent } from '../shared/components/iconLink/iconLink.component';
import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ShowCvComponent } from './pages/show-cv/show-cv.component';
import { WorldMapIconComponent } from '../shared/icons';


@NgModule({
  declarations: [
    CvArticleComponent,
    CvSectionComponent,
    FooterComponent,
    LayoutPageComponent,
    PersonalInfoComponent,
    ShowCvComponent,
  ],
  imports: [
    CommonModule,
    CvRoutingModule,
    IconLinkComponent,
    WorldMapIconComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CvModule { }
