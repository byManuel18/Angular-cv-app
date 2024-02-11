import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-worldmap',
  standalone: true,
  imports: [],
  template:
  `
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      [attr.stroke]="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path
        d="M2 12h20"></path>
    </svg>
  `,
  styleUrl: './icons.css'
})
export class WorldMapIconComponent {
  @Input() color = 'currentColor';

 }
