

export const percentFormatter = new Intl.NumberFormat('ru-RU', 
{
    style: 'percent', 
    //кол-во точек после запятой
    maximumFractionDigits: 3

});

// 4 000 000 ₽
export const priceFormatter = new Intl.NumberFormat('ru-RU',
    {
        style: 'currency', 
        currency: 'RUB', 
        maximumFractionDigits: 2
    });

export const priceFormatterDecimals = new Intl.NumberFormat('ru-RU',
    {
        style: 'currency', 
        currency: 'RUB', 
        maximumFractionDigits: 2
    });       