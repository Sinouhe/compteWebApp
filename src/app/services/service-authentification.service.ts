import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthentificationService {

  private _user: User;

  constructor(private _http: HttpClient) {
    this._user = new User();
  }

  public login(credentials: any): Observable<any> {
    return this._http.post(`${environment.urlBackEnd}/auth/login`, credentials)
                    .pipe(map((res) => {
                      return res;
                    }));
  }

  public user(p_sUser: User) {
    this._user = p_sUser;
  }

  public geyUser() {
    return this._user;
  }

  public decodeTokken(token): any {
    return jwtDecode(token);
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem(environment.authTokenName)) {
      return true;
    } else {
      return false;
    }
  }

}
