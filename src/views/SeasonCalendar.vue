<template>
  <section class="calendar">
    <RouterBack />
    <TeamList />
    <div class="calendar__mobile">
      <section class="calendar__filters _mt48">
        <span>Choose Match Day</span>
        <span>Choose Start Date</span>
        <span>Choose EndDate</span>
      </section>
      <section class="calendar__filters _mt24">
        <select
          id="panel1"
          v-model="chosenDay"
          class="calendar__filters_day"
        >
          <option v-for="day in days" :key="day" :value="day" class="calendar__filters_day_option">
            {{day}}
          </option>
        </select>
        <input
          id="date"
          type="date"
          v-model="startDate"
          class="calendar__filters_date"
          @change="changeStartDate"
        >
        <input
          id="date"
          type="date"
          v-model="endDate"
          class="calendar__filters_date"
          @change="changeEndDate"
        >
      </section>
    </div>
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
import TeamList from '../components/TeamList';

export default {
  name: 'SeasonCalendar',
  components: {
    RouterBack,
    TeamList
  },
  data() {
    return {
      chosenDay: null,
      startDate: null,
      endDate: null
    }
  },
  async created() {
    await this.getAllMatches({
      id: this.$route.params.id,
      season: this.$route.query.season
    });
    await this.getMatches({
      id: this.$route.params.id,
      season: this.$route.query.season,
      matchday: this.$route.query.matchday ? this.$route.query.matchday : null,
      dateFrom: this.$route.query.dateFrom && this.$route.query.dateTo ? this.$route.query.dateFrom : null,
      dateTo: this.$route.query.dateTo && this.$route.query.dateFrom ? this.$route.query.dateTo : null,
    });
  },
  computed: {
    ...mapGetters(['matches', 'totalMatchDays']),
    days() {
      let arr = [];
      if (this.totalMatchDays && this.totalMatchDays > 0) {
        arr = [...Array(this.totalMatchDays).keys()].map(x => ++x);
      }
      return ['', ...arr];
    }
  },
  methods: {
    ...mapActions(['getMatches', 'getAllMatches']),
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
            this.getMatches({
              id: this.$route.params.id,
              season: this.$route.query.season,
              matchday: this.$route.query.matchday ? this.$route.query.matchday : null,
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
            this.getMatches({
              id: this.$route.params.id,
              season: this.$route.query.season,
              matchday: this.$route.query.matchday ? this.$route.query.matchday : null,
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
            this.getMatches({
              id: this.$route.params.id,
              season: this.$route.query.season,
              matchday: this.$route.query.matchday ? this.$route.query.matchday : null,
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
            this.getMatches({
              id: this.$route.params.id,
              season: this.$route.query.season,
              matchday: this.$route.query.matchday ? this.$route.query.matchday : null,
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
      }
    },
  },
  watch: {
    chosenDay(newVal) {
      if(newVal !== '') {
        this.$router.replace(
          {
            query: Object.assign(
              {...this.$route.query},
              {matchday: newVal}
            )
          },
          () => {}
        )
        this.getMatches({
          id: this.$route.params.id,
          season: this.$route.query.season,
          matchday: newVal,
          dateFrom: this.$route.query.dateFrom && this.$route.query.dateTo ? this.$route.query.dateFrom : null,
          dateTo: this.$route.query.dateFrom && this.$route.query.dateTo ? this.$route.query.dateTo : null,
        });
      } else {
        let obj = Object.assign({...this.$route.query});
        delete obj.matchday;
        this.$router.replace(
          {
            query: Object.assign(
              {...obj}
            )
          },
          () => {}
        )
        this.getMatches({
          id: this.$route.params.id,
          season: this.$route.query.season,
          matchday: this.$route.query.matchday ? this.$route.query.matchday : null,
          dateFrom: this.$route.query.dateFrom ? this.$route.query.dateFrom : null,
          dateTo: this.$route.query.dateTo ? this.$route.query.dateTo : null,
        });
      }
    }
  },
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/main.scss';
  @import '@/assets/scss/calendar.scss';
</style>
