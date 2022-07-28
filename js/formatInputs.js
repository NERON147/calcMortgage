import { priceFormatter, priceFormatterDecimals } from "./formatters.js";

const maxPrice = 100000000

// инпуты
const inputCost = document.querySelector('#input-cost');
const inputDownPayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');

const form = document.querySelector('#form');
const totalCost = document.querySelector('#total-cost')
const totalMonthPayment = document.querySelector('#total-month-payment')

// Cleave опции форматирования
const cleavePriceSetting = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' ',
}


// Запускаем форматирование Cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSetting);
const cleaveDownPayment = new Cleave(inputDownPayment, cleavePriceSetting);

const cleaveTerm = new Cleave(inputTerm, cleavePriceSetting);
// Отображение и рассчет суммы кредита

// Сумма кредита
calcMortgage()

form.addEventListener('input', function () {
    // Расчет суммы кредита 
    calcMortgage() 

})

function calcMortgage() {

    // Проверка чтобы стоимость недвижимости не была больше максимальной
    let cost = +cleaveCost.getRawValue();

    if (cost > maxPrice) {
        cost = maxPrice;
    }

    // Общая сумма кредита
    const totalAmount = cost - cleaveDownPayment.getRawValue();
    totalCost.innerText = priceFormatter.format(totalAmount);

    // Ставка по кредиту 
    const creditRate = +document.querySelector('input[name="program"]:checked').value;
    const monthsRate = (creditRate * 100) / 12;

    // Срок ипотеки в годах
    // const mortgageTermYears = document.querySelector('#input-term').valuel;
    const years = +cleaveTerm.getRawValue();

    // Срок ипотеки в месяцах
    const months = years * 12;

    // Расчет ежемесячного платежа
    const monthPayment =( totalAmount * monthsRate) / (1 - (1 + monthsRate) * (1 - months));

    // Отображение ежемесячного платежа
    totalMonthPayment.innerText = priceFormatterDecimals.format(monthPayment)
   

}


// Слайдер кост
const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
    start: 10000000,
    connect: 'lower',
    step: 100000,
    range: {
        'min': 0,
        '50%': [10000000, 1000000],
        'max': 100000000
    },

    format: wNumb ({
        decimals: 0,
        thousand: ' ',
        siffix: '',
    })
});


sliderCost.noUiSlider.on('slide', function (){
    inputCost.value = sliderCost.noUiSlider.get()
    calcMortgage() 
    // const sliderValue = parseInt(sliderCost.noUiSlider.get(true))
    // cleaveCost.setRawValue(sliderValue)
    // calcMortgage() 
})

// Слайдер даунпеймент

const sliderDownpayment = document.getElementById('slider-downpayment');

noUiSlider.create(sliderDownpayment, {
    start: 3000000,
    connect: 'lower',
    step: 100000,
    range: {
        min: 0,
        max: 100000000
    },

    format: wNumb ({
        decimals: 0,
        thousand: ' ',
        siffix: '',
    })
});


sliderDownpayment.noUiSlider.on('slide', function (){
    inputDownPayment.value = sliderDownpayment.noUiSlider.get()
    calcMortgage() 
})

// Слайдер года

const sliderTerm = document.getElementById('slider-term');

noUiSlider.create(sliderTerm, {
    start: 1,
    connect: 'lower',
    step: 1,
    range: {
        'min': 1,
        'max': 30
    },

    format: wNumb ({
        decimals: 0,
        thousand: '',
        siffix: '',
    })
});


sliderTerm.noUiSlider.on('slide', function (){
    inputTerm.value = sliderTerm.noUiSlider.get()
    calcMortgage() 
})

// Форматирование inputCost

inputCost.addEventListener('input', function() {
    const value = +cleaveCost.getRawValue();
    // Обновляем range slider
    sliderCost.noUiSlider.set(value);
    // Проверки на мак цену
    if (value > maxPrice) {
        inputCost.closest('.param__details').classList.add('param__details--error')
    }   else { (value < maxPrice) 
        inputCost.closest('.param__details').classList.remove('param__details--error')
    }

    // Зависимость значений downpayment от inputCost
    const percentMin = value * 0.15;
    const percentMax = value * 0.90;
    
    
    sliderDownpayment.noUiSlider.updateOptions({
            range: {
                min: percentMin,
                max: percentMax
            }
        });
   
})

inputCost.addEventListener('change', function() {
    const value = +cleaveCost.getRawValue();
    
    if (value > maxPrice) {
        inputCost.closest('.param__details').classList.remove('param__details--error')
        cleaveCost.setRawValue(maxPrice)
    }
    
})