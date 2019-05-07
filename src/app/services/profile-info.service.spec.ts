/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfileInfoService } from './profile-info.service';

describe('Service: ProfileInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileInfoService]
    });
  });

  it('should ...', inject([ProfileInfoService], (service: ProfileInfoService) => {
    expect(service).toBeTruthy();
  }));
});
