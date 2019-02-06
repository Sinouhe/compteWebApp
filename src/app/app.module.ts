import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ModalComponent } from './outils/modal/modal.component';
import { AuthFormConnectionComponent } from './Auth/authFormConnection/auth-form-connection.component';
import { NavMenuPrincipalComponent } from './componentNav/nav-menu-principal/nav-menu-principal.component';
import { ToastAlertComponent } from './outils/toast-alert/toast-alert.component';
import { PageNotFoundComponent } from './router/pageNotFound/page-not-found/page-not-found.component';
import { AuthFormCreationCompteComponent } from './Auth/authFormCreationCompte/auth-form-creation-compte.component';
import { AuthProfilDisplayComponent } from './Auth/authProfileDisplay/auth-profil-display.component';
import { TypeDepenseComponent } from './typeDepense/listTypeDepense/type-depense.component';
import { DepenseFixeComponent } from './typeDepense/depense-fixe/depense-fixe.component';
import { AngularMaterialModule } from './materialAngular.module';
import { GeneralModule } from './general.module';
import { RoutesCompteWebAppModule } from './router/routes-compte-web-app/routes-compte-web-app.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    AuthFormConnectionComponent,
    NavMenuPrincipalComponent,
    ToastAlertComponent,
    PageNotFoundComponent,
    AuthFormCreationCompteComponent,
    AuthProfilDisplayComponent,
    TypeDepenseComponent,
    DepenseFixeComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    GeneralModule,
    AngularMaterialModule,
    RoutesCompteWebAppModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
