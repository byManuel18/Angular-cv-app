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


  async onChangeFile(event: FileList){
    console.log(event);
    console.log(await this.fileToBase64(event[0]));
  }

  getControlName(keyControl: keyof typeof ControlNames){
    return ControlNames[keyControl];
  }

  fileToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }
}
