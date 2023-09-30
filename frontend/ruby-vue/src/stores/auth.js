import { defineStore } from 'pinia';
import { Loading } from 'quasar';
import { i18n } from 'boot/i18n.js';
import AuthService from '../services/AuthService';
import { notifyError } from '../utils/helpers';
import { RouteNames } from '../utils/consts';

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      name: null,
      email: null,
    },
    isAuthenticated: false,
  }),
  persist: true,
  getters: {
    loggedIn: (state) => () => state.isAuthenticated,
  },
  actions: {
    async login(credentials) {
      try {
        Loading.show();
        const { data } = await AuthService.login(credentials);

        this.user = { email: data.email, name: data.name };
        this.isAuthenticated = !!data.token;

        localStorage.setItem("token", data.token);

        await this.router.push({ name: RouteNames.HOME });
      } catch (e) {
        const error =
          e.response?.status === 401 ? i18n.global.t("LOGIN_ERROR_MESSAGE") : e;
        notifyError(error);
      } finally {
        Loading.hide();
      }
    },
    async create(account) {
      try {
        Loading.show();
        const { data } = await AuthService.create({ user: account });

        this.user = { email: data.email, name: data.name };
        this.isAuthenticated = !!data.token;

        localStorage.setItem("token", data.token);

        await this.router.push({ name: RouteNames.HOME });
      } catch (e) {
        const error =
          e.response?.status === 401
            ? "Já existe uma conta associada a este e-mail, faça login para continuar"
            : e;
        notifyError(error);
      } finally {
        Loading.hide();
      }
    },
    async logout() {
      try {
        Loading.show();
        // await AuthService.logout();

        localStorage.removeItem("token");
        await this.router.push({ name: RouteNames.LOGIN });
        this.$reset();
      } catch (e) {
        notifyError(e);
      } finally {
        Loading.hide();
      }
    },
    async invalidateSession() {
      localStorage.removeItem("token");
      await this.router.push({ name: RouteNames.LOGIN });
      this.$reset();
    },
  },
});
