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
        Seasons:
      </div>
      <div class="competition__seasons_list">
        <div
          class="competition__seasons_item"
          :class="{'competition__seasons_item-current': league.currentSeason.id === season.id}"
          v-for="(season, index) in seasons"
          :key="index"
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
            <div class="competition__seasons_item_start">{{season.startDate.toLocaleString()}}</div>
            <div class="competition__seasons_item_end">{{season.endDate.toLocaleString()}}</div>
            <div class="competition__seasons_item_passed">{{season.currentMatchday}}</div>
          </div>
          {{season}}
        </div>
      </div>
    </section>
    <!-- {{league}} -->
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'League',
  components: {},
  data() {
    return {
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
      return arr;
    }
  },
  methods: {
    ...mapActions(['getLeague']),
  },
  watch: {},
}

</script>

<style lang="scss" scoped>
  @import '@/assets/scss/main.scss';
  @import '@/assets/scss/competition.scss';
</style>
