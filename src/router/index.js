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
  {
    path: '/team/:id?',
    name: 'Team',
    component: load('Team'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
