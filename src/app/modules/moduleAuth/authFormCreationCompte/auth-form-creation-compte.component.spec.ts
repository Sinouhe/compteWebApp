import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormCreationCompteComponent } from './auth-form-creation-compte.component';

describe('AuthFormCreationCompteComponent', () => {
  let component: AuthFormCreationCompteComponent;
  let fixture: ComponentFixture<AuthFormCreationCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthFormCreationCompteComponent ]
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
