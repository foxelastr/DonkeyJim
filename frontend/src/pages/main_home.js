import Vue from 'vue';
import AppHome from './AppHome.vue';
import router from '../router';
import vuetify from '../plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(AppHome)
}).$mount('#app');
