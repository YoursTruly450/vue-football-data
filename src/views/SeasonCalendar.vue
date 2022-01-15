<template>
  <section class="calendar">
    {{totalMatchDays}}
    <section v-if="matches.matches && matches.matches.length > 0" class="calendar__matches">
      <div class="calendar__matches_header">
        <div class="calendar__matches_matchday">Match Day</div>
        <div class="calendar__matches_date">Date, Time</div>
        <div class="calendar__matches_teams">Home - Away</div>
        <div class="calendar__matches_score">Score</div>
      </div>
      <div 
        v-for="(match, index) in matches.matches" 
        :key="index"
        class="calendar__matches_item"
      >
        <div class="calendar__matches_matchday">{{match.matchday}}</div>
        <div class="calendar__matches_date">
          {{new Date(match.utcDate).toLocaleDateString('RU')}}, {{match.utcDate.split('T')[1].split(':00Z')[0]}}
        </div>
        <div class="calendar__matches_teams">{{match.homeTeam. name}} - {{match.awayTeam. name}}</div>
        <div class="calendar__matches_score">{{match.score. fullTime.homeTeam}} - {{match.score. fullTime.awayTeam}}</div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SeasonCalendar',
  components: {},
  data() {
    return {
    }
  },
  async created() {
    await this.getMatches({
      id: this.$route.params.id,
      season: this.$route.query.season,
      matchday: this.$route.query.matchday ? this.$route.query.matchday : null
    });
  },
  computed: {
    ...mapGetters(['matches', 'totalMatchDays']),
  },
  methods: {
    ...mapActions(['getMatches']),
  },
  watch: {},
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/main.scss';
  @import '@/assets/scss/calendar.scss';
</style>
