import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private base_url = environment.api_url;

  constructor(private http: HttpClient) {}

  insertWebConsult(record): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.base_url + 'web_consult/', JSON.stringify(record), httpOptions);
  }

}
