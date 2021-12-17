<template>
  <section id="app" class="main_wrapper">
    <Header />
    <router-view/>
    <video loop autoplay muted class="main_wrapper_video">
      <source :src="require('@/assets/img/main/background.mp4')" type="video/mp4">
    </video>
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