import { Component, Input, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlNamesPersonalInfo, ControlNamesProfiles } from '../../pages/create-cv/create-cv.component';
import { Utils } from '../../../shared/utils/utils';
import { SelectNetworkData } from '../../data/selectNetwork';
import { Network } from '../../interfaces/cv.interface';
import { NetworkOption } from '../../interfaces/cv-form.interfaces';



@Component({
  selector: 'cv-personal-form',
  templateUrl: './personalForm.component.html',
  styleUrl: './personalForm.component.css',
})
export class PersonalFormComponent {

  fb = inject(FormBuilder);

  @Input() personalInfoGroup?: FormGroup;

  selectNetworkArray: NetworkOption[] = (Object.keys(SelectNetworkData) as Network[]).map((key) => ({
    network: key,
    label: SelectNetworkData[key]?.label
  }));

  selectedNetwork = signal<NetworkOption | null>(null);

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

    },
    profiles:{

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

  getControlNameProfiles(keyControl: keyof typeof ControlNamesProfiles){
    return ControlNamesProfiles[keyControl];
  }

  goNext(){
    if(this.personalInfoGroup){
      Utils.marAllAsDirty(this.personalInfoGroup)
      this.personalInfoGroup?.markAllAsTouched();
    }
  }
  changeSelectNetwork(event: NetworkOption | null){
    this.selectedNetwork.set(event);
  }

  addNetwork(){
    if(this.selectedNetwork()){
      this.addNetworkGroup(this.selectedNetwork()!)
      this.selectedNetwork.set(null);
    }
  }

  addNetworkGroup(networkOptin: NetworkOption){
    this.arrayNetworks.push(this.fb.group({
      [ControlNamesProfiles.Name]: this.fb.control({value: networkOptin.network, disabled: true }, {validators: [Validators.required], updateOn: 'blur'}),
      [ControlNamesProfiles.Url]: this.fb.control('', {validators: [Validators.required], updateOn: 'blur'}),
    }));
  }

  get arrayNetworks(): FormArray {
    return this.personalInfoGroup?.get(ControlNamesPersonalInfo.Profiles) as FormArray;
  }

  getGroupNetwork(index: number): FormGroup{
    return this.arrayNetworks.get(`${index}`) as FormGroup;
  }

  getArrayNetworksSelected():NetworkOption[]{
    return this.arrayNetworks.controls.map(((g) =>{
      const group = g  as FormGroup;
      return {
        network: group.get(ControlNamesPersonalInfo.Name)?.value,
        label: undefined
      }
    }))
  }

  removeSelectedNetwork(index:number){
    this.arrayNetworks.removeAt(index);
  }

}
