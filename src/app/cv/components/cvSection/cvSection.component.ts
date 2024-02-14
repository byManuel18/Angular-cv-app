import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CvSection } from '../../interfaces/cv-section.interface';

@Component({
  selector: 'cv-section',
  templateUrl: './cvSection.component.html',
  styleUrl: './cvSection.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvSectionComponent {

  @Input() sectionData?: CvSection;

 }
