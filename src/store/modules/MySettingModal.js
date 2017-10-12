import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {

  mutations: {

    m_setErrMsg: (state, payload) => {
      state.setting_err_msg = payload
    },
    m_setPhoto: (state, payload) => {
      state.photoURL = payload
    },
    m_setDisplayName: (state, payload) => {
      state.displayName = payload
    },

  },
  actions: {
    a_setErrMsg: (context, val) => {
      context.commit('m_setErrMsg', val)
    },
    a_setPhoto: (context, val) => {
      context.commit('m_setPhoto', val)
    },
    a_setDisplayName: (context, val) => {
      context.commit('m_setDisplayName', val)
    },
    a_setting: ({state, dispatch}, currentUser) => {
      let user = firebase.auth().currentUser;
      if (state.displayName.trim() !== '') {
        user.updateProfile({
          photoURL: state.photoURL,
          displayName: state.displayName

        }).then(function(response) {
        }, function(error) {
          console.log(error);
        });
      }
      else {
        state.setting_err_msg = '유저 네임을 설정해주세요.';
      }
      dispatch('a_SettingAuthState');
    },
    a_SettingAuthState: ({ commit, state }) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          commit('m_setDisplayName');
          commit('m_setPhoto');
        } else {
        }
      });
    },
  }
}