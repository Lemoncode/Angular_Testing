## In Angular we can have the component's template in a different file. In this demo we will handle this situation.

* Having the templates external is a problem for the test.

*  The TestBed.createComponent method is synchronous. But the Angular template compiler must read the external files from the file system before it can create a component instance. That's an asynchronous activity.

## Steps

### 1. Create a new component `seller`

```bash
$ng generate component seller
```

### 2. Let's have a look what `angular-cli` has built for us

```typescript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerComponent } from './seller.component';

describe('SellerComponent', () => {
  let component: SellerComponent;
  let fixture: ComponentFixture<SellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

## NOTES

### async

* The `async` function is one of the Angular testing utilities and has to be imported.

* It takes a parameterless function and returns a function which becomes the true argument to the beforeEach.

* Internally, `async` arranges for the body of the beforeEach to run in a special `async test zone` that hides the mechanics of asynchronous execution.

### compileComponents

* The TestBed.compileComponents method asynchronously compiles all the components configured in the testing module.

* When `compileComponents` completes, the external templates and css files have been "inlined" and `TestBed.createComponent` can create new instances of `component under test` synchronously.

* Calling compileComponents closes the current TestBed instance to further configuration. You cannot call any more TestBed configuration methods, not configureTestingModule nor any of the override... methods.

### sync beforeEach

* You can count on the test runner to wait for the first asynchronous `beforeEach` to finish before calling the second.

### 3. `compileComponents`, returns a `promise`, so if we want we can move the `sync beforeEach` there.

```diff
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerComponent } from './seller.component';

describe('SellerComponent', () => {
  let component: SellerComponent;
  let fixture: ComponentFixture<SellerComponent>;
+
+  const resolveComponentUnderTest = () => {
+    fixture = TestBed.createComponent(SellerComponent);
+    component = fixture.componentInstance;
+    fixture.detectChanges();
+  };
+
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerComponent ]
    })
    .compileComponents()
+    .then(resolveComponentUnderTest);
  }));

- beforeEach(() => {
-   fixture = TestBed.createComponent(SellerComponent);
-   component = fixture.componentInstance;
-   fixture.detectChanges();
- });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

