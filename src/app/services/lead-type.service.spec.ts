import { TestBed } from '@angular/core/testing';

import { LeadTypeService } from './lead-type.service';

describe('LeadTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeadTypeService = TestBed.get(LeadTypeService);
    expect(service).toBeTruthy();
  });
});
