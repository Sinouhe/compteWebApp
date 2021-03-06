import { Component, OnInit } from '@angular/core';
import { ServiceAuthentificationService } from 'src/app/services/service-authentification.service';
import { Router } from '@angular/router';
import { GestionTitreService } from 'src/app/router/gestion-titre.service';

@Component({
  selector: 'app-nav-menu-principal',
  templateUrl: './nav-menu-principal.component.html',
  styleUrls: ['./nav-menu-principal.component.scss']
})
export class NavMenuPrincipalComponent implements OnInit {

  private _title: string;
  private _isAuthenticated: boolean;

  constructor(private _serviceAuthentificationService: ServiceAuthentificationService,
              private _gestionTitreService: GestionTitreService,
              private _router: Router) {
    this._title = 'CompteWebApp';
    this._isAuthenticated = this._serviceAuthentificationService.isAuthenticated();
    this._serviceAuthentificationService.subjectUser.subscribe(
      (data) => {
        if (data) {
          this._isAuthenticated = true;
        } else {
          this._isAuthenticated = false;
        }
      });
  }

  ngOnInit() {
  }

  public get title(): string {
    return this._title;
  }

  public deconnection() {
    this._gestionTitreService.ChangeTitleAcceuil('Connection.');
    this._gestionTitreService.ChangeSousTitleAcceuil('Merci de saisir vos identifiant pour vous connecter.');
    this._serviceAuthentificationService.deconnectUser();
    this._router.navigate(['/connection']);
  }

}
