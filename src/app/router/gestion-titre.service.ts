import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { ServiceAuthentificationService } from '../services/service-authentification.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GestionTitreService {

  private _subjectGestionTitreAcceuil: Subject<string>;
  private _subjectGestionSousTitreAcceuil: Subject<string>;

  constructor(private _route: Router) {
    this._subjectGestionTitreAcceuil = new Subject();
    this._subjectGestionSousTitreAcceuil = new Subject();
    this._route
      .events
      .subscribe((e: NavigationStart) => {
        this.gestionUrl(e.url);
      });
  }


  public get subjectGestionTitreAcceuil(): Subject<string> {
    return this._subjectGestionTitreAcceuil;
  }

  public get subjectGestionSousTitreAcceuil(): Subject<string> {
    return this._subjectGestionSousTitreAcceuil;
  }

  public ChangeTitleAcceuil(p_sTitre: string): void {
    this._subjectGestionTitreAcceuil.next(p_sTitre);
  }

  public ChangeSousTitleAcceuil(p_sSousTitre: string): void {
    this._subjectGestionSousTitreAcceuil.next(p_sSousTitre);
  }

  private gestionUrl(p_sUrl: string): void {
    if (p_sUrl) {
      // console.log(p_sUrl);
      switch (p_sUrl) {
        case '/connection': {
          if (localStorage.getItem(environment.authTokenName)) {
            this._route.navigate(['/profil']);
          } else {
            this.ChangeTitleAcceuil('Connection');
            this.ChangeSousTitleAcceuil('Merci de vous connecter');
          }
           break;
        }
        case '/profil': {
          this.ChangeTitleAcceuil('Profil');
          this.ChangeSousTitleAcceuil('Gestion du profil');
          break;
        }
        case '/creationCompte': {
          this.ChangeTitleAcceuil('Creation de compte');
          this.ChangeSousTitleAcceuil('Merci de remplir le formulaire pour créer un compte');
           break;
        }
        case '/gestionCompte/principal': {
          this.ChangeTitleAcceuil('Gestion du compte');
          this.ChangeSousTitleAcceuil('Gestion de votre compte courant');
           break;
        }
        default: {
          this.ChangeTitleAcceuil('Bienvenue');
          this.ChangeSousTitleAcceuil('Bienvenue sure l\'application compteWebApp');
          break;
        }
     }
    }
  }

}
