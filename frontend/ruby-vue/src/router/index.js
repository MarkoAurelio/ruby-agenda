import { route } from 'quasar/wrappers';
import {
  createRouter, createMemoryHistory, createWebHistory, createWebHashHistory,
} from 'vue-router';
import { i18n } from 'boot/i18n.js';
import { useAuthStore } from 'stores/auth';
import { notifyError } from '../utils/helpers';
import { RouteNames } from '../utils/consts';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route((/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const { isAuthenticated } = authStore;
    const token = localStorage.getItem('token');
    if (to.matched.some((record) => record.meta.requiresAuth) && (!isAuthenticated || !token)) {
      notifyError({ message: i18n.global.t('DO_LOGIN_TO_CONTINUE') });
      next({ name: RouteNames.LOGIN });
    } else {
      next();
    }
  });

  return Router;
});
