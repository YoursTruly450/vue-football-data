<template>
  <section class="competitions">
    <div class="competitions__panel">
      <h1 class="competitions__caption">ALL FOOTBALL LEAGUES & COMPETITIONS</h1>
      <input 
        type="text" 
        placeholder="search" 
        class="competitions__search"
        v-model="search"
      />
      <div class="competitions__checkbox">
        <div
          class="competitions__checkbox_box"
          @click="checked = !checked"
        >
          <svg v-if="checked" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 102.97">
            <defs></defs>
            <path fill="#4CBB17" d="M4.82,69.68c-14.89-16,8-39.87,24.52-24.76,5.83,5.32,12.22,11,18.11,16.27L92.81,5.46c15.79-16.33,40.72,7.65,25.13,24.07l-57,68A17.49,17.49,0,0,1,48.26,103a16.94,16.94,0,0,1-11.58-4.39c-9.74-9.1-21.74-20.32-31.86-28.9Z"/>
          </svg>
        </div>
        <span>Only available</span>
      </div>
    </div>
    <ul v-if="sortedLeagues && sortedLeagues.length" class="competitions__list">
      <li
        class="competitions__list_item"
        :class="{'competitions__list_item-available': availableCodes.includes(league.code)}"
        v-for="(league, index) in sortedLeagues"
        :key="index"
        @click="leagueDetails(league)"
      >
        <img 
          :src="league.emblemUrl ? league.emblemUrl : require('../assets/img/main/default_league.png')" 
          alt="league logo"
          class="competitions__list_logo"
        >
        <div class="competitions__list_text">
          <div class="competitions__list_name">
            {{league.name}}
          </div>
          <div class="competitions__list_area">
            {{league.area.name}}
          </div>
        </div>
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
      ],
      search: '',
      checked: false
    }
  },
  async created() {
    await this.getLeagues();
  },
  computed: {
    ...mapGetters(['leagues']),
    sortedLeagues() {
      let arr = new Array();
      if (this.leagues.competitions && this.leagues.competitions.length > 0) {
        arr = this.leagues.competitions.filter(league => league.name.toLowerCase().includes(this.search.toLowerCase()) || league.area.name.toLowerCase().includes(this.search.toLowerCase()));
      }
      return this.checked ? arr.filter(el => this.availableCodes.includes(el.code)) : arr;
    }
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