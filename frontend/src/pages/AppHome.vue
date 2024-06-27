<template>
  <v-app id="inspire">
    <MainMenu></MainMenu>

    <v-main>
      <v-container class="mt-10 pt-10">
        <v-row>
          <v-col v-for="(card, index) in cards" :key="index" cols="12" md="4">
            <v-card class="mx-auto" max-width="400">
              <v-img :src="card.image" height="600px"></v-img>

              <v-card-title>
                {{ card.title }}
              </v-card-title>

              <v-card-subtitle>
                {{ card.subtitle }}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn color="orange lighten-2" text>
                  Explore
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon @click="toggle(index)">
                  <v-icon>{{ card.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="card.show">
                  <v-divider></v-divider>

                  <v-card-text>
                    {{ card.text }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container> </v-main>

    <v-footer app>
      <span>&copy; 2024</span>
    </v-footer>
  </v-app>
</template>

<script setup>

</script>

<script>
import MainMenu from "../components/MainMenu.vue";

export default {
  components: { MainMenu },
  data() {
    return {
      cards: [
        {
          image: '',
          title: '서비스 안내',
          subtitle: '서비스 안내 부제목 넣기',
          text: "서비스 안내 카드 : Dashboard ==> 간략한 설명 써넣기",
          show: false
        },
        {
          image: '',
          title: '예약하기',
          subtitle: '예약하기 부제목 넣기',
          text: "예약하기 카드 : Reservation ==> 간략한 설명 써넣기",
          show: false
        },
        {
          image: '',
          title: '예약확인',
          subtitle: '예약확인 부제목 넣기',
          text: "예약확인 카드 : ReservationCheck ==> 간략한 설명 써넣기",
          show: false
        }
      ]
    };
  },
  methods: {
    toggle(index) {
      this.cards[index].show = !this.cards[index].show;
    }
  }
}
</script>