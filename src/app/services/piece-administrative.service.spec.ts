import { TestBed } from '@angular/core/testing';

import { PieceAdministrativeService } from './piece-administrative.service';

describe('PieceAdministrativeService', () => {
  let service: PieceAdministrativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieceAdministrativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
