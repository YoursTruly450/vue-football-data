import axios from 'axios';

export default ({
  state: {
    leagues: [],
	},
	getters: {
    leagues(state) {
      return state.leagues;
    },
	},
	mutations: {
    updateLeagues(state, leagues) {
      state.leagues = leagues;
    },
	},
  actions: {
    getLeagues(ctx, {id}) {
      let url = 'competitions/';
      if(id) {
        url += id;
      }
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

  },
})
