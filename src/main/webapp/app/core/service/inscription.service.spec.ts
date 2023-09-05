import { TestBed } from '@angular/core/testing';

import { InscriptionService } from '../../shared/service/inscription.service';

describe('InscriptionService', () => {
  let service: InscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
