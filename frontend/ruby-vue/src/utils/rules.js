import { i18n } from 'boot/i18n.js';

export const emailValidator = (email) => {
  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return !!email && emailPattern.test(email);
};
export const passwordValidator = (password) => {
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/;
  // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
  return password ? passwordPattern.test(password) : true;
};
export const nameValidator = (name) => {
  const fullNamePattern = /^[a-zA-Z-.]{3,}$/;
  return !!name && fullNamePattern.test(name);
};

export default class Rules {
  static required(val) { return !!val || i18n.global.t('REQUIRED'); }

  static validEmail(val) { return emailValidator(val) || i18n.global.t('INSERT_VALID_EMAIL'); }

  static validPassword(val) { return passwordValidator(val) || i18n.global.t('INSERT_VALID_PASSWORD'); }

  static validName(val) { return nameValidator(val) || i18n.global.t('INSERT_FULL_NAME'); }
}
