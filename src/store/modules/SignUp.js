import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {
  state: {
    signup_err_email_msg: '',
    signup_err_pw_msg: '비밀번호는 6자 이상이어야 합니다.',
    signup_email: '',
    signup_password:'',
  },
  getters: {
    isSignupErrEmailMsg: (state) => {
      return state.signup_err_email_msg;
    },
    isSignupErrPsMsg: (state) => {
      return state.signup_err_pw_msg;
    },
    // isSignupEmail: (state) => {
    //   return state.signup_email;
    // },
    // isSignupPassword: (state) => {
    //   return state.signup_password;
    // },
  },
  mutations: {
    m_nextSetting: (state) => {
      state.loggedIn = true;
      window.localStorage.setItem('token', state.token)
      router.replace('first-setting')
    },
    setEmail(state, payload){
      state.signup_email = payload;
    },
    setPassword(state, payload){
      state.signup_password = payload;
    }
  },
  actions: {
    setEmail: (context, val) => {
      context.commit('setEmail', val)
    },
    setPassword: (context, val) => {
      context.commit('setPassword', val)
    },
    a_signUp: ({state, dispatch, commit}, user) => {
      firebase.auth().createUserWithEmailAndPassword(state.signup_email, state.signup_password).then(
        (user) => {
          // this.$router.replace('first-setting')
        },
        (err) => {
          console.log('Oops. ' + err.message);
          console.log('state',state.signup_err_email_msg);
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
            let value = document.getElementById('email-input').value;
            console.log('value',value);
            // value = value + '  ';
            value = `${value}` + 'aa';
          }
          else if (err.message === 'The email address is badly formatted.') {
            if (user.e === '' && user.p === '') {
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
          state.displayName = user.displayName;
          state.email = user.email;
          state.photoURL = user.photoURL;
          state.token = user.o;
          commit('m_logInUser');
        } else {
          // User is signed out.
          // ...
        }
      });
    }
  }
}