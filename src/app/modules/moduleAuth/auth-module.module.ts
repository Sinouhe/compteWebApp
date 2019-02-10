import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormConnectionComponent } from './authFormConnection/auth-form-connection.component';
import { AuthFormCreationCompteComponent } from './authFormCreationCompte/auth-form-creation-compte.component';
import { AuthGuard } from '../../router/auth-guard.service';
import { AuthProfilDisplayComponent } from './authProfileDisplay/auth-profil-display.component';
import { RouterModule } from '@angular/router';
import { GeneralModule } from 'src/app/general.module';
import { AngularMaterialModule } from 'src/app/materialAngular.module';
import { DepenseFixeComponent } from '../../typeDepense/depense-fixe/depense-fixe.component';
import { TypeDepenseComponent } from '../../typeDepense/listTypeDepense/type-depense.component';

const routes = [
  {path: 'connection', component: AuthFormConnectionComponent},
  {path: 'creationCompte', component: AuthFormCreationCompteComponent},
  {path: 'profil', canActivate: [AuthGuard], component: AuthFormConnectionComponent},
];

@NgModule({
  declarations: [
    AuthFormConnectionComponent,
    AuthFormCreationCompteComponent,
    AuthProfilDisplayComponent,
    DepenseFixeComponent,
    TypeDepenseComponent

  ],
  imports: [
    RouterModule.forChild(routes),
    AngularMaterialModule,
    GeneralModule,
    CommonModule
  ],
  exports: [RouterModule]
})
export class AuthModuleModule { }
