import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public user: any;

  constructor(
    private router: Router,

  ) {

    this.user = {
      nombre: '',
      dpi: '',
      correo: '',
      telefono: '',
      autorizacion: '',
      cajero: '',
      file: ''
    };

   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.router.navigate([`./ruleta`]);
    console.log(this.user);
  }

}
