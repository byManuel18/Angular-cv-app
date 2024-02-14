import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CvArticle } from '../../interfaces/cv-section.interface';

@Component({
  selector: 'cv-article',
  templateUrl: './cvArticle.component.html',
  styleUrl: './cvArticle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvArticleComponent {

  @Input() articleData?: CvArticle;

 }
