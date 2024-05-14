import { Type, ViewContainerRef } from '@angular/core';


export class Utils{

  public static getStringFromComponente<T>(viewContainerRef: ViewContainerRef, component: Type<T>): string{
    const componenttoOpen = viewContainerRef.createComponent(component);
    const renderedHtml = (componenttoOpen.hostView as any).rootNodes[0]
      .outerHTML;
    componenttoOpen.destroy();
    return renderedHtml;
  }
}
