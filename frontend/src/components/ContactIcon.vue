<template>
    <v-container class="fixed-bottom-right">
        <!-- 결제방법 버튼 -->
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    class="v-btn--bottom v-btn--fab v-btn--fixed v-btn--has-bg v-btn--right v-btn--round theme--light v-size--large secondary payment-btn"
                    aria-label="Payment Method" title="Payment Method" v-bind="attrs" v-on="on"
                    @click="showPaymentMethod = true">
                    <span class="v-btn__content">
                        <v-icon>mdi-credit-card-outline</v-icon>
                    </span>
                </v-btn>
            </template>
            <span>결제방법 안내</span>
        </v-tooltip>

        <!-- 기존의 카톡 상담하기 버튼 -->
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

        <!-- 결제방법 모달 -->
        <v-dialog v-model="showPaymentMethod" max-width="400px">
            <v-card>
                <v-card-title class="headline">결제 방법 안내</v-card-title>
                <v-card-text>
                    <div class="payment-method">
                        <div class="payment-title">● 계좌이체</div>
                        <div class="payment-details">계좌번호 : <strong>우리은행 0000-0000-0000</strong></div>
                        <div class="payment-details">예금주 : <strong>배동성</strong></div>
                    </div>
                    <v-divider class="my-4"></v-divider>
                    <div class="payment-method">
                        <div class="payment-title">● 현장결제</div>
                        <div class="payment-details">현장결제는 현장에서 카드 및 현금으로 결제합니다</div>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="showPaymentMethod = false">닫기</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name: 'ContactButton',
    data() {
        return {
            showPaymentMethod: false,
        };
    }
};
</script>

<style scoped>
.fixed-bottom-right {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 1000;
}

.payment-btn {
    margin-bottom: 70px;
    /* 기존 버튼 위에 추가 버튼을 배치하기 위한 간격 */
    background-color: #ffcc00;
    /* 버튼 색상 변경 (선택 사항) */
}

.primary {
    background-color: #6200ea;
    /* 기존 버튼 색상 유지 */
}

.payment-method {
    margin-bottom: 16px;
}

.payment-title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 8px;
}

.payment-details {
    font-size: 14px;
    margin-left: 12px;
}

v-divider {
    margin: 16px 0;
}
</style>
