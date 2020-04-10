import { TestBed } from '@angular/core/testing';

import { LeadSourceService } from './lead-source.service';

describe('LeadSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeadSourceService = TestBed.get(LeadSourceService);
    expect(service).toBeTruthy();
  });
});
