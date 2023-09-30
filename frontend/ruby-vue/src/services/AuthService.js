import { api } from 'boot/axios';

export default {
  login(credentials) {
    return api.post("/authentication", credentials);
  },
  create(account) {
    return api.post("/users", account);
  },
  logout() {
    return api.delete('/auth/logout');
  },
};
