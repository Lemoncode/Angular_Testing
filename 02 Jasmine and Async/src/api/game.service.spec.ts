import { gameService } from './game.service';

describe('game.service.ts', () => {
    let _gameService;
    beforeEach(() => {
        _gameService = gameService();        
    });

    describe('when calls getGames feeding a callback', () => {
        it('returns a collection of games', (done) => {
            _gameService.getGames((result) => {
                expect(result.length).toBeGreaterThan(0);
                done();
            });
        });
    });

    describe('when calls getGames without feeding a callback', () => {
        it('returns a promise of games', (done) => {
            _gameService.getGames()
                .then((result) => {
                    expect(result.length).toBeGreaterThan(0);
                    done();
                });
        });
    });
});
