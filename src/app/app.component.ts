import { Component, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './shared/services/modalService.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  viewContainerRef = inject(ViewContainerRef);
  modalService = inject(ModalService);

  constructor(){
    this.modalService.viewContainerRef = this.viewContainerRef;
  }

}
