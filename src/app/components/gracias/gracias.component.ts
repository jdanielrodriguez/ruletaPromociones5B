import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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

  ngOnInit(): void {
  }

  volverAJugar() {
    this.modalService.dismissAll();
    this.router.navigate([`../`]);

  }

}
