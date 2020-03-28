export function numberWithCommas(x) {
    if (x===undefined) return "";
    const parts = x.toString().split(".");

    return parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
