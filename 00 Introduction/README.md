## In this demo we are going to set an environment to work with `TypeScript` and `Jasmine`.

## Steps

### 1. Let's start by adding the dependencies for this project.

* NOTE: Create a new `package.json`. For this use `npm init` from bash or console.

```bash
$ npm i @types/jasmine @types/node awesome-typescript-loader jasmine karma karma-chrome-launcher karma-jasmine karma-sourcemap-loader karma-webpack typescript webpack -D
```

### 2. Now let's create a new folder for our application content `src`.

### 3. Before adding files to this folder, let's create another file at the root level `webpack.config.js` 

```javascript
const path = require('path');

module.exports = () => {
    return {
        entry: {
            main: './src/main.ts'
        },
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].bundle.js'
        },
        resolve: {
            extensions: ['.js', '.ts']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader'
                    ]
                }
            ]
        },
        devtool: 'inline-source-map'
    }
}

```
### 4. To get full advantage of `typescript`, we are going to add a new file `tsconfig.json`.

```json
{
    "compilerOptions": {
        "module": "es2015",
        "target": "es5",
        "noImplicitAny": false,
        "sourceMap": true,
        "moduleResolution": "node",
        "lib": [
            "es2015", "dom"
        ],
        "types": [
            "node",
            "jasmine"
        ]
    },
    "awesomeTypeScriptLoaderOptions": {
        "useWebpackText": true
    }
}

```

* This file tells the transpiler the way we want to get typescript transpiled.

### 5. Let's check our `webpack` configuration. Add `main.ts` to `src` folder.

```typescript
console.log('Hello!');

```
* Open `package.json` and add a new entry as follows:

```diff 
{
  "name": "setting_environment",
  "version": "1.0.0",
  "description": "Create an environment for testing with TS and Jasmine",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+    "build": "webpack"
  },
  "keywords": [
    "TS",
    "Jasmine"
  ],
  "author": "Jaime Salas",
  "license": "MIT",
  "devDependencies": {
    "@types/jasmine": "^2.8.4",
    "@types/node": "^9.3.0",
    "awesome-typescript-loader": "^3.4.1",
    "jasmine": "^2.8.0",
    "karma": "^2.0.0",
    "karma-chrome-launcher": "^2.2.0",
    "karma-jasmine": "^1.1.1",
    "karma-sourcemap-loader": "^0.3.7",
    "karma-webpack": "^2.0.9",
    "typescript": "^2.6.2",
    "webpack": "^3.10.0"
  }
}

```
* Now from `bash`

```bash
npm run build
```
* A new `main.bundel.js` file has to be added to the `dist` folder, at the bottom of this file must appear the code that we have written in `main.ts`

### 6. Now with this on place we are going to create our `karma.conf.js` at the root folder level

```javascript
module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            { pattern: 'test/main.js', watched: false } // TODO: Remove watched property?
        ],
        exclude: [],
        preprocessors:{
            'test/main.js': ['webpack', 'sourcemap']
        },
        webpack: require('./webpack.config')({ env: 'test' }),
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    });
}

```
### 7. Now with in place we have to create a new folder `test` at the same level as `src`, that will host our transpiled tests. Here place `main.js`.


### 8. Now to check that everything it's working as we expected, let's create our first test. Add `src/main.spec.ts`

```typescript
describe('main test', () => {
    it('always assert', () => {
        expect(0).toBe(0);
    });
});
``` 
* Now with this on place let's add an entry on `package.json` that run our tests.

```diff
{
  "name": "setting_environment",
  "version": "1.0.0",
  "description": "Create an environment for testing with TS and Jasmine",
  "main": "index.js",
  "scripts": {
-   "test": "echo \"Error: no test specified\" && exit 1",
+   "test": "karma start",
    "build": "webpack"
  },
  "keywords": [
    "TS",
    "Jasmine"
  ],
  "author": "Jaime Salas",
  "license": "MIT",
  "devDependencies": {
    "@types/jasmine": "^2.8.4",
    "@types/node": "^9.3.0",
    "awesome-typescript-loader": "^3.4.1",
    "jasmine": "^2.8.0",
    "karma": "^2.0.0",
    "karma-chrome-launcher": "^2.2.0",
    "karma-jasmine": "^1.1.1",
    "karma-sourcemap-loader": "^0.3.7",
    "karma-webpack": "^2.0.9",
    "typescript": "^2.6.2",
    "webpack": "^3.10.0"
  }
}

```
* In `test/main.js`, we have to require our first testing file.

```diff
+ require('../src/main.spec');
```
* Run and test that everything it's working.
