<template>
  <v-container>
    <v-col>
      <v-card class="mb-7 mx-auto" max-width="1590">
        <v-img class="white--text align-start" max-height="500px" :src="daemoonIcon">
          <v-card-title>
            <v-img max-width="120px" :src="LOGOIcon"></v-img>
          </v-card-title>
        </v-img>
        <v-card-subtitle class="text--primary">
          <div class="daemoon_text">무거운 짐과 옷은 맡기고!</div>
          <div class="daemoon_text">깜빡한 물건은 빌리고!</div>
          <div class="daemoon_text">
          </div>
        </v-card-subtitle>
        <v-card-text>
          <div class="daemoon_text">⦁ 고객님의 소중한 짐과 옷을 24시간 안전하게 보관합니다.</div>
          <div class="daemoon_text">⦁ 공기청정기와 의류관리기를 24시간 가동해 최상의 상태를 유지합니다.</div>
          <div class="daemoon_text">⦁ 여행시 필요한 다양한 아이템이 구비되어 있습니다.</div>
          <div class="daemoon_text">⦁ 대여/반납 시 모두 에어라커 직원이 고객님께 찾아갑니다.</div>
          <!-- <div class="daemoon_text">⦁ (택) 가벼운 마음으로 여행을 즐기세요!</div> -->
        </v-card-text>
      </v-card>
      <v-divider class="mx-auto" style="max-width: 1590px;"></v-divider>
    </v-col>

    <v-row class="pt-3">
      <v-col v-for="(card, index) in cards" :key="index" cols="12" md="4">
        <v-card class="mx-auto" max-width="400" @click="navigateTo(card.link)">
          <v-img :src="card.image" max-height="400px"></v-img>
          <v-card-title>
            <router-link :to="card.link" style="color: black; text-decoration: none;">{{ card.title }}</router-link>
          </v-card-title>
          <v-card-subtitle>
            {{ card.subtitle }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          image: require('@/assets/service_guide.png'),
          title: '서비스 안내',
          subtitle: '에어라커의 전반적인 서비스 내용을 확인하세요!',
          link: { name: 'ServiceInfo' }
        },
        {
          image: require('@/assets/reservation.png'),
          title: '예약하기',
          subtitle: '예약하기를 통해 간편하게 예약하고 이용하세요!',
          link: { name: 'Reservation' }
        },
        {
          image: require('@/assets/reserv_check.png'),
          title: '예약확인',
          subtitle: '예약하신 내용을 확인 및 변경하실 수 있습니다!',
          link: { name: 'ReservationCheck' }
        }
      ],
      daemoonIcon: require('@/assets/daemoon.png'),
      LOGOIcon: require('@/assets/LOGO.png'),
    };
  },
  methods: {
    navigateTo(link) {
      this.$router.push(link);
    },
  }
}
</script>

<style scoped>
.daemoon_text {
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
}
</style>
