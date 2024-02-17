import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconsMap } from '../../icons/mapIcons';

@Component({
  selector: 'shared-chip',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css',
})
export class ChipComponent {

  @Input() title: string = '';
  @Input() icon?: keyof typeof IconsMap;

  getIconComponent (icon:  keyof typeof IconsMap) {
    return IconsMap[icon];
  }

 }
