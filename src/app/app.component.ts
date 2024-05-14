import { Component, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './shared/services/modalService.service';
import { DeviceService } from './shared/services/device.service';

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
  deviceService = inject(DeviceService);

  constructor(){
    this.modalService.viewContainerRef = this.viewContainerRef;
  }

}
