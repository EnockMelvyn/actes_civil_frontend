import { TestBed } from '@angular/core/testing';

import { NaissanceService } from './naissance.service';

describe('NaissanceService', () => {
  let service: NaissanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NaissanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
