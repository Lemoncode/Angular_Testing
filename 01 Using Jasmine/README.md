## In this demo we are going to start to use `jasmine` for our unit tests.

* We start from the previous demo code.


## Steps

### 1. Create a new folder under `src` call `game`. 

### 2. In this folder we are going to place two files. Let's start by adding `game/game.model.ts`

```typescript
export class Game {
    name: string;
    dateRelease?: Date; 
    constructor(name: string, dateRelease?: string) {
        this.name = name
        if (dateRelease) {
            this.dateRelease = new Date(dateRelease);
        }
    }
}

```
### 2. Now we are going to add the spectections file for this unit test, in this demo we are going to follow the same aproach that Angular follows, place the unit tests close to the related code. Let's create `game/game.model.spec.ts`.

```typescript
import { Game } from './game.model';

describe('game.model', () => {
    
});
```
### 3. With this on place let's add our first test related with `game.model`. When we use the constructor we spec that the game is defined.

```diff
import { Game } from './game.model';

describe('game.model', () => {
+    describe('constructor', () => {
+        it('returns a defined game', () => {
+            const game = new Game('game');
+            expect(game).toBeDefined();
+        });
+    });
});

```
### 4. No we are going to register our new created test in `test/main.js`

```diff
require('../src/main.spec');
+require('../src/game/game.model.spec');

```
### 5. Run the test with `npm test` to watch results.

### 6. When we add more and more tests, we want to start with our environment without side effects of other tests. We can found repeating our selves over and over. `jasmine` provide some mechanism to avoid this.


```diff
import { Game } from './game.model';

describe('game.model', () => {
+    let game: Game;
+    beforeEach(() => {
+        game = new Game('game');
+    });
+    
    describe('constructor', () => {
        it('returns a defined game', () => {
-           game = new Game('game');
+           expect(game).toBeDefined();
        });
+
+        it('the new instance has a value for name property', () => {
+            expect(game.name).not.toBeNull();
+        });
    });
});

```
* Here we are using `beforeEach` to avoid boilerplate.
* `expect` method return to us some methods that increase the readibilty of code:
    * `toBeDefined`
    * `not`
    * `toBeNull`
* The interesting thing is that these are chainnable.
