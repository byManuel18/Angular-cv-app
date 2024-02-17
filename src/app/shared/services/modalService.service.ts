import { Injectable, Type, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../components/Modal/Modal.component';

export interface ModalConfig {
  backDropDismmiss?: boolean;
  data?: { [key: string]: any };
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  viewContainerRef!: ViewContainerRef;

  constructor() { }

  openModal(component: Type<any>, props: ModalConfig, lockScroll: boolean = true) {

    const modalComponent = this.viewContainerRef.createComponent(ModalComponent);
    const componentToAdd = this.viewContainerRef.createComponent(component);

    modalComponent.instance.contentRef?.insert(componentToAdd.hostView);

    if(lockScroll){
      document.body.classList.add('modalOpen');
    }

    const closeModal = () =>{
      modalComponent.destroy();
    }

    if(props.data){
      Object.keys(props.data).forEach((key)=>{
        if(Object.keys(componentToAdd.instance).includes(key)){
          componentToAdd.setInput(key, props.data![key]);
        }
      });
    }

    modalComponent.instance.closeModal = closeModal;
    const {data, ...rest} = props;
    modalComponent.setInput('props', rest);

    const onDismiss = () => {
      return new Promise<void>((resolve, _) => {
        modalComponent.onDestroy(()=>{
          if(lockScroll){
            document.body.classList.remove('modalOpen');
          }
          resolve();
        });
      });
    }

    return { closeModal, onDismiss };

  }



}
