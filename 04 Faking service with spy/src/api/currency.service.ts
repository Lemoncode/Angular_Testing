export const currencyService = {
    getCurrencyChange: () => {
        return fetch('https://api.fixer.io/latest', { method: 'get' })
            .then((res) => res.json());
    }
}
