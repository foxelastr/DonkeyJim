<!-- src/components/MainMenu.vue -->
<template>
    <div>
        <v-app-bar app clipped-left color="indigo" dark>
            <v-toolbar-title>Donkey-Jim</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn text :to="{ name: 'Home' }">Home</v-btn>
            <v-btn text href="/dashboard/serviceinfo">서비스안내</v-btn>
            <v-btn text href="/dashboard/reservation">예약하기</v-btn>
            <v-btn text href="/dashboard/reservcheck">예약확인</v-btn>
            <v-btn text href="/dashboard/faqs">FAQ</v-btn>
            <v-btn text href="/admin/">Admin</v-btn>
            <v-btn text>/</v-btn>
            <v-btn text href="/dashboard.html">서비스안내</v-btn>
            <v-btn text href="/dashboard.html">예약하기</v-btn>
            <v-btn text href="/dashboard.html">예약확인</v-btn>
            <v-btn text href="/dashboard.html">FAQ</v-btn>
            <!-- <v-btn text :to="{ name: 'ServiceInfo' }">서비스안내</v-btn>
            <v-btn text :to="{ name: 'Reservation' }">예약하기</v-btn>
            <v-btn text :to="{ name: 'ReservationCheck' }">예약확인</v-btn>
            <v-btn text :to="{ name: 'Faq' }">FAQ</v-btn> -->

            <v-spacer></v-spacer>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    data: () => ({}),
}
</script>

<style></style>