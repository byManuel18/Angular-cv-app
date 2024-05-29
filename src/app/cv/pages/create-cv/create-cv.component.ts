import { Utils } from './../../../shared/utils/utils';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Network, Profile } from '../../interfaces/cv.interface';
import { SelectNetworkData } from '../../data/selectNetwork';
import { Subscription } from 'rxjs';
import { NetworkOption } from '../../interfaces/cv-form.interfaces';


export enum ControlNamesPersonalInfo {
  Name = 'name',
  Label = 'label',
  Image = 'image',
  Email = 'email',
  Phone = 'phone',
  Url = 'url',
  Sumary = 'sumary',
  PostalCode = 'postalCode',
  City = 'city',
  Region = "region",
  Profiles = 'profiles'
}

export enum ControlNamesProfiles {
  Name = 'name',
  Url = 'url'
}

enum Group {
  PersonalInfo = 'personalInfo',
}

const LOCAL_STORAGE_FORM: string = 'CV-FORM';

@Component({
  selector: 'create-cv',
  templateUrl: './create-cv.component.html',
  styleUrl: './create-cv.component.css',
})
export class CreateCvComponent implements OnInit, OnDestroy{


  myForm : FormGroup;

  fb = inject(FormBuilder);

  $formSubscription?: Subscription;

  constructor(){

    this.myForm = this.fb.group({
      [Group.PersonalInfo] : this.fb.group({
        [ControlNamesPersonalInfo.Name]: this.fb.control('', {validators: [Validators.required, Validators.minLength(10)], updateOn: 'blur'}),
        [ControlNamesPersonalInfo.Label]: this.fb.control('', {validators: [Validators.required, Validators.minLength(10)], updateOn: 'blur'}),
        [ControlNamesPersonalInfo.Image]: this.fb.control('', {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesPersonalInfo.Email]: this.fb.control('', {validators: [Validators.required, Validators.email], updateOn: 'blur'}),
        [ControlNamesPersonalInfo.Phone]: this.fb.control('', {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesPersonalInfo.Sumary]: this.fb.control('', {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesPersonalInfo.Url]: this.fb.control('', {validators: [], updateOn: 'blur'}),
        [ControlNamesPersonalInfo.City]: this.fb.control('', {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesPersonalInfo.Region]: this.fb.control('', {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesPersonalInfo.PostalCode]: this.fb.control('', {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesPersonalInfo.Profiles]: this.fb.array([])

      }),
    });

    const savedFrom = localStorage.getItem(LOCAL_STORAGE_FORM);
    if(savedFrom){
      const dataParse = JSON.parse(savedFrom)
      this.myForm.patchValue(dataParse);
      const profiles: Profile[] = (dataParse[Group.PersonalInfo][ControlNamesPersonalInfo.Profiles] as []).map((profile)=>{
        return {
          network: profile[ControlNamesProfiles.Name],
          url: profile[ControlNamesProfiles.Url]
        }
      })
      this.addNetworkGroup(profiles);
    }
  }

  ngOnInit(): void {
    this.$formSubscription = this.myForm.valueChanges.subscribe(()=>{
      localStorage.setItem(LOCAL_STORAGE_FORM, JSON.stringify(this.myForm.getRawValue()));
    });
  }


  async onChangeFile(event: FileList){
    console.log(await Utils.fileToBase64(event[0]));
  }

  getFormGroup(form: keyof typeof Group): FormGroup{
    return this.myForm.controls[Group[form]] as FormGroup;
  }

  ngOnDestroy(): void {
   if(this.$formSubscription){
    this.$formSubscription.unsubscribe();
   }
  }

  addNetworkGroup(profiles: Profile[]){
    profiles.forEach((profile)=>{
      this.arrayNetworks.push(this.fb.group({
        [ControlNamesProfiles.Name]: this.fb.control({value: profile.network, disabled: true }, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesProfiles.Url]: this.fb.control(profile.url, {validators: [Validators.required], updateOn: 'blur'}),
      }));
    })
  }


  get arrayNetworks(): FormArray {
    return this.myForm.get(Group.PersonalInfo)?.get(ControlNamesPersonalInfo.Profiles) as FormArray;
  }

}
