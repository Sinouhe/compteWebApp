import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDepenseComponent } from './type-depense.component';
import { PageNotFoundComponent } from 'src/app/router/pageNotFound/page-not-found/page-not-found.component';
import { GeneralModule } from 'src/app/general.module';
import { AngularMaterialModule } from 'src/app/materialAngular.module';
import { RoutesCompteWebAppModule } from 'src/app/router/routes-compte-web-app/routes-compte-web-app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('TypeDepenseComponent', () => {
  let component: TypeDepenseComponent;
  let fixture: ComponentFixture<TypeDepenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TypeDepenseComponent,
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
    fixture = TestBed.createComponent(TypeDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
