import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ControlNamesPersonalInfo, ControlNamesProfiles } from '../../pages/create-cv/create-cv.component';
import { Utils } from '../../../shared/utils/utils';
import { SelectNetworkData } from '../../data/selectNetwork';
import { Network, Profile } from '../../interfaces/cv.interface';
import { NetworkOption } from '../../interfaces/cv-form.interfaces';



@Component({
  selector: 'cv-personal-form',
  templateUrl: './personalForm.component.html',
  styleUrl: './personalForm.component.css',
})
export class PersonalFormComponent {

  @Input() personalInfoGroup?: FormGroup;
  @Output() newArrayGroup: EventEmitter<Profile> = new EventEmitter<Profile>();
  @Output() goNextStep: EventEmitter<number> = new EventEmitter();

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
      'required': 'Campo Obligatorio',
    },
    image: {
      'required': 'Campo Obligatorio',
    },
    email: {
      'required': 'Campo Obligatorio',
      'email': 'Correo no válido'
    },
    phone: {
      'required': 'Campo Obligatorio',
    },
    sumary:{
      'required': 'Campo Obligatorio',
    },
    url:{
      'pattern': 'Url no válida'
    },
    city:{
      'required': 'Campo Obligatorio',
    },
    region:{
      'required': 'Campo Obligatorio',
    },
    postalCode:{
      'required': 'Campo Obligatorio',
    },
    profiles:{
      'required': 'Campo Obligatorio',
      'pattern': 'Url no válida'
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
      this.goNextStep.emit(1);
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
    this.newArrayGroup.emit({network: networkOptin.network, url: ''});
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

  clearImg(){
    this.personalInfoGroup?.controls[this.getControlName('Image')].reset();
  }

  get isInvalidImg(): boolean {
    const imgControl = this.personalInfoGroup?.controls[this.getControlName('Image')];
    return !!(
      imgControl?.dirty &&
      imgControl?.touched &&
      imgControl?.invalid
    );
  }

}
