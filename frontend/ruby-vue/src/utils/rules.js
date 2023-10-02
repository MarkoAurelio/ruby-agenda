export const emailValidator = (email) => {
  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return !!email && emailPattern.test(email);
};
export const passwordValidator = (password) => {
  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/;
  // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
  return password ? passwordPattern.test(password) : true;
};

export default class Rules {
  static required(val) {
    return !!val || "Obrigatório";
  }

  static validEmail(val) {
    return emailValidator(val) || "Insira um e-mail válido";
  }

  static validPassword(val) {
    return passwordValidator(val) || "Insira uma senha válida";
  }
}
