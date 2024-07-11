import Vue from 'vue';
import Reservation from './Reservation.vue';

Vue.config.productionTip = false;

new Vue({
    render: h => h(Reservation),
}).$mount('#app');
