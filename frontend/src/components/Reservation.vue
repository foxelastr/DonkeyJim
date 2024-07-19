<template>
  <v-container>
    <v-form ref="form">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="name" label="이름" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="phone" label="전화번호" required></v-text-field>
        </v-col>
      </v-row>

      <v-row v-for="(service, index) in servicesList" :key="index" class="mb-3">
        <v-col cols="12">
          <v-select v-model="service.selectedService" :items="services" label="서비스 항목" @change="clearSubServices(index)"
            required></v-select>
        </v-col>
        <v-col cols="12">
          <v-select v-model="service.selectedSubService" :items="getSubServiceItems(service.selectedService)"
            label="세부 서비스 항목" @change="addSubService(index)"></v-select>
        </v-col>
        <v-col cols="12" v-if="service.subServices.length">
          <div>
            <v-chip v-for="(subService, subIndex) in service.subServices" :key="subIndex" class="ma-2" close
              @click:close="removeSubService(index, subIndex)">
              {{ subService }}
            </v-chip>
          </div>
        </v-col>
      </v-row>

      <v-btn color="primary" @click="addService">추가</v-btn>

      <v-row>
        <v-col cols="12" sm="6">
          <v-date-picker v-model="dates" range></v-date-picker>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar" readonly></v-text-field>
        </v-col>
      </v-row>

      <v-btn color="primary" @click="submitForm">예약하기</v-btn>
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
      servicesList: [
        {
          selectedService: '',
          selectedSubService: '',
          subServices: [],
        },
      ],
      services: ['맡기기', '빌리기'],
      depositServices: ['a', 'b', 'c'],
      rentServices: ['x', 'y', 'z'],
    };
  },
  computed: {
    dateRangeText() {
      if (this.dates.length === 2) {
        return `${this.formatDate(this.dates[0])} - ${this.formatDate(this.dates[1])}`;
      }
      return '';
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    getSubServiceItems(service) {
      return service === '맡기기' ? this.depositServices : this.rentServices;
    },
    clearSubServices(index) {
      this.servicesList[index].subServices = [];
    },
    addSubService(index) {
      const service = this.servicesList[index];
      if (
        service.selectedSubService &&
        !service.subServices.includes(service.selectedSubService)
      ) {
        service.subServices.push(service.selectedSubService);
        service.selectedSubService = null;
      }
    },
    removeSubService(serviceIndex, subIndex) {
      this.servicesList[serviceIndex].subServices.splice(subIndex, 1);
    },
    addService() {
      this.servicesList.push({
        selectedService: '',
        selectedSubService: '',
        subServices: [],
      });
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        const reservationData = {
          name: this.name,
          phone_number: this.phone,
          keeping_service: this.servicesList.filter(service => service.selectedService === '맡기기').map(service => service.subServices.join(',')).join(','),
          lending_service: this.servicesList.filter(service => service.selectedService === '빌리기').map(service => service.subServices.join(',')).join(','),
          start_date: this.dates.length > 0 ? this.formatDate(this.dates[0]) : null,
          end_date: this.dates.length > 1 ? this.formatDate(this.dates[1]) : null,
          total_price: 0,  // 가격 계산 로직 추가 필요
          terms_agreed: true,  // 약관 동의 여부
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
