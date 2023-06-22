import { TestBed } from '@angular/core/testing';

import { CreatureServiceService } from './creature-service.service';

describe('CreatureServiceService', () => {
  let service: CreatureServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatureServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
