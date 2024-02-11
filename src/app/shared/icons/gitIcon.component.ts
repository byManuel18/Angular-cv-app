import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-git',
  standalone: true,
  imports: [],
  template:
  `<svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    stroke-width="2"
    [attr.stroke]="color"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    ><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path
        d="M16 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path
        d="M12 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path
        d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M12 15v-6"
    ></path><path d="M15 11l-2 -2"></path><path d="M11 7l-1.9 -1.9"></path><path
        d="M13.446 2.6l7.955 7.954a2.045 2.045 0 0 1 0 2.892l-7.955 7.955a2.045 2.045 0 0 1 -2.892 0l-7.955 -7.955a2.045 2.045 0 0 1 0 -2.892l7.955 -7.955a2.045 2.045 0 0 1 2.892 0z"
    ></path></svg>`,
  styleUrl: './icons.css'
})
export class GitIconComponent {

  @Input() color = 'currentColor'

}
