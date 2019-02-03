import { TestBed } from '@angular/core/testing';

import { GestionTitreService } from './gestion-titre.service';

describe('GestionTitreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionTitreService = TestBed.get(GestionTitreService);
    expect(service).toBeTruthy();
  });
});
