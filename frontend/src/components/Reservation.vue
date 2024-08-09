<template>
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="name" label="이름" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="phone" label="핸드폰번호 : 숫자만 입력하세요" type="number" @keypress="isNumber"
            required></v-text-field>
        </v-col>
      </v-row>

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
                  <v-text-field v-model.number="depositQuantities[index]" label="수량" type="number" min="0"
                    @input="updateTotalPrice">
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
                  <v-text-field v-model.number="rentQuantities[index]" label="수량" type="number" min="0"
                    @input="updateTotalPrice">
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

      <v-btn color="primary" @click="submitForm" :disabled="!isFormValid">예약하기</v-btn>

      <v-dialog v-model="showTerms" max-width="600px">
        <v-card>
          <v-card-title class="headline">약관</v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="showTerms = false">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReservationPage',
  data() {
    return {
      name: '',
      phone: '',
      dates: [],  // Date range array
      depositServices: [],
      rentServices: [],
      depositSelected: [],  // "맡기기" 서비스 항목의 선택 상태를 저장
      rentSelected: [],  // "빌리기" 서비스 항목의 선택 상태를 저장
      depositQuantities: [],  // "맡기기" 서비스 항목의 수량을 저장
      rentQuantities: [],  // "빌리기" 서비스 항목의 수량을 저장
      selectedStartTime: '',
      selectedEndTime: '',
      termsAgreed: false,
      showTerms: false,
      totalPrice: 0,
      selectedPaymentMethod: '',  // 결제 방법
      timeOptions: [
        '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
        '20:00', '21:00', '22:00'
      ],
    };
  },
  computed: {
    dateRangeText() {
      if (this.dates.length === 2) {
        return `${this.formatDate(this.dates[0])} - ${this.formatDate(this.dates[1])}`;
      }
      return '';
    },
    isFormValid() {
      return (
        this.name &&
        this.isValidPhoneNumber(this.phone) &&  // 핸드폰 번호 유효성 검사
        this.dates.length === 2 &&
        this.selectedStartTime &&
        this.selectedEndTime &&
        this.termsAgreed &&
        this.selectedPaymentMethod  // 결제 방법이 선택되었는지 확인
      );
    },
  },
  watch: {
    dates: 'updateTotalPrice',
    depositSelected: {
      handler: 'updateTotalPrice',
      deep: true,
    },
    rentSelected: {
      handler: 'updateTotalPrice',
      deep: true,
    },
    depositQuantities: {
      handler: 'updateTotalPrice',
      deep: true,
    },
    rentQuantities: {
      handler: 'updateTotalPrice',
      deep: true,
    },
  },
  created() {
    axios.get('http://localhost:8000/api/items/')
      .then(response => {
        this.depositServices = response.data.keeping_services;
        this.rentServices = response.data.lending_services;
        // Initialize selected objects with false values
        this.depositServices.forEach((service, index) => {
          this.$set(this.depositSelected, index, false);
          this.$set(this.depositQuantities, index, 0);
        });
        this.rentServices.forEach((service, index) => {
          this.$set(this.rentSelected, index, false);
          this.$set(this.rentQuantities, index, 0);
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
      this.updateTotalPrice();
    },
    handleRentChange(index) {
      if (this.rentSelected[index]) {
        this.$set(this.rentQuantities, index, 1);
      } else {
        this.$set(this.rentQuantities, index, 0);
      }
      this.updateTotalPrice();
    },
    incrementQuantity(quantities, index) {
      this.$set(quantities, index, quantities[index] + 1);
    },
    decrementQuantity(quantities, index) {
      if (quantities[index] > 0) {
        this.$set(quantities, index, quantities[index] - 1);
      }
    },
    sortDates() {
      if (this.dates.length === 2) {
        this.dates.sort((a, b) => new Date(a) - new Date(b));
      }
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    isValidPhoneNumber(phone) {
      const phoneRegex = /^\d{11}$/;
      return phoneRegex.test(phone);
    },
    isNumber(evt) {
      const charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
      }
    },
    updateTotalPrice() {
      const baseDays = 3;
      let totalPrice = 0;
      const totalDays = this.dates.length > 1 ? (new Date(this.dates[1]) - new Date(this.dates[0])) / (1000 * 60 * 60 * 24) + 1 : 1;

      // Calculate for keeping services
      this.depositServices.forEach((service, index) => {
        if (this.depositSelected[index]) {
          const additionalDays = Math.max(0, totalDays - baseDays);
          totalPrice += (service.base_price + (additionalDays * service.additional_price)) * this.depositQuantities[index];
        }
      });

      // Calculate for lending services
      this.rentServices.forEach((service, index) => {
        if (this.rentSelected[index]) {
          const additionalDays = Math.max(0, totalDays - baseDays);
          totalPrice += (service.base_price + (additionalDays * service.additional_price)) * this.rentQuantities[index];
        }
      });

      this.totalPrice = totalPrice;
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        if (!this.isValidPhoneNumber(this.phone)) {
          alert('핸드폰 번호를 확인해주세요. - 를 제외한 숫자로만 ');
          return;
        }

        const keepingQuantities = this.depositQuantities.filter((quantity, index) => this.depositSelected[index])

        const keepingServices = this.depositServices
          .filter((service, index) => this.depositSelected[index])
          .map((service, index) => ({
            name: service.name,
            quantity: keepingQuantities[index],
          }));
        console.log("keeping services printed : ", keepingServices)

        const lendingQuantities = this.rentQuantities.filter((quantity, index) => this.rentSelected[index])

        const lendingServices = this.rentServices
          .filter((service, index) => this.rentSelected[index])
          .map((service, index) => ({
            name: service.name,
            quantity: lendingQuantities[index],
          }));
        console.log("lending services printed : ", lendingServices)

        const reservationData = {
          name: this.name,
          phone_number: this.phone,
          keeping_services: keepingServices.map(s => s.name),
          keeping_quantities: keepingServices.map(s => s.quantity),
          lending_services: lendingServices.map(s => s.name),
          lending_quantities: lendingServices.map(s => s.quantity),
          start_date: this.dates.length > 0 ? this.formatDate(this.dates[0]) : null,
          end_date: this.dates.length > 1 ? this.formatDate(this.dates[1]) : null,
          start_time: this.selectedStartTime,
          end_time: this.selectedEndTime,
          total_price: this.totalPrice,
          terms_agreed: this.termsAgreed,  // 약관 동의 여부
          payment_method: this.selectedPaymentMethod,  // 결제 방법
        };

        // 폼 데이터 콘솔에 출력
        console.log('Reservation Data:', reservationData);

        axios.post('http://localhost:8000/api/reservation/', reservationData)
          .then(response => {
            alert('예약이 완료되었습니다!');
            console.log('API Response:', response);
          })
          .catch(error => {
            console.error('예약 중 오류가 발생했습니다:', error);
          });
      }
    },
  },
};
</script>

<style scoped>
.serviceType {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
