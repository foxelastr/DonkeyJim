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
        <v-col cols="12" md="6">
          <v-menu ref="reservationDateMenu" v-model="reservationDateMenu" :close-on-content-click="false"
            :return-value.sync="reservationDate" transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-bind="attrs" v-on="on" :value="formattedReservationDate" label="예약 날짜"
                prepend-icon="mdi-calendar" readonly></v-text-field>
            </template>
            <v-date-picker v-model="reservationDate" no-title scrollable
              @change="updateReservationDate"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu ref="expiryDateMenu" v-model="expiryDateMenu" :close-on-content-click="false"
            :return-value.sync="expiryDate" transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-bind="attrs" v-on="on" :value="formattedExpiryDate" label="만료 날짜"
                prepend-icon="mdi-calendar" readonly></v-text-field>
            </template>
            <v-date-picker v-model="expiryDate" no-title scrollable @change="updateExpiryDate"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-btn color="primary" @click="submitForm">예약하기</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'ReservationPage',
  data() {
    return {
      name: '',
      phone: '',
      reservationDate: null,
      reservationDateMenu: false,
      expiryDate: null,
      expiryDateMenu: false,
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
    formattedReservationDate() {
      return this.reservationDate ? this.formatDate(this.reservationDate) : '';
    },
    formattedExpiryDate() {
      return this.expiryDate ? this.formatDate(this.expiryDate) : '';
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
    updateReservationDate(date) {
      this.reservationDate = date;
      this.reservationDateMenu = false;
    },
    updateExpiryDate(date) {
      this.expiryDate = date;
      this.expiryDateMenu = false;
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        // Form submission logic
        alert('예약이 완료되었습니다!');
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
