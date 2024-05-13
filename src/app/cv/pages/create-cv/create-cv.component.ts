import { Component, inject } from '@angular/core';
import { AsyncValidator, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';


enum ControlNames {
  Name = 'name'
}

@Component({
  selector: 'create-cv',
  templateUrl: './create-cv.component.html',
  styleUrl: './create-cv.component.css',
})
export class CreateCvComponent {


  myForm : FormGroup;

  fb = inject(FormBuilder);

  controlsErrors: {[key in ControlNames]: { [key: string ]: string}} = {
    name: {
      'required': 'Campo Obligatorio',
      'minlength': 'Mínimo 10 caracteres'
    }
  }

  constructor(){

    this.myForm = this.fb.group({
      [ControlNames.Name]: this.fb.control('', {validators: [Validators.required, Validators.minLength(10)], updateOn: 'blur'})
    });
  }


  onChangeFile(event: FileList){
    console.log(event);
  }

  getControlName(keyControl: keyof typeof ControlNames){
    return ControlNames[keyControl];
  }
}
