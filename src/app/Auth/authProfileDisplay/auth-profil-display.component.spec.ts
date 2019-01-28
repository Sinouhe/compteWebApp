import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthProfilDisplayComponent } from './auth-profil-display.component';

describe('AuthProfilDisplayComponent', () => {
  let component: AuthProfilDisplayComponent;
  let fixture: ComponentFixture<AuthProfilDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthProfilDisplayComponent ]
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
