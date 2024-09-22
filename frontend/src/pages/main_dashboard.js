import Vue from 'vue';
import AppDashboard from './AppDashboard.vue'; // 예: Dashboard 컴포넌트
import router from '../router';
import vuetify from '../plugins/vuetify';
import axios from 'axios'; // Axios 추가

Vue.config.productionTip = false;

// CSRF 토큰을 쿠키에서 가져오는 함수
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Axios CSRF 설정
axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');

new Vue({
    router,
    vuetify,
    render: h => h(AppDashboard)
}).$mount('#app');

