import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'shared-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: '../../common/forms/formInputs.css',
})
export class TextareaComponent implements OnInit, AfterViewInit {
  @Input() formGroup!: FormGroup;
  @Input() formControName!: string;
  @Input() label?: string;
  @Input() errorsControl?: { [key: string]: string };

  @ViewChild('texarea') texarea?: ElementRef;

  private control?: AbstractControl | null;

  constructor() {}

  ngAfterViewInit(): void {
   if(this.texarea){
    const nativeElementArea = this.texarea.nativeElement;
    nativeElementArea.style.height = 'auto';
    nativeElementArea.style.height = nativeElementArea.scrollHeight + 'px';
   }
  }

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

  changeTexarea(event: Event){
    const textarea = event.target as HTMLElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

  }
}
