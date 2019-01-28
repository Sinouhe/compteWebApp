import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { User } from '../class/user';
import { UserDAO } from 'src/app/class/user_DAO';
import { ServiceToastMessageService } from 'src/app/services/service-toast-message.service';
import { connect } from 'http2';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthentificationService implements OnInit {

  private _oUser: User;
  private _sToken: string;
  private _oDecodedToken: any;
  private _bIsAuthenticated: boolean;

  constructor(private _ohttp: HttpClient,
              private _oUserDAO: UserDAO,
              private _oServiceToastMessageService: ServiceToastMessageService) {
    this._sToken = localStorage.getItem(environment.authTokenName);
    // si token on charge l'tilisateur
    if (this._sToken) {
      this._oDecodedToken = jwtDecode(this._sToken);
      console.log('début log');
      this._oUserDAO.getUserByEmail(this._oDecodedToken.email)
                    .subscribe(
                      (data) => {
                        if (data.status === 'success') {
                          console.log('connect');
                          this._oUser = new User(data.result.nom, data.result.prenom, data.result.email);
                          this._bIsAuthenticated = true;
                        } else {
                          // si erreur on supprime le token enregistré
                          this.unConnectUser();
                          this._oServiceToastMessageService.afficheMessage(environment.alert, data.message);
                        }
                      },
                      (error) => {
                        console.log('data service ' + JSON.stringify(error));
                        this.unConnectUser();
                        this._oServiceToastMessageService.afficheMessage(environment.alert, error.message);
                      });
    }
  }

  ngOnInit() { }

  public login(credentials: any): Observable<any> {
    return this._ohttp.post(`${environment.urlBackEnd}/auth/login`, credentials)
                    .pipe(map((res) => {
                      return res;
                    }));
  }

  public user(p_sUser: User) {
    this._oUser = p_sUser;
  }

  public getUser() {
    return this._oUser;
  }

  public get sToken(): string {
    return this._sToken;
  }

  public decodeTokken(): any {
    return this._oDecodedToken;
  }

  public isAuthenticated(): boolean {
    return this._bIsAuthenticated;
  }

  public unConnectUser() {
    this._oUser = null;
    this._sToken = '';
    this._oDecodedToken = null;
    localStorage.removeItem(environment.authTokenName);
    this._bIsAuthenticated = false;
  }

  public ConnectUser(p_sToken: any) {
    this._sToken = p_sToken;
    this._oDecodedToken = jwtDecode(this._sToken);
    localStorage.setItem(environment.authTokenName, this._sToken);
    this._oUser = new User(p_sToken.nom, p_sToken.prenom, p_sToken.email);
    this._bIsAuthenticated = true;
  }

}
