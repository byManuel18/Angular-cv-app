import { CommonModule } from '@angular/common';
import { IconsMap } from './../../icons/mapIcons';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'shared-icon-link',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './iconLink.component.html',
  styleUrl: './iconLink.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconLinkComponent {

  @Input() link: string = '';
  @Input() icon: keyof typeof IconsMap = 'icon-x';
  @Input() iconColor: string = 'currentColor';

  getIconComponent (icon:  keyof typeof IconsMap) {
    return IconsMap[icon];
  }

}
