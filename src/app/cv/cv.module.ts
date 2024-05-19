import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';

import { CvArticleComponent } from './components/cvArticle/cvArticle.component';
import { CvSectionComponent } from './components/cvSection/cvSection.component';
import { FooterComponent } from './components/footer/footer.component';
import { IconLinkComponent } from '../shared/components/iconLink/iconLink.component';
import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ShowCvComponent } from './pages/show-cv/show-cv.component';
import { GithubIconComponent, WorldMapIconComponent } from '../shared/icons';
import { ChipComponent } from '../shared/components/chip/chip.component';
import { CvCardComponent } from './components/cvCard/cvCard.component';
import { CreateCvComponent } from './pages/create-cv/create-cv.component';
import { InputFileComponent } from '../shared/components/input-file/input-file.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../shared/components/input/input.component';
import { IconPrintComponent } from '../shared/icons/print.component';
import { PersonalFormComponent } from './components/personalForm/personalForm.component';
import { TextareaComponent } from '../shared/components/textarea/textareacomponent';


@NgModule({
  declarations: [
    CvArticleComponent,
    CvCardComponent,
    CvSectionComponent,
    FooterComponent,
    LayoutPageComponent,
    PersonalInfoComponent,
    ShowCvComponent,
    CreateCvComponent,
    PersonalFormComponent
  ],
  imports: [
    CommonModule,
    CvRoutingModule,
    ReactiveFormsModule,
    ChipComponent,
    IconLinkComponent,
    GithubIconComponent,
    WorldMapIconComponent,
    InputFileComponent,
    InputComponent,
    IconPrintComponent,
    TextareaComponent

  ],
  providers: [TitleCasePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CvModule { }
