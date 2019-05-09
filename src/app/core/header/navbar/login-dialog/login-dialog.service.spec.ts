/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginDialogService } from './login-dialog.service';

describe('Service: LoginDialog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginDialogService]
    });
  });

  it('should ...', inject([LoginDialogService], (service: LoginDialogService) => {
    expect(service).toBeTruthy();
  }));
});
