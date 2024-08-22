<template>
  <v-container style="max-width: 1000px; margin: 0 auto;">
    <v-row align="center" justify="space-around">
      <v-col cols="12" style="padding-left:0%; padding-right: 0%;">
        <v-carousel v-model="model">
          <v-carousel-item v-for="(color, i) in colors" :key="color">
            <v-sheet :color="color" height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <v-container>
                  <!-- 이미지 슬라이드 -->
                  <v-row class="d-none d-md-flex" justify="space-between">
                    <v-col v-for="n in 4" :key="'pc-image-' + n" cols="3">
                      <v-img :src="getImageSrc(n)" aspect-ratio="1.5"></v-img>
                    </v-col>
                  </v-row>
                  <v-row class="d-flex d-md-none" justify="center">
                    <v-col v-for="n in 4" :key="'mobile-image-' + n" cols="12">
                      <v-img :src="getImageSrc(n)" aspect-ratio="1.5"></v-img>
                    </v-col>
                  </v-row>
                </v-container>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
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
