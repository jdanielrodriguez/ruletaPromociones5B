import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gracias',
  templateUrl: './gracias.component.html',
  styleUrls: []
})
export class GraciasComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private router: Router,
  ) { }
  _imgUrl = '';
  @Input()
  set imgUrl(value: string) {
    this._imgUrl = value;
  }
  get imgUrl(){
    return this._imgUrl;
  }
  ngOnInit(): void {
  }

  volverAJugar() {
    this.modalService.dismissAll();
    this.router.navigate([`../`]);

  }

}
