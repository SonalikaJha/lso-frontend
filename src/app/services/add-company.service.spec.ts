import { TestBed } from '@angular/core/testing';

import { AddCompanyService } from './add-company.service';

describe('AddCompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddCompanyService = TestBed.get(AddCompanyService);
    expect(service).toBeTruthy();
  });
});
