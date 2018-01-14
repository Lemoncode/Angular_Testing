## In this demo we aree going to show how we can deal with http services.

* Reference: // https://medium.com/@paynoattn/simple-observable-unit-testing-in-angular2-43c4f4a0bfe2

## Steps we have to add a litle bit of infraestructure.

### 1. We start by adding new dependencies to our project, from the root folder of our project:

```bash
$ npm install express --save
```

### 2. Create a new folder under `testing-guide` call `server`. And place here the following `server/index.js`

```javascript
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/games', (req, res) => {
  res.json([
    {
      title: 'sonic'
    },
    {
      title: 'mario'
    },
  ])
});

const port = 3000;
app.listen(port);
console.log(`Server running on: ${port}`);

```
### 3. Create a new configuration file for a proxy, `proxy.conf.json`, place it at the same level as the `package.json`

```json
{
    "/api": {
        "target": "http://localhost:3000",
        "secure": false
    }
}

```
### 4. Now we have to modify the way our app starts, so can run this server. We have to modify the `package.json`

```diff
{
  "name": "testing-guide",
  "version": "0.0.0",
  "license": "MIT",
  "scripts": {
    "ng": "ng",
-    "start": "ng serve",
+    "start": "node ./server/index.js | ng serve --proxy-config proxy.conf.json",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  "private": true,
  "dependencies": {
    "@angular/common": "^4.0.0",
    "@angular/compiler": "^4.0.0",
    "@angular/core": "^4.0.0",
    "@angular/forms": "^4.0.0",
    "@angular/http": "^4.0.0",
    "@angular/platform-browser": "^4.0.0",
    "@angular/platform-browser-dynamic": "^4.0.0",
    "@angular/router": "^4.0.0",
    "core-js": "^2.4.1",
    "express": "^4.16.2",
    "rxjs": "^5.1.0",
    "zone.js": "^0.8.4"
  },
  "devDependencies": {
    "@angular/cli": "1.0.2",
    "@angular/compiler-cli": "^4.0.0",
    "@types/jasmine": "2.5.38",
    "@types/node": "~6.0.60",
    "codelyzer": "~2.0.0",
    "jasmine-core": "~2.5.2",
    "jasmine-spec-reporter": "~3.2.0",
    "karma": "~1.4.1",
    "karma-chrome-launcher": "~2.0.0",
    "karma-cli": "~1.0.1",
    "karma-jasmine": "~1.1.0",
    "karma-jasmine-html-reporter": "^0.2.2",
    "karma-coverage-istanbul-reporter": "^0.2.0",
    "protractor": "~5.1.0",
    "ts-node": "~2.0.0",
    "tslint": "~4.5.0",
    "typescript": "~2.2.0"
  }
}

```
### 5. Now we are going to create a new service `game.service.ts`

```bash
$ng generate service game
```

### 6. Ensure that we are using `HttpClientModule` instead `HttpModule`

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
-import { HttpModule } from '@angular/http';
+import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { SellerComponent } from './seller/seller.component';

@NgModule({
  declarations: [
    AppComponent,
    GameDetailComponent,
    SellerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
-    HttpModule
+    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
### 7. With this in place let's change our `game.service.ts`, so it can retrieve the games from server.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface Game {
  title: string;
}

@Injectable()
export class GameService {

  constructor(private http: HttpClient) { }

  fetchGames(): Observable<Game[]> {
    return this.http.get<Game[]>('/api/games');
  }
}

```
### 8. Now we are going to use this service in our `app.component.*`

```typescript
import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  catalog: string[];
  constructor(private gameService: GameService) {}
  ngOnInit(): void {
    this.gameService.fetchGames()
      .subscribe((r) => {
        this.catalog = r.map(s => s.title);
      });
  }
}

```

```html
<ul>
  <li *ngFor="let title of catalog">
    {{title}}
  </li>
</ul>

```

```diff app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { SellerComponent } from './seller/seller.component';
+import { GameService } from './game.service';

@NgModule({
  declarations: [
    AppComponent,
    GameDetailComponent,
    SellerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
+    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
### 9. Now it's time to change `app.component.spec.ts`

```diff
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

-  it(`should have as title 'app works!'`, async(() => {
-    const fixture = TestBed.createComponent(AppComponent);
-    const app = fixture.debugElement.componentInstance;
-    expect(app.title).toEqual('app works!');
-  }));
-
-  it('should render title in a h1 tag', async(() => {
-    const fixture = TestBed.createComponent(AppComponent);
-    fixture.detectChanges();
-    const compiled = fixture.debugElement.nativeElement;
-    expect(compiled.querySelector('h1').textContent).toContain('app works!');
-  }));
});

```
### 10. Now our `app.component.ts` has a dependency with this `http service`. Let's see how can we handle this, the `app.component.spec.ts`

```typescript
import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { GameService, Game } from './game.service';

import { AppComponent } from './app.component';
import { Observable } from 'rxjs/Observable';
import { ComponentFixture } from '@angular/core/testing';

const mockData = [
  {
    title: 'sonic'
  }
];
class DataStub {
  public fetchGames(): Observable<Game[]> {
    return Observable.create(observer => {
      observer.next(mockData);
      observer.complete();
    });
  }
}

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let dataStub: DataStub;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [
        AppComponent
      ],
    })
    .overrideComponent(AppComponent, {
      set: {
        providers: [
          { provide: GameService, useClass: DataStub }
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      dataStub = fixture.debugElement.injector.get(GameService);
    });
  }));

  it('should load the games on init', fakeAsync(() => {
    const spy = spyOn(dataStub, 'fetchGames')
      .and.returnValue(
        Observable.create(observer => {
          observer.next(mockData);
          observer.complete();
        })
      );
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.catalog).toEqual(['sonic']);
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});


```
