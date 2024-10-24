import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Icon } from '../icon/icon.enum';

@Component({
  selector: 'app-img-input',
  templateUrl: './img-input.component.html',
  styleUrls: ['./img-input.component.scss'],
})
export class ImgInputComponent {
  icon = Icon;
  isDragOver: boolean = false;
  @Input() imgUrl?: SafeUrl | string;
  @Output() fileChange: EventEmitter<File | null> =
    new EventEmitter<File | null>();

  constructor(private sanitizer: DomSanitizer) {}

  onFileChange(input: HTMLInputElement) {
    if (input.files) {
      const file = input.files[0];
      const url = URL.createObjectURL(file);
      this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      this.fileChange.emit(file);
    }
    this.isDragOver = false;
  }

  deleteFile(input: HTMLInputElement) {
    this.fileChange.emit(null);
    input.value = '';
    this.imgUrl = undefined;
  }
}
