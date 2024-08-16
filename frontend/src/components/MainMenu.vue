<template>
    <div>
        <v-app-bar app clipped-left color="indigo" dark>
            <v-toolbar-title>Donkey-Jim</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn text :to="{ name: 'Home' }" exact active-class="active-button">Home</v-btn>

            <v-btn text :to="{ name: 'ServiceInfo' }" exact active-class="active-button">서비스안내</v-btn>

            <v-btn text :to="{ name: 'Reservation' }" exact active-class="active-button">예약하기</v-btn>

            <v-btn text :to="{ name: 'ReservationCheck' }" exact active-class="active-button">예약확인</v-btn>

            <v-btn text :to="{ name: 'Faqs' }" exact active-class="active-button">FAQ</v-btn>

            <v-btn text href="/admin/">Admin</v-btn>

            <v-spacer></v-spacer>
        </v-app-bar>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.active-button {
    color: white;
    font-weight: bold;
}
</style>
