<template>
  <section v-if="league.name" class="competition">
    <section class="competition__header">
      <img 
        :src="league.emblemUrl ? league.emblemUrl : require('../assets/img/main/default_league.png')" 
        alt="league logo"
        class="competition__header_logo"
      >
      <div class="competition__header_titles">
        <h1 class="competition__header_league">{{league.name}}</h1>
        <p class="competition__header_area">{{league.area.name}}</p>
      </div>
    </section>
    <section class="competition__seasons">
      <div class="competition__seasons_caption">
        <span>Seasons:</span>
        <label>Choose season start</label>
        <select id="panel1" v-model="chosenYear" class="competition__seasons_year">
          <option v-for="year in years" :key="year.value" :value="year.value" class="competition__seasons_year_option">
            {{year.text}}
          </option>
        </select>

      </div>
      <div class="competition__seasons_list">
        <div
          class="competition__seasons_item"
          :class="{'competition__seasons_item-current': league.currentSeason.id === season.id}"
          v-for="(season, index) in seasons"
          :key="index"
          @click="seasonDetails(season)"
        >
          <div 
            v-if="league.currentSeason.id === season.id" 
            class="competition__seasons_item_caption"
          >
            Current season
          </div>
          <div 
            v-else 
            class="competition__seasons_item_caption"
          >
            Season complete!
          </div>
          <div class="competition__seasons_item_info">
            <div>
              <div class="competition__seasons_item_text">
                Season year: {{new Date(season.startDate).getFullYear()}} - {{new Date(season.endDate).getFullYear()}}
              </div>
              <div class="competition__seasons_item_passed">
                Matches played: {{season.currentMatchday}}
              </div>
              <div v-if="season.winner" class="competition__seasons_item_winner">
                Winner: {{season.winner.name}}
              </div>
              <div v-else class="competition__seasons_item_winner">
                Winner: not specified
              </div>
            </div>
            <img 
              v-if="season.winner" 
              :src="season.winner.crestUrl" 
              alt="team logo"
              class="competition__seasons_item_img"
            >
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'League',
  components: {},
  data() {
    return {
      chosenYear: ''
    }
  },
  async created() {
    await this.getLeague({id: this.$route.params.id});
  },
  computed: {
    ...mapGetters(['league']),
    seasons() {
      let arr = [];
      if (this.league && this.league.seasons) {
        arr = this.league.seasons.filter(season => season.currentMatchday);
      }
      return this.chosenYear ? arr.filter(el => {
          let date = new Date(el.startDate).getFullYear();
          return date === this.chosenYear;
        }) : arr
    },
    years() {
      let arr = [];
      if (this.league && this.league.seasons) {
        const leagues = this.league.seasons.filter(season => season.currentMatchday);
        arr = leagues.map((season) => {
          return {
            text: new Date(season.startDate).getFullYear(),
            value: new Date(season.startDate).getFullYear()
          };
        })
      }
      return ['', ...arr];
    }
  },
  methods: {
    ...mapActions(['getLeague']),
    seasonDetails(season) {
      this.$router.push({
        name: 'SeasonCalendar', 
        params: {
          id: this.$route.params.id
        },
        query: {
          season: new Date(season.startDate).getFullYear()
        }
      });
    }
  },
  watch: {},
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/main.scss';
  @import '@/assets/scss/competition.scss';
</style>