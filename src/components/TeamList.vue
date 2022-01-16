<template>
  <section class="teams">
    <ul v-if="teams.teams && teams.teams.length > 0" class="teams__list">
      <li 
        v-for="(team, index) in teams.teams" 
        :key="index" 
        class="teams__item"
        @click="navigateToTeam(team)"
      >
        <img 
          :src="team.crestUrl" 
          alt="team logo"
          class="teams__img"
        >
        <div class="teams__text">{{team.name}}</div>
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
    navigateToTeam(team) {
      this.$router.push({name: 'Team', params: {id: team.id}});
    }
  },
  watch: {},
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/main.scss';
  @import '@/assets/scss/team-list.scss';
</style>