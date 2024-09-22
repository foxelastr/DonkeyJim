<template>
    <div>
        <v-app-bar app clipped-left color="indigo" dark>
            <!-- 햄버거 버튼 (화면 크기가 작을 때 나타남) -->
            <v-app-bar-nav-icon @click="drawer = !drawer" class="d-sm-none"></v-app-bar-nav-icon>

            <v-toolbar-title>
                <v-img max-width="120px" :src="LOGOIcon"></v-img>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- 기본 메뉴 (화면 크기가 클 때 나타남) -->
            <div class="d-none d-sm-flex">
                <v-btn text :to="{ name: 'Home' }" exact active-class="active-button">Home</v-btn>
                <v-btn text :to="{ name: 'ServiceInfo' }" exact active-class="active-button">서비스안내</v-btn>
                <v-btn text :to="{ name: 'ServiceItems' }" exact active-class="active-button">서비스항목</v-btn>
                <v-btn text :to="{ name: 'Reservation' }" exact active-class="active-button">예약하기</v-btn>
                <v-btn text :to="{ name: 'ReservationCheck' }" exact active-class="active-button">예약확인</v-btn>
                <v-btn text :to="{ name: 'Faqs' }" exact active-class="active-button">FAQ</v-btn>
            </div>

            <v-spacer></v-spacer>

            <div style="width: 120px;"></div>
        </v-app-bar>

        <!-- 네비게이션 드로어 (화면 크기가 작을 때 햄버거 버튼을 클릭하면 나타남) -->
        <v-navigation-drawer v-model="drawer" app temporary color="indigo" dark
            :clipped="$vuetify.breakpoint.smAndDown">
            <v-list>
                <v-list-item-group>
                    <v-list-item :to="{ name: 'Home' }" exact>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ name: 'ServiceInfo' }" exact>
                        <v-list-item-title>서비스안내</v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ name: 'ServiceItems' }" exact>
                        <v-list-item-title>서비스항목</v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ name: 'Reservation' }" exact>
                        <v-list-item-title>예약하기</v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ name: 'ReservationCheck' }" exact>
                        <v-list-item-title>예약확인</v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ name: 'Faqs' }" exact>
                        <v-list-item-title>FAQ</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            LOGOIcon: require('@/assets/LOGO.png'),
            drawer: false, // 네비게이션 드로어의 상태
        };
    },
};
</script>

<style scoped>
.active-button {
    color: white;
    font-weight: bold;
}
</style>
