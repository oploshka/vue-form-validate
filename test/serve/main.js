import Vue from 'vue';

// глобально инитим классы
import '@entity';

// Library
import '@library/dayjs';

// дефолтный импорт
import App    from './App';
import router from '@router';

// Plugins
// import '@plugin/v-slim-dialog';
// import '@plugin/vue-suggestion';
// import '@plugins/v-mask';
// import '@plugin/vue-click-outside';

Vue.config.productionTip = false;

global.Vue = Vue;
global.VueApp = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
