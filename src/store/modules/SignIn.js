import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {
  state: {
    loggedIn: false,
    email: 'Guest',
    password: '',
    displayName: '',
    photoURL: '',
    error_email_msg: '',
    error_pw_msg: '',
    token: '',
  },
  getters: {
    isEmail: (state) => {
      return state.email;
    },
    isErrEmailMsg: (state) => {
      return state.error_email_msg;
    },
    isErrPwMsg: (state) => {
      return state.error_pw_msg;
    },
    isToken: (state) => {
      return state.token;
    },
    isDisplayName: (state) => {
      return state.displayName;
    },
    isPhotoURL: (state) => {
      return state.photoURL;
    }

  },
  mutations: {
    m_logInUser: (state) => {
      state.loggedIn = true;
      router.replace('hello')
    },
    m_email: (state, payload) => {
      state.email = payload
    },
    m_password: (state, payload) => {
      state.password = payload
    }
  },
  actions: {
    a_email: (context, val) => { context.commit('m_email', val) },
    a_password: (context, val) => { context.commit('m_password', val) },
    a_logInUser: ({ state, dispatch }, user) => {
      firebase.auth().signInWithEmailAndPassword(state.email, state.password).then(() => {
        state.error_email_msg = '',
          state.error_pw_msg = ''

      }
      ).catch(function (error) {
        // Handle Errors here.
        console.log(error.code)
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
      });
      dispatch('a_signInAuthState');

    },
    a_signInAuthState: ({ commit, state }) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          state.photoURL = user.photoURL;
          window.localStorage.setItem('email', user.email);
          window.localStorage.setItem('photoURL', user.photoURL);
          window.localStorage.setItem('token', user.uid);
          commit('m_logInUser');
        } else {
        }
      });
    }
  }
}
