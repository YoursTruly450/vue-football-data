import Vue from 'vue';
import VueRouter from 'vue-router';

function load(component) {
  return () => import(`@/views/${component}.vue`);
}

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Leagues',
    component: load('Leagues'),
  },
  {
    path: '/league/:id?',
    name: 'League',
    component: load('League'),
  },
  {
    path: '/calendar/:id?',
    name: 'SeasonCalendar',
    component: load('SeasonCalendar'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;
