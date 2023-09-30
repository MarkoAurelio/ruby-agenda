import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { useAuthStore } from 'stores/auth';

const baseUrl = process.env.VUE_APP_PRODUCTION === 'false' ? process.env.VUE_REQUEST_BASE_URL_DEV : process.env.VUE_REQUEST_BASE_URL_PROD;

const api = axios.create({ baseURL: baseUrl });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    // if (config.params) {
    //   config.params = snakeCaseKeys(config.params);
    // }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  // if (response.data) {
  //   response.data = camelCaseKeys(response.data);
  // }

  (error) => {
    if (error?.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.invalidateSession();
    }

    return Promise.reject(error);
  },
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
