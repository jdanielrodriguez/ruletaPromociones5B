import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { DepartamentType } from "../components/formulario/formulario.component";
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  })
  private basePath: string = environment.urlBase

  private token = '';
  private powerOn = false;

  constructor(private http: HttpClient) {
    let datos = localStorage.getItem('token');
    if (datos) {
      this.token = (datos);
    } else {
      this.token = environment.token
    }
    this.headers.append('Content-Type', 'application/json');
    // this.headers.append('Authorization', 'Bearer ' + this.token);
  }

  private handleError(error: any): Promise<any> {
    // console.error("ha ocurrido un error")
    // console.log(error)
    return Promise.reject(error.message || error)
  }

  register(form: any): Observable<any> {
    let url = `${this.basePath}/api/register`
    try {
      const response = this.http.post(url, form, { headers: this.headers });
      return response;
    } catch (error) {
      return new Observable((observer) => { observer.error(error); });
    }
  }

  play(id: number): Observable<any> {
    let url = `${this.basePath}/api/play/${id}`
    try {
      const response = this.http.get(url)
      return response;
    } catch (error) {
      return new Observable((observer) => { observer.error(error); });
    }
  }

  getDepartaments(): Observable<DepartamentType[]> {
    let url = `${this.basePath}/api/departments`
    try {
      const response = this.http.get<DepartamentType[]>(url)
      return response;
    } catch (error) {
      return new Observable((observer) => { observer.error(error); });
    }
  }

  isPowerOn() {
    return this.powerOn;
  }

  setPowerOn(value: boolean) {
    this.powerOn = value;
  }
}
