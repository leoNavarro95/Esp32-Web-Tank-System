import Vue from "vue";
import Router from "vue-router";

import Home from '@/views/Home.vue'
import Panel from '@/views/Dashboard.vue'
import Settings from '@/views/Settings.vue'
import About from '@/views/About.vue'

// import dashboard from '@/views/Dashboard'

Vue.use(Router);

export default new Router({
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        component: About
      },
      {
        path: '/panel',
        name: 'Panel',
        component: Panel
      },
      {
        path: '/settings',
        name: 'Settings',
        component: Settings
      }
    ]
  });
  