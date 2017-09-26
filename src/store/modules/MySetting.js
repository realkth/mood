import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {
  state: {
    first_setting_err_msg: '',
    first_currentUser: {
      photoURL: '',
      displayName: ''
    }
  },
  getters: {
    isFirst_setting_err_msg: (state) => {
      return state.first_setting_err_msg
    },
    isFirst_currentUser: (state) => {
      return state.first_currentUser
    },
  },
  mutations: {
    m_secondSetting: (state) => {
      state.loggedIn = true;
      // window.localStorage.setItem('token', state.token)
      router.replace('second-setting')
    },
    m_setFirstErrMsg: (state, payload) => {
      state.first_setting_err_msg = payload
    },
    m_setFirstPhoto: (state, payload) => {
      state.first_currentUser.photoURL = payload
    },
    m_setFirstDisplayName: (state, payload) => {
      state.first_currentUser.displayName = payload
    },

  },
  actions: {
    a_setFirstErrMsg: (context, val) => {
      context.commit('m_setFirstErrMsg', val)
    },
    a_setFirstPhoto: (context, val) => {
      context.commit('m_setFirstPhoto', val)
    },
    a_setFirstDisplayName: (context, val) => {
      context.commit('m_setFirstDisplayName', val)
    },
    a_firstSetting: ({state, dispatch}, currentUser) => {
      let user = firebase.auth().currentUser;
      if (state.first_currentUser.displayName.trim() !== '') {
        user.updateProfile({
          photoURL: state.first_currentUser.photoURL,
          displayName: state.first_currentUser.displayName
        }).then(function(response) {
          dispatch('a_FirstSettingAuthState');
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
        state.first_setting_err_msg = '유저 네임을 설정해주세요.';
      }
      // dispatch('a_FirstSettingAuthState');
    },
    a_FirstSettingAuthState: ({ commit, state }) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          // console.log(getters.isDisplayName)
          // getters.isDisplayName = user.displayName;
          // getters.isphotoURL = user.photoURL;
          commit('m_secondSetting');
        } else {
          // User is signed out.
          // ...
        }
      });
    },
  }
}