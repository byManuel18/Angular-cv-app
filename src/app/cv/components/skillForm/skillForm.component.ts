import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Skill, SkillsNames } from '../../interfaces/cv.interface';
import { ControlNamesSkills, Group } from '../../pages/create-cv/create-cv.component';
import { SwiperSlide } from 'swiper/element';
import { SkillOption } from '../../interfaces/cv-form.interfaces';
import { SelectSkillsData } from '../../data/selectNetwork';

@Component({
  selector: 'cv-skill-form',
  templateUrl: './skillForm.component.html',
  styleUrl: './skillForm.component.css',
})
export class SkillFormComponent implements AfterViewChecked{

  @Input() skillGroup?: FormGroup;
  @Output() newArraySkill: EventEmitter<Skill> = new EventEmitter<Skill>();
  @Output() goNextStep: EventEmitter<number> = new EventEmitter();

  @Input() siwperSlide?: SwiperSlide;

  @ViewChild('fielsetMain') mainContainer?: ElementRef;

  selectSkillArray: SkillOption[] = (Object.keys(SelectSkillsData) as SkillsNames[]).map((key) => ({
    skill: key,
    label: SelectSkillsData[key]?.label
  }));

  selectedSkill = signal<SkillOption | null>(null);

  addedNew: boolean = false;

  controlsErrors: {[key in ControlNamesSkills ]: { [key: string ]: string}} = {
    name: {
      'required': 'Campo Obligatorio',
    },
    icon: {
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

  getControlName(keyControl: keyof typeof ControlNamesSkills){
    return ControlNamesSkills[keyControl];
  }

  get getArraySkills(){
    return this.skillGroup?.get(Group.Skills) as FormArray;
  }

  geArraySkillName(){
    return Group.Skills;
  }

  getGroupSkill(index: number): FormGroup{
    return this.getArraySkills.get(`${index}`) as FormGroup;
  }

  addSkill(){

    if(this.selectedSkill()){
      this.newArraySkill.emit({
        icon: this.selectedSkill()!.skill,
        name: this.selectedSkill()!.label!
      })
      this.selectedSkill.set(null);
      this.addedNew = true;
    }
  }

  removeSkill(index: number){
    this.getArraySkills.removeAt(index);
  }

  goNext(){
    if(this.skillGroup){
      this.goNextStep.emit(6);
    }
  }

  getArraySkillsSelected():SkillOption[]{
    return this.getArraySkills.controls.map(((g) =>{
      const group = g  as FormGroup;
      return {
        skill: group.get(ControlNamesSkills.Icon)?.value,
        label: group.get(ControlNamesSkills.Name)?.value,
      }
    }))
  }

  changeSelectSkill(event: SkillOption | null){
    this.selectedSkill.set(event);
  }
}
