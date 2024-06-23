import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Certificate, Education } from '../../interfaces/cv.interface';
import { ControlNamesCertificate, Group } from '../../pages/create-cv/create-cv.component';
import { SwiperSlide } from 'swiper/element';

@Component({
  selector: 'cv-certificates-form',
  templateUrl: './certificatesForm.component.html',
  styleUrl: './certificatesForm.component.css',
})
export class CertificatesFormComponent implements AfterViewChecked{

  @Input() certificatesInfoGroup?: FormGroup;
  @Output() newArrayCertificates: EventEmitter<Certificate> = new EventEmitter<Certificate>();
  @Output() goNextStep: EventEmitter<number> = new EventEmitter();

  @Input() siwperSlide?: SwiperSlide;

  @ViewChild('fielsetMain') mainContainer?: ElementRef;

  addedNew: boolean = false;

  controlsErrors: {[key in ControlNamesCertificate]: { [key: string ]: string}} = {
    date: {
      'required': 'Campo Obligatorio',
    },
    issuer: {
      'required': 'Campo Obligatorio',
    },
    name: {
      'required': 'Campo Obligatorio',
    },
    url: {
      'required': 'Campo Obligatorio',
    }
  }

  ngAfterViewChecked(): void {
    if(this.addedNew){
      this.addedNew = false;
      this.siwperSlide?.scrollTo({
        top: this.siwperSlide.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  getControlName(keyControl: keyof typeof ControlNamesCertificate){
    return ControlNamesCertificate[keyControl];
  }

  get getArrayCertificates(){
    return this.certificatesInfoGroup?.get(Group.Certificates) as FormArray;
  }

  geArrayCertificatesName(){
    return Group.Certificates;
  }

  getGroupCertificates(index: number): FormGroup{
    return this.getArrayCertificates.get(`${index}`) as FormGroup;
  }

  addCertificates(){
    this.newArrayCertificates.emit({
      date: '',
      issuer: '',
      name: '',
      url: '',
    });
    this.addedNew = true;
  }

  removeCertificate(index: number){
    this.getArrayCertificates.removeAt(index);
  }

  goNext(){
    if(this.certificatesInfoGroup){
      this.goNextStep.emit(2);
    }
  }
}
