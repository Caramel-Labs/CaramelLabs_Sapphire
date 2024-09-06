export default function ConvertToSubCurrency(amount, factor=100) {
    return Math.round(amount * factor)

}