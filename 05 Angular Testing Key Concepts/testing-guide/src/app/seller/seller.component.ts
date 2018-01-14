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
