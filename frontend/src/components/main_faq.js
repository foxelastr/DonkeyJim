import Vue from 'vue';
import FaqPage from './FaqPage.vue';

Vue.config.productionTip = false;

new Vue({
    render: h => h(FaqPage),
}).$mount('#app');
