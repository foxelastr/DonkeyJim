<template>
  <v-container>

    <!-- Modal Dialog -->
    <v-dialog v-model="showModal" max-width="500px">
      <v-card>
        <v-card-title class="headline">알림</v-card-title>
        <v-card-text>
          <div>에어라커 서비스는 11월 1일부터 정식으로 시작됩니다.</div>
          <div>현재 서비스 예약은 가능하나, 11월 1일부터 이용하실 수 있습니다.</div>
          <div>확인 버튼을 누르시면 서비스 예약을 하실 수 있습니다.</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showModal = false">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-form ref="form">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="name" label="이름" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="phone" label="핸드폰번호 : 숫자만 입력하세요" type="number" @keypress="isNumber"
            required></v-text-field>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider> <!-- 첫 번째 구분선 -->

      <v-card flat>
        <v-container fluid>
          <v-row class="child-flex">
            <!-- 맡기기 섹션 -->
            <v-col cols="12" md="6">
              <v-toolbar dark>
                <v-spacer></v-spacer>
                <v-toolbar-title>맡기기</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-row v-for="(item, index) in depositServices" :key="item.name + '-counter'">
                <v-col cols="8">
                  <v-checkbox
                    :label="`${item.name} - 기본 : ${item.base_price.toLocaleString()}원 / 추가 : ${item.additional_price.toLocaleString()}원`"
                    v-model="depositSelected[index]" @change="handleDepositChange(index)"></v-checkbox>
                </v-col>
                <v-col cols="4" v-if="depositSelected[index]">
                  <v-text-field v-model.number="depositQuantities[index]" label="수량" type="number" min="0"
                    @input="updateTotalPrice">
                    <template v-slot:append>
                      <v-btn icon @click="incrementQuantity(depositQuantities, index)">
                        <v-icon>mdi-chevron-up</v-icon>
                      </v-btn>
                      <v-btn icon @click="decrementQuantity(depositQuantities, index)">
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <!-- 빌리기 섹션 -->
            <v-col cols="12" md="6">
              <v-toolbar dark>
                <v-spacer></v-spacer>
                <v-toolbar-title>빌리기</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-row v-for="(item, index) in rentServices" :key="item.name + '-counter'">
                <v-col cols="8">
                  <v-checkbox
                    :label="`${item.name} - 기본 : ${item.base_price.toLocaleString()}원 / 추가 : ${item.additional_price.toLocaleString()}원`"
                    v-model="rentSelected[index]" @change="handleRentChange(index)"></v-checkbox>
                </v-col>
                <v-col cols="4" v-if="rentSelected[index]">
                  <v-text-field v-model.number="rentQuantities[index]" label="수량" type="number" min="0"
                    @input="updateTotalPrice">
                    <template v-slot:append>
                      <v-btn icon @click="incrementQuantity(rentQuantities, index)">
                        <v-icon>mdi-chevron-up</v-icon>
                      </v-btn>
                      <v-btn icon @click="decrementQuantity(rentQuantities, index)">
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>


      <v-divider class="my-4"></v-divider> <!-- 두 번째 구분선 -->

      <v-row>
        <v-col cols="12" md="6" class="d-flex justify-center align-center">
          <v-date-picker v-model="dates" range :allowed-dates="allowedDates" @change="sortDates"></v-date-picker>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-center align-center flex-column">
          <v-col cols="12" md="6" style="flex: 2;">
            <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar"
              readonly></v-text-field>
          </v-col>
          <v-col cols="12" md="6" style="flex: 1;">
            <v-select v-model="selectedStartTime" :items="timeOptions" label="출발 시각" required></v-select>
          </v-col>
          <v-col cols="12" md="6" style="flex: 1;">
            <v-select v-model="selectedEndTime" :items="timeOptions" label="도착 시각" required></v-select>
          </v-col>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider> <!-- 세 번째 구분선 -->

      <!-- 결제 방법 선택 추가 -->
      <v-row>
        <v-col cols="12" md="6">
          <v-btn-toggle v-model="selectedPaymentMethod" mandatory>
            <v-btn :value="'계좌이체'" color="primary">계좌이체</v-btn>
            <v-btn :value="'현장결제(카드)'" color="primary">현장결제(카드)</v-btn>
            <v-btn :value="'현장결제(현금)'" color="primary">현장결제(현금)</v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-start">
          <v-checkbox v-model="termsAgreed" label="약관 동의"></v-checkbox>
          <div class="d-flex align-center" style="height: 100%;">
            <v-btn text @click="showTerms = true">약관 보기</v-btn>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider> <!-- 다섯 번째 구분선 -->

      <v-row>
        <v-col cols="12">
          <v-alert type="info">
            총 가격: {{ totalPrice.toLocaleString() }}원
            (맡기기: {{ depositTotal.toLocaleString() }}원 / 빌리기: {{ rentTotal.toLocaleString() }}원)
          </v-alert>
        </v-col>
      </v-row>

      <v-btn color="primary" @click="submitForm">예약하기</v-btn>

      <v-dialog v-model="showTerms" max-width="600px">
        <v-card>
          <v-card-title class="headline">약관</v-card-title>
          <v-card-text>
            <div>
              <span style="font-weight: bold;">보관서비스 이용약관</span><br>
              에어라커 고객 여러분 저희 서비스를 이용해주셔서 감사합니다
              아래 이용약관을 확인하시고 보다 안전한 여행을 다녀오시기 바랍니다.
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제 1 조 [예약신청]</span><br>
              1. 고객은 보관에 필요한 정보를 회사에게 제공할 의무가 있습니다.<br>
              2. 고객은 예약을 신청하기에 앞서 본 약관 및 규정을 확인하여야 하며, 예약이 유효하게 신청된 후에는 본 약관 및 규정을 모두 확인하고 동의한 것으로 간주합니다. 다만 중요한 약관 조항에
              대하여는
              회사에서 고객에게 구두 또는 서면으로 설명할 의무가 있습니다.<br>
              3. 회사에 천재지변, 전쟁 등 불가항력적인 사유가 발생하여 고객에게 보관서비스를 정상적으로 제공하기 어려운 경우, 회사는 일방적으로 고객의 예약을 취소, 변경할 수 있습니다.
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제 2 조 [용어]</span><br>
              1. “계약”은 보관 서비스를 위해 에어라커와 고객 사이에 맺은 계약을 의미합니다.<br>
              2. “예약”은 우리의 기록을 통해 입증할 수 있는 고객의 서비스 요청을 의미합니다.<br>
              3. “물품”은 고객이 적합한 절차로 회사에게 위탁한 물품을 의미합니다.
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제 3 조 [물품 규정]</span><br>
              1. 이용자는 물품 인도 시, 가방이 완전히 닫혀있음을 우선 확인해야 합니다. 만약 고객의 과실로 가방이 완전히 닫혀있지 않아 발생한 분실사고에 대하여는 회사에서 책임을 지지
              않습니다.<br>
              2. 이용자는 물품 인도시, 의류 주머니에 소지품이 없는지 확인해야 합니다. 소지품 분실 시 회사에서는 책임지지 않습니다.<br>
              3. 보관되는 “물품”의 가치가 한 개(벌) 당 1,000,000원 이상의 고가품일 경우 회사는 보관을 거부할 수 있습니다. 만약 사전합의 없이 고객이 임의로 1,000,000원 이상의
              물품의
              보관을 요청하는 경우 회사는 물품에 대하여 최대 1,000,000원의 손해배상책임만을 부담합니다.<br>
              4. 회사는 아래 명시된 품목의 사항을 포함하고 있거나 유사하다고 인정되는 품목에 대해 보관을 거부할 수 있습니다. 고객과 사전 협의되지 않은 해당 품목의 보관 및 운반 중 발생한 사고에
              대하여
              어떠한
              문제도 책임지지 않습니다.<br>
              <div>
                1)고가 귀금속, 고가 물품(금, 보석)<br>
                2)현금 및 유가증권(모든 형태의 수표 및 서류)<br>
                3)타인에게 해를 가할 수 있는 물품<br>
                4)파손 위험 물품<br>
                5)부패성 물품<br>
                6)악취가 심한 물품<br>
                7)발인화성 화학물질이나 향정신성 의약품<br>
                8)전자기기, 개인pc, 노트북( 디지털 카메라, 아이패드, 핸드폰 등)<br>
              </div>
              5. 물품 위탁 시에 전달한 보관 확인증을 고객이 제시하지 못 할 경우 물품 회수가 거부될 수 있으며,고객의 요청에 따라 예약 신청서 양식에 기재된 고객이 아닌 다른 사람에게 물품을 인도한
              이후
              발생한
              손해에 대하여 회사는 어떠한 책임도 지지 않습니다.
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제 4 조 [요금 및 대금 지불]</span><br>
              1. 서비스 요금은 홈페이지에서 확인할 수 있습니다.<br>
              2. 서비스의 요금은 추후 변경될 수 있으며 요금의 변경은 변경 예정시점 1개월전에 웹사이트를 통하여 고지합니다<br>
              3. 요금지불은 공항에서 접수(pick up)/인도(drop off) 시 현금과 카드로 결제 가능합니다.
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제 5 조 [책임 및 배상]</span><br>
              1. 회사의 고의, 과실에 의하여 물품의 분실 및 손실이 발생한 경우, 고객과 사전협의가 되었다는 등의 특별한 사정이 없는 이상 회사는 물품 당 1,000,000원을 한도로 배상책임을
              부담합니다.<br>
              2. 고객은 물품의 분실 및 손실이 발생한 경우 인도받은 날로부터 7영업일 이내에 분실 및 손실에 대한 자료를 서면으로 제출해야 합니다. 고객이 인도받은 날로부터 7영업일 이내에 회사에 분실
              및
              손실에
              대해 배상을 요청하지 않으면 회사는 어떠한 책임도 부담하지 않습니다.<br>
              3. 각 호와 같이 불가항력적인 사유로 인하여 일어난 분실 및 손실에 대해서는 책임지지 않습니다.<br>
              <div>
                1)테러 행위<br>
                2)자연재해
              </div>
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제 6 조 [환불규정]</span><br>
              1.서비스 이용 전 기지급 된 서비스 비용이 있을 경우 환불이 가능합니다. 그러나, 고객이 회사에게 물품을 인도한 시점부터는 비용이 환불되지 않음을 유의하여 주시기 바랍니다.<br>
              2.회사의 부주의로 보관되었던 물품의 인도가 약속된 시간보다 30분이상 지연될 경우 고객은 회사에게 환불을 요청할 수 있습니다. 단 비행기의 결항이나 지연으로 인해 시간이 변동될 경우 고객은
              회사에 사전에
              고지해야 하며, 고지하지 않은 경우 환불되지 않습니다.<br>
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제 7 조 [물품의 처리]</span><br>
              고객이 보관되었던 물품의 인도 예정일로부터 1개월이상 물품을 찾아가지 않을 경우, 고객이 물품에 대한 권리를 포기한 것으로 간주하고 회사는 해당 물품을 폐기처분 할 수 있습니다.
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제 8 조 [관할 법원]</span><br>
              회사와 고객간에 발생한 분쟁에 대해 회사의 주사무소 소재지를 관할하는 법원을 전속관할로 합니다
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제 9 조 [약관의 시행]</span><br>
              본 약관은 2016년 10월부터 시행됩니다.
            </div>
            <br>
            <div>
              <div>
                <span style="font-weight: bold;">에어라커 개인정보 수집 및 이용 동의</span><br>
                에어라커(이하 ‘회사’라 한다)는 정보통신망이용촉진 및 정보보호 등에 관한 법률, 개인정보 보호법 등에 따라 고객님의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수
                있도록
                하기 위하여
                다음과 같이 개인정보 취급방침을 수립·공개합니다.
              </div>
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제1조(개인정보의 수집 항목 및 수집 방법)</span><br>
              1. 회사는 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산, 기타 서비스 제공을 위해 예약 당시 아래와 같은 개인정보를 수집하고 있습니다.<br>
              재화 또는 서비스 제공- 필수항목 : 성명, 휴대폰 번호
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제2조(개인정보의 수집 및 이용목적)</span><br>
              1. 회사는 다음과 같이 고객님의 개인정보를 수집합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라
              별도의 동의를
              받는 등 필요한 조치를 이행할 예정입니다. 이하에서는 홈페이지를 ‘서비스’라 합니다. <br>회사는 고객님의 개인정보를 제 3자에게 제공하지 않습니다.<br>

              <div>
                개인정보의수집·이용 목적 : 예약 관리<br>
                수집하는개인정보의항목 : 성명,휴대폰 번호<br>
                개인정보의보유·이용 기간 : 서비스 종료일로부터 3개월 까지<br>
              </div>
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제3조(고객의 권리·의무 및 행사방법)</span><br>
              고객님 및 법정 대리인은 담당자(8631lib@naver.com)에게 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정, 삭제를 요청할 수
              있습니다.<br>
              고객님 및 법정대리인의 개인정보 조회, 수정은 회사의 개인정보관리책임자에게 서면, 전화, 전자우편등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.<br>
              고객님께서 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다.
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제4조(개인정보 자동수집장치의 설치/운영 및 거부에 관한 사항)</span><br>
              회사는 회원님의 쿠키를 수집하지 않습니다.
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제5조(개인정보의 파기)</span><br>
              ① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.<br>
              ② 고객님으로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의
              데이터베이스(DB)로 옮기거나
              보관장소를 달리하여 보존합니다.③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.<br>
              1. 파기절차회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.<br>
              2. 파기방법회사는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 로우레밸포멧(Low Level Format) 등의 방법을 이용하여 파기하며, 종이 문서에 기록·저장된
              개인정보는
              분쇄기로 분쇄하거나 소각하여 파기합니다.
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제6조(개인정보의 안전성 확보조치)</span><br>
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.<br>
              1. 관리적 조치 : 내부관리계획 수립·시행, 정기적 직원 교육 등<br>
              2. 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치3. 물리적 조치 : 전산실, 자료보관실 등의 접근통제
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제7조(개인정보 보호책임자)</span><br>
              ① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 고객님의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.<br>
              <div>
                ▶️ 개인정보 보호책임자<br>
                성명 : 배동성<br>
                연락처 : 010-2711-2278<br>
                E-mail) bg90502@naver.com
              </div>
              ② 고객님께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수
              있습니다.<br>
              회사는
              고객님의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.
            </div>
            <br>
            <div>
              <span style="font-weight: bolder;">제8조(권익침해 구제방법)</span><br>
              고객님은 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.<br>
              * 아래의 기관은 회사와는 별개의 기관으로서, 회사의 자체적인 개인정보 불만처리, 피해구제 결과에 만족하지 못하시거나 보다 자세한 도움이 필요하시면 문의하여 주시기 바랍니다.<br>
            </div>
            <div>
              ▶️ 개인정보 침해신고센터 (한국인터넷진흥원 운영)<br>
              - 소관업무 : 개인정보 침해사실 신고, 상담 신청<br>
              - 홈페이지 : privacy.kisa.or.kr<br>
              - 전화 : (국번없이) 118<br>
              - 주소 : (138-950) 서울시 송파구 중대로 135 한국인터넷진흥원 개인정보침해신고센터<br>
            </div>
            <div>
              ▶️ 개인정보 분쟁조정위원회 (한국인터넷진흥원 운영)<br>
              - 소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)<br>
              - 홈페이지 : privacy.kisa.or.kr<br>
              - 전화 : (국번없이) 118<br>
              - 주소 : (138-950) 서울시 송파구 중대로 135 한국인터넷진흥원 개인정보침해신고센터<br>
            </div>
            <div>
              ▶️ 대검찰청 사이버범죄수사단 : 02-3480-3573 (www.spo.go.kr)<br>
            </div>
            <div>
              ▶️ 경찰청 사이버테러대응센터 : 1566-0112 (www.netan.go.kr)
            </div>
            <div>
              <span style="font-weight: bolder;">제9조(개인정보 취급방침 변경)</span><br>
              ① 현 개인정보취급방침 내용 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일전부터 홈페이지의 '공지사항'을 통해 고지할 것입니다. 다만, 개인정보의 수집 및 활용, 제3자 제공 등과 같이
              이용자 권리의
              중요한 변경이 있을 경우에는 최소 30일 전에 고지합니다.<br>
              ② 이 개인정보 취급방침은 2024. 11. 01부터 적용됩니다.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="showTerms = false">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReservationPage',
  data() {
    return {
      showModal: true,
      name: '',
      phone: '',
      dates: [],  // Date range array
      depositServices: [],
      rentServices: [],
      depositSelected: [],  // "맡기기" 서비스 항목의 선택 상태를 저장
      rentSelected: [],  // "빌리기" 서비스 항목의 선택 상태를 저장
      depositQuantities: [],  // "맡기기" 서비스 항목의 수량을 저장
      rentQuantities: [],  // "빌리기" 서비스 항목의 수량을 저장
      selectedStartTime: '',
      selectedEndTime: '',
      termsAgreed: false,
      showTerms: false,
      totalPrice: 0,
      depositTotal: 0,
      rentTotal: 0,
      selectedPaymentMethod: '',  // 결제 방법
      timeOptions: [
        '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
        '20:00', '21:00', '22:00'
      ],
    };
  },
  computed: {
    dateRangeText() {
      if (this.dates.length === 2) {
        return `${this.formatDate(this.dates[0])} - ${this.formatDate(this.dates[1])}`;
      }
      return '';
    }
  },
  watch: {
    dates: 'updateTotalPrice',
    depositSelected: {
      handler: 'updateTotalPrice',
      deep: true,
    },
    rentSelected: {
      handler: 'updateTotalPrice',
      deep: true,
    },
    depositQuantities: {
      handler: 'updateTotalPrice',
      deep: true,
    },
    rentQuantities: {
      handler: 'updateTotalPrice',
      deep: true,
    },
  },
  created() {
    axios.get('http://localhost:8000/api/items/')
      .then(response => {
        this.depositServices = response.data.keeping_services;
        this.rentServices = response.data.lending_services;
        // Initialize selected objects with false values
        this.depositServices.forEach((service, index) => {
          this.$set(this.depositSelected, index, false);
          this.$set(this.depositQuantities, index, 0);
        });
        this.rentServices.forEach((service, index) => {
          this.$set(this.rentSelected, index, false);
          this.$set(this.rentQuantities, index, 0);
        });
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  },
  methods: {
    handleDepositChange(index) {
      if (this.depositSelected[index]) {
        this.$set(this.depositQuantities, index, 1);
      } else {
        this.$set(this.depositQuantities, index, 0);
      }
      this.updateTotalPrice();
    },
    handleRentChange(index) {
      if (this.rentSelected[index]) {
        this.$set(this.rentQuantities, index, 1);
      } else {
        this.$set(this.rentQuantities, index, 0);
      }
      this.updateTotalPrice();
    },
    incrementQuantity(quantities, index) {
      this.$set(quantities, index, quantities[index] + 1);
    },
    decrementQuantity(quantities, index) {
      if (quantities[index] > 0) {
        this.$set(quantities, index, quantities[index] - 1);
      }
    },
    allowedDates(date) {
      // 10월 30일 이전 날짜를 비활성화
      const targetDate = new Date('2024-10-31');
      const currentDate = new Date(date);

      return currentDate > targetDate;
    },
    sortDates() {
      if (this.dates.length === 2) {
        this.dates.sort((a, b) => new Date(a) - new Date(b));
      }
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    isValidPhoneNumber(phone) {
      const phoneRegex = /^\d{11}$/;
      return phoneRegex.test(phone);
    },
    isNumber(evt) {
      const charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
      }
    },
    updateTotalPrice() {
      const baseDays = 3;
      let depositTotal = 0;
      let rentTotal = 0;
      const totalDays = this.dates.length > 1 ? (new Date(this.dates[1]) - new Date(this.dates[0])) / (1000 * 60 * 60 * 24) + 1 : 1;

      // Calculate for keeping services (맡기기)
      this.depositServices.forEach((service, index) => {
        if (this.depositSelected[index]) {
          const additionalDays = Math.max(0, totalDays - baseDays);
          depositTotal += (service.base_price + (additionalDays * service.additional_price)) * this.depositQuantities[index];
        }
      });

      // Calculate for lending services (빌리기)
      this.rentServices.forEach((service, index) => {
        if (this.rentSelected[index]) {
          const additionalDays = Math.max(0, totalDays - baseDays);
          rentTotal += (service.base_price + (additionalDays * service.additional_price)) * this.rentQuantities[index];
        }
      });

      // Update totals
      this.depositTotal = depositTotal;
      this.rentTotal = rentTotal;
      this.totalPrice = depositTotal + rentTotal;
    },
    async submitForm() {
      const now = new Date();
      const selectedDate = new Date(this.dates[0]); // 출발 날짜

      if (selectedDate.toDateString() === now.toDateString()) {
        // 출발 시간이 현재 시각에서 2시간 이내인지 확인
        const selectedTime = this.selectedStartTime.split(':');
        const reservationTime = new Date(selectedDate.setHours(parseInt(selectedTime[0]), parseInt(selectedTime[1])));

        const timeDifference = reservationTime - now;
        const twoHoursInMilliseconds = 3 * 60 * 60 * 1000;

        if (timeDifference < twoHoursInMilliseconds) {
          alert('출발시각 3시간 이내에는 예약이 불가능합니다.');
          return;
        }
      }

      // 각 조건을 검증하고, 조건에 맞지 않으면 경고창 표시
      if (!this.name) {
        alert('이름을 입력하세요.');
        return;
      }
      if (!this.isValidPhoneNumber(this.phone)) {
        alert('핸드폰 번호를 확인해주세요. - 를 제외한 11자리 숫자로만 입력해야 합니다.\n010XXXXYYYY 형식으로 입력해주세요');
        return;
      }
      if (this.dates.length !== 2) {
        alert('예약 날짜를 선택해주세요.');
        return;
      }
      if (!this.selectedStartTime) {
        alert('출발 시각을 선택해주세요.');
        return;
      }
      if (!this.selectedEndTime) {
        alert('도착 시각을 선택해주세요.');
        return;
      }
      if (!this.termsAgreed) {
        alert('약관에 동의해주세요.');
        return;
      }
      if (!this.selectedPaymentMethod) {
        alert('결제 방법을 선택해주세요.');
        return;
      }

      const keepingQuantities = this.depositQuantities.filter((quantity, index) => this.depositSelected[index]);

      const keepingServices = this.depositServices
        .filter((service, index) => this.depositSelected[index])
        .map((service, index) => ({
          name: service.name,
          quantity: keepingQuantities[index],
        }));
      console.log("keeping services printed : ", keepingServices);

      const lendingQuantities = this.rentQuantities.filter((quantity, index) => this.rentSelected[index]);

      const lendingServices = this.rentServices
        .filter((service, index) => this.rentSelected[index])
        .map((service, index) => ({
          name: service.name,
          quantity: lendingQuantities[index],
        }));
      console.log("lending services printed : ", lendingServices);

      const reservationData = {
        name: this.name,
        phone_number: this.phone,
        keeping_services: keepingServices.map(s => s.name),
        keeping_quantities: keepingServices.map(s => s.quantity),
        lending_services: lendingServices.map(s => s.name),
        lending_quantities: lendingServices.map(s => s.quantity),
        start_date: this.dates.length > 0 ? this.formatDate(this.dates[0]) : null,
        end_date: this.dates.length > 1 ? this.formatDate(this.dates[1]) : null,
        start_time: this.selectedStartTime,
        end_time: this.selectedEndTime,
        total_price: this.totalPrice,
        terms_agreed: this.termsAgreed,  // 약관 동의 여부
        payment_method: this.selectedPaymentMethod,  // 결제 방법
      };

      // 폼 데이터 콘솔에 출력
      console.log('Reservation Data:', reservationData);

      axios.post('http://localhost:8000/api/reservation/', reservationData)
        .then(response => {
          alert('예약이 완료되었습니다!');
          console.log('API Response:', response);
          this.$router.push({ name: 'ServiceInfo' });
        })
        .catch(error => {
          console.error('예약 중 오류가 발생했습니다:', error);
        });
    },
  },
};
</script>

<style scoped>
.serviceType {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mb-4 {
  margin-bottom: 32px;
}

.mb-2 {
  margin-bottom: 16px;
}
</style>