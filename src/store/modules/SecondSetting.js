import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {

  mutations: {
    m_hello: (state) => {
      state.loggedIn = true;
      router.replace('hello')
    },
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
    a_secondSettingAuthState: ({ commit, state, dispatch }) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          if( user.displayName !== null) {
            window.localStorage.setItem('token', user.uid);
            window.localStorage.setItem('email', user.email);
            window.localStorage.setItem('photoURL', user.photoURL);
            commit('m_hello')
          } else { 
            let message = '잠시만 기다려 주세요.'
            dispatch('a_setToastMessage',message ) 
          }
        } else {
        }
      });
    }
  }
}