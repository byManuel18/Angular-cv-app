import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Education } from '../../interfaces/cv.interface';
import { ControlNamesEducation, Group } from '../../pages/create-cv/create-cv.component';
import { SwiperSlide } from 'swiper/element';

@Component({
  selector: 'cv-education-form',
  templateUrl: './educationForm.component.html',
  styleUrl: './educationForm.component.css',
})
export class EducationFormComponent implements AfterViewChecked{

  @Input() educationInfoGroup?: FormGroup;
  @Output() newArrayEducation: EventEmitter<Education> = new EventEmitter<Education>();
  @Output() goNextStep: EventEmitter<number> = new EventEmitter();

  @Input() siwperSlide?: SwiperSlide;

  @ViewChild('fielsetMain') mainContainer?: ElementRef;

  addedNew: boolean = false;

  controlsErrors: {[key in ControlNamesEducation]: { [key: string ]: string}} = {
    area: {
      'required': 'Campo Obligatorio',
    },
    endDate: {
      'required': 'Campo Obligatorio',
    },
    institution: {
      'required': 'Campo Obligatorio',
    },
    startDate: {
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

  getControlName(keyControl: keyof typeof ControlNamesEducation){
    return ControlNamesEducation[keyControl];
  }

  get getArrayEducations(){
    return this.educationInfoGroup?.get(Group.Education) as FormArray;
  }

  geArrayEducationName(){
    return Group.Education;
  }

  getGroupEducation(index: number): FormGroup{
    return this.getArrayEducations.get(`${index}`) as FormGroup;
  }

  addEducation(){
    this.newArrayEducation.emit({
      area: '',
      endDate: '',
      institution: '',
      startDate: '',
    });
    this.addedNew = true;
  }

  removeEducation(index: number){
    this.getArrayEducations.removeAt(index);
  }

  goNext(){
    if(this.educationInfoGroup){
      this.goNextStep.emit(2);
    }
  }
}
