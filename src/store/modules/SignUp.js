import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {
  state: {
    signup_err_pw_msg: '비밀번호는 6자 이상이어야 합니다.',
    signup_err_email_msg: '',
    sign_email: '',
    sign_Pw: ''
  },
  getters: {
    isSignup_err_pw_msg: (state) => {
      return state.signup_err_pw_msg
    },
    isSignup_err_email_msg: (state) => {
      return state.signup_err_email_msg
    },
    validateEmail: (state) => {
      let emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return {
        sign_email: emailRE.test(state.sign_email)
      }
    }
  },
  mutations: {
    m_nextSetting: (state) => {
      state.loggedIn = true;
      // window.localStorage.setItem('token', state.token)
      router.replace('first-setting')
    },
    m_setEmail: (state, payload) => {
      state.sign_email = payload
    },
    m_setPw: (state, payload) => {
      state.sign_Pw = payload
    },
    m_setWrongEmail: (state, payload) => {
      state.sign_email = state.sign_email + '';
    }
  },
  actions: {
    a_setEmail: (context, val) => { context.commit('m_setEmail', val) },
    a_setPw: (context, val) => { context.commit('m_setPw', val) },

    a_signUp: ({ state, dispatch, commit}, user) => {
      firebase.auth().createUserWithEmailAndPassword( state.sign_email, state.sign_Pw).then(
        (user) => {
          // this.$router.replace('first-setting')
        },
        (err) => {
          console.log('Oops. ' + err.message);
          console.log('state', state.signup_err_email_msg);
          if (err.message === 'Password should be at least 6 characters') {
            state.signup_err_pw_msg = '비밀번호가 유효하지 않습니다.';
            let msg_element = document.getElementById('pw_msg');
            msg_element.classList.remove('msg');
            msg_element.classList.add('errmsg');
          }
          else if (err.message === 'The email address is already in use by another account.') {
            state.signup_err_email_msg = '이미 가입된 이메일입니다.';
            let msg_element = document.getElementById('email_msg');
            msg_element.classList.remove('msg');
            msg_element.classList.add('errmsg');
            commit('m_setWrongEmail');
            // state.sign_email = state.sign_email + '  ';
          }
          else if (err.message === 'The email address is badly formatted.') {
            if (state.sign_email === '' && state.sign_Pw === '') {
              state.signup_err_pw_msg = '비밀번호를 입력해주세요.';
              state.signup_err_email_msg = '이메일을 입력해주세요.';
              let msg_email_element = document.getElementById('email_msg');
              let msg_pw_element = document.getElementById('pw_msg');
              msg_email_element.classList.remove('msg');
              msg_email_element.classList.add('errmsg');
              msg_pw_element.classList.remove('msg');
              msg_pw_element.classList.add('errmsg');
            }
            else {
              state.signup_err_email_msg = '이메일 형식이 유효하지 않습니다.';
              let msg_element = document.getElementById('email_msg');
              msg_element.classList.remove('msg');
              msg_element.classList.add('errmsg');
            }
          }
        }
      );
      dispatch('a_authStateObserver');
    },
    a_authStateObserver: ({ commit, state }) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          // console.log(getters.isDisplayName)
          // getters.isDisplayName = user.displayName;
          // getters.isphotoURL = user.photoURL;
          commit('m_nextSetting');
        } else {
          // User is signed out.
          // ...
        }
      });
    }
  }
}