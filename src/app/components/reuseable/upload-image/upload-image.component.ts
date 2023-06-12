import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent {
  @Output() change$ = new EventEmitter();
  onChange($event: any) {
    this.change$.emit($event.target.files[0]);
  }
}
