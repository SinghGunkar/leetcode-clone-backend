import { TestBed } from '@angular/core/testing';

import { ServerApiATService } from './server-api-at.service';

describe('ServerApiATService', () => {
  let service: ServerApiATService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerApiATService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
