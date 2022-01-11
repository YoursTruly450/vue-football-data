import axios from 'axios';

export default ({
  state: {
    leagues: [],
    league: {}
	},
	getters: {
    leagues(state) {
      return state.leagues;
    },
    league(state) {
      return state.league;
    },
	},
	mutations: {
    updateLeagues(state, leagues) {
      state.leagues = leagues;
    },
    updateLeague(state, league) {
      state.league = league;
    },
	},
  actions: {
    getLeagues(ctx) {
      ctx.commit('updateLeagues', []);
      const url = 'competitions/';
      return axios({
        method: 'GET',
        url: url
      })
        .then((response) => {
          const leagues = response.data;
          ctx.commit('updateLeagues', leagues);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getLeague(ctx, {id}) {
      ctx.commit('updateLeague', {});
      const url = `competitions/${id}`;
      return axios({
        method: 'GET',
        url: url
      })
        .then((response) => {
          const league = response.data;
          ctx.commit('updateLeague', league);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
})
