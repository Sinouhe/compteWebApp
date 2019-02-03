import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthFormConnectionComponent } from 'src/app/Auth/authFormConnection/auth-form-connection.component';
import { PageNotFoundComponent } from '../pageNotFound/page-not-found/page-not-found.component';
import { AuthFormCreationCompteComponent } from 'src/app/Auth/authFormCreationCompte/auth-form-creation-compte.component';
import { AuthGuard } from '../auth-guard.service';

const routes = [
  {path: 'connection', component: AuthFormConnectionComponent},
  {path: 'creationCompte', component: AuthFormCreationCompteComponent},
  {path: 'profil', canActivate: [AuthGuard], component: AuthFormConnectionComponent},
  {path: 'gestionCompte', loadChildren: '../../gestionCompteModule/gestion-bancaire.module#GestionBancaireModule'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesCompteWebAppModule { }
