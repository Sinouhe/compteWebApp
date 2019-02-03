import { Component, OnInit } from '@angular/core';
import { ServiceAuthentificationService } from '../../services/service-authentification.service';
import { environment } from 'src/environments/environment';
import { ServiceToastMessageService } from '../../services/service-toast-message.service';
import { User } from 'src/app/class/user';
import { AuthFormVerification } from 'src/app/class/AuthFormVerification';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-auth-form-connection',
  templateUrl: './auth-form-connection.component.html',
  styleUrls: ['./auth-form-connection.component.scss']
})
export class AuthFormConnectionComponent implements OnInit {

  private _isAuthenticated: boolean;
  private _welcomeMessage: string;
  private _hidePassword: boolean;
  private _authFormVerification: AuthFormVerification;
  private _formLogin: FormGroup;

  constructor(private _serviceAuthentificationService: ServiceAuthentificationService,
              private _serviceToastMessageService: ServiceToastMessageService,
              private _formBuilder: FormBuilder,
              private _router: Router) {

    this._authFormVerification = new AuthFormVerification();
    this._serviceAuthentificationService.subjectUser.subscribe(
                                              (data) => {
                                                if (data) {
                                                  this._isAuthenticated = true;
                                                } else {
                                                  this._isAuthenticated = false;
                                                }
                                              },
                                              (error) =>  this.handleLoginError(error)
                                            );
  }

  ngOnInit() {
    this._isAuthenticated = this._serviceAuthentificationService.isAuthenticated();
    this._hidePassword = true;
    this._formLogin = this._formBuilder.group({
      email: this._authFormVerification.getEmailValidator(),
      password: this._authFormVerification.getPasswordValidator()
    });
    if (this._serviceAuthentificationService.decodeTokken()) {
      const decodedToken = this._serviceAuthentificationService.decodeTokken();
      this._welcomeMessage = `Bonjour ${decodedToken.prenom} ${decodedToken.nom}.`;
    }
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


  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
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
      this._serviceAuthentificationService.lanceConnectionToken(data.message);
      if (this._serviceAuthentificationService.decodeTokken()) {
        const decodedToken = this._serviceAuthentificationService.decodeTokken();
        this._welcomeMessage = `Bonjour ${decodedToken.prenom} ${decodedToken.nom}.`;
      }
      this._serviceToastMessageService.afficheMessage(environment.valid, this._welcomeMessage);
      this._router.navigate(['/profil']);
    } else if (data.status === 'error') {
      this._serviceToastMessageService.subject.next({texte: data.message});
      this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
    } else {
      this._serviceToastMessageService.afficheMessage(environment.alert, `Erreur inconnu - ${data.message}`);
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

  public onUserChanged(p_oUser: User): void {
    this._welcomeMessage = `Bonjour ${p_oUser.prenom} ${p_oUser.nom}.`;
  }

}
