import { Notify } from 'quasar';

export function filterItems(items, term) {
  if (!items) return [];
  if (!term) return items;
  term = term.toLowerCase().replace(/\./g, "");

  return items.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(term);
    const cpfMatch = item.cpf?.replace(/[^\d]/g, "").includes(term);

    return nameMatch || cpfMatch;
  });
}

export function notifyError(e) {
  Notify.create({
    type: "error",
    message: e.response?.data?.error || e.message || e,
  });
}

export function validateCPF(cpf) {
  const cleanedCPF = cpf.replace(/\D/g, "");

  if (cleanedCPF.length !== 11 || /^[0-9]{11}$/.test(cleanedCPF) === false) {
    return false;
  }

  const invalidCPFs = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
  ];

  if (invalidCPFs.includes(cleanedCPF)) {
    return false;
  }

  const calculateDigit = (cpf, factor) => {
    let sum = 0;
    for (let i = 0; i < factor; i++) {
      sum += parseInt(cpf.charAt(i)) * (factor + 1 - i);
    }
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  const digit1 = calculateDigit(cleanedCPF, 9);
  const digit2 = calculateDigit(cleanedCPF, 10);

  if (
    digit1 !== parseInt(cleanedCPF.charAt(9)) ||
    digit2 !== parseInt(cleanedCPF.charAt(10))
  ) {
    return false;
  }

  return true;
}
