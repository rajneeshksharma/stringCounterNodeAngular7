import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:3000/api';

  getData(): Observable<any> {
    return this.http.get(`${this.uri}/getdata`, httpOptions);
  }
  sendData(data): Observable<any> {
    return this.http.post(`${this.uri}/postdata`, data, httpOptions);
  }
}
