<template>
  <v-container>
    <h1>예약 확인 페이지</h1>

    <v-card class="mb-5">
      <v-card-title>예약 확인</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="name" label="이름" required></v-text-field>
          <v-text-field v-model="phone" label="핸드폰번호 : 숫자만 입력하세요" required></v-text-field>
          <v-btn color="primary" @click="checkReservation">확인하기</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card v-if="showReservationList" class="mt-5">
      <v-card-title>예약 목록</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="reservations" class="elevation-1">
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
              <td>
                <v-chip-group>
                  <v-chip v-for="(subService, index) in item.keeping_services" :key="index" small>
                    {{ subService }}
                  </v-chip>
                </v-chip-group>
              </td>
              <td>
                <v-chip-group>
                  <v-chip v-for="(subService, index) in item.lending_services" :key="index" small>
                    {{ subService }}
                  </v-chip>
                </v-chip-group>
              </td>
              <td>{{ item.start_date }}</td>
              <td>{{ item.end_date }}</td>
              <td>{{ formatPrice(item.total_price) }}</td>
              <td v-if="isManager">
                <v-chip :color="item.change_status ? 'blue' : ''">
                  {{ item.change_status ? 'Changed' : '' }}
                </v-chip>
              </td>
              <td v-if="isManager">
                <v-chip :color="item.initial_verification ? 'yellow' : ''">
                  {{ item.initial_verification ? 'Initial Check' : '' }}
                </v-chip>
              </td>
              <td v-if="isManager">
                <v-chip :color="item.final_verification ? 'red' : ''">
                  {{ item.final_verification ? 'Final Check' : '' }}
                </v-chip>
              </td>
              <td v-if="!isManager">
                <v-btn color="primary" @click="updateReservation(item)">예약 변경</v-btn>
              </td>
              <td v-if="isManager">
                <v-btn color="primary" @click="performAction1(item)">Action 1</v-btn>
                <v-btn color="secondary" @click="performAction2(item)">Action 2</v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReservationCheckPage',
  data() {
    return {
      name: '',
      phone: '',
      showReservationList: false,
      isManager: false, // 추가
      headers: [
        { text: '이름', value: 'name' },
        { text: '전화번호', value: 'phone_number' },
        { text: '맡긴 서비스', value: 'keeping_services' },
        { text: '빌린 서비스', value: 'lending_services' },
        { text: '예약 날짜', value: 'start_date' },
        { text: '만료 날짜', value: 'end_date' },
        { text: '총 가격', value: 'total_price' },
        { text: '변경 상태', value: 'change_status', align: 'center', sortable: false }, // 추가
        { text: '초기 확인', value: 'initial_verification', align: 'center', sortable: false }, // 추가
        { text: '최종 확인', value: 'final_verification', align: 'center', sortable: false }, // 추가
      ],
      reservations: [],
    };
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

          console.log(("response data is : ", response.data))

          let responseData = response.data;

          if (!Array.isArray(responseData)) {
            responseData = [responseData];
          }

          if (response.data.length === 0) {
            alert('예약 내역이 없습니다.');
            this.showReservationList = false;
          } else {
            this.reservations = responseData;
            this.isManager = responseData.some(reservation => 'change_status' in reservation);
            this.showReservationList = true;
          }
        } catch (error) {
          console.error(error);
          alert('오늘의 예약이 없습니다.');
        }
      } else {
        this.$refs.form.validate();
      }
    },
    async performAction1(item) {
      try {
        const response = await axios.post(`http://localhost:8000/api/update-initial-verification/${item.id}/`);
        console.log('Action 1 response:', response.data);
        this.$set(item, 'initial_verification', true); // 업데이트 후 상태 반영
        alert('Initial verification updated successfully.');
      } catch (error) {
        console.error('Error updating initial verification:', error);
        alert('Failed to update initial verification.');
      }
    },

    async performAction2(item) {
      try {
        const response = await axios.post(`http://localhost:8000/api/update-final-verification/${item.id}/`);
        console.log('Action 2 response:', response.data);
        this.$set(item, 'final_verification', true); // 업데이트 후 상태 반영
        alert('Final verification updated successfully.');
      } catch (error) {
        console.error('Error updating final verification:', error);
        alert('Failed to update final verification.');
      }
    },
    formatPrice(value) {
      if (!value) return '';
      return Math.floor(value).toLocaleString();
    },
  },
};
</script>

<style scoped>
/* 필요한 스타일을 여기에 추가하세요 */
</style>
