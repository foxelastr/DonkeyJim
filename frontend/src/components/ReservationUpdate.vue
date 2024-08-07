<template>
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="reservationData.name" label="이름" required disabled></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="reservationData.phone_number" label="전화번호" required disabled></v-text-field>
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
                  <v-checkbox :label="item.name" v-model="depositSelected[index]"></v-checkbox>
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
                  <v-checkbox :label="item.name" v-model="rentSelected[index]"></v-checkbox>
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

      <v-btn color="primary" @click="submitForm" :disabled="!isFormValid">변경하기</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default {
  name: 'ReservationUpdatePage',
  data() {
    return {
      reservationData: {
        id: null,
        name: '',
        phone_number: '',
      },
      total_price: 0,
      depositServices: [],
      rentServices: [],
      depositSelected: [],
      rentSelected: [],
      depositQuantities: [],
      rentQuantities: [],
      dates: [],
      selectedStartTime: '',
      selectedEndTime: '',
      timeOptions: [
        '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
        '20:00', '21:00', '22:00'
      ],
      csrfToken: '',
    };
  },
  computed: {
    dateRangeText() {
      if (this.dates.length === 2) {
        return `${this.dates[0]} - ${this.dates[1]}`;
      }
      return '';
    },
    isFormValid() {
      return (
        this.dates.length === 2 &&
        this.selectedStartTime &&
        this.selectedEndTime
      );
    },
  },
  created() {
    const userId = this.$route.params.user_id;

    // CSRF 토큰 가져오기
    axios.get('http://localhost:8000/api/csrf_token/', { withCredentials: true })
      .then(response => {
        this.csrfToken = response.data.csrfToken;
        console.log("RECIEVED CSRF TOKEN : ", this.csrfToken);

        // 예약 데이터 가져오기
        return axios.get(`http://localhost:8000/api/update/${userId}`, { withCredentials: true });
      })
      .then(response => {
        this.reservationData = response.data;
        this.dates = [response.data.start_date, response.data.end_date];
        this.selectedStartTime = response.data.start_time;
        this.selectedEndTime = response.data.end_time;
        this.depositSelected = response.data.keeping_services.map(() => true);
        this.depositQuantities = response.data.keeping_quantities;
        this.rentSelected = response.data.lending_services.map(() => true);
        this.rentQuantities = response.data.lending_quantities;
        this.depositServices = response.data.keeping_services;
        this.rentServices = response.data.lending_services;
      })
      .catch(error => {
        console.error('Error fetching reservation data:', error);
        alert('예약 정보를 불러오지 못했습니다.');
      });
  },
  methods: {
    incrementQuantity(quantities, index) {
      this.$set(quantities, index, Number(quantities[index]) + 1);
    },
    decrementQuantity(quantities, index) {
      if (quantities[index] > 0) {
        this.$set(quantities, index, Number(quantities[index]) - 1);
      }
    },
    sortDates() {
      if (this.dates.length === 2) {
        this.dates.sort((a, b) => new Date(a) - new Date(b));
      }
    },
    submitForm() {
      const updatedReservationData = {
        keeping_services: this.depositServices,
        keeping_quantities: this.depositQuantities,
        lending_services: this.rentServices,
        lending_quantities: this.rentQuantities,
        start_date: this.dates[0],
        end_date: this.dates[1],
        start_time: this.selectedStartTime,
        end_time: this.selectedEndTime,
      };

      axios.put(`http://localhost:8000/api/update/${this.reservationData.id}/`, updatedReservationData, {
        headers: {
          'X-CSRFToken': this.csrfToken
        },
        withCredentials: true
      })
        .then(response => {
          alert('예약 정보가 업데이트되었습니다!');
          console.log("Update Response:", response);
        })
        .catch(error => {
          console.error('예약 정보 업데이트 중 오류가 발생했습니다:', error);
        });
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
