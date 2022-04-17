
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const routes = [
  
  {
    path: '/',
    name: 'front',
    component: () => import('./component/work-example'),
  },
  {
    path: '/user',
    name: 'UserLogin',
    component: () => import('./page/User/UserLoginLogic'),
  },
  // {
  //   path: '/uikit-text',
  //   name: 'uikit-text',
  //   component: () => import('@page/UiKit/UiKitElementText'),
  // },
  // {
  //   path: '/uikit-select',
  //   name: 'uikit-select',
  //   component: () => import('@page/UiKit/UiKitElementSelect'),
  // },
  // {
  //   path: '/uikit-date',
  //   name: 'uikit-date',
  //   component: () => import('@page/UiKit/UiKitElementDate'),
  // },
  // {
  //   path: '/uikit-switch',
  //   name: 'uikit-switch',
  //   component: () => import('@page/UiKit/UiKitSwitch'),
  // },
  //
  // {
  //   path: '/user/auth',
  //   name: 'user__auth',
  //   component: () => import('@page/User/Authorization'),
  // },
  // {
  //   path: '/user/password-reset',
  //   name: 'user__password-reset',
  //   component: () => import('@page/User/PasswordReset'),
  // },
  // {
  //   path: '/user/profile',
  //   name: 'user__profile',
  //   component: () => import('@page/User/ProfileEdit'),
  // },


];


const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
