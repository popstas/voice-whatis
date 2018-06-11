<template>
  <div class="voice-whatis">
    <SearchInput @input="onInput"></SearchInput>
    <div class="voice-whatis__answers" v-if="answers">
      <ul class="voice-whatis__answers-list answers-list" v-if="answers">
        <Answer class="answers-list__answer"
          v-for="answer in answers" :answer="answer" :key="answer.id"></Answer>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchInput from "~/components/SearchInput";
import Answer from "~/components/Answer";
import {SET_ITEMS, SET_ANSWERS} from '~/store';
import {testItems} from '~/store';
import Fuse from "fuse.js";

export default {
  components: {
    SearchInput, Answer
  },

  computed: {
    items(){
      return this.$store.state.items;
    },
    answers(){
      return this.$store.state.answers;
    }
  },

  watch: {},

  methods: {
    onInput(val){
      if (val.match(/^что /)) {
        this.processQuestion(val);
      } else {
        console.log('Add new question (not impl.): ', val);
      }
    },

    processQuestion(q){
      q = q.replace(/^что /, '');
      console.log('processQuestion: ', q);
      let fuse = new Fuse(this.items, {
        keys: [
          {
            name: "questions",
            weight: 0.7
          },
          {
            name: "answer",
            weight: 0.1
          }
        ]
      });
      let answers = fuse.search(q);
      this.$store.commit(SET_ANSWERS, answers);
    }
  },

  mounted(){
    this.$store.commit(SET_ITEMS, testItems);
  }
}
</script>
