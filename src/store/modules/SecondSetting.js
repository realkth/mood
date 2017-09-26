import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {
  state: {
    // photoURL: '',
    // displayName: ''

  },
  getters: {
    // isPhotoURL: (state) => {
    //   return state.photoURL;
    // }
  },
  mutations: {
    m_hello: (state) => {
      state.loggedIn = true;
      // console.log("됐어? 퍼스트세팅스테이트에서 그냥 스테이트로 변이시킨 것이?")
      router.replace('hello')
    },
    // m_setPhotoURL: (state, payload) => {
    //   state.photoURL = state.first_currentUser.photoURL
    // },
    // m_setDisplayName: (state, payload) => {
    //   state.displayName = state.first_currentUser.displayName
    // },

  },
  actions: {
    a_verfification: ({ state, dispatch }) => {
      let user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function () {
        // Email sent.
      }, function (error) {
        // An error happened.
      });
      dispatch('a_secondSettingAuthState')
    },
    a_secondSettingAuthState: ({ commit, state }) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          commit('m_hello')
        } else {
          // User is signed out.
          // ...
        }
      });
    }
  }
}