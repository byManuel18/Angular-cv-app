import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'shared-input-file',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent{

  @Input() title: string = '';
  @Input() acceptFiles: string = 'image/*';
  @Input() multiple: boolean = false;

  @Output() fileChange = new EventEmitter<FileList>();

  onInputChange(event: Event){
    const files = (event.target as HTMLInputElement).files;
    if(files){
      this.fileChange.emit(files);
    }
  }

}
