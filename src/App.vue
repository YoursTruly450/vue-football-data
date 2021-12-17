<template>
  <section id="app" class="main_wrapper">
    <Header />
    <router-view/>
  </section>
</template>

<script>
import '@/assets/scss/main.scss';

import Header from '@/components/Header';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
</style>