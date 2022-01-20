import leagueData from './modules/leagueData';
import matchData from './modules/matchData';
import teamData from './modules/teamData';

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

axios.defaults.baseURL = `${process.env.VUE_APP_PATH}/`;
axios.defaults.headers.common['X-Auth-Token'] = `${process.env.VUE_APP_TOKEN}`;
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
    if(error.response && error.response.status === 403) {
      alert(error.response.data.message);
      router.push({name: 'Leagues'});
      return Promise.reject(error);
    }
    alert('Number of requests exceeded, please wait 1 minute...');
    router.push({name: 'Wait'});
    return Promise.reject(error);
});


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    teamData,
    matchData,
    leagueData
  }
})
