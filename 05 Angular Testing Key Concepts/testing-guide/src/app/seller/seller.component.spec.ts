import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerComponent } from './seller.component';

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
      declarations: [ SellerComponent ]
    })
    .compileComponents()
    .then(resolveComponentUnderTest);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
