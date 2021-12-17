<template>
  <nav class="header">
    <img 
      :src="require('@/assets/img/main/main_logo.png')" 
      alt="main logo" 
      class="header__logo"
      @click="navigateToHome"
    >
    <a href="https://github.com/YoursTruly450" 
      class="header__git"
      target="_blank"
      rel="noopener noreferrer"
    >
      powered by YoursTruly
    </a>
  </nav>
</template>

<script>
import '@/assets/scss/header.scss';

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
      this.$router.push({ name: 'Leagues'});
    },
  },
  watch: {},
}

</script>