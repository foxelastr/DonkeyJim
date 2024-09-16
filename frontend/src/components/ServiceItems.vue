<template>
  <v-container style="max-width: 1000px; margin: 0 auto;">
    <v-spacer></v-spacer>
    <v-row align="center" justify="space-around">
      <v-col cols="6" class="text-center" :class="{ selected: currentService === 'Keeping' }"
        @click="selectService('Keeping')">
        <div class="serviceType">
          <v-btn x-large text>
            맡기기
          </v-btn>
        </div>
      </v-col>

      <v-col cols="6" class="text-center" :class="{ selected: currentService === 'Lending' }"
        @click="selectService('Lending')">
        <div class="serviceType">
          <v-btn x-large text>
            빌리기
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row class="mb-5">
      <v-col v-for="(card, index) in selectedCards" :key="index" cols="12" sm="4">
        <v-card class="mx-auto" max-width="400" @click="openDialog(index)">
          <v-img class="white--text align-end" height="300px" :src="card.main_image" aspect-ratio="1" contain
            style="object-fit: cover;">
            <v-card-title>{{ card.name }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            기본 {{ card.base_price }}원 / 추가 {{ card.additional_price }}원
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>


    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ selectedCardData.name }} 제품 정보
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text style="max-height: 500px; overflow-y: auto;">
          <!-- 설명 텍스트 -->
          <v-card-text v-html="formattedDescription"></v-card-text>

          <!-- 설명 이미지 추가 -->
          <v-img :src="selectedCardData.detail_image" max-width="100%"
            style="max-height: 100%; object-fit: contain; margin: auto;" class="mt-3"></v-img>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="goToReservationPage">
            예약하러 가기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: 'DashboardPage',
  data() {
    return {
      dialog: false,
      selectedCard: null,
      currentService: 'Keeping',
      KeepingCards: [],
      LendingCards: [],
      loading: true,
      model: 0,
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
      ServiceInfoimg1: require('@/assets/service_img1.png'),
      ServiceInfoimg2: require('@/assets/service_img2.png'),
      ServiceInfoimg3: require('@/assets/service_img3.png'),
      ServiceInfoimg4: require('@/assets/service_img4.png'),
    };
  },
  computed: {
    selectedCards() {
      return this.currentService === 'Keeping' ? this.KeepingCards : this.LendingCards;
    },
    selectedCardData() {
      if (this.selectedCard !== null) {
        return this.selectedCards[this.selectedCard];
      }
      return {};  // 선택된 카드가 없을 때 빈 객체 반환
    },
    formattedDescription() {
      // \n 문자를 <br>로 변환하여 HTML 형식으로 반환
      return this.selectedCardData.description ? this.selectedCardData.description.replace(/\n/g, '<br>') : '';
    }
  },
  created() {
    this.fetchItemsList();
  },
  methods: {
    getImageSrc(index) {
      const images = [
        this.ServiceInfoimg1,
        this.ServiceInfoimg2,
        this.ServiceInfoimg3,
        this.ServiceInfoimg4,
      ];
      return images[index - 1];
    },
    fetchItemsList() {
      axios.get('http://localhost:8000/api/dashboard/')
        .then(res => {
          this.KeepingCards = res.data.keeping_services.map(service => ({
            main_image: 'http://localhost:8000/media/' + service.main_image,
            detail_image: 'http://localhost:8000/media/' + service.detail_image,
            name: service.name,
            description: service.description,
            base_price: service.base_price,
            additional_price: service.additional_price,
          }));

          console.log("Keeping Card items is : \n", this.KeepingCards)

          this.LendingCards = res.data.lending_services.map(service => ({
            main_image: 'http://localhost:8000/media/' + service.main_image,
            detail_image: 'http://localhost:8000/media/' + service.detail_image,
            name: service.name,
            description: service.description,
            base_price: service.base_price,
            additional_price: service.additional_price,
          }));
        })
        .catch(err => {
          if (err.response) {
            alert(err.response.status + ' ' + err.response.statusText);
          } else {
            console.error("Error", err.message);
            alert("Error: " + err.message);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    selectService(serviceType) {
      this.currentService = serviceType;
    },
    openDialog(cardIndex) {
      this.selectedCard = cardIndex;
      this.dialog = true;
    },
    goToReservationPage() {
      this.$router.push({ name: 'Reservation' });
    }
  }
};
</script>

<style>
.text-center {
  text-align: center;
}

.right-border {
  border-right: 1px solid #000;
}

.selected {
  background-color: #CFD8DC;
}
</style>
