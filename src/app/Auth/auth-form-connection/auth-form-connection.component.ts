import { Component, OnInit } from '@angular/core';
import { ServiceAuthentificationService } from '../../services/service-authentification.service';
import { environment } from 'src/environments/environment';
import { ServiceToastMessageService } from '../../services/service-toast-message.service';

@Component({
  selector: 'app-auth-form-connection',
  templateUrl: './auth-form-connection.component.html',
  styleUrls: ['./auth-form-connection.component.scss']
})
export class AuthFormConnectionComponent implements OnInit {

  private _isAuthenticated: boolean;
  private _errorConnexion: string;
  private _welcomeMessage: string;

  constructor(private _serviceAuthentificationService: ServiceAuthentificationService,
              private _serviceToastMessageService: ServiceToastMessageService) { }

  ngOnInit() {
    if (localStorage.getItem(environment.authTokenName)) {
      this._isAuthenticated = true;
    } else {
      this._isAuthenticated = false;
    }
  }

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  public get errorConnexion() {
    return this._errorConnexion;
  }

  public get welcomeMessage() {
    return this._welcomeMessage;
  }

  public login(loginForm: any): void {
    this._serviceAuthentificationService.login(loginForm)
                    .subscribe(
                      (data) => this.handleLoginSuccess(data),
                      (error) =>  this.handleLoginError(error)
                    );
  }

  private handleLoginSuccess(data: any): void {
    if (data.status === 'success') {
      this._isAuthenticated = true;
      this._errorConnexion = '';
      localStorage.setItem(environment.authTokenName, JSON.stringify(data.result));
      const decodedToken = this._serviceAuthentificationService.decodeTokken(data.result);
      this._serviceToastMessageService.afficheMessage(environment.valid, `Bonjour ${decodedToken.name}.`);
      this._welcomeMessage = `Bonjour ${decodedToken.name}.`;
    } else if (data.status === 'error') {
      this._errorConnexion = data.result;
      this._serviceToastMessageService.subject.next({texte: data.result});
      this._serviceToastMessageService.afficheMessage(environment.alert, data.result);
    } else {
      this._errorConnexion = `Erreur inconnu - ${data.result}`;
    }
  }

  private handleLoginError(data): void { }

}
