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
            <v-btn text href="/">HOME</v-btn>
            <v-btn text :to="{ name: 'ServiceInfo' }">서비스안내</v-btn>
            <v-btn text :to="{ name: 'Reservation' }">예약하기</v-btn>
            <v-btn text :to="{ name: 'ReservationCheck' }">예약확인</v-btn>
            <v-btn text :to="{ name: 'Faq' }">FAQ</v-btn>

            <v-spacer></v-spacer>

            <v-menu left bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on">
                        <v-icon>mdi-account</v-icon>
                        Anonymous
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item>
                        <v-list-item-title>Login</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Register</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Password change</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    data: () => ({}),
}
</script>

<style></style>