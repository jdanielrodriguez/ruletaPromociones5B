import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlayServiceService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  })
  private basePath: string = environment.urlBase

  private token = '';

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

  async register(form: any): Promise<any> {
    let url = `${this.basePath}/api/register`
    try {
      const response = await this.http.post(url, form, { headers: this.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async play(id: number): Promise<any> {
    let url = `${this.basePath}/api/play/${id}`
    try {
      const response = await this.http.get(url)
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getDepartaments(): Promise<any> {
    let url = `${this.basePath}/api/departments`
    try {
      const response = await this.http.get(url)
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
