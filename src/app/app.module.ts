import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ModalComponent } from './outils/modal/modal.component';
import { NavMenuPrincipalComponent } from './componentNav/nav-menu-principal/nav-menu-principal.component';
import { ToastAlertComponent } from './outils/toast-alert/toast-alert.component';
import { PageNotFoundComponent } from './router/pageNotFound/page-not-found/page-not-found.component';
import { AngularMaterialModule } from './materialAngular.module';
import { GeneralModule } from './general.module';
import { RoutesCompteWebAppModule } from './router/routes-compte-web-app/routes-compte-web-app.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    NavMenuPrincipalComponent,
    ToastAlertComponent,
    PageNotFoundComponent,
  ],
  imports: [
    GeneralModule,
    AngularMaterialModule,
    RoutesCompteWebAppModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
