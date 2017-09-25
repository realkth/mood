import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {
  state: {
    first_uploadMyImg: '',
    first_setting_err_msg: '',
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
    // checkImage: (file) => {
    //   if (/.*\.(gif)|(jpeg)|(jpg)|(png)$/.test(file.name.toLowerCase())) {
    //     return true;
    //   }
    // },
  },
  mutations: {
    // checkImage: (file) => {
    //   if (/.*\.(gif)|(jpeg)|(jpg)|(png)$/.test(file.name.toLowerCase())) {
    //     return true;
    //   }
    // },
    m_secondSetting: (state) => {
      state.loggedIn = true;
      // window.localStorage.setItem('token', state.token)
      router.replace('second-setting')
    },
    m_setFirstPreviewFile: (state, payload) => {
      state.first_uploadMyImg = payload
    },
    m_setFirstPhoto: (state, payload) => {
      state.first_currentUser.photoURL = payload
    },
    m_setFirstDisplayName: (state, payload) => {
      state.first_currentUser.displayName = payload
    },

  },
  actions: {
    // a_setFirstPreviewFile: (context, val) => {
    //   context.commit('m_setFirstPreviewFile', val)
    // },
    a_setFirstPhoto: (context, val) => {
      context.commit('m_setFirstPhoto', val)
    },
    a_setFirstDisplayName: (context, val) => {
      context.commit('m_setFirstDisplayName', val)
    },
    // previewFile(e) {
    //   let _this = this;
    //   let file = e.target.files[0];
    //   this.currentUser.photoURL = file;
    //   let reader = new FileReader();
    //   if (this.checkImage(file)) {
    //     this.file = file;
    //     reader.readAsDataURL(file);
    //     reader.onload = data => {
    //       this.uploadMyImg = data.srcElement.result;
    //       this.currentUser.photoURL = data.srcElement.result;
    //       _this.file_url = reader.result;
    //     }
    //   } else { alert('이미지 파일만 선택 가능합니다.') }
    // },
    a_firstSetting: ({ state, dispatch, commit }, currentUser) => {
      let user = firebase.auth().currentUser;

      if (state.first_currentUser.displayName.trim() !== '') {
        user.updateProfile({
          photoURL: state.first_currentUser.photoURL,
          displayName: state.first_currentUser.displayName
          // displayName: this.currentUser.displayName,
          // photoURL: this.currentUser.photoURL
        }).then(function (response) {
          console.log('photo', state.first_currentUser.photoURL);
          console.log('name', state.first_currentUser.displayName);
          //Success
          // this.$router.replace('hello')
          // console.log(firebase.auth().currentUser.displayName)
          // console.log(firebase.auth().currentUser.photoURL)
        }, function (error) {
          //Error
          console.log(error);
        });
        // this.$router.replace('second-setting')
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