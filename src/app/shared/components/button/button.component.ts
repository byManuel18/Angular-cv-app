import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {

  @Input() label: string = "";
  @Input() disabled: boolean = false;
  @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();


  click(event: MouseEvent){
    this.onClick.emit(event);
  }

}
