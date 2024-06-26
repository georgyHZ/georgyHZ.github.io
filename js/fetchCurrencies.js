document.addEventListener('DOMContentLoaded', async () => {
    const highTradedList = document.getElementById('high-traded');
    const lowTradedList = document.getElementById('low-traded');

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

        const highTradedCurrencies = ['KWD', 'BHD', 'OMR', 'JOD', 'GBP']; 
        const lowTradedCurrencies = ['IRR', 'VND', 'SLL', 'LAK', 'IDR']; 

        const fetchHighTraded = highTradedCurrencies.map(async (currency) => {
            const li = document.createElement('li');
            li.textContent = `${currency}: ${data.rates[currency]}`;
            highTradedList.appendChild(li);
        });

        const fetchLowTraded = lowTradedCurrencies.map(async (currency) => {
            const li = document.createElement('li');
            li.textContent = `${currency}: ${data.rates[currency]}`;
            lowTradedList.appendChild(li);
        });

        await Promise.all([...fetchHighTraded, ...fetchLowTraded]);
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
});
