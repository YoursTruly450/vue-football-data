/* eslint-disable no-mixed-spaces-and-tabs */
<template>
  <section class="competitions">
    <h1 class="competitions__caption">ALL FOOTBALL LEAGUES & COMPETITIONS</h1>
    <ul class="competitions__list">
      <li
        class="competitions__list_item"
        :class="{'competitions__list_item-available': availableCodes.includes(league.code)}"
        v-for="(league, index) in leagues.competitions"
        :key="index"
        @click="leagueDetails(league)"
      >
        {{league.name}}
        <p>{{availableCodes.includes(league.code) ? 'League available': 'League not available'}}</p>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Leagues',
  components: {},
  data() {
    return {
      availableCodes: [
        'WC', 'CL', 'BL1', 'DED', 'BSA', 'PD', 'FL1', 'ELC', 'PPL', 'EC', 'SA', 'PL', 'CLI'
      ]
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
    leagueDetails(league) {
      this.$router.push({name: 'League', params: {id: league.id}});
    },
  },
  watch: {},
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/main.scss';
  @import '@/assets/scss/competitions.scss';
</style>
