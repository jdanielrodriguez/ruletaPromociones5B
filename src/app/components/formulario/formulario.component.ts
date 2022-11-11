import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayService } from './../../services/play-service.service';
export type userType = {
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
    private playServices: PlayService

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

  onSubmit() {
    this.playServices.register(this.user).then((response: any) => {
      this.router.navigate([`./ruleta/${response.obj.move_id}`]);
    }).catch((error: any) => {
      console.log(error)
    })
  }

}
