import { Component } from '@angular/core';

@Component({
  selector: 'icon-mail',
  standalone: true,
  imports: [],
  template:
  `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-mail size-4"
    ><title>Mail Icon</title><rect width="20" height="16" x="2" y="4" rx="2"></rect><path
      d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
  `,
  styleUrl: './icons.css'
})
export class MailIconComponent {

}
