// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import AppHome from '../pages/AppHome.vue';
import HomePage from '../components/HomePage.vue';
import DashboardPage from '../components/Dashboard.vue';
import ReservationPage from '../components/Reservation.vue';
import ReservationCheckPage from '../components/ReservationCheck.vue';
import FaqPage from '../components/FaqPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: AppHome,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomePage
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: DashboardPage
        },
        {
          path: 'reservation',
          name: 'Reservation',
          component: ReservationPage
        },
        {
          path: 'reservation-check',
          name: 'ReservationCheck',
          component: ReservationCheckPage
        },
        {
          path: 'faq',
          name: 'Faq',
          component: FaqPage
        },
      ]
    }
  ]
});
