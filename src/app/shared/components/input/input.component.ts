import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'shared-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: '../../common/forms/formInputs.css',
})
export class InputComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() formControName!: string;
  @Input() label?: string;
  @Input() inputType: string = 'text';
  @Input() errorsControl?: { [key: string]: string };

  private control?: AbstractControl | null;

  constructor() {}

  ngOnInit(): void {
    this.control = this.formGroup.get(this.formControName);
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
}
