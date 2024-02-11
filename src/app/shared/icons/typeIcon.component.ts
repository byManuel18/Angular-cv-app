import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-type',
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
        d="M15 17.5c.32 .32 .754 .5 1.207 .5h.543c.69 0 1.25 -.56 1.25 -1.25v-.25a1.5 1.5 0 0 0 -1.5 -1.5a1.5 1.5 0 0 1 -1.5 -1.5v-.25c0 -.69 .56 -1.25 1.25 -1.25h.543c.453 0 .887 .18 1.207 .5"
    ></path><path d="M9 12h4"></path><path d="M11 12v6"></path><path
        d="M21 19v-14a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2z"
    ></path></svg>
  `,
  styleUrl: './icons.css'
})
export class TypeIconComponent {
  @Input() color = 'currentColor';

 }
