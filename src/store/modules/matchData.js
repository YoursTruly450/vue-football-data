import axios from 'axios';

export default ({
  state: {
    matches: [],
    totalMatchDays: 0
	},
	getters: {
    matches(state) {
      return state.matches;
    },
    totalMatchDays(state) {
      return state.totalMatchDays;
    }
	},
	mutations: {
    updateMatches(state, matches) {
      state.matches = matches;
    },
    updateTotalMatchDays(state, count) {
      state.totalMatchDays = count;
    },
	},
  actions: {
    getMatches(ctx, {id, season, matchday, dateFrom, dateTo}) {
      ctx.commit('updateMatches', []);
      let url = `competitions/${id}/matches?season=${season}`;
      if (matchday) {
        url += `&matchday=${matchday}`;
      }
      if (dateFrom) {
        url += `&dateFrom=${dateFrom}`;
      }
      if (dateTo) {
        url += `&dateTo=${dateTo}`;
      }
      return axios({
        method: 'GET',
        url: url
      })
        .then((response) => {
          const matches = response.data;
          ctx.commit('updateMatches', matches);
          if(ctx.state.totalMatchDays === 0) {
            const count = matches.matches.pop().matchday;
            ctx.commit('updateTotalMatchDays', count);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getAllMatches(ctx, {id, season}) {
      ctx.commit('updateTotalMatchDays', 0);
      const url = `competitions/${id}/matches?season=${season}`;
      return axios({
        method: 'GET',
        url: url
      })
        .then((response) => {
          const matches = response.data;
          const count = matches.matches.pop().matchday;
          ctx.commit('updateTotalMatchDays', count);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
})
