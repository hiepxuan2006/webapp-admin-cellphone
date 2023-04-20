export const formattedNumber = (number, currency = "VND") => {
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: currency,
  })
}
