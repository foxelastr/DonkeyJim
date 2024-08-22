<template>
    <div>
        <v-app-bar app clipped-left color="indigo" dark>
            <v-toolbar-title>
                <v-img max-width="120px" :src="LOGOIcon"></v-img>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn text :to="{ name: 'Home' }" exact active-class="active-button">Home</v-btn>

            <v-btn text :to="{ name: 'ServiceInfo' }" exact active-class="active-button">서비스안내</v-btn>

            <v-btn text :to="{ name: 'ServiceItems' }" exact active-class="active-button">서비스항목</v-btn>

            <v-btn text :to="{ name: 'Reservation' }" exact active-class="active-button">예약하기</v-btn>

            <v-btn text :to="{ name: 'ReservationCheck' }" exact active-class="active-button">예약확인</v-btn>

            <v-btn text :to="{ name: 'Faqs' }" exact active-class="active-button">FAQ</v-btn>

            <v-spacer></v-spacer>

            <div style="width: 120px;"></div>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            LOGOIcon: require('@/assets/LOGO.png'),
        }
    }
};
</script>

<style scoped>
.active-button {
    color: white;
    font-weight: bold;
}
</style>
