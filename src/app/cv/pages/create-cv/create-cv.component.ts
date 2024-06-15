import { Utils } from './../../../shared/utils/utils';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Education, Profile } from '../../interfaces/cv.interface';
import { Subscription } from 'rxjs';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';


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

export enum ControlNamesEducation {
  Institution = 'institution',
  Area = 'area',
  StartDate = 'startDate',
  EndDate = 'endDate'
}

export enum Group {
  PersonalInfo = 'personalInfo',
  Education = 'education'
}

const LOCAL_STORAGE_FORM: string = 'CV-FORM';
const URL_PATTERN: RegExp = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(\:[a-zA-Z0-9.&%$-]+)*@)?[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+(:[0-9]{1,5})?(\/[^\s]*)?$/;

@Component({
  selector: 'create-cv',
  templateUrl: './create-cv.component.html',
  styleUrl: './create-cv.component.css',
})
export class CreateCvComponent implements OnInit, OnDestroy{

  @ViewChild('carrusel',{static: true}) carrusel?: ElementRef;

  myForm : FormGroup;

  fb = inject(FormBuilder);

  $formSubscription?: Subscription;

  swipperElemet = signal<SwiperContainer | null>(null);

  balls: (keyof typeof Group)[] = Object.keys(Group) as (keyof typeof Group)[];

  indexActive: number = 0;

  constructor(){

    this.myForm = this.fb.group({
      [Group.PersonalInfo] : this.formatPersonalInfoGroup(),
      [Group.Education]: this.formatEducationGroup()
    });

    this.loadForm();
  }

  ngOnInit(): void {
    this.$formSubscription = this.myForm.valueChanges.subscribe(()=>{
      this.saveForm();
    });

    this.initSwiper();
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
        [ControlNamesProfiles.Url]: this.fb.control(profile.url, {validators: [Validators.required, Validators.pattern(URL_PATTERN)], updateOn: 'blur'}),
      }));
    })
  }

  addEducationGroup(educations: Education[]){
    educations.forEach((education)=>{
      this.arrayNetworks.push(this.fb.group({
        [ControlNamesEducation.Institution]: this.fb.control({value: education.institution, disabled: true }, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesEducation.Area]: this.fb.control(education.area, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesEducation.StartDate]: this.fb.control(education.startDate, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesEducation.EndDate]: this.fb.control(education.endDate, {validators: [], updateOn: 'blur'}),
      }));
    })
  }


  get arrayNetworks(): FormArray {
    return this.myForm.get(Group.PersonalInfo)?.get(ControlNamesPersonalInfo.Profiles) as FormArray;
  }

  get arrayEducation(): FormArray {
    return this.myForm.get(Group.Education)?.get(Group.Education) as FormArray;
  }

  formatPersonalInfoGroup(){
    return this.fb.group({
      [ControlNamesPersonalInfo.Name]: this.fb.control('', {validators: [Validators.required, Validators.minLength(10)], updateOn: 'blur'}),
      [ControlNamesPersonalInfo.Label]: this.fb.control('', {validators: [Validators.required, Validators.minLength(10)], updateOn: 'blur'}),
      [ControlNamesPersonalInfo.Image]: this.fb.control('', {validators: [Validators.required], updateOn: 'blur'}),
      [ControlNamesPersonalInfo.Email]: this.fb.control('', {validators: [Validators.required, Validators.email], updateOn: 'blur'}),
      [ControlNamesPersonalInfo.Phone]: this.fb.control('', {validators: [Validators.required], updateOn: 'blur'}),
      [ControlNamesPersonalInfo.Sumary]: this.fb.control('', {validators: [Validators.required], updateOn: 'blur'}),
      [ControlNamesPersonalInfo.Url]: this.fb.control('', {validators: [Validators.pattern(URL_PATTERN)], updateOn: 'blur'}),
      [ControlNamesPersonalInfo.City]: this.fb.control('', {validators: [Validators.required], updateOn: 'blur'}),
      [ControlNamesPersonalInfo.Region]: this.fb.control('', {validators: [Validators.required], updateOn: 'blur'}),
      [ControlNamesPersonalInfo.PostalCode]: this.fb.control('', {validators: [Validators.required], updateOn: 'blur'}),
      [ControlNamesPersonalInfo.Profiles]: this.fb.array([])
    });
  }

  formatEducationGroup(){
    return this.fb.group({
      [Group.Education]: this.fb.array([])
    })
  }

  loadForm(){
    try {
      const savedFrom = localStorage.getItem(LOCAL_STORAGE_FORM);
      if(savedFrom){
        const dataParse = JSON.parse(savedFrom)
        this.myForm.patchValue(dataParse);
        this.loadProfiles(dataParse);
        this.loadEducations(dataParse);
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_FORM);
      this.myForm.reset();
    }
  }

  loadProfiles(form: any){
    const profiles: Profile[] = (form[Group.PersonalInfo][ControlNamesPersonalInfo.Profiles] as []).map((profile)=>{
      return {
        network: profile[ControlNamesProfiles.Name],
        url: profile[ControlNamesProfiles.Url]
      }
    })
    this.addNetworkGroup(profiles);
  }

  loadEducations(form: any){
    const educations: Education[] = (form[Group.Education][Group.Education] as Education[]);
    this.addEducationGroup(educations);
  }

  saveForm(){
    localStorage.setItem(LOCAL_STORAGE_FORM, JSON.stringify(this.myForm.getRawValue()));
  }

  nextSlider(index: number){
    const group = this.getFormGroup(this.balls[this.indexActive]);
    this.validateGroup(group);
    if(group.valid){
      this.indexActive = index;
      this.swipperElemet()?.swiper.slideTo(index);
    }
  }

  initSwiper(){
    const swiperConstructor = this.carrusel?.nativeElement;
    const swiperOptions: SwiperOptions = {
      slidesPerView : 1,
      allowTouchMove: false,
    }

    Object.assign(swiperConstructor, swiperOptions);

    this.swipperElemet.set(swiperConstructor as SwiperContainer);
    this.swipperElemet()?.initialize();
  }

  validFornGroup(form: keyof typeof Group): boolean{
    const group = this.getFormGroup(form);
    return group.valid && group.dirty;
  }

  invalidFornGroup(form: keyof typeof Group): boolean{
    const group = this.getFormGroup(form);
    return group.invalid && group.dirty;
  }

  validateGroup(form: FormGroup){
    Utils.marAllAsDirty(form)
    form.markAllAsTouched();
  }

}
