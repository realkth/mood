// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import {store} from './store'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import App from './App'
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.prototype.$http = axios

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
