<template>
  <v-container class="service-info-container" fluid>
    <!-- 설명 텍스트 섹션 -->
    <v-card class="mb-5" outlined>
      <v-card-title class="headline font-weight-bold">에어라커 서비스 안내</v-card-title>
      <v-card-text>
        <p>
          고객님의 소중한 짐과 옷을 24시 안전하게 보관합니다.<br>공기청정기와 스타일러(에어드레서)를 사용해 항상 쾌적하고 깨끗한 환경을 유지하며, 고객님의 옷을 최상의 상태로
          보관합니다.<br>보관/회수 시 모두 에어라커 직원이 고객님께 찾아갑니다.
        </p>
        <p>
        <ul>
          <li>보관 및 대여 가능 물품을 확인하시려면 이 <v-btn rounded color="primary" dark text
              @click="goToPage('ServiceItems')">버튼</v-btn>을 눌러주세요!</li>
          <li>예약하기 페이지로 가시려면 이 <v-btn rounded color="primary" dark text @click="goToPage('Reservation')">버튼</v-btn>을
            눌러주세요!</li>
          <li>예약확인 페이지로 가시려면 이 <v-btn rounded color="primary" dark text
              @click="goToPage('ReservationCheck')">버튼</v-btn>을 눌러주세요!</li>
          <li>FAQ 페이지로 가시려면 이 <v-btn rounded color="primary" dark text @click="goToPage('Faqs')">버튼</v-btn>을 눌러주세요!</li>
          <li>위치를 확인하시려면 이 <v-btn rounded color="primary" dark text @click="scrollToLocation">버튼</v-btn>을 눌러주세요</li>
        </ul>
        </p>
      </v-card-text>
    </v-card>

    <!-- 맡기기 / 빌리기 장점 섹션 -->
    <v-card class="mx-auto mb-5" outlined>
      <v-row>
        <v-col cols="12" md="6">
          <v-card-title class="font-weight-bold" color="blue lighten-1" style="border-right: 1px solid #eee">보관 서비스
            장점</v-card-title>
          <v-card-text style="border-right: 1px solid #eee">
            <ul class="benefits-list">
              <li><strong>의류관리기(스타일러)</strong>를 사용하여 옷을 무료로 관리해 드립니다.</li>
              <li><strong>합리적인 가격</strong>으로 부담없이 보관할 수 있습니다.</li>
              <li><strong>공기청정기</strong>를 사용하여 쾌적한 환경에서 의류를 보관합니다.</li>
            </ul>
          </v-card-text>
        </v-col>

        <v-col cols="12" md="6">
          <v-card-title class="font-weight-bold" color="green lighten-1">대여 서비스 장점</v-card-title>
          <v-card-text>
            <ul class="benefits-list">
              <li>다양한 <strong>여행 필수 아이템</strong>으로 편리한 여행을 지원합니다.</li>
              <li><strong>합리적인 가격</strong>으로 부담없이 대여할 수 있습니다.</li>
              <li><strong>고품질 아이템</strong>으로 쾌적한 여행을 즐기실 수 있습니다.</li>
            </ul>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <!-- 맡기기 / 빌리기 개별 안내 섹션 -->
    <v-card class="mx-auto mb-5" outlined>
      <v-row>
        <v-col cols="12" md="6">
          <v-card-title class="font-weight-bold" color="blue lighten-1" style="border-right: 1px solid #eee">보관 서비스
            안내</v-card-title>
          <v-card-text style="border-right: 1px solid #eee">
            <ul class="benefits-list">
              <li>고객님의 소중한 짐과 옷을 24시간 안전하게 보관합니다.</li>
              <li>보관/회수 시 모두 에어라커 직원이 고객님께 찾아갑니다.</li>
            </ul>
          </v-card-text>
        </v-col>

        <v-col cols="12" md="6">
          <v-card-title class="font-weight-bold" color="green lighten-1">대여 서비스 안내</v-card-title>
          <v-card-text>
            <ul class="benefits-list">
              <li>여행시 필요한 다양한 아이템이 구비되어 있습니다.</li>
              <li>대여/반납 시 모두 에어라커 직원이 고객님께 찾아갑니다.</li>
            </ul>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <!-- 위치 안내 섹션 -->
    <v-card class="mb-5" outlined id="location-section">
      <v-card-title class="headline font-weight-bold">위치 안내</v-card-title>
      <v-card-subtitle>
        1층에서 오시는 방법
      </v-card-subtitle>
      <v-card-text>
        <!-- 이미지들을 순차적으로 배치 -->
        <v-img max-width="100%" :src="floor_one_0" class="location-img"></v-img>
        <v-img max-width="100%" :src="floor_one_1" class="location-img"></v-img>
        <v-img max-width="100%" :src="floor_one_2" class="location-img"></v-img>
        <v-img max-width="100%" :src="floor_mannam" class="location-img"></v-img>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-subtitle>
        3층에서 오시는 방법
      </v-card-subtitle>
      <v-card-text>
        <!-- 이미지들을 순차적으로 배치 -->
        <v-img max-width="100%" :src="floor_three_0" class="location-img"></v-img>
        <v-img max-width="100%" :src="floor_three_1" class="location-img"></v-img>
        <v-img max-width="100%" :src="floor_three_2" class="location-img"></v-img>
        <v-img max-width="100%" :src="floor_mannam" class="location-img"></v-img>
      </v-card-text>
    </v-card>


    <!-- 예약 방법 / 확인 방법 안내 섹션 -->
    <v-card class="mb-5" outlined>
      <v-card-title>예약 방법</v-card-title>
      <v-card-text>
        <v-img max-width="100%" :src="reserv_guide" class="location-img"></v-img>
      </v-card-text>
    </v-card>
    <v-card class="mb-5" outlined>
      <v-card-title>예약확인 방법</v-card-title>
      <v-card-text>
        <v-img max-width="100%" :src="reserv_check_guide" class="location-img"></v-img>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ServiceInfoPage',
  data() {
    return {
      floor_one_0: require('@/assets/1floor_0.png'),
      floor_one_1: require('@/assets/1floor_1.png'),
      floor_one_2: require('@/assets/1floor_2.png'),
      floor_mannam: require('@/assets/2floor_mannam.png'),
      floor_three_0: require('@/assets/3floor_0.png'),
      floor_three_1: require('@/assets/3floor_1.png'),
      floor_three_2: require('@/assets/3floor_2.png'),
      reserv_guide: require('@/assets/reserv_guide.png'),
      reserv_check_guide: require('@/assets/reserv_check_guide.png'),
    };
  },
  methods: {
    goToPage(pageName) {
      this.$router.push({ name: pageName });
    },
    scrollToLocation() {
      const locationSection = document.getElementById('location-section');
      if (locationSection) {
        locationSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
  }
};
</script>

<style scoped>
.service-info-container {
  max-width: 1200px;
  margin: 0 auto;
}

.benefits-list {
  padding-left: 20px;
  list-style-type: disc;
}

.benefits-list li {
  margin-bottom: 10px;
  font-size: 16px;
}

.headline {
  font-size: 24px;
}

.font-weight-bold {
  font-weight: bold;
}
</style>
