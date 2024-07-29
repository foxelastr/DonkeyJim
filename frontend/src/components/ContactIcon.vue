<template>
    <v-container class="fixed-bottom-right">
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    class="v-btn--bottom v-btn--fab v-btn--fixed v-btn--has-bg v-btn--right v-btn--round theme--light v-size--large primary"
                    aria-label="Contact" title="Contact" v-bind="attrs" v-on="on">
                    <span class="v-btn__content">
                        <v-icon>mdi-phone</v-icon>
                    </span>
                </v-btn>
            </template>
            <span>카톡 상담하기</span>
        </v-tooltip>
    </v-container>
</template>

<script>
export default {
    name: 'ContactButton',
};
</script>

<style scoped>
.fixed-bottom-right {
    position: fixed;
    bottom: 400px;
    right: 16px;
    z-index: 1000;
}
</style>