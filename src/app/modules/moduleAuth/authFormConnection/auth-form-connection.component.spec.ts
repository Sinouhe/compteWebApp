import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormConnectionComponent } from './auth-form-connection.component';
import { GeneralModule } from 'src/app/general.module';
import { AngularMaterialModule } from 'src/app/materialAngular.module';
import { AuthProfilDisplayComponent } from '../authProfileDisplay/auth-profil-display.component';
import { TypeDepenseComponent } from 'src/app/typeDepense/listTypeDepense/type-depense.component';
import { DepenseFixe } from 'src/app/class/depenseFixe';
import { DepenseFixeComponent } from 'src/app/typeDepense/depense-fixe/depense-fixe.component';
import { RoutesCompteWebAppModule } from 'src/app/router/routes-compte-web-app/routes-compte-web-app.module';
import { PageNotFoundComponent } from 'src/app/router/pageNotFound/page-not-found/page-not-found.component';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('AuthFormConnectionComponent', () => {
  let component: AuthFormConnectionComponent;
  let fixture: ComponentFixture<AuthFormConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          AuthFormConnectionComponent,
          AuthProfilDisplayComponent,
          TypeDepenseComponent,
          DepenseFixeComponent,
          PageNotFoundComponent,
        ],
      imports: [
        GeneralModule,
        AngularMaterialModule,
        RoutesCompteWebAppModule,
        BrowserAnimationsModule,
        FormsModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
