import Vue from 'vue'
import Vuex from 'vuex'
import SignIn from './modules/SignIn'
import SignUp from './modules/SignUp'
import FirstSetting from './modules/FirstSetting'
import SecondSetting from './modules/SecondSetting'
import MySettingModal from './modules/MySettingModal'
import ToastMessage from './modules/ToastMessage'
import Post from './modules/Post'
import * as firebase from 'firebase'
import router from './../router/'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    SignIn, SignUp, FirstSetting, SecondSetting, MySettingModal, ToastMessage, Post
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
