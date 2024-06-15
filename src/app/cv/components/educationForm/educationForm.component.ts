import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Education } from '../../interfaces/cv.interface';
import { ControlNamesEducation, Group } from '../../pages/create-cv/create-cv.component';

@Component({
  selector: 'cv-education-form',
  templateUrl: './educationForm.component.html',
  styleUrl: './educationForm.component.css'
})
export class EducationFormComponent {

  @Input() educationInfoGroup?: FormGroup;
  @Output() newArrayGroup: EventEmitter<Education> = new EventEmitter<Education>();
  @Output() goNextStep: EventEmitter<number> = new EventEmitter();


  getControlName(keyControl: keyof typeof ControlNamesEducation){
    return ControlNamesEducation[keyControl];
  }

  get getArrayEducations(){
    return this.educationInfoGroup?.get(Group.Education) as FormArray;
  }

  geArrayEducationName(){
    return Group.Education;
  }

}
