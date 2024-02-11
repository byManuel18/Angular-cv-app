import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-html',
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
        d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z"></path><path
        d="M15.5 8h-7l.5 4h6l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5"></path></svg>
  `
})
export class HtmlIconComponent {
  @Input() color = 'currentColor';
 }
