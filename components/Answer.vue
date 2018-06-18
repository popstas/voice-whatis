<template>
  <div :class="{'voice-whatis__answer': true, answer: true, 'answer_minor': answer.minor}">
    <el-popover class="answer__answer" trigger="hover" placement="right">
      <slot>
        <div class="answer__score" v-html="Math.round(answer.score*1000)/1000"></div>
        <ul class="answer__questions">
          <li class="answer__questions-item" v-for="question in answer.questions" :key="question"
            v-html="question"></li>
        </ul>
      </slot>
      <div slot="reference" v-html="answer.answer"></div>
    </el-popover>
  </div>
</template>

<style lang="scss">
.answer {
  &_minor {
    opacity: 0.3;

    &:hover {
      opacity: 1;
    }
  }

  &__score {
    color: #666;
  }

  &__answer {
    margin: 15px auto;
    font-size: 24px;
  }

  &__questions {
    list-style: none;
    padding: 0;
    &-item {
      color: #999;
    }
  }
}
</style>

<script>
export default {
  props: ['answer']
};
</script>
