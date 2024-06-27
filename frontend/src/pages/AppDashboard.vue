<template>
  <v-app id="inspire">
    <MainMenu></MainMenu>

    <v-main>
      <Dashboard />
    </v-main>

    <v-footer app>
      <span>&copy; 2024</span>
    </v-footer>
  </v-app>
</template>

<script setup>

</script>

<script>
import MainMenu from "../components/MainMenu.vue";
import Dashboard from '../components/Dashboard.vue';

export default {
  components: { MainMenu, Dashboard },
  data: () => ({
    // drawer: null 
  }),
}
</script>