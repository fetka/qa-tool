import { TestBed } from '@angular/core/testing';

import { TestCaseService } from './test-case.service';

xdescribe('TestCasesService', () => {
  let service: TestCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
