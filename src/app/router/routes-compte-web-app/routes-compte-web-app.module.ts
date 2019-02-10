import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../pageNotFound/page-not-found/page-not-found.component';

const routes = [
  {path: '', loadChildren: '../../modules/moduleAuth/auth-module.module#AuthModuleModule'},
  {path: 'gestionCompte', loadChildren: '../../modules/moduleGestionCompte/gestion-bancaire.module#GestionBancaireModule'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesCompteWebAppModule { }
