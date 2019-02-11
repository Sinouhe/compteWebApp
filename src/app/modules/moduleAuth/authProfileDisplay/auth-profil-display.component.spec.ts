import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthProfilDisplayComponent } from './auth-profil-display.component';
import { RoutesCompteWebAppModule } from 'src/app/router/routes-compte-web-app/routes-compte-web-app.module';
import { AngularMaterialModule } from 'src/app/materialAngular.module';
import { GeneralModule } from 'src/app/general.module';
import { APP_BASE_HREF } from '@angular/common';
import { PageNotFoundComponent } from 'src/app/router/pageNotFound/page-not-found/page-not-found.component';
import { TypeDepenseComponent } from 'src/app/typeDepense/listTypeDepense/type-depense.component';
import { DepenseFixeComponent } from 'src/app/typeDepense/depense-fixe/depense-fixe.component';

describe('AuthProfilDisplayComponent', () => {
  let component: AuthProfilDisplayComponent;
  let fixture: ComponentFixture<AuthProfilDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthProfilDisplayComponent,
        PageNotFoundComponent,
        TypeDepenseComponent,
        DepenseFixeComponent
      ],
      imports: [
        GeneralModule,
        AngularMaterialModule,
        RoutesCompteWebAppModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthProfilDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
