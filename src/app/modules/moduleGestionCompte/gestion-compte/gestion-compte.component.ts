import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { DepenseFixeParDateDAO } from 'src/app/class/depenseFixeParDate_DAO.service';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';
import { ServiceToastMessageService } from 'src/app/services/service-toast-message.service';
import { environment } from 'src/environments/environment.prod';
import { DepenseFixe } from 'src/app/class/depenseFixe';
import { DepenseFixeParDate } from 'src/app/class/depenseFixeParDate.service';
import {SelectionModel} from '@angular/cdk/collections';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TypeDepenseDAO } from 'src/app/class/typeDepense_DAO.service';

export interface DepenseFixeAffichage {
  sNom: string;
  sMontant: number;
  bPaye: boolean;
}
export interface TypeDepenseAffichage {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-gestion-compte',
  templateUrl: './gestion-compte.component.html',
  styleUrls: ['./gestion-compte.component.scss']
})
export class GestionCompteComponent implements OnInit {

  private _moisEnCoursChaine: string;
  private _moisEnCoursEntier: number;
  private _anneeEnCours: number;
  private _bMoisCree = false;
  private _tabAsso_tab_listDepensesFixes: Object;
  private _DataDepenseFixeParMois: DepenseFixeAffichage[] = [];

  _typeDepenseAffichage: TypeDepenseAffichage[] = [];
  displayedColumns: string[] = ['select', 'sNom', 'sMontant'];
  private dataSource: MatTableDataSource<DepenseFixeAffichage>;
  selection: SelectionModel<DepenseFixeAffichage>;

  private _monthNames = ['Janvier',
                          'Fevrier',
                          'Mars',
                          'Avril',
                          'Mai',
                          'Juin',
                          'Juillet',
                          'Aout',
                          'Septembre',
                          'Octobre',
                          'Novembre',
                          'Decembre'];

  constructor(private _depenseFixeParDateDAO: DepenseFixeParDateDAO,
              private _serviceAuthentificationService: ServiceAuthentificationService,
              private _serviceToastMessageService: ServiceToastMessageService,
              private _typeDepenseDAO: TypeDepenseDAO) {


    this._tabAsso_tab_listDepensesFixes = new Object();
    const date = new Date();
    this._moisEnCoursEntier = date.getMonth() + 1 ;
    this._moisEnCoursChaine = this._monthNames[this._moisEnCoursEntier - 1];
    this._anneeEnCours = date.getFullYear();
    this.chargementDesDonnees();
    this.chargeTypeDepense();
  }

  ngOnInit() {}

  public get moisEnCours() {
    return this._moisEnCoursChaine;
  }

  public get bMoisCree(): boolean  {
    return this._bMoisCree;
  }

  public get anneeEnCours(): number {
    return this._anneeEnCours;
  }

  public get moisEnCoursEntier(): number {
    return this._moisEnCoursEntier;
  }

  public get moisEnCoursChaine(): string {
    return this._moisEnCoursChaine;
  }

  public get monthNames(): string[] {
    return this._monthNames;
  }

  public anneeSuivante() {
    this._anneeEnCours++;
    this.chargementDesDonnees();
  }

  public anneePrecedente() {
    this._anneeEnCours--;
    this.chargementDesDonnees();
  }

  public moisSuivant(): void {
    if (this._moisEnCoursEntier === 12) {
      this._moisEnCoursEntier = 1;
    } else {
      this._moisEnCoursEntier++;
    }
    this._moisEnCoursChaine = this._monthNames[(this._moisEnCoursEntier - 1)];
    this.chargementDesDonnees();
  }

  public moisPrecedent(): void {
    if (this._moisEnCoursEntier === 1) {
      this._moisEnCoursEntier = 12;
    } else {
      this._moisEnCoursEntier--;
    }
    this._moisEnCoursChaine = this._monthNames[(this._moisEnCoursEntier - 1)];
    this.chargementDesDonnees();
  }

  public creerLeMois(): void {
    this._depenseFixeParDateDAO.createNew(this._serviceAuthentificationService.getUserID(),
                                          this._moisEnCoursEntier,
                                          this._anneeEnCours)
                      .subscribe(
                        (data) => {
                          if (data.status === 'success') {
                            this._serviceToastMessageService.afficheMessage(environment.valid, data.message);
                            this.chargementDesDonnees();
                          } else {
                            this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
                          }
                        },
                        (error) => {
                          this._serviceToastMessageService.afficheMessage(environment.alert, error.message);
                        });
  }

  public checkData(): void {
    if (this.donneeChargeParMoisEtAnnee()) {
      this.loadData();
      this._bMoisCree = true;
    } else {
      this._bMoisCree = false;
    }
  }

  public donneeChargeParMoisEtAnnee(p_Key: string = this._moisEnCoursChaine + this._anneeEnCours.toString()) {
    return this._tabAsso_tab_listDepensesFixes.hasOwnProperty(p_Key);
  }

  public chargementDesDonnees() {
    if (this.donneeChargeParMoisEtAnnee() === false) {
        this._depenseFixeParDateDAO.chargelisteParMois(this._serviceAuthentificationService.getUserID(),
                                                        this._moisEnCoursEntier,
                                                        this.anneeEnCours)
                          .subscribe(
                            (data) => {
                              if (data.status === 'success') {
                                if (data.result.length > 0) {
                                  const listDepensesFixesParDate: DepenseFixeParDate[] = [];
                                  for (const result of data.result) {
                                    listDepensesFixesParDate.push(this._depenseFixeParDateDAO.chargeObjetDepuisRetourBackEnd(result));
                                  }
                                  this._tabAsso_tab_listDepensesFixes[this._moisEnCoursChaine + this._anneeEnCours.toString()] =
                                                              ({
                                                                'depenseFixeParDate': listDepensesFixesParDate
                                                              });
                                  // console.log(this._tabAsso_tab_listDepensesFixes);
                                }
                                this.checkData();
                              } else {
                                this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
                              }
                            },
                            (error) => {
                              this._serviceToastMessageService.afficheMessage(environment.alert, error.message);
                            });
    } else {
      this.checkData();
    }
  }

  public loadData(): void {
    this._DataDepenseFixeParMois = [];
    const sKey: string = this._moisEnCoursChaine + this._anneeEnCours.toString();
    for (const data in this._tabAsso_tab_listDepensesFixes[sKey]) {
      if (this._tabAsso_tab_listDepensesFixes.hasOwnProperty(sKey)) {

        // Pour les dépense fixes par date
        const depenseFixeParDateArray: DepenseFixeParDate[] = this._tabAsso_tab_listDepensesFixes[sKey]['depenseFixeParDate'];
        for (const depenseFixeParDate of depenseFixeParDateArray) {
          // console.log(depenseFixeParDate);
          // console.log(depenseFixeParDate['_oDepenseFixe'].sNom);
          // console.log(depenseFixeParDate['_oDepenseFixe'].nMontant);
          // console.log(depenseFixeParDate.bPaye);
          this._DataDepenseFixeParMois.push({
            sNom: depenseFixeParDate['_oDepenseFixe'].sNom,
            sMontant: depenseFixeParDate['_oDepenseFixe'].nMontant,
            bPaye: depenseFixeParDate.bPaye
          });
        }
      }
    }
    this.dataSource = new MatTableDataSource<DepenseFixeAffichage>(this._DataDepenseFixeParMois);
    this.selection = new SelectionModel<DepenseFixeAffichage>(true, []);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public chargeTypeDepense() {
    this._typeDepenseDAO.chargeTous(this._serviceAuthentificationService.getUserID()).subscribe(
      (data) => {
        if (data.status === 'success') {
          for (const entry of data.result) {
            this._typeDepenseAffichage.push({value: entry.sNom, viewValue: entry.sNom});
          }

        } else {
          this._serviceToastMessageService.afficheMessage(environment.alert, data.message);
        }
      },
      (error) => {
        this._serviceToastMessageService.afficheMessage(environment.alert,
                                                        error.message);
      });
  }

}
