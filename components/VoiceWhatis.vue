<template>
  <div class="voice-whatis">
    <SearchInput @input="onInput" @submit="onSubmit"></SearchInput>

    <div class="new-answer" v-if="question">
      {{ question }}: <span v-if="answer">{{ answer }}</span>
    </div>

    <div class="voice-whatis__answers" v-if="answers">
      <ul class="voice-whatis__answers-list answers-list" v-if="answers">
        <Answer class="answers-list__answer"
          v-for="answer in answers" :answer="answer" :key="answer.id"></Answer>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.voice-whatis {
  text-align: center;

  &__answers-list {
    padding: 0;
    text-align: center;
  }
}
</style>

<script>
import SearchInput from '~/components/SearchInput';
import Answer from '~/components/Answer';
import { SET_ITEMS, SET_ANSWERS, ADD_ITEM, DELETE_ITEM } from '~/store';
import { testItems } from '~/store';
import Fuse from 'fuse.js';

const STAGE_IDLE = 'STAGE_IDLE';
const STAGE_WAIT_FOR_ANSWER = 'STAGE_WAIT_FOR_ANSWER';

export default {
  components: {
    SearchInput,
    Answer
  },

  data() {
    return {
      stage: STAGE_IDLE,
      question: '',
      answer: '',
      lastAddedItem: {}
    };
  },

  computed: {
    items() {
      return this.$store.state.items;
    },
    answers() {
      return this.$store.state.answers;
    }
  },

  watch: {},

  methods: {
    // on each
    onInput(val) {
      if (val.match(/^что /)) {
        this.processQuestion(val);
      }
    },

    onSubmit(val) {
      if (val.match(/^что /)) {
        this.processQuestion(val);
      } else if (val == '' || val.match(/^отмена/)) {
        this.stage = STAGE_IDLE;
        this.question = '';
        this.answer = '';
      } else if (val.match(/^удалить/)) {
        this.stage = STAGE_IDLE;
        this.question = '';
        this.answer = '';
        this.$store.commit(DELETE_ITEM, this.lastAddedItem);
      } else {
        console.log('Add new question (not impl.): ', val);
        this.processAnswer(val);
      }
    },

    processQuestion(q) {
      q = q.replace(/^что /, '');
      console.log('processQuestion: ', q);
      let fuse = new Fuse(this.items, {
        includeScore: true,
        keys: [
          {
            name: 'questions',
            weight: 0.7
          },
          {
            name: 'answer',
            weight: 0.1
          }
        ]
      });
      let answers = fuse.search(q);
      if (answers.length > 0) {
        const bestScore = answers[0].score;
        const scoreThreshold = 2;
        answers = answers.map(answer => {
          return {
            ...answer.item,
            ...{
              score: answer.score,
              minor: answer.score / bestScore > scoreThreshold
            }
          };
        });
      }
      this.$store.commit(SET_ANSWERS, answers);
    },

    processAnswer(q) {
      if (this.stage == STAGE_IDLE) {
        this.question = q;
        this.answer = '';
        this.stage = STAGE_WAIT_FOR_ANSWER;
      } else if (this.stage == STAGE_WAIT_FOR_ANSWER) {
        this.answer = q;
        this.lastAddedItem = {
          questions: [this.question],
          answer: this.answer
        };
        this.$store.commit(ADD_ITEM, this.lastAddedItem);
        this.stage = STAGE_IDLE;
      }
    }
  },

  mounted() {
    this.$store.commit(SET_ITEMS, testItems);
  }
};
</script>
