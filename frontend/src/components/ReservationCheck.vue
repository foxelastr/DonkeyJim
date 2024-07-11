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
              <td>{{ item.phone }}</td>
              <td>{{ item.service }}</td>
              <td>
                <v-chip-group>
                  <v-chip v-for="(subService, index) in item.subServices" :key="index" small>
                    {{ subService }}
                  </v-chip>
                </v-chip-group>
              </td>
              <td>{{ item.reservationDate }}</td>
              <td>{{ item.expiryDate }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'ReservationCheckPage',
  data() {
    return {
      name: '',
      phone: '',
      showReservationList: false,
      headers: [
        { text: '이름', value: 'name' },
        { text: '전화번호', value: 'phone' },
        { text: '서비스 항목', value: 'service' },
        { text: '세부 서비스 항목', value: 'subServices' },
        { text: '예약 날짜', value: 'reservationDate' },
        { text: '만료 날짜', value: 'expiryDate' },
      ],
      reservations: [
        {
          name: '홍길동',
          phone: '010-1234-5678',
          service: '맡기기',
          subServices: ['a', 'b'],
          reservationDate: '2024-07-10',
          expiryDate: '2024-07-20',
        },
        {
          name: '김철수',
          phone: '010-8765-4321',
          service: '빌리기',
          subServices: ['x', 'y'],
          reservationDate: '2024-07-11',
          expiryDate: '2024-07-21',
        },
        // 더 많은 예약 항목 추가 가능
      ],
    };
  },
  computed: {
    filteredReservations() {
      return this.reservations.filter(
        reservation => reservation.name === this.name && reservation.phone === this.phone
      );
    },
  },
  methods: {
    checkReservation() {
      if (this.name && this.phone) {
        this.showReservationList = true;
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
