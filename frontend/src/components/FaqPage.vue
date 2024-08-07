<template>
  <v-container>
    <h1>FAQ Page</h1>
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
          headerText: ' 기본요금은 얼마인가요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 짐이나 옷 보관과 물품 대여 가격이 다릅니다. 아래의 버튼을 클릭해서 각각의 아이템의 기본요금을 확인하세요!',
          buttonText: '확인'
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 추가요금은 얼마인가요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 기본적으로 하루에 1000원이 추가됩니다. 짐 크기에 따라 달라질 수 있으니 아래의 버튼을 클릭해서 각각의 아이템의 추가요금을 확인하세요!',
          buttonText: '자세히 보기'
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 영업시간은 어떻게 되나요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 현재는 아침 6시부터 밤 12시까지입니다.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 결제는 어떻게 하면 되나요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 이용 요금 결제는 계좌이체를 하시거나 현장에서 카드 또는 현금으로 결제 가능합니다.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 귀국 일정이 변경되었습니다.',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 귀국 일정이 늦어진 경우에는 안내 받으신 전화번호로 알려주세요. 친절하게 안내 해드리겠습니다. 늦어진 날짜만큼 날짜당 추가 요금이 발생합니다.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 제가 맡긴 짐의 분실/파손/내용물 손상 시엔 어떻게 되나요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 우선은 업체의 실수로 분실/파손/손상 등이 발생한 것을 입증하셔야 합니다. 입증 시 최대 100만원 한도 내에서 보상 가능합니다.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 옷에 있던 소지품은 어떻게 하나요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 짐이나 옷 보관 시 주머니의 소지품은 따로 챙겨주세요. 저희는 주머니에 남은 소지품에 대한 분실 책임을 지지 않습니다.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 당일 예약이 가능한가요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 가능하지만 출국 시각 2시간 전에는 예약을 해주세요. 출국 시간 기준 2시간 이내에는 고객님의 공항에서의 일정 등에 차질이 생길 수 있어서 현재는 예약을 받고 있지 않습니다.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 고가 품목은 보관이 가능한가요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 10만원 이상의 고가 품목은 보관이 어렵습니다. 양해 부탁드립니다.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 대여 아이템의 종류는 뭐가 있나요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 저희는 여행에 필요한 여러 가지 물품들을 대여해드리고 있습니다. 아래의 버튼을 클릭해서 확인해보세요!',
          buttonText: '확인'
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 입국 비행기가 연착된 경우엔 어떻게 하나요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 우선은 안내 받으신 전화번호로 알려주세요. 친절하게 안내 해드리겠습니다. 비행기 연착의 경우에는 추가 요금이 부과되지 않습니다.',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 물품 보관 및 대여 장소는 어디인가요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 공항 제 1 터미널의 중앙 롯데리아가 있는 지점의 2층 입니다. ==> 내용 보완',
          buttonText: null
        },
        {
          headerHtml: '<span class="question">Q</span>',
          headerText: ' 예약 변경은 어떻게 하나요?',
          contentHtml: '<span class="answer">A</span>',
          contentText: ' 내용 채우기',
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
