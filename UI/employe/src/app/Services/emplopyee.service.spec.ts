import { TestBed } from '@angular/core/testing';

import { EmplopyeeService } from './emplopyee.service';

describe('EmplopyeeService', () => {
  let service: EmplopyeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmplopyeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
