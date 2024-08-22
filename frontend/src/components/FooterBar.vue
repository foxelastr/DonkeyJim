<template>
  <v-footer dark padless>
    <v-container style="max-width: 700px; margin: 0 auto; padding: 0;" class="py-0">
      <v-card flat tile class="pa-0">
        <v-row align="center" no-gutters>
          <v-col cols="12" md="8">
            <v-card-text class="text-left white--text" style="margin-bottom: 0; font-size: 0.9rem;">
              <div style="margin-bottom: 4px;">
                <strong>상호명:</strong> 에어라커 &nbsp; | &nbsp;
                <strong>사업자등록번호:</strong> 000-00-0000 &nbsp; | &nbsp;
                <strong>대표:</strong> 배동성
              </div>
              <div style="margin-bottom: 4px;">
                <strong>주소:</strong> 인천광역시 영종도
              </div>
              <div>
                <strong>전화번호:</strong> 업무폰 번호
              </div>
            </v-card-text>
          </v-col>
          <v-col cols="12" md="4" class="d-flex justify-center align-center">
            <v-card-text class="text-center white--text">
              <v-img max-width="100px" :src="LOGOIcon" class="mb-2" style="display: block; margin: 0 auto;"></v-img>
              <div style="font-size: 0.8rem;">
                ⓒ 에어라커<br>All rights reserved.
              </div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      LOGOIcon: require('@/assets/LOGO_white.png'),
    }
  }
}
</script>

<style>
/* 추가적인 불필요한 마진과 패딩을 제거 */
.v-footer {
  margin: 0;
  padding: 0;
}
</style>
