import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayServiceService } from './../../services/play-service.service';
type userType = {
  nombre: string;
  dpi: string;
  correo: string;
  telefono: string;
  autorizacion: string;
  cajero: string;
  file?: string;
}
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public user: userType;

  constructor(
    private router: Router,
    private playServices: PlayServiceService

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

  onSubmit(form: any) {
    console.log(this.user);
    console.log(form.value);
    this.playServices.register(this.user).then((response: any) => {
      console.log(response);
      this.router.navigate([`./ruleta`]);
    }).catch((error: any) => {
      console.log(error)
    })
  }

}
