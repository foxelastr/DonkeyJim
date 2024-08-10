<template>
  <v-container>
    <h1>Reservation Update Page</h1>
    <v-form ref="form">
      <!-- 기존의 이름, 전화번호 등의 필드 -->
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="name" label="이름" readonly></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="phone" label="핸드폰번호" readonly></v-text-field>
        </v-col>
      </v-row>

      <!-- 서비스 선택 영역 -->
      <v-card flat>
        <v-container fluid>
          <v-row class="child-flex">
            <v-col cols="6">
              <v-toolbar>
                <v-spacer></v-spacer>
                <v-toolbar-title>맡기기</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-row v-for="(item, index) in depositServices" :key="item.name + '-counter'">
                <v-col cols="8">
                  <v-checkbox :label="item.name" v-model="depositSelected[index]"
                    @change="handleDepositChange(index)"></v-checkbox>
                </v-col>
                <v-col cols="4" v-if="depositSelected[index]">
                  <v-text-field v-model.number="depositQuantities[index]" label="수량" type="number" min="0">
                    <template v-slot:append>
                      <v-btn icon @click="incrementQuantity(depositQuantities, index)">
                        <v-icon>mdi-chevron-up</v-icon>
                      </v-btn>
                      <v-btn icon @click="decrementQuantity(depositQuantities, index)">
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-toolbar dark>
                <v-spacer></v-spacer>
                <v-toolbar-title>빌리기</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-row v-for="(item, index) in rentServices" :key="item.name + '-counter'">
                <v-col cols="8">
                  <v-checkbox :label="item.name" v-model="rentSelected[index]"
                    @change="handleRentChange(index)"></v-checkbox>
                </v-col>
                <v-col cols="4" v-if="rentSelected[index]">
                  <v-text-field v-model.number="rentQuantities[index]" label="수량" type="number" min="0">
                    <template v-slot:append>
                      <v-btn icon @click="incrementQuantity(rentQuantities, index)">
                        <v-icon>mdi-chevron-up</v-icon>
                      </v-btn>
                      <v-btn icon @click="decrementQuantity(rentQuantities, index)">
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <!-- 날짜와 시간 정보 삽입 -->
      <v-row>
        <v-col cols="12" md="6">
          <v-date-picker v-model="dates" range @change="sortDates"></v-date-picker>
          <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar" readonly></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select v-model="selectedStartTime" :items="timeOptions" label="출발 시각" required></v-select>
          <v-select v-model="selectedEndTime" :items="timeOptions" label="도착 시각" required></v-select>
        </v-col>
      </v-row>

      <!-- 결제 방법 선택 추가 -->
      <v-row>
        <v-col cols="12">
          <v-btn-toggle v-model="selectedPaymentMethod" mandatory>
            <v-btn :value="'계좌이체'" color="primary">계좌이체</v-btn>
            <v-btn :value="'현장결제(카드)'" color="primary">현장결제(카드)</v-btn>
            <v-btn :value="'현장결제(현금)'" color="primary">현장결제(현금)</v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>

      <!-- 약관 동의 및 총 가격 -->
      <v-row>
        <v-col cols="12">
          <v-checkbox v-model="termsAgreed" label="약관 동의"></v-checkbox>
          <v-btn text @click="showTerms = true">약관 보기</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-alert type="info">총 가격: {{ totalPrice }}원</v-alert>
        </v-col>
      </v-row>

      <!-- 변경하기 버튼 -->
      <v-btn color="primary" @click="submitForm" :disabled="!isFormValid">변경하기</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReservationUpdatePage',
  data() {
    return {
      name: '',
      phone: '',
      depositServices: [],
      rentServices: [],
      depositSelected: [],
      rentSelected: [],
      depositQuantities: [],
      rentQuantities: [],
      selectedStartTime: '',
      selectedEndTime: '',
      selectedPaymentMethod: '',
      dates: [],  // Date range array
      dateRangeText: '',
      termsAgreed: false,
      totalPrice: 0,
      showTerms: false,
      timeOptions: [
        '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
        '20:00', '21:00', '22:00'
      ],
    };
  },
  created() {
    const queryData = this.$route.query;

    this.name = queryData.name;
    this.phone = queryData.phone_number;
    this.selectedStartTime = queryData.start_time;
    this.selectedEndTime = queryData.end_time;
    this.selectedPaymentMethod = queryData.payment_method;

    // 미리 선택된 날짜와 시간 설정
    if (queryData.start_date && queryData.end_date) {
      this.dates = [new Date(queryData.start_date), new Date(queryData.end_date)];
      this.dateRangeText = `${queryData.start_date} - ${queryData.end_date}`;
    }

    if (queryData.start_time && queryData.end_time) {
      this.selectedStartTime = queryData.start_time;
      this.selectedEndTime = queryData.end_time;
    }

    this.keepingServices = JSON.parse(queryData.keeping_services || '[]');
    this.keepingQuantities = JSON.parse(queryData.keeping_quantities || '[]');
    this.lendingServices = JSON.parse(queryData.lending_services || '[]');
    this.lendingQuantities = JSON.parse(queryData.lending_quantities || '[]');

    axios.get('http://localhost:8000/api/items/')
      .then(response => {
        this.depositServices = response.data.keeping_services;
        this.rentServices = response.data.lending_services;

        this.depositServices.forEach((service, index) => {
          this.$set(this.depositSelected, index, this.keepingServices.includes(service.name));
          this.$set(this.depositQuantities, index, this.keepingQuantities[index] || 0);
        });

        this.rentServices.forEach((service, index) => {
          this.$set(this.rentSelected, index, this.lendingServices.includes(service.name));
          this.$set(this.rentQuantities, index, this.lendingQuantities[index] || 0);
        });
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  },
  methods: {
    handleDepositChange(index) {
      if (this.depositSelected[index]) {
        this.$set(this.depositQuantities, index, 1);
      } else {
        this.$set(this.depositQuantities, index, 0);
      }
    },
    handleRentChange(index) {
      if (this.rentSelected[index]) {
        this.$set(this.rentQuantities, index, 1);
      } else {
        this.$set(this.rentQuantities, index, 0);
      }
    },
    incrementQuantity(quantities, index) {
      this.$set(quantities, index, quantities[index] + 1);
    },
    decrementQuantity(quantities, index) {
      if (quantities[index] > 0) {
        this.$set(quantities, index, quantities[index] - 1);
      }
    },
    submitForm() {
      const updateData = {
        name: this.name,
        phone_number: this.phone,
        keeping_services: this.depositSelected.map((selected, index) => selected ? this.depositServices[index].name : null).filter(Boolean),
        keeping_quantities: this.depositQuantities.filter((_, index) => this.depositSelected[index]),
        lending_services: this.rentSelected.map((selected, index) => selected ? this.rentServices[index].name : null).filter(Boolean),
        lending_quantities: this.rentQuantities.filter((_, index) => this.rentSelected[index]),
        start_time: this.selectedStartTime,
        end_time: this.selectedEndTime,
        payment_method: this.selectedPaymentMethod,
        start_date: this.dates.length > 0 ? this.dates[0].toISOString().substr(0, 10) : null,
        end_date: this.dates.length > 1 ? this.dates[1].toISOString().substr(0, 10) : null,
      };

      axios.put(`http://localhost:8000/api/reservation/${this.$route.params.user_id}/`, updateData)
        .then(response => {
          console.log("RESERVATION UPDATE RESPONSE : ", response.data);
          alert('예약이 성공적으로 업데이트되었습니다!');
          this.$router.push({ name: 'ReservationCheck' });
        })
        .catch(error => {
          console.error('예약 업데이트 중 오류가 발생했습니다:', error);
        });
    },
  },
};
</script>
