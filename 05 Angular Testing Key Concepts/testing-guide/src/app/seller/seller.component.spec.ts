import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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

  it('should return test value when country is set', () => {
    component.setCountry(Country.Japan);
    component.getFormattedBill(1000);
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(By.css('h2'));
    const element: HTMLElement = debugElement.nativeElement;
    const content = element.textContent;
    expect(content).toContain('1000, test');
  });

  it('should return not set value when country is not set', () => {
    component.getFormattedBill(1000);
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(By.css('h2'));
    const element: HTMLElement = debugElement.nativeElement;
    const content = element.textContent;
    expect(content).toContain('not set');
  });
});
