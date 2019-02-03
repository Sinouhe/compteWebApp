import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceAuthentificationService } from '../services/service-authentification.service';
import { Injectable } from '@angular/core';
import { GestionTitreService } from 'src/app/router/gestion-titre.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _ServiceAuthentificationService: ServiceAuthentificationService,
              private _gestionTitreService: GestionTitreService,
              private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem(environment.authTokenName)) {
      return true;
    }
    this._router.navigate(['/connection']);
  }
}
