document.addEventListener('DOMContentLoaded', async () => {
    const convertButton = document.getElementById('convert');
    const resultDiv = document.getElementById('result');
    const currencySelect = document.getElementById('currency');
    const amountInput = document.getElementById('amount');

    var myHeaders = new Headers();
    myHeaders.append("apikey", "utmGHlcsKJ9edr3q7lmnbS9ZKfKrkuug");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    try {
        const response = await fetch("https://api.apilayer.com/exchangerates_data/latest?base=USD", requestOptions);
        const data = await response.json();
        
        for (const currency in data.rates) {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            currencySelect.appendChild(option);
        }

        convertButton.addEventListener('click', async () => {
            const amount = parseFloat(amountInput.value);
            const selectedCurrency = currencySelect.value;
            if (!isNaN(amount) && selectedCurrency) {
                try {
                    const conversionResponse = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${selectedCurrency}&from=USD&amount=${amount}`, requestOptions);
                    const conversionData = await conversionResponse.json();
                    const convertedAmount = conversionData.result;
                    resultDiv.textContent = `${amount} USD = ${convertedAmount.toFixed(2)} ${selectedCurrency}`;
                } catch (conversionError) {
                    console.error('Error converting currency:', conversionError);
                    resultDiv.textContent = 'Error converting currency.';
                }
            } else {
                resultDiv.textContent = 'Please enter a valid amount and select a currency.';
            }
        });
    } catch (error) {
        console.error('Error fetching conversion rates:', error);
    }
});
