import 'es6-promise/auto'

import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import firebase from 'firebase'
import { store } from './store'
import moment from 'moment'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(VueRouter)
Vue.use(Vue2TouchEvents, {
  disableClick: false,
  touchClass: '',
  tapTolerance: 10,
  swipeTolerance: 30,
})
Vue.prototype.$http = axios
Vue.prototype.moment = moment
let app;
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function (searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if (len === 0) {
        return false;
      }
      var n = fromIndex | 0;
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }
      while (k < len) {
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }
      return false;
    }
  });
}
if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}
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