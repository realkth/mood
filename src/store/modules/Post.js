import axios from 'axios'
import router from './../../router'
import * as firebase from 'firebase'

export default {
  state: {
    write: {
      content: ''
    },
    emotion: '',
    item: {},
    targeturldaylist: ''
  },
  getters: {
    isWrite: (state) => {
      return state.write.content
    },
    isEmotion: (state) => {
      return state.emotion
    },
    isItem: (state) => {
      return state.item
    },
    isTargeturldaylist: (state) => {
      return state.targeturldaylist
    }
  },
  mutations: {
    m_write: (state, payload) => {
      state.write.content = payload
    },
    m_emotion: (state, payload) => {
      state.emotion = payload
    },
    m_item: (state, payload) => {
      state.item = payload
    },
    m_targeturldaylist: (state, payload) => {
      state.targeturldaylist = payload
    }
  },
  actions: {
    a_write: (context, val) => {
      context.commit('m_write', val)
    },
    a_emotion: (context, val) => {
      context.commit('m_emotion', val)
    },
    a_item: (context, val) => {
      context.commit('m_item', val)
    },
    a_targeturldaylist: (context, val) => {
      context.commit('m_targeturldaylist', val)
    },
    a_writePostSubmit({state, dispatch}) {
      let token = window.localStorage.getItem('token');
      let email = window.localStorage.getItem('email');
      let myAPI = window.localStorage.getItem('myAPI');
      let getAPI = myAPI + '.json'
      let emotion_btn = document.getElementsByName("emotion");
      let emotion_btn_check = 0;
      for (let i = 0; i < emotion_btn.length; i++) {
        if (emotion_btn[i].checked == true) {
          state.emotion = emotion_btn[i].value
          emotion_btn_check++;
        }
      }
      if (emotion_btn_check === 0) {
        let message = '오늘의 감정을 선택해주세요.'
        dispatch('a_setToastMessage', message)
        setTimeout(() => {
          }, 2500);
          return;
      }

      axios.post(state.targeturldaylist, {
        // user: token,
        userEmail: email,
        emotion: state.emotion,
        content: state.write.content
      }
      )
        .then(response => {
          let message = '오늘의 일기를 기록하셨습니다.'
          dispatch('a_setToastMessage', message)
          // setTimeout(() => {
          //   this.closeModal()
          // }, 2500);
          console.log('response', response);

          // axios.get(getAPI, {
          // })
          //   .then(response => {
          //     let result = response.data;
          //     let item = {};
    
          //     // for (let prop in result) {
          //     //   item = result[prop]
          //     //   item.key = prop
          //     //   item.value = Object.values(item)
          //     //   // this.$parent.list.push(item)
          //     //   // this.$parent.listkey.push(this.item.key)

          //     // }
          //     // console.log('e', this.listkey)
          //     for (let i = 0; i < this.list.length; i++) {

          //       // console.log('날짜', this.list[i].value[1])
          //       // console.log('감정', this.list[i].value[0].emotion);
          //       // console.log('글', this.list[i].value[0].content);
          //       // console.log('%c——————————————————————————————————————————————————', 'color: #00737d');
          //     }
          //   })
          //   .catch(error => {
          //     console.log(error);
          //   })
        })
        .catch(error => {
          console.log('state.targeturldaylist',state.targeturldaylist);
          console.log(error);
          let message = '로그인 해주세요.'
          dispatch('a_setToastMessage', message)
          // setTimeout(() => {
          //   this.closeModal()
          // }, 2500);
        })
      // console.log(this.targeturldaylist)
    },
  }
}
