import {
  Component,
  inject,
  computed,
  effect,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  Type,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import { TitleCasePipe } from '@angular/common';

import 'ninja-keys';
import { NinjaKeys } from 'ninja-keys';

import { INinjaAction } from 'ninja-keys/dist/interfaces/ininja-action';
import { PrintService } from '../../../shared/services/print.service';
import { CvService } from '../../services/cv.service';

import { IconsMap } from '../../../shared/icons/mapIcons';

import { Cv } from '../../interfaces/cv.interface';
import { CvSection } from '../../interfaces/cv-section.interface';
import { IconPrintComponent } from '../../../shared/icons/print.component';
import { Utils } from '../../../shared/utils/utils';
import { DeviceService } from '../../../shared/services/device.service';

@Component({
  selector: 'show-cv',
  templateUrl: './show-cv.component.html',
  styleUrl: './show-cv.component.css',
})
export class ShowCvComponent {
  private activedRouter = inject(ActivatedRoute);
  private titleCase = inject(TitleCasePipe);
  private viewContainerRef = inject(ViewContainerRef);

  private cvService = inject(CvService);
  deviceService = inject(DeviceService);

  printService = inject(PrintService);

  @ViewChild('ninjaKeys') ninjaKeys?: ElementRef;

  _cvToShow = toSignal<Cv | null>(
    this.activedRouter.queryParams.pipe(
      switchMap((params) => this.getCv(params['jObj']))
    ),
    {
      initialValue: null,
    }
  );

  _sectionsCV = computed<CvSection[]>(() => {
    return this.formatCvArticles(this._cvToShow());
  });

  _skillsCV = computed<CvSection | null>(() => {
    if (!this._cvToShow()) {
      return null;
    }

    return this.formatSkillsSection(this._cvToShow()!);
  });

  titleKeysEffect = effect(() => {
    if (this._cvToShow()) {
      document.title = `CV de ${this._cvToShow()?.basics.name}`;
      const nimja = this.ninjaKeys?.nativeElement as NinjaKeys;
      const keys: INinjaAction[] = [];
      keys.push(
        {
          id: 'Imprimir',
          title: 'Imprimir',
          hotkey: 'ctrl+P',
          icon: this.renderComponentAsString(IconPrintComponent),
          section: 'Acciones',
          handler: () => {
            this.printService.setPrint();
            setTimeout(()=>{
              window.print();
            },100);
          },
        }
      )

      this._cvToShow()!.basics.profiles.forEach((profile) => {
        keys.push({
          id: profile.network,
          title: 'Visitar ' + this.titleCase.transform(profile.network),
          hotkey: 'ctrl+' + profile.network.charAt(0),
          icon: this.renderComponentAsString(IconsMap[profile.network]),
          section: 'Social',
          handler: () => {
            window.open(profile.url);
          },
        });
      });

      nimja.data = keys;
    }
  });

  constructor() {}

  getCv(param: string = ''): Observable<Cv | null> {
    if (!param) {
      return this.cvService.getMyCv();
    }
    return this.cvService.getCv(param);
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
          highlights: work.highlights,
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

    sections.push({
      title: 'Certificados',
      articles: [
        ...cv.certificates.map((certificate) => ({
          title: certificate.name,
          subTitle: certificate.issuer,
          time: certificate.date,
          url: certificate.url,
        })),
      ],
    });

    return sections;
  }

  formatSkillsSection(cv: Cv): CvSection {
    const sectionSkills: CvSection = {
      title: 'Habilidades',
      articles: [],
    };

    return sectionSkills;
  }

  openKeys(){
    (this.ninjaKeys?.nativeElement as NinjaKeys).open();
  }
  renderComponentAsString<T>(component: Type<T>): string {
    return Utils.getStringFromComponente(this.viewContainerRef,component);
  }
}
