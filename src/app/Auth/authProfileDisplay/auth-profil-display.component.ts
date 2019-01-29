import { Component, OnInit } from '@angular/core';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';
import { User } from '../../class/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceToastMessageService } from 'src/app/services/service-toast-message.service';
import { AuthFormVerification } from 'src/app/class/AuthFormVerification';
import { UserDAO } from 'src/app/class/user_DAO';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-profil-display',
  templateUrl: './auth-profil-display.component.html',
  styleUrls: ['./auth-profil-display.component.scss']
})
export class AuthProfilDisplayComponent implements OnInit {

  private _oUser: User;
  private _bPanelOpenState: boolean;
  private _bProfilChange: boolean;
  private _oFormProfil: FormGroup;
  private _oAuthFormVerification: AuthFormVerification;

  constructor(private _serviceAuthentificationService: ServiceAuthentificationService,
              private _serviceToastMessageService: ServiceToastMessageService,
              private _formBuilder: FormBuilder,
              private _User_DAO: UserDAO) {

    this._oUser = this._serviceAuthentificationService.getUser();
    this._oAuthFormVerification = new AuthFormVerification();
    this._serviceAuthentificationService.subjectUser
                                        .subscribe(
                                          (data) => {
                                            this._oUser = data;
                                            console.log(this._oUser);
                                          },
                                          (error) => {
                                            this._serviceToastMessageService.afficheMessage(environment.alert,
                                                                                            error.message);
                                          });
  }

  ngOnInit() {

    this._bPanelOpenState = false;
    this._bProfilChange = false;

    this._oFormProfil = this._formBuilder.group({
      email: this._oAuthFormVerification.getEmailValidator(),
      prenom: '',
      nom: ''
    });

  }

  public get bPanelOpenState(): boolean {
    return this._bPanelOpenState;
  }

  public get bprofilChane(): boolean {
    return this._bProfilChange;
  }

  public setSaveProfil(p_oFormValue): void {
    if (p_oFormValue.email === '' && p_oFormValue.nom === '' && p_oFormValue.prenom === '') {
      this._bProfilChange = false;
    } else if (  (p_oFormValue.email !== this._oUser.email && p_oFormValue.email !== '')
                || (p_oFormValue.nom !== this._oUser.nom && p_oFormValue.nom !== '')
                || (p_oFormValue.prenom !== this._oUser.prenom && p_oFormValue.prenom !== '')) {
      this._bProfilChange = true;
    } else {
      this._bProfilChange = false;
    }
  }

  public modifieProfil(p_oForm): void {
    // j'enregistre les modification du profil utilisateur
    if (p_oForm.value.prenom !== '') {
      p_oForm.value.prenom = this._oUser.prenom;
    }
    if (p_oForm.value.nom === '') {
      p_oForm.value.nom = this._oUser.nom;
    }
    p_oForm.value.email = this._oUser.email;
    // on enregistre
    const oUserPourModification = new User(p_oForm.value.nom, p_oForm.value.prenom, p_oForm.value.email);
    this._User_DAO.modifieUn(oUserPourModification);

  }

}
