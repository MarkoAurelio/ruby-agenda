import { defineStore } from 'pinia';
import { Loading } from "quasar";
import AuthService from "../services/AuthService";
import { notifyError } from "../utils/helpers";
import { RouteNames } from "../utils/consts";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      name: null,
      email: null,
    },
    isAuthenticated: false,
  }),
  persist: true,
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
          e.response?.status === 401 ? "Email e/ou senha inválidos" : e;
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
          e.response?.status === 422
            ? "Este e-mail já está em uso. Faça o login ou utilize outro"
            : e;
        notifyError(error);
      } finally {
        Loading.hide();
      }
    },
    async logout() {
      try {
        Loading.show();

        localStorage.removeItem("token");
        await this.router.push({ name: RouteNames.LOGIN });
        this.$reset();
      } catch (e) {
        notifyError(e);
      } finally {
        Loading.hide();
      }
    },
    async delete(password) {
      try {
        Loading.show();
        const { data } = await AuthService.delete({ password });
        if (data) {
          notifyError(data.message);
          this.invalidateSession();
        }
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
