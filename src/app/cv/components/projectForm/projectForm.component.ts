import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Project } from '../../interfaces/cv.interface';
import { ControlNamesProject, Group } from '../../pages/create-cv/create-cv.component';
import { SwiperSlide } from 'swiper/element';

@Component({
  selector: 'cv-project-form',
  templateUrl: './projectForm.component.html',
  styleUrl: './projectForm.component.css',
})
export class ProjectFormComponent implements AfterViewChecked{

  @Input() projectGroup?: FormGroup;
  @Output() newArrayProject: EventEmitter<Project> = new EventEmitter<Project>();
  @Output() goNextStep: EventEmitter<number> = new EventEmitter();

  @Input() siwperSlide?: SwiperSlide;

  @ViewChild('fielsetMain') mainContainer?: ElementRef;

  addedNew: boolean = false;

  controlsErrors: {[key in ControlNamesProject ]: { [key: string ]: string}} = {
    name: {
      'required': 'Campo Obligatorio',
    },
    description: {
      'required': 'Campo Obligatorio',
    },
    github: {
      'required': 'Campo Obligatorio',
      'pattern': 'Url no válida'
    },
    highlights: {
      'required': 'Campo Obligatorio',
    },
    isActive: {
      'required': 'Campo Obligatorio',
    },
    url: {
      'required': 'Campo Obligatorio',
      'pattern': 'Url no válida'
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

  getControlName(keyControl: keyof typeof ControlNamesProject){
    return ControlNamesProject[keyControl];
  }

  get getArrayProject(){
    return this.projectGroup?.get(Group.Projects) as FormArray;
  }

  geArrayProjectName(){
    return Group.Projects;
  }

  getGroupProject(index: number): FormGroup{
    return this.getArrayProject.get(`${index}`) as FormGroup;
  }

  getActiveControl($index: number){
    return this.getGroupProject($index).controls[this.getControlName('Active')];
  }

  setActiveValue($index: number, value: boolean){
    this.getActiveControl($index).setValue(value);
  }

  getHighlights(index: number): FormArray {
    return this.getGroupProject(index).controls[ControlNamesProject.Highlights] as FormArray;
  }

  addProject(){
    this.newArrayProject.emit({
      highlights: [],
      description: '',
      url: '',
      github: '',
      isActive: false,
      name: ''
    });
    this.addedNew = true;
  }

  removeProject(index: number){
    this.getArrayProject.removeAt(index);
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
    if(this.projectGroup){
      this.goNextStep.emit(5);
    }
  }
}
