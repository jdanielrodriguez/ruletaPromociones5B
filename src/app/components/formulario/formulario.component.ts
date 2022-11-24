import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayService } from './../../services/play-service.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NotificationsService } from 'angular2-notifications';
export type userType = {
  nombre: string;
  dpi: string;
  correo: string;
  telefono: string;
  autorizacion: string;
  cajero: string;
  departamento: number;
  file?: string;
}
type DepartamentType = {
  code: string,
  created_at: Date,
  created_by: Date,
  id: number,
  name: string,
  status: number,
  updated_at: string
}
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public user: userType;
  private _departments: DepartamentType[] = [];
  @BlockUI() blockUI!: NgBlockUI;
  constructor(
    private router: Router,
    private playServices: PlayService,
    private _service: NotificationsService

  ) {
    this.playServices.setPowerOn(false);
    this.user = {
      nombre: '',
      dpi: '',
      correo: '',
      telefono: '',
      autorizacion: '',
      cajero: '',
      departamento: 0,
      file: ''
    };
  }

  set deparments(value: DepartamentType[]) {
    this._departments = value;
  }
  get deparments() {
    return this._departments;
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  onSubmit() {
    this.blockUI.start();
    const validate = this.validateUser();
    if (validate) {
      this.playServices.register(this.user).then((response: any) => {
        this.success('Registro Completo')
        this.blockUI.stop();
        this.router.navigate([`./ruleta/${response.obj.move_id}`]);
      }).catch((error: any) => {
        console.log(error);
        this.error('Error registrando tu jugada: ' + error);
        this.blockUI.stop();
      })
    } else {
      // this.error('Verifica la informacion del formulario.');
      this.blockUI.stop();
    }
  }

  validateUser(): boolean {
    let response = true;
    if (!this.user.nombre || this.user.nombre === '' || this.user.nombre.length < 3) {
      this.error('Debe agregar un nombre.');
      response = false;
    }
    if (!this.user.dpi || this.user.dpi === '' || this.user.dpi.length < 3) {
      this.error('Debe agregar un dpi.');
      response = false;
    }
    if (!this.user.correo || this.user.correo === '' || this.user.correo.length < 3) {
      this.error('Debe agregar un correo.');
      response = false;
    }
    if (!this.user.telefono || this.user.telefono === '' || this.user.telefono.length < 3) {
      this.error('Debe agregar un telefono.');
      response = false;
    }
    if (!this.user.autorizacion || this.user.autorizacion === '' || this.user.autorizacion.length < 3) {
      this.error('Debe agregar un Autorización (AUTH).');
      response = false;
    }
    if (!this.user.cajero || this.user.cajero === '' || this.user.cajero.length < 3) {
      this.error('Debe agregar un Numero de CAJERO (ATM).');
      response = false;
    }
    if (!this.user.departamento) {
      this.error('Debe agregar un departamento.');
      response = false;
    }
    if (!this.user.file || this.user.file === '' || this.user.file.length < 3) {
      this.error('Debe agregar una foto de tu documento comprobante.');
      response = false;
    }
    return response;
  }

  getDepartments() {
    this.playServices.getDepartaments().then((response: DepartamentType[]) => {
      this.deparments = response;
      this.success('Departamentos Cargados con exito');
    }).catch((error: any) => {
      console.log(error)
      this.error('Error cargando departamento: '+ error);
    })
  }

  setImgUrl(value: string) {
    this.user.file = value;
  }

  success(text: string) {
		this._service.success("Exito!", 'Completado: ' + text)
	}

  error(text: string) {
		this._service.error("Error!", 'Error: ' + text)
	}

}
