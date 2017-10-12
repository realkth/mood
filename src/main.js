// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import firebase from 'firebase'
import { store } from './store'
import moment from 'moment'

Vue.use(VueRouter)
Vue.prototype.$http = axios
Vue.prototype.moment = moment
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
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router,
      store
    })
  }
});
export default {
  database: firebase.database(),
  storage: firebase.storage()
}