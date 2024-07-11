<template>
  <v-container>
    <h1>FAQ Page</h1>
    <v-expansion-panels>
      <v-expansion-panel v-for="(faq, index) in faqs" :key="index">
        <v-expansion-panel-header class="question">{{ faq.question }}</v-expansion-panel-header>
        <v-expansion-panel-content class="answer">
          <div>&#8627;{{ faq.answer }}</div>
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
      faqs: [
        { question: '1번질문', answer: '1번답변' },
        { question: '2번질문', answer: '2번답변' },
        { question: '3번질문', answer: '3번답변' },
      ],
    };
  },
};
</script>

<style scoped>
.question {
  background-color: #e0f7fa;
}

.answer {
  display: flex;
  align-items: center;
}

.arrow {
  margin-right: 8px;
  font-size: 24px;
}
</style>
