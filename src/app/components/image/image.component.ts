import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  //image
  mainImage!: Observable<any> | null;
  private _fileUrl: string | undefined = '';
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
    this._fileUrl = value;
    this.getImgUrl.emit(value);
  }
  constructor(
    private _service: NotificationsService
  ) { }
  ngOnInit(): void {
  }

  onChange($event: Event | null) {
    const fileObj = $event ? ($event.target as HTMLInputElement) : null;
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
    console.log(file)
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
      filereader.readAsDataURL(file);
      filereader.onload = () => {
        if (typeof filereader.result === 'string') {
          this.setImgUrl(filereader.result);
        }
        subscriber.next(filereader.result);
        subscriber.complete();
      };
      filereader.onerror = (error) => {
        subscriber.error(error);
        subscriber.complete();
      };
    } else {
      this.error('El archivo debe ser una imagen.');
      this.resetImg();
    }

  }
  resetImg() {
    this.setImgUrl('');
    this.mainImage = new Observable((subscriber: Subscriber<any>) => {
      subscriber.complete();
    });
    this.mainImage = null;
    this.success('Suba una nueva imagen de su comprobante.')
  }
  success(text: string) {
    this._service.success("Exito!", 'Completado: ' + text)
  }

  error(text: string) {
    this._service.error("Error!", 'Error: ' + text)
  }
}
