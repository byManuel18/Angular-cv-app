import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'shared-input-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './inputSelect.component.html',
  styleUrl: './inputSelect.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSelectComponent {

  @Input() inputTitle: string = '';
  @Input() btnTitle: string = '';

  @Output() getValue: EventEmitter<string> = new EventEmitter<string>();


  myForm: FormGroup = new FormGroup({
    myControl: new FormControl('')
  });

  submitForm(){
    this.getValue.emit(this.myForm.controls['myControl'].value);
    this.myForm.reset();
  }

 }
