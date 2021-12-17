/* eslint-disable no-mixed-spaces-and-tabs */
<template>
  <section class="competitions">
    <h1 class="competitions__caption">{{leagues.name}}</h1>
  </section>
</template>

<script>
import '@/assets/scss/main.scss';
import '@/assets/scss/competitions.scss';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'League',
  components: {},
  data() {
    return {
    }
  },
  async created() {
    await this.getLeagues({id: this.$route.params.id});
  },
  computed: {
    ...mapGetters(['leagues']),
  },
  methods: {
    ...mapActions(['getLeagues']),
  },
  watch: {},
}

</script>
