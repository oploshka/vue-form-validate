import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


const routes = [
  {
    path: '/uikit',
    name: 'uikit',
    component: () => import('@page/UiKit/UiKit'),
  },
  {
    path: '/uikit-text',
    name: 'uikit-text',
    component: () => import('@page/UiKit/UiKitElementText'),
  },
  {
    path: '/uikit-select',
    name: 'uikit-select',
    component: () => import('@page/UiKit/UiKitElementSelect'),
  },
  {
    path: '/uikit-date',
    name: 'uikit-date',
    component: () => import('@page/UiKit/UiKitElementDate'),
  },
  {
    path: '/uikit-switch',
    name: 'uikit-switch',
    component: () => import('@page/UiKit/UiKitSwitch'),
  },

  {
    path: '/user/auth',
    name: 'user__auth',
    component: () => import('@page/User/Authorization'),
  },
  {
    path: '/user/password-reset',
    name: 'user__password-reset',
    component: () => import('@page/User/PasswordReset'),
  },
  {
    path: '/user/profile',
    name: 'user__profile',
    component: () => import('@page/User/ProfileEdit'),
  },


  {
    path: '*',
    name: 'front',
    component: () => import('@page/UiKit/UiKit'),
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      // document.getElementById('app').scrollTo(0, 0);
      return { x: 0, y: 0 };
    }
  }
});

export default router;
