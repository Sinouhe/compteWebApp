import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavMenuPrincipalComponent } from './nav-menu-principal.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutesCompteWebAppModule } from 'src/app/router/routes-compte-web-app/routes-compte-web-app.module';
import { PageNotFoundComponent } from 'src/app/router/pageNotFound/page-not-found/page-not-found.component';
import { APP_BASE_HREF } from '@angular/common';

describe('NavMenuPrincipalComponent', () => {
  let component: NavMenuPrincipalComponent;
  let fixture: ComponentFixture<NavMenuPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavMenuPrincipalComponent,
        PageNotFoundComponent,
      ],
      imports: [
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
    fixture = TestBed.createComponent(NavMenuPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
