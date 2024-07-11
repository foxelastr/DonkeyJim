import Vue from 'vue';
import ReservationCheck from './ReservationCheck.vue';

Vue.config.productionTip = false;

new Vue({
    render: h => h(ReservationCheck),
}).$mount('#app');
