<template>
  <v-container>
    <h1>Reservation Check Page</h1>

    <v-card class="mb-5">
      <v-card-title>예약 확인</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="name" label="이름" required></v-text-field>
          <v-text-field v-model="phone" label="전화번호" required></v-text-field>
          <v-btn color="primary" @click="checkReservation">확인하기</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card v-if="showReservationList" class="mt-5">
      <v-card-title>예약 목록</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="filteredReservations" class="elevation-1">
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>Reservation List</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
            </v-toolbar>
          </template>
          <template #item="{ item }">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.phone_number }}</td>
              <td>{{ item.service }}</td>
              <td>
                <v-chip-group>
                  <v-chip v-for="(subService, index) in item.subServices" :key="index" small>
                    {{ subService }}
                  </v-chip>
                </v-chip-group>
              </td>
              <td>{{ item.start_date }}</td>
              <td>{{ item.end_date }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'; // axios import

export default {
  name: 'ReservationCheckPage',
  data() {
    return {
      name: '',
      phone: '',
      showReservationList: false,
      headers: [
        { text: '이름', value: 'name' },
        { text: '전화번호', value: 'phone_number' },
        { text: '서비스 항목', value: 'service' },
        { text: '세부 서비스 항목', value: 'subServices' },
        { text: '예약 날짜', value: 'start_date' },
        { text: '만료 날짜', value: 'end_date' },
      ],
      reservations: [],
    };
  },
  computed: {
    filteredReservations() {
      return this.reservations.filter(
        reservation => reservation.name === this.name && reservation.phone_number === this.phone
      );
    },
  },
  methods: {
    async checkReservation() {
      if (this.name && this.phone) {
        try {
          const response = await axios.get('http://localhost:8000/api/reservcheck/', {
            params: {
              name: this.name,
              phone_number: this.phone,
            },
          });
          this.reservations = response.data; // 서버에서 받은 데이터로 reservations 업데이트
          this.showReservationList = true;
        } catch (error) {
          console.error(error);
          alert('예약 정보를 불러오지 못했습니다.');
        }
      } else {
        this.$refs.form.validate();
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
