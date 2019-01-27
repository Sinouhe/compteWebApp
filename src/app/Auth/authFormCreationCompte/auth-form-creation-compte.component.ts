import { Component, OnInit } from '@angular/core';
import { User } from '../../class/user';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';
import { ServiceToastMessageService } from 'src/app/services/service-toast-message.service';
import { UserDAO } from 'src/app/class/user_DAO';
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router';
import { AuthFormVerification } from 'src/app/class/AuthFormVerification';

@Component({
  selector: 'app-auth-form-creation-compte',
  templateUrl: './auth-form-creation-compte.component.html',
  styleUrls: ['./auth-form-creation-compte.component.scss']
})
export class AuthFormCreationCompteComponent implements OnInit {

  private _user: User;
  private _isAuthenticated: boolean;
  private _errorEmail: string;
  private _errorPassword: string;
  private _errorPasswordConfirm: string;

  constructor(private _serviceAuthentificationService: ServiceAuthentificationService,
              private _serviceToastMessageService: ServiceToastMessageService,
              private _UserDAO: UserDAO,
              private _router: Router) { }

  ngOnInit() {
      this._isAuthenticated = this._serviceAuthentificationService.isAuthenticated();
  }

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  public creationCompte(datafrom: any): void {
    // Validation du formulaire:
    AuthFormVerification.startVerificationFrom();
    if (AuthFormVerification.validateEmailString(datafrom.email) === false) {
      this._errorEmail = AuthFormVerification.sMessageError;
    } else {
      this._errorEmail = '';
    }
    if (AuthFormVerification.validatePasword(datafrom.password) === false) {
      this._errorPassword = AuthFormVerification.sMessageError;
    } else {
      this._errorPassword = '';
      if (AuthFormVerification.memeMotDePasse(datafrom.password, datafrom.passwordConfirm) === false) {
        this._errorPasswordConfirm = AuthFormVerification.sMessageError;
      } else {
        this._errorPasswordConfirm = '';
      }
    }
    if (AuthFormVerification.sMessageError !== '' ) {
      return;
    }
    // fin validation formualire
    this._user = new User(datafrom.nom, datafrom.prenom, datafrom.email, datafrom.password);
    this._UserDAO.enregistreUn(this._user)
                  .subscribe(
                    (data) => {
                      if (data.status === 'success') {
                        this._serviceToastMessageService.afficheMessage(environment.valid, data.message);
                        this._router.navigate(['/connection']);
                      } else {
                        this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
                      }
                    },
                    (error) => {
                      this._serviceToastMessageService.afficheMessage(environment.alert, error.message);
                    });
  }


}
