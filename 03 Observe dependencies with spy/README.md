## In this demo we are going to work with `jasmine` and async code. We are going to create a service to retrieve the fake data, this service has mock data. We continue from previous demo, adding dependencies to our service.

## This `is for demostration purpose`. We `don't real test services against server` (fake or not). It's just for get used to async testing with jasmine.  

* We start from the previous demo code.

## Steps

### 1. Notice that right now we have two different `game.model` one comes from the `game` folder, and the other one comming from `api` folder. Let's say that we want to pass from one type to the other.

* Create a new folder `mapper` under `src`
* In this folder create `game.mapper.ts`

```typescript
import { Game } from '../game/game.model';
import { IGame } from '../api/game.model';

export interface IGameMapper {
    apiGameToGame(game:IGame): Game;
}

export const mapper: IGameMapper = {
    apiGameToGame: (game:IGame): Game => 
        (new Game(game.name, game.dateRelease.toString()))
};

``` 

### 2. Now we are going to create a new service that consumes this mapper, inside `game.service.ts`

```diff
import { Game } from '../game/game.model';
import { IGame } from './game.model';
+import { IGameMapper } from '../mapper/game.mapper';

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

+export const gameServiceWithMapping = (mapper: IGameMapper) => ({
+    getGames: (callback) => {
+        return new Promise((res, rej) => {
+            setTimeout(() => {
+                if (callback) {
+                    callback(API_GAMES.map(mapper.apiGameToGame));
+                }
+                res(API_GAMES.map(mapper.apiGameToGame));
+            }, 500);
+        });
+    }
});

```
### 3. Now we have this dependency in our service. What if we want to track what it's happening with the flow of our code and this related dependency? Well jasmine provide to us a mechanism to handle such type of things, `spies`.

* Let's open `game.service.spec.ts` and modified to watch spies in action.

```diff
import { gameService, gameServiceWithMapping } from './game.service';
+import { mapper } from '../mapper/game.mapper';

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
+
+    describe('gameServiceWithMapping', () => {
+        let _gameServiceWithMapping;
+        beforeEach(() => {
+            spyOn(mapper, 'apiGameToGame');
+            _gameServiceWithMapping = gameServiceWithMapping(mapper);
+        });
+
+        describe('when calls getGames feeding a callback', () => {
+            it('calls mapper.apiGameToGame', (done) => {
+                _gameServiceWithMapping.getGames((result) => {
+                    expect(mapper.apiGameToGame).toHaveBeenCalled();
+                    done();
+                });
+            });
+        });
+
+        describe('when calls getGames without feeding a callback', () => {
+            it('calls mapper.apiGameToGame', (done) => {
+                _gameServiceWithMapping.getGames()
+                    .then((result) => {
+                        expect(mapper.apiGameToGame).toHaveBeenCalled();
+                    done();
+                    });
+            });
+        });
+    });
});

```

* We create the `spy` over an object. 
* We have to tell `jasmine`, what function to track, in this case `apiGameToGame`
* We `expect` returns to us an instance of the `spy`, so we can query if the spied function has been called, using `toHaveBeenCalled`
* Run the tests using `npm test`
