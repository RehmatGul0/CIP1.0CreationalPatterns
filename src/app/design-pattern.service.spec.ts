import { TestBed } from '@angular/core/testing';

import { AbstractFactoryService } from './design-pattern.service';

describe('AbstractFactoryService', () => {
  let service: AbstractFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should transform', () => {
    expect(service.transformValues()).toEqual(['04/12/2021', '04/12/2021 11:31', 24, 86400]);
  });

  it('should cache previous state', () => {
    expect(service.updateStepStates()).toEqual({
      previousState: [
        { stepCode: '1.', state: 'Locked'},
        { stepCode: '2.', state: 'NA'}
      ],
      updatedState: [
        { stepCode: '1.', state: 'Unlocked'},
        { stepCode: '2.', state: 'NA'}
      ]
    });
  });
});
