import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayServiceService {

  headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  })
  private basePath: string = environment.urlBase

  private token = '';

  constructor(private http: any) {
    let datos = localStorage.getItem('token');
    if (datos) {
      this.token = (datos);
    } else {
      this.token = environment.token
    }
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
  }

  private handleError(error: any): Promise<any> {
    console.error("ha ocurrido un error")
    console.log(error)
    return Promise.reject(error.message || error)
  }

  register(form: any): Promise<any> {
    let url = `${this.basePath}/api/register`
    return this.http.post(url, form, { headers: this.headers })
      .toPromise()
      .then((response: { json: () => any; }) => {
        //console.log(response.json())
        return response.json()
      })
      .catch(this.handleError)
  }

  play(form: any): Promise<any> {
    let url = `${this.basePath}/api/play`
    return this.http.post(url, form, { headers: this.headers })
      .toPromise()
      .then((response: { json: () => any; }) => {
        //console.log(response.json())
        return response.json()
      })
      .catch(this.handleError)
  }
}
