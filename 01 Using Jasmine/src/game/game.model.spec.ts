import { Game } from './game.model';

describe('game.model', () => {
    let game: Game;
    beforeEach(() => {
        game = new Game('game');
    });
    
    describe('constructor', () => {
        it('returns a defined game', () => {
            expect(game).toBeDefined();
        });

        it('the new instance has a value for name property', () => {
            expect(game.name).not.toBeNull();
        });
    });
});
