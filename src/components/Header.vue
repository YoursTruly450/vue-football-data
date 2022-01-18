<template>
  <nav class="header">
    <img 
      :src="require('@/assets/img/main/main_logo.png')" 
      alt="main logo" 
      class="header__logo"
      @click="navigateToHome"
    >
    <p 
      class="header__title"
      @click="navigateToHome"
    >
      SOCCER LEAGUES
    </p>
    <a href="https://github.com/YoursTruly450" 
      class="header__git"
      target="_blank"
      rel="noopener noreferrer"
    >
      powered by YoursTruly
      <img 
        :src="require('@/assets/img/main/cat.png')" 
        alt="main logo" 
        class="header__git_logo"
        @click="navigateToHome"
      >
    </a>
  </nav>
</template>

<script>

export default {
  name: 'Header',
  components: {},
  data() {
    return {
    }
  },
  async created() {},
  computed: {},
  methods: {
    navigateToHome(){
      this.$router.go({ name: 'Leagues'});
    },
  },
  watch: {},
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/main.scss';
  @import '@/assets/scss/header.scss';
</style>