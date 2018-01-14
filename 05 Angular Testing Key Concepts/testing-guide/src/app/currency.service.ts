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
