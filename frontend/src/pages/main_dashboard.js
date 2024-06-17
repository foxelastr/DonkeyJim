import Vue from 'vue'
import AppDashboard from './AppDashboard.vue'
import vuetify from '../plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(AppDashboard)
}).$mount('#app')
