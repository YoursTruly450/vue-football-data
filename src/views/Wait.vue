<template>
  <section class="competitions">
    <div class="wait__panel">
      <h1 class="wait__caption">Number of requests exceeded, please wait 1 minute...</h1>
      <h1 class="wait__caption">You will be redirected automatically after {{this.counter}} seconds</h1>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Wait',
  components: {},
  data() {
    return {
      counter: 60,
      timer: 0,
    }
  },
  created() {
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  },
  computed: {},
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.changeCounter();
      }, 1000);
    },
    stopTimer() {
      clearTimeout(this.timer);
    },
    changeCounter() {
      --this.counter;
      if (this.counter === 0) {
        this.stopTimer();
        this.$router.push({name: 'Leagues'});
      }
    },
  },
  watch: {},
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/main.scss';
  @import '@/assets/scss/competitions.scss';
</style>