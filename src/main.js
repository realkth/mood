// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import firebase from 'firebase'
import {store} from './store'
import VueFire from 'vuefire'
// import VueCharts from 'vue-chartjs'
// import { Bar, Line } from 'vue-chartjs'

// Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueFire)
// Vue.use(VueCharts);
Vue.prototype.$http = axios

let app;

  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyB_z_mvThzaqWKp1vcZKjIOcIuWtYYmiAg",
    authDomain: "mood-vuex.firebaseapp.com",
    databaseURL: "https://mood-vuex.firebaseio.com",
    projectId: "mood-vuex",
    storageBucket: "mood-vuex.appspot.com",
    messagingSenderId: "467319904800"
  };
  firebase.initializeApp(config);
  
  firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router,
      store
    })
  }
});
export default{
  database: firebase.database(),
  storage: firebase.storage()
}