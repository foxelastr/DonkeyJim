<template>
    <div>
        <v-navigation-drawer v-model="drawer" app clipped theme="dark">
            <v-list-item title="My Application" subtitle="Vuetify">Donkey-Jim</v-list-item>
            <v-divider></v-divider>
            <v-list-item link title="Dashboard">Dashboard</v-list-item>
            <v-list-item link title="Reservation">Reservation</v-list-item>
            <v-list-item link title="Info">Info</v-list-item>
        </v-navigation-drawer>

        <v-app-bar app clipped-left color="indigo" dark>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Donkey-Jim</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn text href="/">Home</v-btn>
            <v-btn text href="/dashboard/item/list">Dashboard</v-btn>
            <v-btn text href="/admin/">Admin</v-btn>
            <v-btn text>/</v-btn>
            <v-btn text href="/dashboard.html">Dashboard</v-btn>
            <v-btn text href="/item_list.html">Info</v-btn>

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
    data: () => ({ drawer: null }),

}
</script>

<style></style>