## In this demo we are going to work with `jasmine` using `spy` to fake a service dependendency.

* We start from the previous demo code.

## Steps

### 1. Let's start by creating a service under `api` folder, this service will retrieve data about currencies. Create `api/currency.service.ts`.

```typescript
export const currencyService = {
    getCurrencyChange: () => {
        return fetch('https://api.fixer.io/latest', { method: 'get' })
            .then((res) => res.json());
    }
}

```
### 2. Now we are going to create a `proxy` that will consume the above srevice. Create a new folder call `seller` under `src`. 

* Inside here place a new file call `seller/seller.model.ts`

```typescript
export enum Region { European, American, Asian }

export interface Seller {
    name: string;
    id: number;
    region?: Region;
}

```

* Now let's create the `proxy` service, `seller/seller-price.service.ts`

```typescript
import { Region, Seller } from './seller.model';
import { currencyService } from '../api/currency.service';

export class SellerPriceService {
    getPrice(region: Region, basePrice: number): Promise<number> {
        return new Promise<number>((res, rej) => {
            currencyService.getCurrencyChange()
                .then((result) => {
                    const raiting = this.resolveRating(result.rates, region);
                    res(basePrice * raiting);
                })
                .catch(err => rej(err));
        });
    }

    private resolveRating(rates: any, region: Region): number {
        let rating: number;
        switch (region) {
            case Region.American:
                rating = rates['USD'];
                break;
            case Region.Asian:
                rating = rates['JPY'];
                break;
            case Region.European:
                rating = rates['GBP'];
                break;
            default:
                rating = 0;
                break;
        }
        return rating;
    }
}

```
* Notice that our `SellerPriceService`, it's consuming the `currencyService`, but this service it's not injected via constructor, it's just resolve using the ES6 modules.

### 3. Now let's add the tests for this service in the folder `seller`, we add `seller/seller-price.service.spec.ts`

```typescript
import { SellerPriceService } from './seller-price.service';
import { Region } from '../seller/seller.model';
import { currencyService } from '../api/currency.service';

describe('SellerPriceService', () => {
    let sellerPriceService: SellerPriceService;
    beforeEach(() => {
        sellerPriceService = new SellerPriceService();
        spyOn(currencyService, 'getCurrencyChange')
            .and
            .callFake(() => {
                return new Promise<any>((res, rej) => {
                    res({
                        'rates': {
                            'USD': 1.18,
                            'JPY': 134.37,
                            'GBP': 0.885
                        }
                    });
                });
            });
    });
    describe('when calls getPrice on American', () => {
        it('returns a price based on USD', (done) => {
            sellerPriceService.getPrice(Region.American, 100)
                .then((result) => {
                    expect(currencyService.getCurrencyChange).toHaveBeenCalledTimes(1);
                    expect(result).toEqual(100 * 1.18);
                    done();
                });
        });

        it('returns a price based on JPY', () => {
            return sellerPriceService.getPrice(Region.Asian, 100)
            .then((result) => {
                expect(currencyService.getCurrencyChange).toHaveBeenCalledTimes(1);
                expect(result).toEqual(100 * 134.37);
            });
        });
    });
});

```
* We create a new `spy`, to fake its behavior we use `callFake`
* Notice that in the last test we are not using the `done` function. `jasmine` can handle promises (thenable methods) if we return them from our code.
