import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {
  state: {
    toastMessage: ''
  },
  getters: {
    isToastMessage: (state) => {
      return state.toastMessage;
    }
  },
  mutations: {
    m_setToastMessage: (state, payload) => {
      state.toastMessage = payload
    }
  },
  actions: {
    a_setToastMessage: (context, val) => {
      context.commit('m_setToastMessage', val)
    }
  }
}
