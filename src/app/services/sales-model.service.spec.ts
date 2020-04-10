import { TestBed } from '@angular/core/testing';

import { SalesModelService } from './sales-model.service';

describe('SalesModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesModelService = TestBed.get(SalesModelService);
    expect(service).toBeTruthy();
  });
});
