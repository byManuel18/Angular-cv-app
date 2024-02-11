import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-node',
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
        d="M9 9v8.044a2 2 0 0 1 -2.996 1.734l-1.568 -.9a3 3 0 0 1 -1.436 -2.561v-6.635a3 3 0 0 1 1.436 -2.56l6 -3.667a3 3 0 0 1 3.128 0l6 3.667a3 3 0 0 1 1.436 2.561v6.634a3 3 0 0 1 -1.436 2.56l-6 3.667a3 3 0 0 1 -3.128 0"
    ></path><path d="M17 9h-3.5a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3.5"
    ></path></svg>
  `,
  styleUrl: './icons.css'
})
export class NodeIconComponent {
  @Input() color = 'currentColor';

 }
