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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: userType;
  private _departments: DepartamentType[] = [];
  constructor(
    private router: Router,
    private playServices: PlayService

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
    // this.playServices.register(this.user).then((response: any) => {
    //   this.router.navigate([`./ruleta/${response.obj.move_id}`]);
    // }).catch((error: any) => {
    //   console.log(error)
    // })
  }

  getDepartments() {
    // this.playServices.getDepartaments().then((response: DepartamentType[]) => {
    //   this.deparments = response;
    // }).catch((error: any) => {
    //   console.log(error)
    // })
  }

  setImgUrl(value: string){
    this.user.file = value;
  }

}
