export function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}


export function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  return date.toLocaleString("vi-VN");
}
