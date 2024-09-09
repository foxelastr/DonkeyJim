<template>
  <v-container>
    <h1>예약 확인</h1>

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
        <v-data-table :headers="tableHeaders" :items="reservations" class="elevation-1">
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>Reservation List</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
            </v-toolbar>
          </template>
          <template #item="{ item, index }">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.phone_number }}</td>
              <td>
                <v-chip-group>
                  <v-chip v-for="(subService, idx) in item.keeping_services" :key="idx" small>
                    {{ subService }}
                  </v-chip>
                </v-chip-group>
              </td>
              <td>
                <v-chip-group>
                  <v-chip v-for="(subService, idx) in item.lending_services" :key="idx" small>
                    {{ subService }}
                  </v-chip>
                </v-chip-group>
              </td>
              <td>{{ item.start_date }}</td>
              <td>{{ item.end_date }}</td>
              <td>{{ formatPrice(item.total_price) }}</td>
              <td v-if="!isManager">
                <v-btn small color="primary" @click="navigateToReservation(item)">변경하기</v-btn>
              </td>
              <td v-if="isManager">
                <v-chip :color="item.change_status ? 'blue' : ''">
                  {{ item.change_status ? 'Changed' : '' }}
                </v-chip>
              </td>
              <!-- initial_verification -->
              <td v-if="isManager">
                <v-chip :color="verifications[index].initial_verification ? 'yellow' : ''">
                  {{ verifications[index].initial_verification ? 'Initial Check' : '' }}
                </v-chip>
              </td>
              <!-- final_verification -->
              <td v-if="isManager">
                <v-chip :color="verifications[index].final_verification ? 'red' : ''">
                  {{ verifications[index].final_verification ? 'Final Check' : '' }}
                </v-chip>
              </td>
              <!-- action buttons -->
              <td v-if="isManager">
                <v-btn small color="primary" @click="performAction1(item, index)">Action 1</v-btn>
                <v-btn small color="secondary" @click="performAction2(item, index)">Action 2</v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';

export default {
  name: 'ReservationCheckPage',
  data() {
    return {
      name: '',
      phone: '',
      showReservationList: false,
      isManager: false,
      reservations: [],
      verifications: [],
    };
  },
  computed: {
    tableHeaders() {
      let baseHeaders = [
        { text: '이름', value: 'name' },
        { text: '전화번호', value: 'phone_number' },
        { text: '맡긴 서비스', value: 'keeping_services' },
        { text: '빌린 서비스', value: 'lending_services' },
        { text: '예약 날짜', value: 'start_date' },
        { text: '만료 날짜', value: 'end_date' },
        { text: '총 가격', value: 'total_price' },
      ];

      if (!this.isManager) {
        baseHeaders.push(
          { text: '변경하기', value: 'action_buttons', align: 'center', sortable: false }
        );
      } else {
        baseHeaders.push(
          { text: '변경 상태', value: 'change_status', align: 'center', sortable: false },
          { text: '초기 확인', value: 'initial_verification', align: 'center', sortable: false },
          { text: '최종 확인', value: 'final_verification', align: 'center', sortable: false },
          { text: 'Actions', value: 'action_buttons', align: 'center', sortable: false }
        );
      }

      return baseHeaders;
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

          console.log("response data is : ", response.data);

          let responseData = response.data.response_data;

          if (!Array.isArray(responseData)) {
            responseData = [responseData];
          }

          if (responseData.length === 0) {
            alert('예약 내역이 없습니다.');
            this.showReservationList = false;
          } else {
            if (!response.data.is_manager) {
              // isManager = false인 경우, id가 가장 큰 항목만 필터링
              const maxIdItem = responseData.reduce((prev, current) => (prev.id > current.id) ? prev : current);
              responseData = [maxIdItem];
            }

            // reservations로 관리할 데이터 추출
            this.reservations = responseData.map(item => {
              const { initial_verification, final_verification, ...reservationData } = item;
              return reservationData;
            });

            // verifications로 관리할 데이터 추출
            this.verifications = responseData.map(item => ({
              initial_verification: item.initial_verification,
              final_verification: item.final_verification
            }));

            console.log("RESERVATIONS : ", this.reservations);
            console.log("VERIFICATIONS : ", this.verifications);

            this.isManager = response.data.is_manager;
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

    navigateToReservation(item) {
      // 라우터를 통해 ReservationPage로 이동
      this.$router.push({
        name: 'Reservation',
        params: { id: item.id }
      });
    },

    async performAction1(item, index) {
      try {
        const response = await axios.post(`http://localhost:8000/api/update-initial-verification/${item.id}/`);
        console.log('Action 1 response:', response.data);

        Vue.set(this.verifications, index, {
          ...this.verifications[index],
          initial_verification: true,
        });

        console.log("action button resonse : ", this.verifications[index])

        alert('Initial verification updated successfully.');
      } catch (error) {
        console.error('Error updating initial verification:', error);
        alert('Failed to update initial verification.');
      }
    },

    async performAction2(item, index) {
      try {
        const response = await axios.post(`http://localhost:8000/api/update-final-verification/${item.id}/`);
        console.log('Action 2 response:', response.data);

        Vue.set(this.verifications, index, {
          ...this.verifications[index],
          final_verification: true,
        });

        console.log("action button resonse : ", this.verifications[index])

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
