import { Game } from '../game/game.model';
import { IGame } from '../api/game.model';

export interface IGameMapper {
    apiGameToGame(game:IGame): Game;
}

export const mapper: IGameMapper = {
    apiGameToGame: (game:IGame): Game => 
        (new Game(game.name, game.dateRelease.toString()))
};
