<template>
  <v-app id="inspire">
    <MainMenu></MainMenu>
    <v-main class="custom-main">
      <router-view></router-view> <!-- 라우터 뷰 추가 -->
      <ContactIcon />
    </v-main>
  </v-app>
</template>

<script>
import MainMenu from "../components/MainMenu.vue";
import ContactIcon from '../components/ContactIcon.vue';

export default {
  components: { MainMenu, ContactIcon }
};
</script>

<style>
.custom-main {
  padding: 40px 0px 72px !important;
}
</style>