<template>
  <section 
    class="back"
    @click="navigateBack"
  >
    <img 
      src="@/assets/img/main/arrow_back.png" 
      alt="arrow back"
      class="back__arrow"
    >
    <span>Back</span>
  </section>
</template>

<script>

export default {

  name: 'RouterBack',
  components: {},
  data() {
    return {
    }
  },
  async created() {},
  computed: {},
  methods: {
    navigateBack() {
      this.$router.go(-1);
    },
  },
  watch: {},
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/main.scss';
  @import '@/assets/scss/back.scss';
</style>