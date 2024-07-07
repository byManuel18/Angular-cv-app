import { Utils } from './../../../shared/utils/utils';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Certificate, Cv, Education, Profile, Project, Skill, Volunteer } from '../../interfaces/cv.interface';
import { Subscription } from 'rxjs';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { FullForm } from '../../interfaces/cv-form.interfaces';
import { Router } from '@angular/router';

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

export enum ControlNamesCertificate{
  Url = 'url',
  Name = 'name',
  Date = 'date',
  Issuer = 'issuer'
}

export enum ControlNamesWork{
  Name = 'name',
  Position = 'position',
  StartDate = 'startDate',
  EndDate = 'endDate',
  Summary = 'summary',
  Highlights = 'highlights'
}

export enum ControlNamesProject{
  Name = 'name',
  Active = 'isActive',
  Description = 'description',
  Url = 'url',
  Github = 'github',
  Highlights = 'highlights'

}

export enum ControlNamesSkills{
  Name = 'name',
  Icon = 'icon'
}

export enum Group {
  PersonalInfo = 'personalInfo',
  Education = 'education',
  Certificates = 'certificates',
  Work = 'work',
  Projects = 'projects',
  Skills = 'skills'
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

  router = inject(Router);

  constructor(){

    this.myForm = this.fb.group({
      [Group.PersonalInfo] : this.formatPersonalInfoGroup(),
      [Group.Education]: this.formatEducationGroup(),
      [Group.Work]: this.formatWorkGroup(),
      [Group.Certificates]: this.formatCertificatesGroup(),
      [Group.Projects]: this.formatProjectsGroup(),
      [Group.Skills]: this.formatSkillsGroup(),
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
      this.arrayEducation.push(this.fb.group({
        [ControlNamesEducation.Institution]: this.fb.control( education.institution, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesEducation.Area]: this.fb.control(education.area, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesEducation.StartDate]: this.fb.control(education.startDate, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesEducation.EndDate]: this.fb.control(education.endDate, {validators: [Validators.required], updateOn: 'blur'}),
      }));
    });
  }

  addCertificateGroup(certificates: Certificate[]){
    certificates.forEach((certificate)=>{
      this.arrayCertificates.push(this.fb.group({
        [ControlNamesCertificate.Name]: this.fb.control(certificate.name, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesCertificate.Url]: this.fb.control(certificate.url, {validators: [Validators.required, Validators.pattern(URL_PATTERN)], updateOn: 'blur'}),
        [ControlNamesCertificate.Date]: this.fb.control(certificate.date, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesCertificate.Issuer]: this.fb.control(certificate.issuer, {validators: [Validators.required], updateOn: 'blur'}),
      }));
    });
  }

  addWorkGroup(works: Volunteer[]){
    works.forEach((work)=>{
      this.arrayWorks.push(this.fb.group({
        [ControlNamesWork.Name]: this.fb.control(work.name, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesWork.EndDate]: this.fb.control(work.endDate, {validators: [], updateOn: 'blur'}),
        [ControlNamesWork.StartDate]: this.fb.control(work.startDate, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesWork.Position]: this.fb.control(work.position, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesWork.Summary]: this.fb.control(work.summary, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesWork.Highlights]: this.fb.array(work.highlights, {validators: [], updateOn: 'blur'}),
      }));
    });
  }

  addProjectGroup(projects: Project[]){
    projects.forEach((project)=>{
      this.arrayProjects.push(this.fb.group({
        [ControlNamesProject.Name]: this.fb.control(project.name, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesProject.Active]: this.fb.control(project.isActive, {validators: [], updateOn: 'blur'}),
        [ControlNamesProject.Description]: this.fb.control(project.description, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesProject.Url]: this.fb.control(project.url, {validators: [Validators.pattern(URL_PATTERN)], updateOn: 'blur'}),
        [ControlNamesProject.Github]: this.fb.control(project.github, {validators: [Validators.pattern(URL_PATTERN)], updateOn: 'blur'}),
        [ControlNamesProject.Highlights]: this.fb.array(project.highlights, {validators: [], updateOn: 'blur'}),
      }));
    });
  }

  addSkillGroup(skills: Skill[]){
    skills.forEach((skill)=>{
      this.arraySkills.push(this.fb.group({
        [ControlNamesSkills.Name]: this.fb.control(skill.name, {validators: [Validators.required], updateOn: 'blur'}),
        [ControlNamesSkills.Icon]: this.fb.control(skill.icon, {validators: [Validators.required], updateOn: 'blur'}),
      }));
    });
  }


  get arrayNetworks(): FormArray {
    return this.myForm.get(Group.PersonalInfo)?.get(ControlNamesPersonalInfo.Profiles) as FormArray;
  }

  get arrayEducation(): FormArray {
    return this.myForm.get(Group.Education)?.get(Group.Education) as FormArray;
  }

  get arrayCertificates(): FormArray {
    return this.myForm.get(Group.Certificates)?.get(Group.Certificates) as FormArray;
  }

  get arrayWorks(): FormArray {
    return this.myForm.get(Group.Work)?.get(Group.Work) as FormArray;
  }

  get arrayProjects(): FormArray {
    return this.myForm.get(Group.Projects)?.get(Group.Projects) as FormArray;
  }

  get arraySkills(): FormArray {
    return this.myForm.get(Group.Skills)?.get(Group.Skills) as FormArray;
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

  formatWorkGroup(){
    return this.fb.group({
      [Group.Work]: this.fb.array([])
    })
  }

  formatCertificatesGroup(){
    return this.fb.group({
      [Group.Certificates]: this.fb.array([])
    })
  }

  formatProjectsGroup(){
    return this.fb.group({
      [Group.Projects]: this.fb.array([])
    })
  }

  formatSkillsGroup(){
    return this.fb.group({
      [Group.Skills]: this.fb.array([])
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
        this.loadCertificates(dataParse);
        this.loadProfesions(dataParse);
        this.loadProjects(dataParse);
        this.loadSkills(dataParse);
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

  loadCertificates(form: any){
    const certificates: Certificate[] = (form[Group.Certificates][Group.Certificates] as Certificate[]);
    this.addCertificateGroup(certificates);
  }

  loadProfesions(form: any){
    const works: Volunteer[] = (form[Group.Work][Group.Work] as Volunteer[]);
    this.addWorkGroup(works);
  }

  loadProjects(form: any){
    const project: Project[] = (form[Group.Projects][Group.Projects] as Project[]);
    this.addProjectGroup(project);
  }

  loadSkills(form: any){
    const skills: Skill[] = (form[Group.Skills][Group.Skills] as Skill[]);
    this.addSkillGroup(skills);
  }

  saveForm(){
    localStorage.setItem(LOCAL_STORAGE_FORM, JSON.stringify(this.myForm.getRawValue()));
  }

  nextSlider(index: number, fromBall = false){
    if(fromBall && (index >= this.indexActive && index !== (this.indexActive + 1))){
      return;
    }


    if(index > this.indexActive){
      const group = this.getFormGroup(this.balls[this.indexActive]);
      this.validateGroup(group);
      if(group.valid){
        this.swipperElemet()?.swiper.slideTo(index);
        this.indexActive = index;
      }
    }else{
      this.swipperElemet()?.swiper.slideTo(index);
      this.indexActive = index;
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
  }

  createCV(){
    const group = this.getFormGroup(this.balls[this.balls.length - 1]);
    this.validateGroup(group);

    if(group.valid && this.myForm.valid){
      const cv = this.formatCSV(this.myForm.getRawValue());

      this.router.navigate([`cv/show-cv`],{
        queryParams: { jObj: 'ide'}});
    }
  }


  formatCSV(myForm: FullForm): Cv{
    return {
      work: myForm.work.work,
      basics: {
        email: myForm.personalInfo.email,
        image: myForm.personalInfo.image,
        label: myForm.personalInfo.label,
        location: {
          city: myForm.personalInfo.city,
          postalCode: myForm.personalInfo.postalCode,
          region: myForm.personalInfo.region
        },
        name: myForm.personalInfo.name,
        phone: myForm.personalInfo.phone,
        summary: myForm.personalInfo.sumary,
        url: myForm.personalInfo.url,
        profiles: myForm.personalInfo.profiles.map(p=>{return {network: p.name, url: p.url}}),
      },
      certificates: myForm.certificates.certificates,
      education: myForm.education.education,
      skills: myForm.skills.skills,
      awards: [],
      interests:[],
      languages:[],
      projects: myForm.projects.projects,
      publications:[],
      references: [],
      volunteer:[]
    }
  }

}
