import { Game } from '../game/game.model';
import { IGame } from './game.model';

const GAMES: Game[] = [
    new Game('Game A', new Date().toString()),
    new Game('Game B', new Date().toString()),
    new Game('Game C', new Date().toString()),
];

const API_GAMES: IGame[] = [
    {
        id: 1,
        dateRelease: new Date(),
        name: 'Game A'
    },
    {
        id: 2,
        dateRelease: new Date(),
        name: 'Game B'
    },
    {
        id: 3,
        dateRelease: new Date(),
        name: 'Game C'
    },
];

export const gameService = () => ({
    getGames: (callback) => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                if (callback) {
                    callback(GAMES);
                }
                res(GAMES);
            }, 500);
        });
    }
});
