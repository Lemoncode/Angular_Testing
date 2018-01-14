import { TestBed, inject } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService]
    });
  });

  xit('should ...', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));
});
