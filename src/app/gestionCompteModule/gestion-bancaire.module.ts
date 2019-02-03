import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GestionCompteComponent } from './gestion-compte/gestion-compte.component';
import { PageNotFoundComponent } from '../router/pageNotFound/page-not-found/page-not-found.component';
import { AuthGuard } from '../router/auth-guard.service';

const routes = [
  {path: 'principal', canActivate: [AuthGuard], component: GestionCompteComponent},
];

@NgModule({
  declarations: [GestionCompteComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionBancaireModule { }
