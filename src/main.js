import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  data:() => ({
    windowWidth: window.innerWidth,
  }),
  computed: {
    isMobile: function() {
      return this.windowWidth < 768;
    },
    isTablet: function () {
      return this.windowWidth < 1199 && this.windowWidth > 767;
    }
  },
  async mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    })
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app')
