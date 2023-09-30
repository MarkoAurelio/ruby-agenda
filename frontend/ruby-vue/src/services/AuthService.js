import { api } from 'boot/axios';

export default {
  login(credentials) {
    return api.post('/auth', credentials);
  },
  create(account) {
    return api.post('/auth/create', account);
  },
  logout() {
    return api.delete('/auth/logout');
  },
};
