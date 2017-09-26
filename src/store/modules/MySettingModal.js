import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {
  state: {

  },
  getters: {
    // isSetting_err_msg: (state) => {
    //   return state.setting_err_msg
    // },
    // isCurrentUser: (state) => {
    //   return state.currentUser
    // },
  },
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
          // dispatch('a_FirstSettingAuthState');
          //Success
          // this.$router.replace('hello')
          // console.log(firebase.auth().currentUser.displayName)
          // console.log(firebase.auth().currentUser.photoURL)
        }, function(error) {
          //Error
          console.log(error);
        });
        // this.$router.replace('second-setting')
      }
      else {
        state.setting_err_msg = '유저 네임을 설정해주세요.';
      }
      dispatch('a_SettingAuthState');
    },
    a_SettingAuthState: ({ commit, state }) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          // console.log(getters.isDisplayName)
          // getters.isDisplayName = user.displayName;
          // getters.isphotoURL = user.photoURL;
          commit('m_setDisplayName');
          commit('m_setPhoto');
        } else {
          // User is signed out.
          // ...
        }
      });
    },
  }
}