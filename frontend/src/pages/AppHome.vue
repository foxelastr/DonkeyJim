<template>
  <v-app id="inspire">
    <v-main class="custom-main">
      <router-view></router-view>
    </v-main>
    <FooterBar />
  </v-app>
</template>

<script>
import FooterBar from "../components/FooterBar.vue";

export default {
  components: { FooterBar }
};
</script>

<style>
.custom-main {
  padding: 40px 0px 72px !important;
}
</style>
