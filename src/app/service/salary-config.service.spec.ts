import { TestBed } from '@angular/core/testing';

import { SalaryConfigService } from './salary-config.service';

describe('SalaryConfigService', () => {
  let service: SalaryConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
