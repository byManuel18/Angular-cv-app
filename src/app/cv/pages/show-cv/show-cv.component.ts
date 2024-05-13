import { Component, inject, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import 'ninja-keys';

import { PrintService } from '../../../shared/services/print.service';
import { CvService } from '../../services/cv.service';

import { Cv } from '../../interfaces/cv.interface';
import { CvSection } from '../../interfaces/cv-section.interface';

@Component({
  selector: 'show-cv',
  templateUrl: './show-cv.component.html',
  styleUrl: './show-cv.component.css',
})
export class ShowCvComponent {
  private activedRouter = inject(ActivatedRoute);
  private cvService = inject(CvService);
  printService = inject(PrintService);

  _cvToShow = toSignal<Cv | null>(
    this.activedRouter.params.pipe(
      switchMap((params) => this.getCv(params['jObj']))
    ),
    {
      initialValue: null,
    }
  );

  _sectionsCV = computed<CvSection[]>(() => {
    return this.formatCvArticles(this._cvToShow())
  });

  _skillsCV = computed<CvSection | null>(()=> {
    if(!this._cvToShow()){
      return null;
    }

    return this.formatSkillsSection(this._cvToShow()!);
  })

  private titlePageEffect = effect(() => {
    if(this._cvToShow()) {
      document.title= `CV de ${this._cvToShow()?.basics.name}`
    }
  });

  getCv(param: string = ''): Observable<Cv | null> {
    if (param === 'myCV') {
      return this.cvService.getMyCv();
    }

    try {
      const jObjString: string = decodeURIComponent(param);
      const cvJson: Cv = JSON.parse(jObjString);
      return of(cvJson);
    } catch (error) {
      return of(null);
    }
  }

  formatCvArticles(cv: Cv | null): CvSection[] {
    const sections: CvSection[] = [];

    if (!cv) {
      return [];
    }
    sections.push({
      title: 'Sobre mí',
      articles: [{ text: cv.basics.summary }],
    });

    sections.push({
      title: 'Experiencia laboral',
      articles: [
        ...cv.work.map((work) => ({
          title: work.name,
          subTitle: work.position,
          time: [
            work.startDate.split('-')[0],
            work.endDate ? work.endDate.split('-')[0] : 'Actual',
          ]
            .filter(Boolean)
            .join(' - '),
          text: work.summary,
          url: work.url,
        })),
      ],
    });

    sections.push({
      title: 'Educación',
      articles: [
        ...cv.education.map((edu) => ({
          title: edu.institution,
          subTitle: edu.area,
          time: [
            edu.startDate.split('-')[0],
            edu.endDate ? edu.endDate.split('-')[0] : 'Actual',
          ]
            .filter(Boolean)
            .join(' - '),
          url: edu.url,
        })),
      ],
    });

    return sections;
  }

  formatSkillsSection(cv: Cv): CvSection {

    const sectionSkills: CvSection = {
      title: 'Habilidades',
      articles: []
    }

    return sectionSkills;
  }

}
