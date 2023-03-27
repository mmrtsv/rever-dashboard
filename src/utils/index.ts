import {
    ModelsMoneyFormat,
    ProcessessapiModelsMoneyFormat
} from '@itsrever/dashboard-api'

export function checkImage(url: string) {
    const http = new XMLHttpRequest()

    http.open('HEAD', url, false)
    http.send()

    return http.status != 404
}

export const getDate = (seconds: number, lng: string): string => {
    const date = new Date(seconds * 1000)
    return date.toLocaleDateString(lng, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export const formatPrice = (
    price: number,
    moneyFormat: ModelsMoneyFormat | ProcessessapiModelsMoneyFormat,
    multiply = true
): string => {
    let ints = ''
    let decimals = ''
    let indexSeparator = undefined
    if (multiply && moneyFormat.amount_multiplied_by) {
        const realPrice = price / moneyFormat.amount_multiplied_by
        if (`${realPrice}`.includes('.')) {
            indexSeparator = `${realPrice}`.indexOf('.')
        }
        if (indexSeparator) {
            ints = `${realPrice}`.substring(0, indexSeparator)
            decimals = `${realPrice}`.substring(
                indexSeparator + 1,
                `${realPrice}`.length
            )
        } else {
            ints = `${realPrice}`
        }
    } else {
        ints = `${Math.trunc(price)}`
        decimals = `${price % 1}`
    }
    let addSign = false
    if (ints[0] === '-') {
        addSign = true
        ints = ints.substring(1, ints.length)
    }
    ints = ints.split('').reverse().join('')
    ints =
        ints.match(/.{1,3}/g)?.join(moneyFormat.thousand_separator ?? '') ?? ''
    ints = ints.split('').reverse().join('')
    if (addSign) ints = '-' + ints
    if (moneyFormat.visible_number_of_decimals) {
        if (decimals.length > moneyFormat.visible_number_of_decimals) {
            decimals = decimals.substring(
                0,
                moneyFormat.visible_number_of_decimals
            )
        } else if (decimals.length < moneyFormat.visible_number_of_decimals) {
            decimals = decimals.padEnd(
                moneyFormat.visible_number_of_decimals,
                '0'
            )
        }
    }
    if (moneyFormat.decimal_separator) {
        const value = ints + moneyFormat.decimal_separator + decimals
        if (moneyFormat.is_currency_left_position) {
            return `${moneyFormat.currency_symbol} ${value}`
        }
        return `${value} ${moneyFormat.currency_symbol}`
    }
    if (moneyFormat.is_currency_left_position) {
        return `${moneyFormat.currency_symbol}${price}`
    }
    return `${price}${moneyFormat.currency_symbol ?? ''}`
}
