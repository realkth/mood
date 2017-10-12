import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {
  state: {
    setting_err_msg: '',
    currentUser: {
      photoURL: '',
      displayName: ''
    }
  },
  getters: {
    isSetting_err_msg: (state) => {
      return state.setting_err_msg
    },
    isCurrentUser: (state) => {
      return state.currentUser
    },
  },
  mutations: {
    m_secondSetting: (state) => {
      state.loggedIn = true;
      // window.localStorage.setItem('token', state.token)
      router.replace('second-setting')
    },
    m_mySetting: (state) => {
      state.loggedIn = true;
      // window.localStorage.setItem('token', state.token)
      // router.replace('second-setting')
    },
    m_setFirstErrMsg: (state, payload) => {
      state.setting_err_msg = payload
    },
    m_setFirstPhoto: (state, payload) => {
      state.currentUser.photoURL = payload
    },
    m_setFirstDisplayName: (state, payload) => {
      state.currentUser.displayName = payload
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
    a_getUserInfo: ({state, dispatch}) => {
      var user = firebase.auth().currentUser;
      var name, email, photoURL, uid, emailVerified;

      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoURL = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;
      }
      dispatch('a_setFirstPhoto', photoURL);
      dispatch('a_setFirstDisplayName', name);
      
      // this.photoURL = photoURL
    },
    a_firstSetting: ({state, dispatch}, currentUser) => {
      let user = firebase.auth().currentUser;
      if (state.currentUser.displayName.trim() !== '') {
        user.updateProfile({
          photoURL: state.currentUser.photoURL,
          displayName: state.currentUser.displayName
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
        state.setting_err_msg = '유저 네임을 설정해주세요.';
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
    a_MySetting: ({state, dispatch}, currentUser) => {
      let user = firebase.auth().currentUser;
      if (state.currentUser.displayName.trim() !== '') {
        user.updateProfile({
          photoURL: state.currentUser.photoURL,
          displayName: state.currentUser.displayName
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
      dispatch('a_MySettingAuthState');
    },
    a_MySettingAuthState: ({ commit, state }) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          window.localStorage.setItem('token', user.uid);
          window.localStorage.setItem('email', user.email);
          window.localStorage.setItem('photoURL', user.photoURL);
          // if( user.displayName !== null) {
          //   // commit('m_mySetting');
          // } else { 
          //   // state.toastMessage = '잠시만 기다려 주세요.'
          //   let message = '잠시만 기다려 주세요.'
          //   dispatch('a_setToastMessage',message ) 
          // }
          // User is signed in.
          // console.log(getters.isDisplayName)
          // getters.isDisplayName = user.displayName;
          // getters.isphotoURL = user.photoURL;
          commit('m_mySetting');
        } else {
          // User is signed out.
          // ...
        }
      });
    },
  }
}