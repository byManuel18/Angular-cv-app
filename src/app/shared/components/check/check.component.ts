import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'shared-check',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './check.component.html',
  styleUrl: './check.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckComponent{

  @Input() label: string = '';
  @Input() checked: boolean = false;

  @Output() isChecked: EventEmitter<boolean> = new EventEmitter();


  onClick(){
    this.checked = !this.checked;
    this.isChecked.emit(this.checked);
  }
 }
