import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'babel-polyfill'
import store from './store'

import vuetify from '@/plugins/vuetify' // path to vuetify export

import VueNativeSock from 'vue-native-websocket';
// Vue.use(VueNativeSock, "ws://" + location.hostname + "/ws", {
Vue.use(VueNativeSock, "ws://192.168.4.1/ws", {
  store: store,
  protocol: 'arduino',
  format: 'json',
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 2, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 1000 // (Number) how long to initially wait before attempting a new (1000)
});

export const vue = new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  render: h => h(App)
})
