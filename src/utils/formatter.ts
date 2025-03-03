export const Formatter = {
  currency(value: number, decimals = 2): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
      maximumFractionDigits: decimals,
    }).format(value);
  },
};
