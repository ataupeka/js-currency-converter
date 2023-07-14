const rates = {};

const elementUSD = document.querySelector('[data-value="USD"]');
const elementCAD = document.querySelector('[data-value="CAD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');






const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');


getCurrencies();

async function getCurrencies () {
    const  response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
     const data = await response.json();
    const result =  await data;
    console.log(result);


    rates.USD = result.Valute.USD;
    rates.CAD = result.Valute.CAD;
    rates.EUR = result.Valute.EUR;


    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementCAD.textContent = rates.CAD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);

    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top');
    } else {
        elementUSD.classList.add('bottom');
    }

    if (rates.CAD.Value > rates.CAD.Previous) {
        elementCAD.classList.add('top');
    } else {
        elementCAD.classList.add('bottom');
    }

    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top');
    } else {
        elementEUR.classList.add('bottom');
    }


}



input.oninput = convertValue;

select.oninput = convertValue;


function convertValue() {
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);  
};
