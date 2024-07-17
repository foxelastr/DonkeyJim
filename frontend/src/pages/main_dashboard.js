import Vue from 'vue';
import AppDashboard from './AppDashboard.vue'; // 예: Dashboard 컴포넌트
import router from '../router';
import vuetify from '../plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    render: h => h(AppDashboard)
}).$mount('#app');
