import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Auth from './views/Auth.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
});