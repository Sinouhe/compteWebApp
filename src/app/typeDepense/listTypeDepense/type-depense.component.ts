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

    this._typeDepenseDAO.chargeTous().subscribe(
      (data) => {
        if (data.status === 'success') {
          console.log(data.result);
          this._tab_sTypesDepense = data.result;
        } else {
          this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
        }
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

    const tokken = this._serviceAuthentificationService.decodeTokken();
    const idUser = tokken.id;
    console.log(idUser);
    if ($(`#nom${p_nIndex}`).val() !== '') {
      this._tab_sTypesDepense[p_nIndex].sNom = $(`#nom${p_nIndex}`).val();
    }
    if ($(`#description${p_nIndex}`).val() !== '') {
      this._tab_sTypesDepense[p_nIndex].sDescription = $(`#description${p_nIndex}`).val();
    }
    console.log(this._tab_sTypesDepense[p_nIndex]);
    // on enregistre
    this._typeDepenseDAO.modifieUn(idUser, this._tab_sTypesDepense[p_nIndex]).subscribe(
                                              (data) => {
                                                if (data.status === 'success') {
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
