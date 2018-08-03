import { TestBed, inject } from '@angular/core/testing';

import { TestService } from './test.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('TestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        TestService,
        HttpClient,
      ],
    });
  });

  it('should be created', inject([TestService], (service: TestService) => {
    expect(service).toBeTruthy();
  }));
});
