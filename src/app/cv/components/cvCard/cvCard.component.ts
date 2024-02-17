import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project } from '../../interfaces/cv.interface';

@Component({
  selector: 'cv-card',
  templateUrl: './cvCard.component.html',
  styleUrl: './cvCard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvCardComponent {
  @Input() data?: Project;
}
