import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


const routes = [
  {
    path: '/uikit',
    name: 'uikit',
    component: () => import('@page/UiKit'),
  },
  {
    path: '/uikit-text',
    name: 'uikit-text',
    component: () => import('@page/UiKitElementText'),
  },
  {
    path: '/uikit-select',
    name: 'uikit-select',
    component: () => import('@page/UiKitElementSelect'),
  },
  {
    path: '/uikit-switch',
    name: 'uikit-switch',
    component: () => import('@page/UiKitSwitch'),
  },

  {
    path: '/auth',
    name: 'auth',
    component: () => import('@page/User/Authorization'),
  },


  {
    path: '*',
    name: 'front',
    component: () => import('@page/UiKit'),
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
