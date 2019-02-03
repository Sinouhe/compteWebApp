import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseFixeComponent } from './depense-fixe.component';

describe('DepenseFixeComponent', () => {
  let component: DepenseFixeComponent;
  let fixture: ComponentFixture<DepenseFixeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepenseFixeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseFixeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
