<template>
  <v-app id="inspire">
    <MainMenu></MainMenu>
    <v-main class="custom-main">
      <router-view></router-view> <!-- 라우터 뷰 추가 -->
    </v-main>
    <v-footer app>
      <span>&copy; 2024</span>
    </v-footer>
  </v-app>
</template>

<script>
import MainMenu from "../components/MainMenu.vue";

export default {
  components: { MainMenu }
};
</script>

<style>
.custom-main {
  padding: 40px 0px 72px !important;
}
</style>