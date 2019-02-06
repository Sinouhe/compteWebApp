import { Component, OnInit } from '@angular/core';
import { ServiceToastMessageService } from '../../services/service-toast-message.service';
import { TypeDepense } from 'src/app/class/typeDepense';
import { TypeDepenseDAO } from 'src/app/class/typeDepense_DAO.service';
import { environment } from 'src/environments/environment.prod';
import { FormGroup, FormBuilder } from '@angular/forms';
import $ from 'jquery';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';

@Component({
  selector: 'app-type-depense',
  templateUrl: './type-depense.component.html',
  styleUrls: ['./type-depense.component.scss']
})
export class TypeDepenseComponent implements OnInit {

  private _tab_sTypesDepense: Array<TypeDepense>;
  private _oFormTypeDepense: FormGroup;

  constructor(private _serviceToastMessageService: ServiceToastMessageService,
              private _typeDepenseDAO: TypeDepenseDAO,
              private _formBuilder: FormBuilder,
              private _serviceAuthentificationService: ServiceAuthentificationService) {

    this._typeDepenseDAO.chargeTous(this._serviceAuthentificationService.getUserID()).subscribe(
      (data) => {
        if (data.status === 'success') {
          // console.log(data.result);
          this._tab_sTypesDepense = new Array();
          for (const entry of data.result) {
            this._tab_sTypesDepense = [ this._typeDepenseDAO.chargeObjetDepuisRetourBackEnd(entry)
                                        , ...this._tab_sTypesDepense];
          }
        } else {
          this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
        }
        // console.log(this._tab_sTypesDepense);
      },
      (error) => {
        this._serviceToastMessageService.afficheMessage(environment.alert,
                                                        error.message);
      });
  }

  ngOnInit() {
    this._oFormTypeDepense = this._formBuilder.group({
      nom: '',
      description: ''
    });
  }

  public get tab_sTypesDepense(): Array<TypeDepense> {
    return this._tab_sTypesDepense;
  }

  public setSaveTypeDepense(p_oFormValue: void): void {
    console.log(p_oFormValue);
  }

  public modifieTypeDepense(p_nIndex: number, p_id: string, p_oForm: any): void {

    const typeDepense: TypeDepense = new TypeDepense($(`#nom${p_nIndex}`).val(), $(`#description${p_nIndex}`).val());
    if ( typeDepense.sNom === '') {
      typeDepense.sNom = this._tab_sTypesDepense[p_nIndex].sNom;
    }
    if ( typeDepense.sDescription === '') {
      typeDepense.sDescription = this._tab_sTypesDepense[p_nIndex].sDescription;
    }
    typeDepense.id = this._tab_sTypesDepense[p_nIndex].id;

    // on enregistre
    this._typeDepenseDAO.modifieUn(this._serviceAuthentificationService.getUserID(), typeDepense).subscribe(
        (data) => {
          if (data.status === 'success') {
            this._tab_sTypesDepense[p_nIndex] = typeDepense;
            this._serviceToastMessageService.afficheMessage(environment.valid, data.message);
          } else {
            this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
          }
        },
        (error) => {
          this._serviceToastMessageService.afficheMessage(environment.alert, error.message);
        });
  }

  public AjouteListDepense() {
    const typeDepense: TypeDepense = new TypeDepense($(`#nomAjoutDepense`).val(), $(`#descriptionAjoutDepense`).val());
    // typeDepense.toStringVersConsole();
    this._typeDepenseDAO.enregistreUn(this._serviceAuthentificationService.getUserID(), typeDepense).subscribe(
        (data) => {
          if (data.status === 'success') {
            this._tab_sTypesDepense = [ this._typeDepenseDAO.chargeObjetDepuisRetourBackEnd(data.result)
                                        , ...this._tab_sTypesDepense];
            this._serviceToastMessageService.afficheMessage(environment.valid, data.message);
          } else {
            this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
          }
        },
        (error) => {
          this._serviceToastMessageService.afficheMessage(environment.alert, error.message);
        });
  }

}
