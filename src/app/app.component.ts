import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewContainerRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './shared/services/modalService.service';
import { DeviceService } from './shared/services/device.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {

  viewContainerRef = inject(ViewContainerRef);
  modalService = inject(ModalService);
  deviceService = inject(DeviceService);

  constructor(){
    this.modalService.viewContainerRef = this.viewContainerRef;
  }

}
