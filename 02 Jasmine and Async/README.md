## In this demo we are going to work with `jasmine` and async code. We are going to create a service to retrieve the fake data, this service has mock data.

## This `is for demostration purpose`. We `don't real test services against server` (fake or not). It's just for get used to async testing with jasmine.  

* We start from the previous demo code.

## Steps

### 1. Create a new folder under `src` call `api`. 

* Let's create `src/api/game.model.ts`

```typescript
export interface IGame {
    name: string;
    id: number;
    dateRelease: Date;
}
```

* And `src/api/game.service.ts`

```typescript
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

```
### 2. Now we can add a new `test` for this service.

```typescript
import { gameService } from './game.service';

describe('game.service.ts', () => {
});

```

### 3. We can notice that our service can handle a promise style or callback style. Let's first create test for a `callback style`


```diff
import { gameService } from './game.service';

describe('game.service.ts', () => {
+    let _gameService;
+    beforeEach(() => {
+        _gameService = gameService();        
+    });
+
+    describe('when calls getGames feeding a callback', () => {
+        it('returns a collection of games', (done) => {
+            _gameService.getGames((result) => {
+                expect(result.length).toBeGreaterThan(0);
+                done();
+            });
+        });
+    });
+
+    describe('when calls getGames without feeding a callback', () => {
+        it('returns a promise of games', (done) => {
+            _gameService.getGames()
+                .then((result) => {
+                    expect(result.length).toBeGreaterThan(0);
+                    done();
+                });
+        });
+    });
});

```
### 4. Now we can add to `test/main.js`

```diff
require('../src/main.spec');
require('../src/game/game.model.spec');
+require('../src/api/game.service.spec');
```
* Run the tests `npm test`
