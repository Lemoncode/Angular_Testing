import { gameService, gameServiceWithMapping } from './game.service';
import { mapper } from '../mapper/game.mapper';

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

    describe('gameServiceWithMapping', () => {
        let _gameServiceWithMapping;
        beforeEach(() => {
            spyOn(mapper, 'apiGameToGame');
            _gameServiceWithMapping = gameServiceWithMapping(mapper);
        });

        describe('when calls getGames feeding a callback', () => {
            it('calls mapper.apiGameToGame', (done) => {
                _gameServiceWithMapping.getGames((result) => {
                    expect(mapper.apiGameToGame).toHaveBeenCalled();
                    done();
                });
            });
        });

        describe('when calls getGames without feeding a callback', () => {
            it('calls mapper.apiGameToGame', (done) => {
                _gameServiceWithMapping.getGames()
                    .then((result) => {
                        expect(mapper.apiGameToGame).toHaveBeenCalled();
                    done();
                    });
            });
        });
    });
});
