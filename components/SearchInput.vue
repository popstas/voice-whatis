<template>
  <div class="search-input">
    <el-input v-model="q" clearable autofocus @keyup.native.enter="submit">
    </el-input>

    <button :class="{'speech-toggle':true, 'search-input__speech-toggle':true, active: isSpeechRunning}" @click="speechToggle" slot="suffix">
      <icon v-if="recognition" name="microphone" class="el-icon-speech el-input__icon"></icon>
    </button>
  </div>
</template>

<style lang="scss">
.search-input{
  text-align: center;

  &__speech-toggle {
    cursor: pointer;
    text-align: center;
    display: inline-block;
    margin: 0 auto;
    border: none;
    background: none;
    padding: 20px;
    color: #dcdfe6;
    outline: none;

    &:hover {
      color: #666;
    }
    &.active {
      color: #409eff;
    }
  }
}

</style>

<script>
import "vue-awesome/icons/microphone";
export default {
  props: {
    value: {
      default: ""
    }
  },

  data() {
    return {
      lang: "ru-RU",
      q: this.value,
      recognition: false,
      isSpeechRunning: false,
      runtimeTranscription: "",
      transcription: []
    };
  },

  watch: {
    value(val) {
      this.q = val;
    },

    q(val) {
      this.$emit("input", val);
    }
  },

  methods: {
    submit() {
      console.log('submit');
      this.$emit("submit", this.q)
      this.q = '';
    },

    speechStart() {
      console.log("speech start");
      if (!this.recognition) return;
      this.recognition.start();
      this.isSpeechRunning = true;
    },

    speechStop() {
      if(this.recognition) this.recognition.stop();
      this.isSpeechRunning = false;
    },

    speechToggle() {
      return this.isSpeechRunning ? this.speechStop() : this.speechStart();
    },

    onSpeechEnd() {
      console.log("speech end", this.runtimeTranscription);
      this.speechStop();
      if (!this.runtimeTranscription) return;

      this.transcription.push(this.runtimeTranscription);
      this.q = this.runtimeTranscription;
      this.submit();
      this.speechStart();
    },

    checkSpeechApi() {
      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        return;
      }
      this.recognition = new SpeechRecognition();
      let recognition = this.recognition;
      this.speechStop();
      recognition.lang = this.lang;
      recognition.interimResults = true;
      recognition.addEventListener("result", event => {
        // console.log("speech result", event.results);
        const text = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join("");
        this.runtimeTranscription = text;
      });
      recognition.addEventListener("end", this.onSpeechEnd);
      this.recognition = recognition;
    }
  },

  mounted() {
    console.log('mounted');
    this.checkSpeechApi();
  }
};
</script>
