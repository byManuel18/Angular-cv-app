import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-next',
  standalone: true,
  imports: [],
  template:
  `
    <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    stroke-width="2"
    [attr.stroke]="color"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    ><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path
        d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993"></path><path
        d="M15 12v-3"></path></svg>
  `,
  styleUrl: './icons.css'
})
export class NextIconComponent {
  @Input() color = 'currentColor';

 }
