import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../components/HomePage.vue';
import AppDashboard from '../pages/AppDashboard.vue';
import ServiceInfo from '../components/ServiceInfo.vue';
import ReservationPage from '../components/Reservation.vue';
import ReservationCheckPage from '../components/ReservationCheck.vue';
import ReservationUpdatePage from '../components/ReservationUpdate.vue';
import FaqPage from '../components/FaqPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/dashboard',
      component: AppDashboard,
      children: [
        {
          path: 'serviceinfo',
          name: 'ServiceInfo',
          component: ServiceInfo,
        },
        {
          path: 'reservation',
          name: 'Reservation',
          component: ReservationPage,
        },
        {
          path: 'reservcheck',
          name: 'ReservationCheck',
          component: ReservationCheckPage,
        },
        {
          path: 'reservupdate/:user_id',
          name: 'ReservationUpdate',
          component: ReservationUpdatePage,
          props: true,
        },
        {
          path: 'faqs',
          name: 'Faqs',
          component: FaqPage,
        },
      ],
    },
  ],
});
