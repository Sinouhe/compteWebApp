import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavMenuPrincipalComponent } from './componentNav/nav-menu-principal/nav-menu-principal.component';
import { ToastAlertComponent } from './outils/toast-alert/toast-alert.component';
import { PageNotFoundComponent } from './router/pageNotFound/page-not-found/page-not-found.component';
import { RoutesCompteWebAppModule } from './router/routes-compte-web-app/routes-compte-web-app.module';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavMenuPrincipalComponent,
        ToastAlertComponent,
        PageNotFoundComponent,
      ],
      imports: [
        HttpClientModule,
        RoutesCompteWebAppModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
