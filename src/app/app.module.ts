import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ServiceModalBootstrapService } from './services/service-modal-bootstrap.service';
import { ModalComponent } from './outils/modal/modal.component';
import { AuthFormConnectionComponent } from './Auth/authFormConnection/auth-form-connection.component';
import { NavMenuPrincipalComponent } from './componentNav/nav-menu-principal/nav-menu-principal.component';
import { ToastAlertComponent } from './outils/toast-alert/toast-alert.component';
import { PageNotFoundComponent } from './router/pageNotFound/page-not-found/page-not-found.component';
import { RoutesCompteWebAppModule } from './router/pageNotFound/routes-compte-web-app/routes-compte-web-app.module';
import { ServiceToastMessageService } from './services/service-toast-message.service';
import { ServiceAuthentificationService } from './services/service-authentification.service';
import { AuthFormCreationCompteComponent } from './Auth/authFormCreationCompte/auth-form-creation-compte.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    AuthFormConnectionComponent,
    NavMenuPrincipalComponent,
    ToastAlertComponent,
    PageNotFoundComponent,
    AuthFormCreationCompteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RoutesCompteWebAppModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [
    ServiceModalBootstrapService,
    ServiceToastMessageService,
    ServiceAuthentificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
