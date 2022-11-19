import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  //image
  mainImage!: Observable<any>;

  private _fileUrl: string | undefined;
  private _classname: string = '';
  @Input()
  set classname(classname: string) {
    this._classname = classname;
  }
  get classname() {
    return this._classname;
  }
  @Input()
  set fileUrl(url: string | undefined) {
    this._fileUrl = url;
  }
  get fileUrl() {
    return this._fileUrl;
  }
  @Output() getImgUrl = new EventEmitter<string>();
  setImgUrl(value: string) {
    this.getImgUrl.emit(value);
  }
  constructor() { }
  ngOnInit(): void {
  }

  onChange($event: Event) {
    const fileObj = ($event.target as HTMLInputElement);
    if (fileObj && fileObj.files) {
      const file = fileObj.files[0];
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File) {
    this.mainImage = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      if (typeof filereader.result === 'string') {
        // console.log(file)
        this.setImgUrl(filereader.result);
      }
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
}
