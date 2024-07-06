import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Volunteer } from '../../interfaces/cv.interface';
import { ControlNamesWork, Group } from '../../pages/create-cv/create-cv.component';
import { SwiperSlide } from 'swiper/element';

@Component({
  selector: 'cv-profesion-form',
  templateUrl: './profesionForm.component.html',
  styleUrl: './profesionForm.component.css',
})
export class ProfesionFormComponent implements AfterViewChecked{

  @Input() profesionGroup?: FormGroup;
  @Output() newArrayProfesion: EventEmitter<Volunteer> = new EventEmitter<Volunteer>();
  @Output() goNextStep: EventEmitter<number> = new EventEmitter();

  @Input() siwperSlide?: SwiperSlide;

  @ViewChild('fielsetMain') mainContainer?: ElementRef;

  addedNew: boolean = false;

  controlsErrors: {[key in ControlNamesWork ]: { [key: string ]: string}} = {
    name: {
      'required': 'Campo Obligatorio',
    },
    endDate: {
      'required': 'Campo Obligatorio',
    },
    position: {
      'required': 'Campo Obligatorio',
    },
    startDate: {
      'required': 'Campo Obligatorio',
    },
    summary: {
      'required': 'Campo Obligatorio',
    },
    highlights: {
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

  getControlName(keyControl: keyof typeof ControlNamesWork){
    return ControlNamesWork[keyControl];
  }

  get getArrayProfesion(){
    return this.profesionGroup?.get(Group.Work) as FormArray;
  }

  geArrayProfesionName(){
    return Group.Work;
  }

  getGroupProfesion(index: number): FormGroup{
    return this.getArrayProfesion.get(`${index}`) as FormGroup;
  }

  getHighlights(index: number): FormArray {
    return this.getGroupProfesion(index).controls[ControlNamesWork.Highlights] as FormArray;
  }

  addWork(){
    this.newArrayProfesion.emit({
      highlights: [],
      endDate: '',
      position: '',
      startDate: '',
      summary: '',
      name: ''
    });
    this.addedNew = true;
  }

  removeWork(index: number){
    this.getArrayProfesion.removeAt(index);
  }

  addHighlights(index: number, value: string){
    if(value){
      this.getHighlights(index).push( new FormControl(value));
    }
  }

  removeHighlights(indexParent: number, indexHighlight: number){
    this.getHighlights(indexParent).removeAt(indexHighlight);
  }

  goNext(){
    if(this.profesionGroup){
      this.goNextStep.emit(4);
    }
  }
}
