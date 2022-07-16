import { TestBed } from '@angular/core/testing';

import { RebuildTaskService } from './rebuild-task.service';

describe('RebuildTaskService', () => {
  let service: RebuildTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RebuildTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
