import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {
  state: {
    loggedIn: false,
    email: 'Guest',
    errorMessage: '',
    displayName:'',
    photoURL:'',
    error_email_msg:'',
    error_pw_msg:''
  },
  getters: {

  },
  mutations: {
    m_logInUser: (state) => {
      state.loggedIn = true;
      router.replace('hello')
    }
  },
  actions: {
    a_logInUser: ({ state, dispatch }, user) => {
      firebase.auth().signInWithEmailAndPassword(user.e, user.p).catch(function (error) {
        // Handle Errors here.
        if (error.code === 'auth/user-not-found') {
          state.error_email_msg = '등록되지 않은 이메일입니다.';
        }
        else if (error.code === 'auth/invalid-email') {
          state.error_email_msg = '이메일 형식이 유효하지 않습니다.';
        }
        else {
          state.error_pw_msg = '비밀번호가 틀렸습니다.';
          state.error_email_msg = '';
        }
        console.log(error.code)
        // state.errorMessage = error.message;
      });
      dispatch('a_authStateObserver');
    },
    a_authStateObserver: ({ commit, state }) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          state.displayName = user.displayName;
          state.email = user.email;
          state.photoURL = user.photoURL;
          commit('m_logInUser');
          // this.$router.replace('hello')
        } else {
          // User is signed out.
          // ...
        }
      });
    }
  }
}
