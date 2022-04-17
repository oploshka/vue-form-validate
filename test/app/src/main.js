import { createApp } from 'vue';
import App from './App.vue';


// Это работает только для разработчиков плагина, для использования в своем проекте необходимо копировать эту папку из репозитория
import 'vue-form-element/example/plugin-install/index.js'

//
const VueApp = createApp(App);

//
VueApp.mount('#app');
