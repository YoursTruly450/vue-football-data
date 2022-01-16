import axios from 'axios';

export default ({
  state: {
    teams: [],
    teamMatches: {},
    teamInfo: {}
	},
	getters: {
    teams(state) {
      return state.teams;
    },
    teamMatches(state) {
      return state.teamMatches;
    },
    teamInfo(state) {
      return state.teamInfo;
    },
	},
	mutations: {
    updateTeams(state, teams) {
      state.teams = teams;
    },
    updateTeamMatches(state, teamMatches) {
      state.teamMatches = teamMatches;
    },
    updateTeamInfo(state, teamInfo) {
      state.teamInfo = teamInfo;
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

    getTeamMatches(ctx, {id, dateFrom, dateTo}) {
      ctx.commit('updateTeamMatches', {});
      let url = `teams/${id}/matches`;
      if(dateFrom) {
        if(url === `teams/${id}/matches`) {
          url += `?dateFrom=${dateFrom}`;
        } else {
          url += `&dateFrom=${dateFrom}`;
        }
      }
      if(dateTo) {
        if(url === `teams/${id}/matches`) {
          url += `?dateTo=${dateTo}`;
        } else {
          url += `&dateTo=${dateTo}`;
        }
      }
      return axios({
        method: 'GET',
        url: url
      })
        .then((response) => {
          const teamMatches = response.data;
          ctx.commit('updateTeamMatches', teamMatches);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getTeamInfo(ctx, {id}) {
      ctx.commit('updateTeamInfo', {});
      const url = `teams/${id}`;
      return axios({
        method: 'GET',
        url: url
      })
        .then((response) => {
          const teamInfo = response.data;
          ctx.commit('updateTeamInfo', teamInfo);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
})
