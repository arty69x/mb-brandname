export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateCardholder(name: string): boolean {
  return name.trim().length >= 3;
}

export function validateCVC(cvc: string): boolean {
  return /^\d{3,4}$/.test(cvc.trim());
}

export function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\s+/g, "");
  if (!/^\d{12,19}$/.test(digits)) return false;
  let sum = 0;
  let doubleUp = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let cur = Number(digits[i]);
    if (doubleUp) {
      cur *= 2;
      if (cur > 9) cur -= 9;
    }
    sum += cur;
    doubleUp = !doubleUp;
  }
  return sum % 10 === 0;
}

export function validateExpiry(expiry: string): boolean {
  const match = expiry.trim().match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  return year > currentYear || (year === currentYear && month >= currentMonth);
}
