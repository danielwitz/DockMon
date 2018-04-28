import { TestBed, inject } from '@angular/core/testing';

import { HostActionsService } from './host-actions.service';

describe('HostActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HostActionsService]
    });
  });

  it('should be created', inject([HostActionsService], (service: HostActionsService) => {
    expect(service).toBeTruthy();
  }));
});
