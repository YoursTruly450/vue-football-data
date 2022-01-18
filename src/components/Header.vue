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
      if(this.$route.name !== 'Leagues') {
        this.$router.push({ name: 'Leagues'});
      } else {
        this.$router.go(0);
      }
    },
  },
  watch: {},
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/main.scss';
  @import '@/assets/scss/header.scss';
</style>