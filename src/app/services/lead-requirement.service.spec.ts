import { TestBed } from '@angular/core/testing';

import { LeadRequirementService } from './lead-requirement.service';

describe('LeadRequirementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeadRequirementService = TestBed.get(LeadRequirementService);
    expect(service).toBeTruthy();
  });
});
