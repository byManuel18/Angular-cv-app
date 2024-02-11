
import { Component, Input, inject } from '@angular/core';
import { PrintService } from '../../../shared/services/print.service';

import { Basics } from '../../interfaces/cv.interface';

@Component({
  selector: 'cv-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
})
export class PersonalInfoComponent {

  @Input() personalInfoData!: Basics;

  printService = inject(PrintService);

  getAllLinks(): string {
    const links: string[] = [this.personalInfoData.email, this.personalInfoData.phone ];

    this.personalInfoData.profiles.forEach(({url})=>{
      links.push(url);
    });

    return links.join(' • ');
  }

}
