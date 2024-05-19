import { Type, ViewContainerRef } from '@angular/core';


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

}
