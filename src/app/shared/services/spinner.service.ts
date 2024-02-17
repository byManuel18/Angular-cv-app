import { Injectable, inject } from '@angular/core';
import { ModalService } from './modalService.service';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private modalService = inject(ModalService);

  private spinnerActive?: { closeModal: () => void; onDismiss: () => Promise<void> };

  private isOpen: boolean = false;

  showSpinner(){
    if(!this.isOpen){

      this.spinnerActive = this.modalService.openModal(SpinnerComponent,{backDropDismmiss: false});
      this.isOpen = true;

      this.spinnerActive.onDismiss().then(()=>{
        this.isOpen = false;
      })
    }
  }

  closeSpinner() {
    if(this.isOpen){
      this.spinnerActive?.closeModal();
    }
  }

}
