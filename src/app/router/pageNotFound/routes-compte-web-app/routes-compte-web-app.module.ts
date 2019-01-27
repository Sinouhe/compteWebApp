import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthFormConnectionComponent } from 'src/app/Auth/authFormConnection/auth-form-connection.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthFormCreationCompteComponent } from 'src/app/Auth/authFormCreationCompte/auth-form-creation-compte.component';

const routes = [
  {path: 'connection', component: AuthFormConnectionComponent},
  {path: 'creationCompte', component: AuthFormCreationCompteComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesCompteWebAppModule { }
