import { Component, OnInit } from '@angular/core';
import { ServiceAuthentificationService } from './services/service-authentification.service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { GestionTitreService } from './router/gestion-titre.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _sousTitre: string;
  private _bLoadServiceReady: boolean;
  private _titre: string;

  constructor(private _serviceAuthentificationService: ServiceAuthentificationService,
              private _gestionTitreService: GestionTitreService) {
    this._bLoadServiceReady = false;
    // quand l'user courant est chargé ou non si existant on charge la page
    this._serviceAuthentificationService.SubjectServiceReady.subscribe(
                            (data) => {
                              this._bLoadServiceReady = data;
                            });
    this._sousTitre = 'Bienvenue sure l\'application compteWebApp';
    this._titre = 'Bienvenue';
    this._gestionTitreService.subjectGestionTitreAcceuil.subscribe(
                            (data) => {
                              this._titre = data;
                            });
    this._gestionTitreService.subjectGestionSousTitreAcceuil.subscribe(
                              (data) => {
                                this._sousTitre = data;
                              });
  }

  ngOnInit() {
    if (localStorage.getItem(environment.authTokenName)) {
      this._serviceAuthentificationService.lanceConnectionBdd();
    } else {
      this._bLoadServiceReady = true;
    }
  }

  public get loadServiceReady(): boolean {
    return this.loadServiceReady;
  }

  public get sousTitre(): string {
    return this._sousTitre;
  }

  public set titre(p_sTitre: string) {
    this._titre = p_sTitre;
  }

  public get titre(): string {
    return this._titre;
  }

}
