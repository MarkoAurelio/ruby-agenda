import { RouteNames } from '../utils/consts';

const routes = [
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', name: RouteNames.LOGIN, component: () => import('src/pages/LoginPage.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name: RouteNames.HOME, component: () => import('src/pages/HomePage.vue') },
    ],
    meta: { requiresAuth: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: RouteNames.NOT_FOUND,
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
