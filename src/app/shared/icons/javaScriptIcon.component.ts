import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-javascript',
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
        d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z"></path><path d="M7.5 8h3v8l-2 -1"
    ></path><path
        d="M16.5 8h-2.5a.5 .5 0 0 0 -.5 .5v3a.5 .5 0 0 0 .5 .5h1.423a.5 .5 0 0 1 .495 .57l-.418 2.93l-2 .5"
    ></path></svg>
  `,
  styleUrl: './icons.css'
})
export class JavaScriptIconComponent {
  @Input() color = 'currentColor';

}
