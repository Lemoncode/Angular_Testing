## In this demo we are going to get to the basic topics to understand the Angular testing environement.

## Steps.

### 1. Let's start by adding a new component we will use `angular-cli`.

```bash
$ ng generate component geme-detail
```
* Remove `.css` and `.html` files, we don't need them for this demo.

### 2. Open `game-detail.component.ts`, we are going to make some modifications here.

```diff
-import { Component, OnInit } from '@angular/core';
+import { Component } from '@angular/core';

@Component({
  selector: 'app-game-detail',
-  templateUrl: './game-detail.component.html',
-  styleUrls: ['./game-detail.component.css']
+   template: `
+    <h1>{{title}}</h1>
+    <h2>{{release}}</h2>
+  `
})
+export class GameDetailComponent {
-export class GameDetailComponent implements OnInit {
+  title = 'Title';
+  release = Date.now().toLocaleString();
-  constructor() { }
-
-  ngOnInit() {
-  }
-
}

```
### 3. Angular cli has generated the boilerplate for tests, but we are going to remove some code from here.

```diff
-import { async, ComponentFixture, TestBed } from '@angular/core/testing';
+import { ComponentFixture, TestBed } from '@angular/core/testing';
+import { By } from '@angular/platform-browser';
+import { DebugElement } from '@angular/core';

import { GameDetailComponent } from './game-detail.component';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;

-  beforeEach(async(() => {
-    TestBed.configureTestingModule({
-      declarations: [ GameDetailComponent ]
-    })
-    .compileComponents();
-  }));
-
-  beforeEach(() => {
-    fixture = TestBed.createComponent(GameDetailComponent);
-    component = fixture.componentInstance;
-    fixture.detectChanges();
-  });
-
-  it('should create', () => {
-    expect(component).toBeTruthy();
-  });
});

```
* Our code should look like this:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GameDetailComponent } from './game-detail.component';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;
});
```

### 4. Let's add our own `beforeEach`.

```diff
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GameDetailComponent } from './game-detail.component';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;
+  let debugElement: DebugElement;
+  let element: HTMLElement;
+
+  beforeEach(() => {
+    TestBed.configureTestingModule({
+      declarations: [GameDetailComponent]
+    });
+
+    fixture = TestBed.createComponent(GameDetailComponent);
+    component = fixture.componentInstance;
+
+    debugElement = fixture.debugElement.query(By.css('h1'));
+    element = debugElement.nativeElement;
  });
});

```

* TestBed.configureTestingModule
    * configureTestingModule, this method allows override providers, directives, pipes,
      modules, of the test injector, which are define in test_injectors.js
* TestBed.createComponent(CardComponent)
    *  Creates a fixture from the type of the component
* fixture.componentInstance
    * The instance of the root component class
* fixture.debugElement.query(By.css('h1'))
    * From fixture grab a particular element from component
* de.nativeElement
    * Get the HTML element    

## NOTES: 

### TestBed.

* `TestBed`.  It creates an Angular testing module—an `@NgModule` class—that you configure with the configureTestingModule method to produce the module environment for the class you want to test. In effect, you detach the tested component from its own application module and re-attach it to a dynamically-constructed Angular test module tailored specifically for this battery of tests.

* The `configureTestingModule` method takes an `@NgModule`-like metadata object. The metadata object can have most of the properties of a normal NgModule.

* Call `configureTestingModule` within a `beforeEach` so that TestBed can reset itself to a base state before each test runs.

### createComponent

* After configuring TestBed, you tell it to create an instance of the `component-under-test`.

* The `createComponent` method returns a `ComponentFixture`, a handle on the test environment surrounding the created component. The fixture provides access to the component instance itself and to the DebugElement, which is a handle on the component's DOM element.

### debugElement

* So the fixture has access to DOM throw `debugElement`, we use it to query the DOM, and find values.

* The query method takes a predicate function and searches the fixture's entire DOM tree for the first element that satisfies the predicate. The result is a different DebugElement, one associated with the matching DOM element.

### By

* The By class is an Angular testing utility that produces useful predicates. Its By.css static method produces a standard CSS selector predicate.

### 5. Let's add a couple of tests.

```diff
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GameDetailComponent } from './game-detail.component';
import { EventListener } from '@angular/core/src/debug/debug_node';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameDetailComponent]
    });

    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;

    debugElement = fixture.debugElement.query(By.css('h1'));
    element = debugElement.nativeElement;
  });

+  it('should display title', () => {
+    fixture.detectChanges();
+    expect(element.textContent).toContain(component.title);
+  });
+
+  it('should display a different title', () => {
+    const newTitle = 'Other';
+    component.title = newTitle;
+    fixture.detectChanges();
+    expect(element.textContent).toContain(newTitle);
+  });
});

```
## NOTES.

### detectChanges

* Each test tells Angular when to perform change detection by calling fixture.detectChanges(). The first test does so immediately, triggering data binding and propagation of the title property to the DOM element.

* The second test changes the component's title property and only then calls fixture.detectChanges(); the new value appears in the DOM element.

* In production change detection kicks in automatically.
