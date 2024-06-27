import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/HomePage.vue'
import Dashboard from '../components/Dashboard.vue';
import Reservation from '../components/Reservation.vue';
import ReservationCheck from '../components/ReservationCheck.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/reservation',
      name: 'Reservation',
      component: Reservation
    },
    {
      path: '/reservation-check',
      name: 'ReservationCheck',
      component: ReservationCheck
    }
  ]
});
