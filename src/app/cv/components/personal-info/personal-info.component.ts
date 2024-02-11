
import { Component, Input } from '@angular/core';
import { Basics } from '../../interfaces/cv.interface';

@Component({
  selector: 'cv-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
})
export class PersonalInfoComponent {

  @Input() personalInfoData!: Basics;

}
