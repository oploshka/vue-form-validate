
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/uikit-text',
    name: 'front',
    component: () => import('./page/UiKit/UiKitElementText'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('./page/User/UserLoginLogic'),
  },
  {
    path: '/user/login',
    name: 'UserLogin',
    component: () => import('./page/User/UserLoginLogic'),
  },
  {
    path: '/user/registration',
    name: 'UserRegistration',
    component: () => import('./page/User/UserRegistrationLogic'),
  },
  {
    path: '/user/profile',
    name: 'UserProfileEdit',
    component: () => import('./page/User/UserProfileEditLogic'),
  },
  {
    path: '/uikit-text',
    name: 'uikit-text',
    component: () => import('./page/UiKit/UiKitElementText'),
  },
  {
    path: '/uikit-select',
    name: 'uikit-select',
    component: () => import('./page/UiKit/UiKitElementSelect'),
  },
  {
    path: '/uikit-date',
    name: 'uikit-date',
    component: () => import('./page/UiKit/UiKitElementDate'),
  },
  {
    path: '/uikit-switch',
    name: 'uikit-switch',
    component: () => import('./page/UiKit/UiKitSwitch'),
  },


];


const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
