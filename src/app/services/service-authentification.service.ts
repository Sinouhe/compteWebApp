import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment.prod';
import { Observable, observable, Subject } from 'rxjs';
import { User } from '../class/user';
import { UserDAO } from 'src/app/class/user_DAO';
import { ServiceToastMessageService } from 'src/app/services/service-toast-message.service';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class ServiceAuthentificationService implements OnInit {

  private _oUser: User;
  private _sToken: string;
  private _oDecodedToken: any;
  private _bIsAuthenticated: boolean;
  private _oSubjectUser: Subject<User>;
  private _oSubjectServiceReady: Subject<boolean>;

  constructor(private _ohttp: HttpClient,
              private _oUserDAO: UserDAO,
              private _oServiceToastMessageService: ServiceToastMessageService) {

    this._sToken = localStorage.getItem(environment.authTokenName);
    this._oSubjectUser = new Subject();
    this._oSubjectServiceReady = new Subject();

  }

  ngOnInit() {
    if (localStorage.getItem(environment.authTokenName)) {
      this.lanceConnectionBdd();
    }
  }

  public get subjectUser(): Observable<User> {
    return this._oSubjectUser;
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

  public get SubjectServiceReady(): Observable<boolean> {
    return this._oSubjectServiceReady;
  }

  public login(credentials: any): Observable<any> {
    return this._ohttp.post(`${environment.urlBackEnd}/auth/login`, credentials)
                    .pipe(map((res) => {
                      return res;
                    }));
  }

  public deconnectUser() {
    this._bIsAuthenticated = false;
    this._oUser = null;
    this._sToken = '';
    this._oDecodedToken = null;
    localStorage.removeItem(environment.authTokenName);
    // on avertit les autres modules
    this._oSubjectUser.next(this._oUser);
  }

  public lanceConnectionToken(p_sToken: any) {
    this._sToken = p_sToken;
    this._oDecodedToken = jwtDecode(this._sToken);
    localStorage.setItem(environment.authTokenName, this._sToken);
    this._oUser = new User(this._oDecodedToken.nom, this._oDecodedToken.prenom, this._oDecodedToken.email);
    // on avertit les autres modules
    this._oSubjectUser.next(this._oUser);
    this._bIsAuthenticated = true;
  }


  public lanceConnectionBdd() {
    this._oDecodedToken = jwtDecode(this._sToken);
    this._oUserDAO.getUserByEmail(this._oDecodedToken.email)
                          .subscribe(
                            (data) => {
                              if (data.status === 'success') {
                                this._oUser = new User(data.result.nom, data.result.prenom, data.result.email);
                                // on avertit les autres modules
                                this._oSubjectUser.next(this._oUser);
                                this._bIsAuthenticated = true;
                                this._oSubjectServiceReady.next(true);
                              } else {
                                // si erreur on supprime le token enregistré
                                this.deconnectUser();
                                this._oServiceToastMessageService.afficheMessage(environment.alert, data.message);
                                this._oSubjectServiceReady.next(true);
                              }
                            },
                            (error) => {
                              this.deconnectUser();
                              this._oServiceToastMessageService.afficheMessage(environment.alert, error.message);
                              this._oSubjectServiceReady.next(true);
                            });
  }

  public changeUser(p_oUser: User, p_sToken: string): void {
    this._sToken = p_sToken;
    this._oDecodedToken = jwtDecode(this._sToken);
    localStorage.setItem(environment.authTokenName, this._sToken);
    this._oUser = p_oUser;
    // on avertit les autres modules
    this._oSubjectUser.next(this._oUser);
  }

  public getUserID() {
    const tokken = this.decodeTokken();
    return tokken.id;
}

}
