import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ModalConfig } from '../../services/modalService.service';

@Component({
  selector: 'shared-modal',
  standalone: true,
  imports: [],
  template: `
      <div class="modal" (click)="onBackClick()">
      <div class="modal-content">
        <ng-container #contentRef></ng-container>
      </div>
    </div>`,
  styleUrl: './Modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @ViewChild('contentRef', { static: true, read: ViewContainerRef })
  contentRef!: ViewContainerRef;

  @Input() props: ModalConfig = {
    backDropDismmiss: true
  };
  closeModal!: () => void;

  onBackClick() {
    if(this.props.backDropDismmiss){
      this.closeModal();
    }

  }

}
