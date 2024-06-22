import { Type, ViewContainerRef } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';


export class Utils{

  public static getStringFromComponente<T>(viewContainerRef: ViewContainerRef, component: Type<T>): string{
    const componenttoOpen = viewContainerRef.createComponent(component);
    const renderedHtml = (componenttoOpen.hostView as any).rootNodes[0]
      .outerHTML;
    componenttoOpen.destroy();
    return renderedHtml;
  }


  public static fileToBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve((reader.result as string));
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  public static marAllAsDirty(formGroup: FormGroup){
    formGroup.markAllAsTouched();
    Object.keys(formGroup.controls).forEach(controlKey =>{
      const control = formGroup.controls[controlKey];
      if(control instanceof FormGroup){
        control.markAllAsTouched();
        Utils.marAllAsDirty(control);
      }else if(control instanceof FormArray){
        control.markAsDirty();
        control.controls.forEach((arraycontrol=>{
          if(arraycontrol instanceof FormGroup){
            Utils.marAllAsDirty(arraycontrol);
          }else{
            arraycontrol.markAsDirty();
          }
        }))
      }else{
        control.markAsDirty();
      }
    });
  }

}
