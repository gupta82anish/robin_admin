import { TestBed, inject } from '@angular/core/testing';

import { SubnavService } from './subnav.service';

describe('SubnavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubnavService]
    });
  });

  it('should be created', inject([SubnavService], (service: SubnavService) => {
    expect(service).toBeTruthy();
  }));
});
