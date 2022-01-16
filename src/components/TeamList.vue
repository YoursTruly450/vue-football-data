<template>
  <section class="team">
    <ul v-if="teams.teams && teams.teams.length > 0" class="team__list">
      <li 
        v-for="(team, index) in teams.teams" 
        :key="index" 
        class="team__item"
      >
        <img 
          :src="team.crestUrl" 
          alt="team logo"
          class="team__img"
        >
        <div class="team__text">{{team.name}}</div>
      </li>
    </ul>
  </section>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TeamList',
  components: {},
  data() {
    return {
    }
  },
  async created() {
    await this.getTeams({
      id: this.$route.params.id,
      season: this.$route.query.season
    })
  },
  computed: {
    ...mapGetters(['teams']),
  },
  methods: {
    ...mapActions(['getTeams']),
  },
  watch: {},
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/main.scss';
  @import '@/assets/scss/team-list.scss';
</style>