## In this demo we are going to investigate how to handle the dependencies in our components.

## Steps.

### 1. First we are going to create a new service `currency`

```bash
ng generate service currency
```
* Notice that the service has been created at root `app`, if you use the bash from the root project folder one level over `src`

* The `currency.service.ts` has this look

```typescript
import { Injectable } from '@angular/core';

export enum Country { USA, Japan, Spain }

@Injectable()
export class CurrencyService {
  currencies: Map<number, string>;
  constructor() {
    this.currencies = new Map<number, string>([
      [Country.USA, 'Dollar'],
      [Country.Japan, 'Yen'],
      [Country.Spain, 'Euro']
    ]);
  }

  getCurrencyByCountry(country: Country) {
    return this.currencies.get(country);
  }
}

```

### 2. We are going to use `currency.service` in our `seller.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { CurrencyService, Country } from '../currency.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  country: Country;
  bill: string;
  constructor(private currencyService: CurrencyService) { }

  setCountry(country: Country) {
    this.country = country;
  }

  getFormattedBill(amount: number) {
    this.bill = (this.country) ?
      `${amount}, ${this.currencyService.getCurrencyByCountry(this.country)}` :
      'not set';
  }

  ngOnInit() {
  }

}

```

```html
<p>
  seller works!
</p>
<h2>{{bill}}</h2>
```

### 3. If we run the tests, we do not have touch anything in the tests write before for `seller.component.ts`, so we have a broken test, so let's try to fix this.

```diff
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerComponent } from './seller.component';
+import { CurrencyService } from '../currency.service';

describe('SellerComponent', () => {
  let component: SellerComponent;
  let fixture: ComponentFixture<SellerComponent>;

  const resolveComponentUnderTest = () => {
    fixture = TestBed.createComponent(SellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerComponent ],
+      providers: [CurrencyService]
    })
    .compileComponents()
    .then(resolveComponentUnderTest);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```
### 4. If we leave this way we will get the real service to test our component. Although, could be interesting in some cases, we will use a double of this service.

```diff
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerComponent } from './seller.component';
import { CurrencyService, Country } from '../currency.service';

describe('SellerComponent', () => {
  let component: SellerComponent;
  let fixture: ComponentFixture<SellerComponent>;
+  const currencyServiceDouble = {
+    getCurrencyByCountry: (country: Country) => 'test',
+  };

  const resolveComponentUnderTest = () => {
    fixture = TestBed.createComponent(SellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerComponent ],
      providers: [
+        { provide: CurrencyService, useValue: currencyServiceDouble }
      ]
    })
    .compileComponents()
    .then(resolveComponentUnderTest);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

## NOTES

### Provide service test doubles

* The purpose of the spec is to test the component, not the service, and real services can be trouble.

### Get injected services

* The component needs access to the double service.

* Angular has a hierarchical injection system. There can be injectors at multiple levels, from the root injector created by the TestBed down through the component tree.

* The safest way to get the injected service, the way that always works, is to get it from the injector of the component-under-test. The component injector is a property of the fixture's DebugElement.

### Always get the service from an injector
 * Do not reference the `serviceDouble` object that's provided to the testing module in the body of your test. It does not work! The `service instance` injected into the component is a completely different object, a clone of the provided `serviceDouble`.

### 5. Now let's add a tests that implies the use of the provided double.

```diff
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
+import { DebugElement } from '@angular/core';
+import { By } from '@angular/platform-browser';

import { SellerComponent } from './seller.component';
import { CurrencyService, Country } from '../currency.service';

describe('SellerComponent', () => {
  let component: SellerComponent;
  let fixture: ComponentFixture<SellerComponent>;
  const currencyServiceDouble = {
    getCurrencyByCountry: (country: Country) => 'test',
  };

  const resolveComponentUnderTest = () => {
    fixture = TestBed.createComponent(SellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerComponent ],
      providers: [
        { provide: CurrencyService, useValue: currencyServiceDouble }
      ]
    })
    .compileComponents()
    .then(resolveComponentUnderTest);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
+
+  it('should return test value when country is set', () => {
+    component.setCountry(Country.Japan);
+    component.getFormattedBill(1000);
+    fixture.detectChanges();
+    const debugElement: DebugElement = fixture.debugElement.query(By.css('h2'));
+    const element: HTMLElement = debugElement.nativeElement;
+    const content = element.textContent;
+    expect(content).toContain('1000, test');
+  });
+
+  it('should return not set value when country is not set', () => {
+    component.getFormattedBill(1000);
+    fixture.detectChanges();
+    const debugElement: DebugElement = fixture.debugElement.query(By.css('h2'));
+    const element: HTMLElement = debugElement.nativeElement;
+    const content = element.textContent;
+    expect(content).toContain('not set');
+  });
});

```
