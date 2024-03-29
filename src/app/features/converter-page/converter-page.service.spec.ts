import { TestBed } from '@angular/core/testing';

import { ConverterPageService } from './converter-page.service';

describe('ConverterPageService', () => {
  let service: ConverterPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConverterPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
