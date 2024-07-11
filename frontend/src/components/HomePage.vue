<!-- src/components/HomePageContent.vue -->
<template>
  <v-container class="">
    <v-col class="">
      <v-card class="mb-10 mx-auto" max-width="1590">
        <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
          <v-card-title>Top 10 Australian beaches</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">
          Number 10
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Whitehaven Beach</div>

          <div>Whitsunday Island, Whitsunday Islands</div>
        </v-card-text>
      </v-card>
      <v-divider class="mx-auto" style="max-width: 1590px;"></v-divider>
    </v-col>


    <v-row class="pt-5">
      <v-col v-for="(card, index) in cards" :key="index" cols="12" md="4">
        <v-card class="mx-auto" max-width="400" @click="navigateTo(card.link)">
          <v-img :src="card.image" height="500px"></v-img>
          <v-card-title>
            <router-link :to="card.link">{{ card.title }}</router-link>
          </v-card-title>
          <v-card-subtitle>
            {{ card.subtitle }}
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="orange lighten-2" text @click.stop="navigateTo(card.link)">
              Explore
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="toggle(index)">
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          image: '',
          title: '서비스 안내',
          subtitle: '서비스 안내 부제목 넣기',
          text: "서비스 안내 카드 : Dashboard ==> 간략한 설명 써넣기",
          show: false,
          link: { name: 'Dashboard' }
        },
        {
          image: '',
          title: '예약하기',
          subtitle: '예약하기 부제목 넣기',
          text: "예약하기 카드 : Reservation ==> 간략한 설명 써넣기",
          show: false,
          link: { name: 'Reservation' }
        },
        {
          image: '',
          title: '예약확인',
          subtitle: '예약확인 부제목 넣기',
          text: "예약확인 카드 : ReservationCheck ==> 간략한 설명 써넣기",
          show: false,
          link: { name: 'ReservationCheck' }
        }
      ]
    };
  },
  methods: {
    toggle(index) {
      this.cards[index].show = !this.cards[index].show;
    },
    navigateTo(link) {
      this.$router.push(link);
    },
  }
}
</script>