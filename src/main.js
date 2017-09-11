// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {store} from './store/index.js'
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.prototype.$http = axios

const router = new VueRouter({
  mode: 'history',
  routes
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
