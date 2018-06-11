<template>
  <div class="voice-whatis__answer answer">
    <div class="answer__answer" v-html="answer.answer"></div>
    <ul class="answer__questions">
      <li class="answer__questions-item" v-for="question in answer.questions" :key="question"
        v-html="question"></li>
    </ul>
  </div>
</template>

<style lang="scss">
.answer{
  &__answer{
    margin: 15px auto;
    font-size: 24px;
  }

  &__questions{
    list-style: none;
    &-item{
      color: #999;
    }
  }
}
</style>

<script>
export default {
  props: ["answer"]
}
</script>
