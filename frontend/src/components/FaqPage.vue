<template>
  <v-container>
    <h1>FAQ</h1>
    <v-expansion-panels focusable>
      <v-expansion-panel v-for="(item, i) in items" :key="i">
        <v-expansion-panel-header>
          <span class="question" v-html="item.headerHtml"></span>{{ item.headerText }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <span class="answer" v-html="item.contentHtml"></span>{{ item.contentText }}
          <br>
          <v-btn v-if="item.buttonText" :to="{ name: 'ServiceInfo' }">{{ item.buttonText }}</v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
  name: 'FaqPage',
  data() {
    return {
      items: [
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 기본 요금은 얼마인가요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 기본 요금은 3일 기준으로 책정되며, 보관 물품이나 대여 품목에 따라 달라질 수 있습니다. 요금 확인은 아래 버튼을 클릭해 주세요.',
          buttonText: '자세히 보기'
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 추가 요금은 얼마인가요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 추가 요금은 보관 물품의 크기와 대여 품목의 종류에 따라 다릅니다. 아래 버튼을 클릭하여 추가 요금을 확인해 주세요.',
          buttonText: '자세히 보기'
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 영업 시간은 어떻게 되나요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 현재 영업시간은 06:00부터 00:00까지이며, 그 외 시간에는 이용이 불가능합니다.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 결제는 어떻게 하면 되나요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 예약 후에는 기본적으로 계좌이체를 이용해 주시고, 현장에서는 카드와 현금 결제가 가능합니다.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 귀국 일정이 변경되었습니다.',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 귀국 일정이 늦어질 경우 010-1234-5678 또는 카톡 문의로 연락해 주시기 바라며, 연장된 기간에 따라 추가 요금이 부과됩니다.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 제가 맡긴 짐의 분실/파손/내용물 손상 시엔 어떻게 되나요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 보관하신 물품에 분실, 파손, 손상이 발생한 경우, 업체의 과실임을 입증해야 하며, 입증 시 최대 20만원 한도 내에서 보상이 제공됩니다.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 옷에 있던 소지품은 어떻게 하나요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 짐이나 의류를 보관하실 때는 주머니 속 소지품을 모두 따로 보관해 주세요. 저희는 보관 물품 외에 소지품에 대해서는 분실 책임을 지지 않습니다.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 당일 예약이 가능한가요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 원활한 서비스 진행을 위해 예약 전, 010-1234-5678 또는 카톡 문의로 연락해 주시기 바라며, 당일 예약은 출국 3시간 전까지 가능합니다. 출국 시간이 너무 임박한 경우에는 공항에서 대응이 어려워 예약이 제한될 수 있습니다.',
          buttonText: null
        },
        // {
        //   headerHtml: '<span class="question">Q</span>',
        //   headerText: ' 고가 품목은 보관이 가능한가요?',
        //   contentHtml: '<span class="answer">A</span>',
        //   contentText: ' 10만원 이상의 고가 품목은 보관이 어렵습니다. 양해 부탁드립니다.',
        //   buttonText: null
        // },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 대여 아이템의 종류는 무엇이 있나요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 여행에 필요한 다양한 물품이 준비되어 있습니다. 아래 버튼을 클릭하여 확인해 보세요.',
          buttonText: '자세히 보기'
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 입국 비행기가 연착된 경우엔 어떻게 하나요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 에어라커에서는 귀국 일정을 모니터링하고 있으니 안심하셔도 됩니다. 다만, 영업시간 외에는 대응이 어려우니 010-1234-5678 또는 카톡 문의로 미리 연락해 주시기 바랍니다.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 물품 보관 및 대여 장소는 어디인가요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 제1여객터미널(T1) A Gate 2층에 있습니다. 하나은행 맞은편, 대형스크린 쪽 2층 에스컬레이터 타고 올라오세요.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 예약 변경은 어떻게 하나요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 예약확인 페이지에서 고객님의 예약을 확인하신 후에 <예약변경> 버튼을 클릭하여 변경해주세요.',
          buttonText: null
        },
      ]
    };
  }
};
</script>

<style scoped>
.question {
  background-color: #E1BEE7;
  color: #4A148C;
  /* 텍스트 컬러 설정 */
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  padding: 2px 5px;
  margin: 0px 5px;
  border-radius: 5px;
}

.answer {
  background-color: #4DD0E1;
  color: #006064;
  /* 텍스트 컬러 설정 */
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  padding: 2px 5px;
  margin: 0px 5px;
  border-radius: 5px;
}

/* v-expansion-panel-header의 특정 스타일 덮어쓰기 */
.v-expansion-panel-header> :not(.v-expansion-panel-header__icon) {
  flex: none !important;
}
</style>
