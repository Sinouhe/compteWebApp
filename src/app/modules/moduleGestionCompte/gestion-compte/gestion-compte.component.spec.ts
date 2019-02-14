import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCompteComponent } from './gestion-compte.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/materialAngular.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GestionCompteComponent', () => {
  let component: GestionCompteComponent;
  let fixture: ComponentFixture<GestionCompteComponent>;
  let date: Date;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GestionCompteComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    date = new Date();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starting date correct', () => {
    expect(component.anneeEnCours).toBe(date.getFullYear());
    expect(component.moisEnCoursEntier).toBe(date.getMonth() + 1);
    expect(component.moisEnCoursChaine).toBe(component.monthNames[date.getMonth()]);
  });

  it('test year + 1 ', () => {
    component.anneeSuivante();
    expect(component.anneeEnCours).toBe(date.getFullYear() + 1);
  });

  it('test year - 1 ', () => {
    component.anneePrecedente();
    expect(component.anneeEnCours).toBe(date.getFullYear() - 1);
  });

  it('test month + 1 ', () => {
    component.moisSuivant();
    date.setMonth(date.getMonth() + 1);
    expect(component.moisEnCoursEntier).toBe(date.getMonth() + 1 );
    expect(component.moisEnCoursChaine).toBe(component.monthNames[date.getMonth()]);
  });


  it('test month - 1 ', () => {
    component.moisPrecedent();
    date.setMonth(date.getMonth() - 1);
    expect(component.moisEnCoursEntier).toBe(date.getMonth() + 1);
    expect(component.moisEnCoursChaine).toBe(component.monthNames[date.getMonth()]);
  });

});
