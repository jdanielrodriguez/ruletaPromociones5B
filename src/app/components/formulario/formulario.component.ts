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
export type DepartamentType = {
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
  private constRequest: number = 0;
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
        if (response.status === 401) {
          this.error(response.error.msg);
          this.blockUI.stop();
          return;
        }
        if (response && response.obj) {
          this.success('Registro Completo')
          this.blockUI.stop();
          this.router.navigate([`./ruleta/${response.obj.move_id}`]);
        }
        this.blockUI.stop();
      }).catch((error: any) => {
        if (error.status === 401) {
          console.log(error)
          this.error(error);
          this.blockUI.stop();
          return;
        }
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
    if (!this.user.autorizacion ||
      this.user.autorizacion === '' ||
      this.user.autorizacion.length < 4 ||
      this.user.autorizacion === '000000' ||
      this.user.autorizacion === '111111' ||
      this.user.autorizacion === '222222' ||
      this.user.autorizacion === '333333' ||
      this.user.autorizacion === '444444' ||
      this.user.autorizacion === '555555' ||
      this.user.autorizacion === '666666' ||
      this.user.autorizacion === '777777' ||
      this.user.autorizacion === '888888' ||
      this.user.autorizacion === '999999' ||
      this.user.autorizacion === '123456'
    ) {
      this.error('Debe agregar un Autorización (AUTH) correcto.');
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
    this.playServices.getDepartaments().subscribe((response: DepartamentType[]) => {
      this.deparments = response;
      // this.success('Departamentos Cargados con exito');
    },
    (err) => {
      console.log(err);
      if(this.constRequest < 5) {
        setTimeout(() => {
          this.constRequest++;
          this.getDepartments();
        }, 1000);
      }

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
