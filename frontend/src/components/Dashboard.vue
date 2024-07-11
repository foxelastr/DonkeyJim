<template>
  <v-container>
    <v-row align="center" justify="space-around">
      <v-col cols="6" class="text-center right-border" @click="selectService('맡기기')">
        <div class="serviceType">
          <v-btn x-large text>
            맡기기
          </v-btn>
        </div>
      </v-col>
      <v-col cols="6" class="text-center" @click="selectService('빌리기')">
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
            <v-card-title>{{ card.title }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            {{ card.subtitle }}
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>{{ card.description }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>
              Share
            </v-btn>

            <v-btn color="orange" text>
              Explore
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
export default {
  name: 'ServiceTypeButtons',
  data() {
    return {
      dialog: false,
      selectedCard: null,
      currentService: '맡기기',
      맡기기Cards: [
        {
          image: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
          title: 'Top 10 Australian beaches',
          subtitle: 'Number 1',
          description: 'Whitehaven Beach, Whitsunday Island, Whitsunday Islands'
        },
        {
          image: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
          title: 'Top 10 Australian beaches',
          subtitle: 'Number 2',
          description: 'Whitehaven Beach, Whitsunday Island, Whitsunday Islands'
        },
        {
          image: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
          title: 'Top 10 Australian beaches',
          subtitle: 'Number 3',
          description: 'Whitehaven Beach, Whitsunday Island, Whitsunday Islands'
        },
      ],
      빌리기Cards: [
        {
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: 'Top western road trips',
          subtitle: '1,000 miles of wonder',
          description: 'Experience the breathtaking road trips in the western region.'
        },
        {
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: 'Top western road trips',
          subtitle: 'Number 2',
          description: 'Experience the breathtaking road trips in the western region.'
        },
        {
          image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: 'Top western road trips',
          subtitle: 'Number 3',
          description: 'Experience the breathtaking road trips in the western region.'
        },
      ]
    };
  },
  computed: {
    selectedCards() {
      return this.currentService === '맡기기' ? this.맡기기Cards : this.빌리기Cards;
    }
  },
  methods: {
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
