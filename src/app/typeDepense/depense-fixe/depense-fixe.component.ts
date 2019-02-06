import { Component, OnInit } from '@angular/core';
import { DepenseFixe } from 'src/app/class/depenseFixe';
import { DepenseFixeDAO } from 'src/app/class/depenseFixe_DAO.service';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';
import { ServiceToastMessageService } from 'src/app/services/service-toast-message.service';
import { environment } from 'src/environments/environment.prod';
import $ from 'jquery';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-depense-fixe',
  templateUrl: './depense-fixe.component.html',
  styleUrls: ['./depense-fixe.component.scss']
})
export class DepenseFixeComponent implements OnInit {

  private _tab_sDepenseFixe: Array<DepenseFixe>;
  private _oFormDepenseFixe: FormGroup;

  constructor(private _depenseFixeDAO: DepenseFixeDAO,
              private _serviceAuthentificationService: ServiceAuthentificationService,
              private _formBuilder: FormBuilder,
              private _serviceToastMessageService: ServiceToastMessageService) {
    this._tab_sDepenseFixe = new Array();

    this._depenseFixeDAO.chargeTous(this._serviceAuthentificationService.getUserID()).subscribe(
      (data) => {
        if (data.status === 'success') {
          // console.log(data.result);
          this._tab_sDepenseFixe = new Array();
          for (const entry of data.result) {
            this._tab_sDepenseFixe = [ this._depenseFixeDAO.chargeObjetDepuisRetourBackEnd(entry)
                                        , ...this._tab_sDepenseFixe];
          }
          // console.log(this._tab_sDepenseFixe);
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
    this._oFormDepenseFixe = this._formBuilder.group({
      nom: '',
      description: '',
      montant: '',
      actif: null
    });
  }

  public AjouteDepenseFixe(): void {

    if (isNaN($(`#montantAjoutDepenseFixe`).val()) || !$(`#montantAjoutDepenseFixe`).val() ) {
      this._serviceToastMessageService.afficheMessage(environment.alert, 'Merci de rentrer un montant au format numérique');
      return;
    }
    let montant: number = parseFloat($(`#montantAjoutDepenseFixe`).val());
    montant = parseFloat(montant.toFixed(2));
    if (montant < 0) {
      this._serviceToastMessageService.afficheMessage(environment.alert, 'Merci de rentrer un montant positif.');
      return;
    }

    const depenseFixe: DepenseFixe = new DepenseFixe( $(`#nomAjoutDepenseFixe`).val(),
                                                      $(`#descriptionAjoutDepenseFixe`).val(),
                                                      montant);
    // depenseFixe.toStringVersConsole();
    this._depenseFixeDAO.enregistreUn(this._serviceAuthentificationService.getUserID(), depenseFixe).subscribe(
          (data) => {
            if (data.status === 'success') {
              this._tab_sDepenseFixe = [ this._depenseFixeDAO.chargeObjetDepuisRetourBackEnd(data.result)
                                          , ...this._tab_sDepenseFixe];
              this._serviceToastMessageService.afficheMessage(environment.valid, data.message);
            } else {
              this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
            }
          },
          (error) => {
            this._serviceToastMessageService.afficheMessage(environment.alert, error.message);
          });
  }

  public modifieDepenseFixe(p_nIndex: number, p_id: string, p_oForm: any): void {
    let montant: number;
    // console.log(this._tab_sDepenseFixe[p_nIndex].bActif);
    if ($(`#depenseFixeMontant${p_nIndex}`).val()) {
      if (isNaN($(`#depenseFixeMontant${p_nIndex}`).val())) {
        this._serviceToastMessageService.afficheMessage(environment.alert, 'Merci de rentrer un montant au format numérique');
        return;
      }
      if ($(`#depenseFixeMontant${p_nIndex}`).val()) {
        montant = parseFloat($(`#depenseFixeMontant${p_nIndex}`).val());
        montant = parseFloat(montant.toFixed(2));
        if (montant < 0) {
          this._serviceToastMessageService.afficheMessage(environment.alert, 'Merci de rentrer un montant positif.');
          return;
        }
      }
    }
    const depenseFixe: DepenseFixe = new DepenseFixe( $(`#depenseFixeNom${p_nIndex}`).val(),
                                                      $(`#depenseFixeDescription${p_nIndex}`).val(),
                                                      montant);
    // depenseFixe.toStringVersConsole();
    if ( depenseFixe.sNom === '') {
      depenseFixe.sNom = this._tab_sDepenseFixe[p_nIndex].sNom;
    }
    if ( depenseFixe.sDescription === '') {
      depenseFixe.sDescription = this._tab_sDepenseFixe[p_nIndex].sDescription;
    }
    if (depenseFixe.nMontant === 0 ) {
      depenseFixe.nMontant = this._tab_sDepenseFixe[p_nIndex].nMontant;
    }
    depenseFixe.sId = this._tab_sDepenseFixe[p_nIndex].sId;
    depenseFixe.bActif = this._tab_sDepenseFixe[p_nIndex].bActif;
    // depenseFixe.toStringVersConsole();
    // on enregistre
    this._depenseFixeDAO.modifieUn(this._serviceAuthentificationService.getUserID(), depenseFixe).subscribe(
        (data) => {
          if (data.status === 'success') {
            this._tab_sDepenseFixe[p_nIndex] = depenseFixe;
            this._serviceToastMessageService.afficheMessage(environment.valid, data.message);
          } else {
            this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
          }
        },
        (error) => {
          this._serviceToastMessageService.afficheMessage(environment.alert, error.message);
        });
  }

  public check(p_nIndex): void {
    this._tab_sDepenseFixe[p_nIndex].bActif = !this._tab_sDepenseFixe[p_nIndex].bActif;
  }

}
