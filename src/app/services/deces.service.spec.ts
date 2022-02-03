import { TestBed } from '@angular/core/testing';

import { DecesService } from './deces.service';

describe('DecesService', () => {
  let service: DecesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
