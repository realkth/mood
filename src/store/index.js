import Vue from 'vue'
import Vuex from 'vuex'
import sign from './modules/sign'
import * as firebase from 'firebase'
import router from './../router/'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
  // 엄격모드  : 개발모드에서 state에 바로 접근하는 것을 막아준다.
  // strict: process.env.NODE_ENV !== 'production',
  // 저장소를 모듈화하면 필요. 일단은 그냥 모듈화하지 말고 하나로 만들어보자(나중에 혹시나 필요하면 바꾸면 됨)
  modules: {
    sign
  },
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  }

})
