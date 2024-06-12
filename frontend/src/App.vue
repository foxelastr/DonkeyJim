<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped theme="dark">
      <v-list-item title="My Application" subtitle="Vuetify">Donkey-Jim</v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="Dashboard">Dashboard</v-list-item>
      <v-list-item link title="Reservation">Reservation</v-list-item>
      <v-list-item link title="Info">Info</v-list-item>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="indigo" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <HelloWorld />
    </v-main>

    <v-footer app>
      <span>&copy; 2024</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(null)
</script>

<script>
import HelloWorld from './components/HelloWorld.vue';
export default {
  components: { HelloWorld },
  data: () => ({ drawer: null }),
}
</script>