import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'shared-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: '../../common/forms/formInputs.css',
})
export class SelectComponent<T> implements OnInit {
  @Input() formGroup?: FormGroup;
  @Input() formControName?: string;
  @Input() errorsControl?: { [key: string]: string };

  @Input() labelSelect: string = '';

  @Input() dataSelect: T[] = [];
  @Input() label!: keyof T;
  @Input() optionKey!: keyof T;

  @Output() selectChange: EventEmitter<T | null > = new EventEmitter<T | null>();

  private control?: AbstractControl | null;

  constructor() {}

  ngOnInit(): void {
    if(this.formGroup && this.formControName){
      this.control = this.formGroup.get(this.formControName);
    }
  }

  get isValid(): boolean {
    return !!(
      this.control?.dirty &&
      this.control?.touched &&
      this.control?.valid
    );
  }

  get isInvalid(): boolean {
    return !!(
      this.control?.dirty &&
      this.control?.touched &&
      this.control?.invalid
    );
  }
  get hasValue(): boolean {
    return !!this.control?.value;
  }

  get errors(): string | null {
    if (this.isInvalid) {
      if (this.control?.errors && this.errorsControl) {
        const errorsObj = this.control.errors;
        const errosFind = Object.keys(errorsObj).filter(
          (err) => this.errorsControl![err]
        );
        if (errosFind.length > 0) {
          return this.errorsControl![errosFind[0]];
        } else {
          return null;
        }
      } else {
        return null;
      }
    }

    return null;
  }

  changeSelect(event: Event){
    const value = ( event.target as HTMLSelectElement ).value;
    if(value && value.length > 0){
      const objFind: T |  null = this.dataSelect.find((element=> element[this.optionKey] === value)) || null;
      this.selectChange.emit(objFind);
    }else{
      this.selectChange.emit(null);
    }
  }
}
