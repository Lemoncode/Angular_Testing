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
