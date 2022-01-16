<template>
  <section class="team">
    <RouterBack />
    <section v-if="teamInfo && teamInfo !== {} && teamInfo.name" class="team__info">
      <img 
        :src="teamInfo.crestUrl" 
        alt="team logo"
        class="team__info_img"
      >
      <div class="team__info_desc">
        <div class="team__info_name">{{teamInfo.name}}</div>
        <div class="team__info_area">{{teamInfo.area.name}}</div>
        <a 
          :href="teamInfo.website" 
          target="_blank"
          rel="noopener noreferrer"
          class="team__info_site"
        >
          {{teamInfo.website}}
        </a>
      </div>
    </section>
    <section class="team__filters _mt48">
      <span>Choose Start Date</span>
      <span>Choose EndDate</span>
    </section>
    <section class="team__filters _mt24">
      <input 
        id="date" 
        type="date" 
        v-model="startDate" 
        class="team__filters_date"
        @change="changeStartDate"
      >
      <input 
        id="date" 
        type="date" 
        v-model="endDate" 
        class="team__filters_date"
        @change="changeEndDate"
      >
    </section>
    <section v-if="teamMatches.matches && teamMatches.matches.length > 0" class="calendar__matches">
      <div class="calendar__matches_header">
        <div class="calendar__matches_matchday">Match Day</div>
        <div class="calendar__matches_date">Date, Time</div>
        <div class="calendar__matches_teams">Home - Away</div>
        <div class="calendar__matches_score">Score</div>
      </div>
      <div 
        v-for="(match, index) in teamMatches.matches" 
        :key="index"
        class="calendar__matches_item"
      >
        <div class="calendar__matches_matchday">{{match.matchday}}</div>
        <div class="calendar__matches_date">
          {{new Date(match.utcDate).toLocaleDateString('RU')}}, {{match.utcDate.split('T')[1].split(':00Z')[0]}}
        </div>
        <div class="calendar__matches_teams">
          {{match.homeTeam. name}} - {{match.awayTeam. name}}
        </div>
        <div class="calendar__matches_score">
          {{match.score. fullTime.homeTeam}} - {{match.score. fullTime.awayTeam}}
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import RouterBack from '../components/RouterBack';

export default {
  name: 'Team',
  components: {
    RouterBack
  },
  data() {
    return {
      startDate: null,
      endDate: null
    }
  },
  async created() {
    await this.getTeamInfo({
      id: this.$route.params.id
    });
    await this.getTeamMatches({
      id: this.$route.params.id,
      dateFrom: this.$route.query.dateFrom && this.$route.query.dateTo ? this.$route.query.dateFrom : null,
      dateTo: this.$route.query.dateFrom && this.$route.query.dateTo ? this.$route.query.dateTo : null,
    });
  },
  computed: {
    ...mapGetters(['teamMatches', 'teamInfo']),
  },
  methods: {
    ...mapActions(['getTeamMatches', 'getTeamInfo']),
    changeStartDate() {
      if (new Date(this.startDate).getFullYear()) {
        if(this.startDate !== '' && this.startDate !== null) {
          this.$router.replace(
            {
              query: Object.assign(
                {...this.$route.query},
                {dateFrom: this.startDate}
              )
            },
            () => {}
          )
          if (this.endDate !== '' && this.endDate !== null) {
            this.getTeamMatches({
              id: this.$route.params.id,
              dateFrom: this.$route.query.dateTo ? this.startDate : null,
              dateTo: this.$route.query.dateTo && this.$route.query.dateFrom ? this.$route.query.dateTo : null,
            });
          }
        } else {
          let obj = Object.assign({...this.$route.query});
          delete obj.dateFrom;
          this.$router.replace(
            {
              query: Object.assign(
                {...obj}
              )
            },
            () => {}
          )
          if (this.endDate !== '' && this.endDate !== null) {
            this.getTeamMatches({
              id: this.$route.params.id,
              dateFrom: this.$route.query.dateFrom && this.$route.query.dateTo ? this.$route.query.dateFrom : null,
              dateTo: this.$route.query.dateTo && this.$route.query.dateFrom ? this.$route.query.dateTo : null,
            });
          }
        }
      } else {
        let obj = Object.assign({...this.$route.query});
        delete obj.dateFrom;
        this.$router.replace(
          {
            query: Object.assign(
              {...obj}
            )
          },
          () => {}
        )
        this.getTeamMatches({
          id: this.$route.params.id,
          dateFrom: this.$route.query.dateFrom && this.$route.query.dateTo ? this.$route.query.dateFrom : null,
          dateTo: this.$route.query.dateFrom && this.$route.query.dateTo ? this.$route.query.dateTo : null,
        });
      }
    },
    changeEndDate() {
      if(new Date(this.endDate).getFullYear()) {
        if(this.endDate !== '' && this.endDate !== null) {
          this.$router.replace(
            {
              query: Object.assign(
                {...this.$route.query},
                {dateTo: this.endDate}
              )
            },
            () => {}
          )
          if (this.startDate !== '' && this.startDate !== null) {
            this.getTeamMatches({
              id: this.$route.params.id,
              dateFrom: this.$route.query.dateFrom && this.$route.query.dateTo ? this.$route.query.dateFrom : null,
              dateTo: this.$route.query.dateFrom ? this.endDate : null
            });
          }
        } else {
          let obj = Object.assign({...this.$route.query});
          delete obj.dateTo;
          this.$router.replace(
            {
              query: Object.assign(
                {...obj}
              )
            },
            () => {}
          )
          if (this.startDate !== '' && this.startDate !== null) {
            this.getTeamMatches({
              id: this.$route.params.id,
              dateFrom: this.$route.query.dateFrom && this.$route.query.dateTo ? this.$route.query.dateFrom : null,
              dateTo: this.$route.query.dateTo && this.$route.query.dateFrom ? this.$route.query.dateTo : null,
            });
          }
        }
      } else {
        let obj = Object.assign({...this.$route.query});
        delete obj.dateTo;
        this.$router.replace(
          {
            query: Object.assign(
              {...obj}
            )
          },
          () => {}
        )
        this.getTeamMatches({
          id: this.$route.params.id,
          dateFrom: this.$route.query.dateFrom && this.$route.query.dateTo ? this.$route.query.dateFrom : null,
          dateTo: this.$route.query.dateFrom && this.$route.query.dateTo ? this.$route.query.dateTo : null,
        });
      }
    },
  },
  watch: {},
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/main.scss';
  @import '@/assets/scss/calendar.scss';
  @import '@/assets/scss/team.scss';
</style>