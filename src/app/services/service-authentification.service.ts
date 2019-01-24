import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthentificationService {

  constructor(private http: HttpClient) { }

  public login(credentials: any): Observable<any> {
    return this.http.post(`${environment.urlBackEnd}/auth/login`, credentials)
                    .pipe(map((res) => {
                      return res;
                    }));
  }

  public decodeTokken(token): any {
    return jwtDecode(token);
  }

}
