import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {
  state: {
    first_uploadMyImg: '',
    first_setting_err_msg: '',
    // photoURL: '',
    first_currentUser: {
      photoURL: '',
      displayName: ''
    }
  },
  getters: {
    isFirst_uploadMyImg: (state) => {
      return state.first_uploadMyImg
    },
    isFirst_setting_err_msg: (state) => {
      return state.first_setting_err_msg
    },
    isFirst_currentUser: (state) => {
      return state.first_currentUser
    },
  },
  mutations: {
    // checkImage: (file) => {
    //   if (/.*\.(gif)|(jpeg)|(jpg)|(png)$/.test(file.name.toLowerCase())) {
    //     return true;
    //   }
    // },
    m_secondSetting: (state) => {
      state.loggedIn = true;
      // state.photoURL = state.first_currentUser.photoURL
      router.replace('second-setting')
    },

    m_setFirstPhoto: (state, payload) => {
      state.first_currentUser.photoURL = payload
    },
    m_setFirstDisplayName: (state, payload) => {
      state.first_currentUser.displayName = payload
    },

  },
  actions: {

    a_setFirstPhoto: (context, val) => {
      context.commit('m_setFirstPhoto', val)
    },
    a_setFirstDisplayName: (context, val) => {
      context.commit('m_setFirstDisplayName', val)
    },
    a_firstSetting: ({ state, dispatch }, currentUser) => {
      let user = firebase.auth().currentUser;

      if (state.first_currentUser.displayName.trim() !== '') {
        user.updateProfile({
          photoURL: state.first_currentUser.photoURL,
          displayName: state.first_currentUser.displayName
        }).then(function (response) {
          // commit('m_secondSetting');
        }, function (error) {
          //Error
          console.log(error);
        });
      }
      else {
        state.first_setting_err_msg = '유저 네임을 설정해주세요.';
      }
      dispatch('a_firstSettingAuthState');
    },
    a_firstSettingAuthState: ({ commit, state }) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          commit('m_secondSetting');
        } else {
          // User is signed out.
          // ...
        }
      });
    },
  }
}