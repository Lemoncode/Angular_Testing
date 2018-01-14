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
