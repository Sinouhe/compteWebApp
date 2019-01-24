import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ServiceModalBootstrapService } from './services/service-modal-bootstrap.service';
import { ModalComponent } from './outils/modal/modal.component';
import { AuthFormConnectionComponent } from './Auth/auth-form-connection/auth-form-connection.component';
import { NavMenuPrincipalComponent } from './componentNav/nav-menu-principal/nav-menu-principal.component';
import { ToastAlertComponent } from './outils/toast-alert/toast-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    AuthFormConnectionComponent,
    NavMenuPrincipalComponent,
    ToastAlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ServiceModalBootstrapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
