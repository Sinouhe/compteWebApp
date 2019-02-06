import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { DepenseFixeParDateDAO } from 'src/app/class/depenseFixeParDate_DAO.service';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';
import { ServiceToastMessageService } from 'src/app/services/service-toast-message.service';
import { environment } from 'src/environments/environment.prod';
import { DepenseFixe } from 'src/app/class/depenseFixe';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


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
  private _tab_listDepensesFixes: Array<DepenseFixe>;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

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
              private _serviceToastMessageService: ServiceToastMessageService) {

    this._tab_listDepensesFixes = new Array();
    const date = new Date();
    this._moisEnCoursEntier = date.getMonth();
    this._moisEnCoursChaine = this._monthNames[this._moisEnCoursEntier];
    this._anneeEnCours = date.getFullYear();

  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  public get moisEnCours() {
    return this._moisEnCoursChaine;
  }

  public get bMoisCree() {
    return this._bMoisCree;
  }

  public get anneeEnCours() {
    return this._anneeEnCours;
  }

  public anneeSuivante() {
    this._anneeEnCours++;
  }

  public anneePrecedente() {
    this._anneeEnCours--;
  }

  public moisSuivant(): void {
    if (this._moisEnCoursEntier === 12) {
      this._moisEnCoursEntier = 1;
    } else {
      this._moisEnCoursEntier++;
    }
    this._moisEnCoursChaine = this._monthNames[(this._moisEnCoursEntier - 1)];
  }

  public moisPrecedent(): void {
    if (this._moisEnCoursEntier === 1) {
      this._moisEnCoursEntier = 12;
    } else {
      this._moisEnCoursEntier--;
    }
    this._moisEnCoursChaine = this._monthNames[(this._moisEnCoursEntier - 1)];
  }

  public creerLeMois(): void {
     console.log(this._anneeEnCours + ' - ' + this._moisEnCoursChaine + ' - ' + (this._moisEnCoursEntier));
    this._depenseFixeParDateDAO.createNew(this._serviceAuthentificationService.getUserID(),
                                          this._moisEnCoursEntier,
                                          this._anneeEnCours)
                      .subscribe(
                        (data) => {
                          if (data.status === 'success') {
                            console.log(data);
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
