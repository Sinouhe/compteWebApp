import { TestBed } from '@angular/core/testing';

import { ServiceModalBootstrapService } from './service-modal-bootstrap.service';

describe('ServiceModalBootstrapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceModalBootstrapService = TestBed.get(ServiceModalBootstrapService);
    expect(service).toBeTruthy();
  });
});
