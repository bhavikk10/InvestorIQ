export const formatCurrency = (amount, showDecimals = false) => {
  const millions = amount / 1000000;
  if (showDecimals) {
    return `$${millions.toFixed(2)}M`;
  }
  return `$${Math.round(millions)}M`;
};

export const formatCurrencyFull = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (value, decimals = 1) => {
  return `${(value * 100).toFixed(decimals)}%`;
};
