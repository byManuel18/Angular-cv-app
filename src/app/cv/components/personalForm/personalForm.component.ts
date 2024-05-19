import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlNamesPersonalInfo } from '../../pages/create-cv/create-cv.component';
import { Utils } from '../../../shared/utils/utils';

@Component({
  selector: 'cv-personal-form',
  templateUrl: './personalForm.component.html',
  styleUrl: './personalForm.component.css',
})
export class PersonalFormComponent {

  @Input() personalInfoGroup?: FormGroup;

  controlsErrors: {[key in ControlNamesPersonalInfo]: { [key: string ]: string}} = {
    name: {
      'required': 'Campo Obligatorio',
      'minlength': 'Mínimo 10 caracteres'
    },
    label: {

    },
    image: {

    },
    email: {

    },
    phone: {

    },
    sumary:{

    },
    url:{

    },
    city:{

    },
    region:{

    },
    postalCode:{

    }
  }


  changeImg(event: FileList){
    if(event && event.length > 0){
      Utils.fileToBase64(event[0]).then((base64)=>{
        this.personalInfoGroup?.controls[this.getControlName('Image')].setValue(base64);
      }).catch((err)=>{
        console.log(err);
      })
    }
  }

  getControlName(keyControl: keyof typeof ControlNamesPersonalInfo){
    return ControlNamesPersonalInfo[keyControl];
  }

}
