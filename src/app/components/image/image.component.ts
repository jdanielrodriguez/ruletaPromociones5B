import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  //image
  myimage!: Observable<any>;
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
    this.myimage = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    console.log(file)
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      console.log(filereader.result)
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
}
