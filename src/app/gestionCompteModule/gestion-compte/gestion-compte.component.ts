import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-compte',
  templateUrl: './gestion-compte.component.html',
  styleUrls: ['./gestion-compte.component.scss']
})
export class GestionCompteComponent implements OnInit {

  private _moisEnCoursChaine: string;
  private _moisEnCoursEntier: number;
  private _anneeEnCours: number;

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

  constructor() {
    const date = new Date();
    this._moisEnCoursEntier = date.getMonth();
    this._moisEnCoursChaine = this._monthNames[this._moisEnCoursEntier];
    this._anneeEnCours = date.getFullYear();
  }

  ngOnInit() {
  }

  public get moisEnCours() {
    return this._moisEnCoursChaine;
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

  public moisSuivant() {
    if (this._moisEnCoursEntier === 11) {
      this._moisEnCoursEntier = 0;
    } else {
      this._moisEnCoursEntier++;
    }
    this._moisEnCoursChaine = this._monthNames[this._moisEnCoursEntier];
  }

  public moisPrecedent() {
    if (this._moisEnCoursEntier === 0) {
      this._moisEnCoursEntier = 11;
    } else {
      this._moisEnCoursEntier--;
    }
    this._moisEnCoursChaine = this._monthNames[this._moisEnCoursEntier];
  }

}
