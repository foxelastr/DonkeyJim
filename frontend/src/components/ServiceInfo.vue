<template>
  <v-container>
    <v-row align="center" justify="space-around">
      <v-col cols="6" class="text-center right-border" @click="selectService('Keeping')">
        <div class="serviceType">
          <v-btn x-large text>
            맡기기
          </v-btn>
        </div>
      </v-col>
      <v-col cols="6" class="text-center" @click="selectService('Lending')">
        <div class="serviceType">
          <v-btn x-large text>
            빌리기
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row class="mb-5">
      <v-col v-for="(card, index) in selectedCards" :key="index" cols="12" sm="4">
        <v-card class="mx-auto" max-width="400" @click="openDialog(index + 1)">
          <v-img class="white--text align-end" height="200px" :src="card.image">
            <v-card-title>{{ card.name }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            {{ card.base_price }} / {{ card.additional_price }}
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{ card.description }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>
              자세히보기 ==> 버튼을 넣지 말고 그냥 카드 자체가 버튼으로 하는게 낫나?
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Card {{ selectedCard }} Information
        </v-card-title>
        <v-card-text>
          This is the content of card {{ selectedCard }}.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: 'DashboardPage',
  data() {
    return {
      dialog: false,
      selectedCard: null,
      currentService: 'Keeping',
      KeepingCards: [],
      LendingCards: [],
      loading: true,
    };
  },
  computed: {
    selectedCards() {
      return this.currentService === 'Keeping' ? this.KeepingCards : this.LendingCards;
    }
  },

  created() {
    this.fetchItemsList();
  },

  methods: {
    fetchItemsList() {
      console.log("fetchItemsList()...");

      axios.get('http://localhost:8000/api/dashboard/')
        // axios.get('/api/dashboard/')
        .then(res => {
          console.log("POST GET RES", res);

          // 데이터를 받아와서 KeepingCards와 LendingCards에 저장
          this.KeepingCards = res.data.keeping_services.map(service => ({
            image: '',  // 이미지 데이터가 없으므로 빈 문자열로 유지
            name: service.name,
            description: service.description,
            base_price: service.base_price,
            additional_price: service.additional_price
          }));

          this.LendingCards = res.data.lending_services.map(service => ({
            image: '',  // 이미지 데이터가 없으므로 빈 문자열로 유지
            name: service.name,
            description: service.description,
            base_price: service.base_price,
            additional_price: service.additional_price
          }));
        })
        .catch(err => {
          if (err.response) {
            console.log("POST GET ERR.RESPONSE", err.response);
            alert(err.response.status + ' ' + err.response.statusText);
          } else {
            console.error("Error", err.message);
            alert("Error: " + err.message);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    selectService(serviceType) {
      this.currentService = serviceType;
    },

    openDialog(cardNumber) {
      this.selectedCard = cardNumber;
      this.dialog = true;
    }
  }
};
</script>

<style>
.text-center {
  text-align: center;
}

.right-border {
  border-right: 1px solid #000;
}
</style>
