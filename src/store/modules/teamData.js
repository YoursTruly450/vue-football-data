import axios from 'axios';

export default ({
  state: {
    teams: [],
	},
	getters: {
    teams(state) {
      return state.teams;
    },
	},
	mutations: {
    updateTeams(state, teams) {
      state.teams = teams;
    },
	},
  actions: {
    getTeams(ctx, {id, season}) {
      ctx.commit('updateTeams', []);
      const url = `competitions/${id}/teams?season=${season}`;
      return axios({
        method: 'GET',
        url: url
      })
        .then((response) => {
          const teams = response.data;
          ctx.commit('updateTeams', teams);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  }
})
