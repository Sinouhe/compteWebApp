import { Component, OnInit } from '@angular/core';
import { ServiceAuthentificationService } from '../../services/service-authentification.service';
import { environment } from 'src/environments/environment';
import { ServiceToastMessageService } from '../../services/service-toast-message.service';
import { User } from 'src/app/class/user';
import { AuthFormVerification } from 'src/app/class/AuthFormVerification';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-auth-form-connection',
  templateUrl: './auth-form-connection.component.html',
  styleUrls: ['./auth-form-connection.component.scss']
})
export class AuthFormConnectionComponent implements OnInit {

  private _isAuthenticated: boolean;
  private _errorConnexion: string;
  private _welcomeMessage: string;
  private _user: User;
  private _hidePassword: boolean;
  private _authFormVerification: AuthFormVerification;
  private _formLogin: FormGroup;

  constructor(private _serviceAuthentificationService: ServiceAuthentificationService,
              private _serviceToastMessageService: ServiceToastMessageService,
              private _formBuilder: FormBuilder) {

    this._authFormVerification = new AuthFormVerification();
  }

  ngOnInit() {
    this._hidePassword = true;
    this._formLogin = this._formBuilder.group({
      email: this._authFormVerification.emailValidator,
      password: this._authFormVerification.passwordValidator
    });

    this._isAuthenticated = this._serviceAuthentificationService.isAuthenticated();
  }

  public get authFormVerification(): AuthFormVerification {
    return this._authFormVerification;
  }

  public get formLogin(): FormGroup {
    return this._formLogin;
  }

  public get hidePassword(): boolean {
    return this._hidePassword;
  }

  public get user(): User  {
    return this._user;
  }

  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  public get errorConnexion(): string {
    return this._errorConnexion;
  }

  public get welcomeMessage(): string {
    return this._welcomeMessage;
  }

  public login(loginForm: any): void {
    this._serviceAuthentificationService.login(loginForm.value)
                    .subscribe(
                      (data) => this.handleLoginSuccess(data),
                      (error) =>  this.handleLoginError(error)
                    );
  }

  private handleLoginSuccess(data: any): void {
    if (data.status === 'success') {
      this._isAuthenticated = true;
      this._errorConnexion = '';
      localStorage.setItem(environment.authTokenName, data.message);
      const decodedToken = this._serviceAuthentificationService.decodeTokken(data.message);
      this._serviceAuthentificationService.user(new User(decodedToken.nom, decodedToken.prenom, decodedToken.email));
      this._serviceToastMessageService.afficheMessage(environment.valid, `Bonjour ${decodedToken.prenom} ${decodedToken.nom}.`);
      this._welcomeMessage = `Bonjour ${decodedToken.prenom} ${decodedToken.nom}.`;
    } else if (data.status === 'error') {
      this._errorConnexion = data.result;
      this._serviceToastMessageService.subject.next({texte: data.result});
      this._serviceToastMessageService.afficheMessage(environment.alert, data.result);
    } else {
      this._errorConnexion = `Erreur inconnu - ${data.result}`;
    }
  }

  public getErrorMessageEmail(): string {
    return this._authFormVerification.getErrorMessageEmail();
  }

  public getErrorMessagePassword(): string {
    return this._authFormVerification.getErrorMessagePassword();
  }

  private handleLoginError(data): void { }

  public changePassVisibility(): void {
    this._hidePassword = ! this._hidePassword;
  }

}
