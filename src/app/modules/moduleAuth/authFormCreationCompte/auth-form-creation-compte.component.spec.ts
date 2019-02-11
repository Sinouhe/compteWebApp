import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormCreationCompteComponent } from './auth-form-creation-compte.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutesCompteWebAppModule } from 'src/app/router/routes-compte-web-app/routes-compte-web-app.module';
import { PageNotFoundComponent } from 'src/app/router/pageNotFound/page-not-found/page-not-found.component';
import { APP_BASE_HREF } from '@angular/common';

describe('AuthFormCreationCompteComponent', () => {
  let component: AuthFormCreationCompteComponent;
  let fixture: ComponentFixture<AuthFormCreationCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthFormCreationCompteComponent,
        PageNotFoundComponent,
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        RoutesCompteWebAppModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormCreationCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
